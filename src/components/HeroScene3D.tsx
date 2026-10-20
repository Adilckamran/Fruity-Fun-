import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers } from 'lucide-react';
import type { FlavourId } from '../types';

interface HeroScene3DProps {
  onSelectFlavour?: (flavour: FlavourId) => void;
  activeFlavourFocus?: 'both' | 'mango' | 'apple';
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({
  onSelectFlavour,
  activeFlavourFocus = 'both'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFocus, setCurrentFocus] = useState<'both' | 'mango' | 'apple'>(activeFlavourFocus);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Sync prop changes
  useEffect(() => {
    setCurrentFocus(activeFlavourFocus);
  }, [activeFlavourFocus]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 48 : 38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, isMobile ? 5.2 : 4.4);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting setup (Beverage Commercial Tropical Sunlight Setup)
    // Ambient light with soft sky-blue tint
    const ambientLight = new THREE.AmbientLight(0xdcf0ff, 1.3);
    scene.add(ambientLight);

    // Main Golden Sun Key Light
    const sunLight = new THREE.DirectionalLight(0xfffae0, 2.6);
    sunLight.position.set(3.5, 6, 4.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0006;
    scene.add(sunLight);

    // Cyan/Sky Fill Light
    const skyFill = new THREE.DirectionalLight(0xaad8ff, 1.2);
    skyFill.position.set(-4, 3, 3);
    scene.add(skyFill);

    // Warm Sun Backlight / Silhouette Rim Light
    const rimLight = new THREE.DirectionalLight(0xfff0c8, 2.2);
    rimLight.position.set(0, 4.5, -4);
    scene.add(rimLight);

    // Flavour Accent Lights
    const mangoGlow = new THREE.PointLight(0xffa500, 3.2, 7);
    mangoGlow.position.set(-1.8, 0.2, 1.4);
    scene.add(mangoGlow);

    const appleGlow = new THREE.PointLight(0xff2244, 2.8, 7);
    appleGlow.position.set(1.8, 0.2, 1.4);
    scene.add(appleGlow);

    // 5. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    const totalTextures = 8;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalTextures) {
        setIsLoaded(true);
      }
    };

    const loadTex = (url: string) => {
      const tex = textureLoader.load(url, checkLoaded);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      return tex;
    };

    const texMangoFront = loadTex('/assets/mango-texture.png');
    const texMangoTop = loadTex('/assets/mango-top.png');
    const texMangoSide = loadTex('/assets/mango-side.png');

    const texAppleFront = loadTex('/assets/apple-texture.png');
    const texAppleTop = loadTex('/assets/apple-top.png');
    const texAppleSide = loadTex('/assets/apple-side.png');

    const texAppleSlice = loadTex('/assets/apple-slice.png');
    const texLeaf = loadTex('/assets/green-leaf.png');

    // 6. Carton Box Factory (Authentic 200ml Tetra Brik packaging dimensions)
    const cartonWidth = 0.94;
    const cartonHeight = 2.18;
    const cartonDepth = 0.62;

    const createCarton = (
      frontTex: THREE.Texture,
      topTex: THREE.Texture,
      sideTex: THREE.Texture,
      accentHex: number
    ) => {
      const group = new THREE.Group();

      const pbrMaterial = (map?: THREE.Texture, color = 0xffffff, roughness = 0.32) =>
        new THREE.MeshStandardMaterial({
          map,
          color,
          roughness,
          metalness: 0.04,
          envMapIntensity: 1.0
        });

      const materials = [
        pbrMaterial(sideTex, 0xffffff, 0.38),
        pbrMaterial(sideTex, 0xffffff, 0.38),
        pbrMaterial(topTex, 0xffffff, 0.32),
        pbrMaterial(undefined, accentHex, 0.45),
        pbrMaterial(frontTex, 0xffffff, 0.25),
        pbrMaterial(sideTex, 0xffffff, 0.38)
      ];

      const boxGeo = new THREE.BoxGeometry(cartonWidth, cartonHeight, cartonDepth, 4, 4, 4);
      const boxMesh = new THREE.Mesh(boxGeo, materials);
      boxMesh.castShadow = true;
      boxMesh.receiveShadow = true;
      group.add(boxMesh);

      // Contact Shadow Plane
      const shadowGeo = new THREE.PlaneGeometry(1.6, 1.1);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x051b0a,
        transparent: true,
        opacity: 0.28,
        depthWrite: false
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.y = -cartonHeight / 2 - 0.02;
      group.add(shadowMesh);

      return group;
    };

    const mangoGroup = createCarton(texMangoFront, texMangoTop, texMangoSide, 0xffae00);
    const appleGroup = createCarton(texAppleFront, texAppleTop, texAppleSide, 0xd31b22);

    const rootGroup = new THREE.Group();
    rootGroup.add(mangoGroup);
    rootGroup.add(appleGroup);
    scene.add(rootGroup);

    mangoGroup.position.set(-0.85, 0, 0.15);
    mangoGroup.rotation.set(-0.02, 0.28, -0.04);

    appleGroup.position.set(0.85, 0.06, -0.15);
    appleGroup.rotation.set(0.03, -0.25, 0.04);

    // 7. Floating Fruit Particles & Liquid Droplets
    const floatingElementsGroup = new THREE.Group();
    scene.add(floatingElementsGroup);

    const dropletGeo = new THREE.SphereGeometry(0.068, 24, 24);
    const mangoDropletMat = new THREE.MeshPhysicalMaterial({
      color: 0xffaa00,
      roughness: 0.06,
      metalness: 0.04,
      transmission: 0.85,
      ior: 1.34,
      transparent: true,
      opacity: 0.95
    });

    const appleDropletMat = new THREE.MeshPhysicalMaterial({
      color: 0xee2525,
      roughness: 0.06,
      metalness: 0.04,
      transmission: 0.85,
      ior: 1.34,
      transparent: true,
      opacity: 0.95
    });

    interface FloatingItem {
      mesh: THREE.Object3D;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      orbitRadius: number;
      rotSpeedX: number;
      rotSpeedY: number;
      phase: number;
    }

    const floatingItems: FloatingItem[] = [];

    // Liquid droplets
    for (let i = 0; i < 14; i++) {
      const isMangoSide = i % 2 === 0;
      const mat = isMangoSide ? mangoDropletMat : appleDropletMat;
      const scale = 0.5 + Math.random() * 0.9;
      const dropletMesh = new THREE.Mesh(dropletGeo, mat);
      dropletMesh.scale.set(scale, scale * (0.9 + Math.random() * 0.3), scale);

      const angle = (i / 14) * Math.PI * 2;
      const radius = 1.35 + Math.random() * 0.9;
      const x = Math.cos(angle) * radius;
      const y = -0.9 + Math.random() * 2.1;
      const z = (Math.random() - 0.5) * 1.5;

      dropletMesh.position.set(x, y, z);
      floatingElementsGroup.add(dropletMesh);

      floatingItems.push({
        mesh: dropletMesh,
        baseX: x,
        baseY: y,
        baseZ: z,
        speed: 0.8 + Math.random() * 0.8,
        orbitRadius: 0.12 + Math.random() * 0.15,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Floating Green Leaves
    const leafGeo = new THREE.PlaneGeometry(0.38, 0.38);
    const leafMat = new THREE.MeshStandardMaterial({
      map: texLeaf,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.28,
      alphaTest: 0.1
    });

    for (let i = 0; i < 5; i++) {
      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      const x = (i % 2 === 0 ? -1.5 : 1.5) + (Math.random() - 0.5) * 0.4;
      const y = -0.5 + i * 0.45;
      const z = (Math.random() - 0.5) * 0.8;
      leafMesh.position.set(x, y, z);
      leafMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      floatingElementsGroup.add(leafMesh);

      floatingItems.push({
        mesh: leafMesh,
        baseX: x,
        baseY: y,
        baseZ: z,
        speed: 0.6 + Math.random() * 0.4,
        orbitRadius: 0.18,
        rotSpeedX: 0.015,
        rotSpeedY: 0.02,
        phase: i * 1.5
      });
    }

    // Floating Apple Slice
    const appleSliceGeo = new THREE.PlaneGeometry(0.65, 0.65);
    const appleSliceMat = new THREE.MeshStandardMaterial({
      map: texAppleSlice,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.22,
      alphaTest: 0.15
    });
    const appleSliceMesh = new THREE.Mesh(appleSliceGeo, appleSliceMat);
    appleSliceMesh.position.set(1.65, -0.3, 0.4);
    appleSliceMesh.rotation.set(-0.2, -0.4, 0.3);
    floatingElementsGroup.add(appleSliceMesh);

    floatingItems.push({
      mesh: appleSliceMesh,
      baseX: 1.65,
      baseY: -0.3,
      baseZ: 0.4,
      speed: 0.7,
      orbitRadius: 0.15,
      rotSpeedX: 0.008,
      rotSpeedY: 0.012,
      phase: 2.1
    });

    // 8. Interactive Mouse & Drag Handling
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

    let targetMouseParallaxX = 0;
    let targetMouseParallaxY = 0;
    let currentMouseParallaxX = 0;
    let currentMouseParallaxY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetMouseParallaxX = normX * 0.25;
      targetMouseParallaxY = normY * 0.15;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.006;
        targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        targetRotationY += deltaX * 0.009;
        targetRotationX += deltaY * 0.007;
        targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX));
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 9. Window Resize Handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const mobile = width < 768;

      camera.aspect = width / height;
      camera.fov = mobile ? 48 : 38;
      camera.position.z = mobile ? 5.2 : 4.4;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 10. IntersectionObserver for 60fps performance
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // 11. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      currentMouseParallaxX += (targetMouseParallaxX - currentMouseParallaxX) * 0.05;
      currentMouseParallaxY += (targetMouseParallaxY - currentMouseParallaxY) * 0.05;

      if (autoRotate && !isDragging) {
        targetRotationY += 0.0025;
      }

      rootGroup.rotation.y = currentRotationY + currentMouseParallaxX;
      rootGroup.rotation.x = currentRotationX - currentMouseParallaxY;

      let targetMangoX = -0.85;
      let targetMangoZ = 0.15;
      let targetMangoScale = 1;
      let targetMangoRotY = 0.28;

      let targetAppleX = 0.85;
      let targetAppleZ = -0.15;
      let targetAppleScale = 1;
      let targetAppleRotY = -0.25;

      if (currentFocus === 'mango') {
        targetMangoX = 0;
        targetMangoZ = 0.6;
        targetMangoScale = 1.15;
        targetMangoRotY = 0.05;

        targetAppleX = 2.4;
        targetAppleZ = -1.2;
        targetAppleScale = 0.75;
      } else if (currentFocus === 'apple') {
        targetAppleX = 0;
        targetAppleZ = 0.6;
        targetAppleScale = 1.15;
        targetAppleRotY = -0.05;

        targetMangoX = -2.4;
        targetMangoZ = -1.2;
        targetMangoScale = 0.75;
      }

      mangoGroup.position.x += (targetMangoX - mangoGroup.position.x) * 0.06;
      mangoGroup.position.z += (targetMangoZ - mangoGroup.position.z) * 0.06;
      mangoGroup.scale.setScalar(
        mangoGroup.scale.x + (targetMangoScale - mangoGroup.scale.x) * 0.06
      );

      appleGroup.position.x += (targetAppleX - appleGroup.position.x) * 0.06;
      appleGroup.position.z += (targetAppleZ - appleGroup.position.z) * 0.06;
      appleGroup.scale.setScalar(
        appleGroup.scale.x + (targetAppleScale - appleGroup.scale.x) * 0.06
      );

      const mangoFloat = Math.sin(elapsed * 1.5) * 0.07;
      const appleFloat = Math.cos(elapsed * 1.3) * 0.07;

      mangoGroup.position.y = mangoFloat;
      appleGroup.position.y = appleFloat + 0.05;

      mangoGroup.rotation.y = targetMangoRotY + Math.sin(elapsed * 0.8) * 0.04;
      appleGroup.rotation.y = targetAppleRotY + Math.cos(elapsed * 0.9) * 0.04;

      for (let i = 0; i < floatingItems.length; i++) {
        const item = floatingItems[i];
        const t = elapsed * item.speed + item.phase;

        item.mesh.position.y = item.baseY + Math.sin(t) * item.orbitRadius;
        item.mesh.position.x = item.baseX + Math.cos(t * 0.8) * (item.orbitRadius * 0.6);
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
      }

      mangoGlow.intensity = 2.8 + Math.sin(elapsed * 2) * 0.5;
      appleGlow.intensity = 2.5 + Math.cos(elapsed * 2.2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [currentFocus, autoRotate]);

  return (
    <div className="relative w-full h-full min-h-[520px] md:min-h-[640px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Click and drag to rotate in 3D"
      />

      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20 backdrop-blur-md rounded-3xl z-10">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-[#FFAE00]/40 border-t-[#FFAE00] animate-spin" />
            <div className="absolute inset-2 rounded-full border-4 border-[#E52424]/40 border-b-[#E52424] animate-spin-slow" />
          </div>
          <p className="text-sm font-bold text-white tracking-wide drop-shadow">
            Loading 3D Experience...
          </p>
        </div>
      )}

      {/* Floating 3D Control Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-white/80 text-xs font-bold text-neutral-800">
        <button
          type="button"
          onClick={() => {
            setCurrentFocus('both');
            onSelectFlavour?.('mango');
          }}
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
            currentFocus === 'both'
              ? 'bg-neutral-900 text-white font-extrabold shadow-sm'
              : 'hover:bg-neutral-100 text-neutral-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#FFAE00]" />
          <span>Both (Duo)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentFocus('mango');
            onSelectFlavour?.('mango');
          }}
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
            currentFocus === 'mango'
              ? 'bg-[#FFAE00] text-white font-black shadow-md'
              : 'hover:bg-amber-50 text-neutral-800'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFAE00] ring-1 ring-white" />
          <span>Mango</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentFocus('apple');
            onSelectFlavour?.('apple');
          }}
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
            currentFocus === 'apple'
              ? 'bg-[#E52424] text-white font-black shadow-md'
              : 'hover:bg-red-50 text-neutral-800'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E52424] ring-1 ring-white" />
          <span>Apple</span>
        </button>

        <div className="h-4 w-px bg-neutral-300 mx-1" />

        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${
            autoRotate ? 'text-amber-600 bg-amber-50' : 'text-neutral-400 hover:text-neutral-700'
          }`}
          title={autoRotate ? 'Pause 3D rotation' : 'Resume 3D rotation'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>

      {/* Gentle Drag Indicator */}
      <div className="absolute top-4 right-4 pointer-events-none z-10 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-white drop-shadow">
        <Sparkles className="w-3.5 h-3.5 text-[#FFD200]" />
        <span>Drag to rotate in 360°</span>
      </div>
    </div>
  );
};

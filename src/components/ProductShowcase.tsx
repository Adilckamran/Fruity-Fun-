import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Check, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FLAVOURS } from '../types';
import type { FlavourId } from '../types';

interface ProductShowcaseProps {
  activeFlavour: FlavourId;
  onChangeFlavour: (flavour: FlavourId) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  activeFlavour,
  onChangeFlavour
}) => {
  const current = FLAVOURS[activeFlavour];
  const canvasRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  // 3D Single Carton Inspector with Three.js
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Studio commercial lights
    const amb = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(amb);

    const dirLight = new THREE.DirectionalLight(0xfff8e8, 2.4);
    dirLight.position.set(2.5, 4.5, 3.5);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.6);
    rimLight.position.set(-2.5, 3.5, -3);
    scene.add(rimLight);

    // Textures
    const texLoader = new THREE.TextureLoader();
    const frontTex = texLoader.load(current.textureImage);
    frontTex.colorSpace = THREE.SRGBColorSpace;
    const topTex = texLoader.load(current.topTexture);
    topTex.colorSpace = THREE.SRGBColorSpace;
    const sideTex = texLoader.load(current.sideTexture);
    sideTex.colorSpace = THREE.SRGBColorSpace;

    // Materials
    const pbr = (map?: THREE.Texture, col = 0xffffff) =>
      new THREE.MeshStandardMaterial({
        map,
        color: col,
        roughness: 0.32,
        metalness: 0.04
      });

    const accentHex = activeFlavour === 'mango' ? 0xffae00 : 0xd31b22;
    const materials = [
      pbr(sideTex),
      pbr(sideTex),
      pbr(topTex),
      pbr(undefined, accentHex),
      pbr(frontTex),
      pbr(sideTex)
    ];

    const cartonGeo = new THREE.BoxGeometry(0.96, 2.2, 0.62);
    const cartonMesh = new THREE.Mesh(cartonGeo, materials);
    scene.add(cartonMesh);

    // Soft contact shadow
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.1);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.15;
    scene.add(shadow);

    // Orbit / drag controls
    let isDragging = false;
    let prevX = 0;
    let targetRotY = 0;
    let currentRotY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      targetRotY += dx * 0.012;
      prevX = e.clientX;
      setRotationAngle(Math.round(((targetRotY % (Math.PI * 2)) / (Math.PI * 2)) * 360));
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevX;
      targetRotY += dx * 0.014;
      prevX = e.touches[0].clientX;
      setRotationAngle(Math.round(((targetRotY % (Math.PI * 2)) / (Math.PI * 2)) * 360));
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

    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      currentRotY += (targetRotY - currentRotY) * 0.1;
      cartonMesh.rotation.y = currentRotY;

      cartonMesh.position.y = Math.sin(elapsed * 1.6) * 0.04;
      cartonMesh.rotation.z = Math.sin(elapsed * 1.2) * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
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
  }, [activeFlavour]);

  const handleConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.6 },
      colors: activeFlavour === 'mango' ? ['#FFAE00', '#FF7B00', '#FFD200'] : ['#E52424', '#2E9B34', '#FF5500']
    });
  };

  return (
    <section
      id="showcase"
      className="py-24 sm:py-32 relative overflow-hidden transition-all duration-700"
      style={{
        backgroundColor: activeFlavour === 'mango' ? '#181105' : '#1c0809',
        backgroundImage:
          activeFlavour === 'mango'
            ? 'linear-gradient(to bottom, #0a1f10, rgba(30, 20, 5, 0.95)), radial-gradient(circle at 60% 40%, rgba(255, 174, 0, 0.25) 0%, transparent 65%)'
            : 'linear-gradient(to bottom, #0a1f10, rgba(35, 10, 12, 0.95)), radial-gradient(circle at 60% 40%, rgba(229, 36, 36, 0.25) 0%, transparent 65%)'
      }}
    >
      {/* Dynamic Ambient Radiant Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-60"
        style={{
          background:
            activeFlavour === 'mango'
              ? 'radial-gradient(circle at 70% 30%, rgba(255, 174, 0, 0.25) 0%, transparent 60%)'
              : 'radial-gradient(circle at 70% 30%, rgba(229, 36, 36, 0.22) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-xs font-black uppercase tracking-widest text-[#FFD200] inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD200]" />
            Interactive 3D Flavour Experience
          </span>
          <h2 className="font-['Fredoka'] text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
            Discover Your <span style={{ color: current.accentColor }}>Fruity Fun</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-emerald-100/80">
            Switch between Mango and Apple to explore each flavour's packaging details, 360° view, and taste profile.
          </p>

          {/* Flavour Selector Toggle Bar */}
          <div className="mt-8 inline-flex p-2 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            <button
              type="button"
              onClick={() => onChangeFlavour('mango')}
              className={`px-6 py-3.5 rounded-xl font-black text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                activeFlavour === 'mango'
                  ? 'bg-gradient-to-r from-[#FFAE00] to-[#FF7B00] text-white shadow-xl scale-102 border border-white/30'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-[#FFD200] ring-2 ring-white/50" />
              <span>Mango Magic (200 ml)</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeFlavour('apple')}
              className={`px-6 py-3.5 rounded-xl font-black text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                activeFlavour === 'apple'
                  ? 'bg-gradient-to-r from-[#E52424] to-[#B71C1C] text-white shadow-xl scale-102 border border-white/30'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-[#FF6B6B] ring-2 ring-white/50" />
              <span>Apple Freshness (200 ml)</span>
            </button>
          </div>
        </div>

        {/* Interactive Showcase Box with Glassmorphism */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/45 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl">
          
          {/* Left Column: 3D Interactive Carton Inspector */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[490px] bg-gradient-to-b from-white/5 to-white/10 rounded-2xl border border-white/15 overflow-hidden">
            
            {/* 360 Spin Hint */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-md text-xs font-bold text-white">
              <RotateCcw className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>Drag to spin 360°</span>
            </div>

            {/* 200ml Badge */}
            <div
              className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full text-xs font-black text-white shadow-lg border border-white/30"
              style={{ backgroundColor: current.accentColor }}
            >
              200 ml Aseptic Pack
            </div>

            {/* 3D WebGL Canvas */}
            <div
              ref={canvasRef}
              className="w-full h-full min-h-[380px] cursor-grab active:cursor-grabbing select-none"
            />

            {/* Rotation angle readout */}
            <div className="absolute bottom-4 z-10 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-amber-200 border border-white/10">
              Angle: {((rotationAngle % 360) + 360) % 360}°
            </div>
          </div>

          {/* Right Column: Flavour Profile & Packaging Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Flavour Title & Tagline */}
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-200/90 mb-2">
                <span>Fruity Fun Fruit Drink</span>
                <span>•</span>
                <span style={{ color: current.accentColor }}>{current.tagline}</span>
              </div>
              <h3 className="font-['Fredoka'] text-3xl sm:text-5xl font-black text-white drop-shadow-sm">
                {current.headline}
              </h3>
              <p className="mt-2 text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                {current.subtext}
              </p>
            </div>

            {/* Taste Profile Bars */}
            <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/15 backdrop-blur-md">
              <h4 className="text-xs font-black uppercase tracking-wider text-neutral-300">
                Taste & Sensory Balance
              </h4>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs font-bold text-white mb-1">
                    <span>Natural Sweetness</span>
                    <span style={{ color: current.accentColor }}>{current.tasteProfile.sweetness}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${current.tasteProfile.sweetness}%`,
                        backgroundColor: current.accentColor
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-white mb-1">
                    <span>Fruit Richness</span>
                    <span style={{ color: current.accentColor }}>{current.tasteProfile.fruitiness}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${current.tasteProfile.fruitiness}%`,
                        backgroundColor: current.accentColor
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-white mb-1">
                    <span>Crisp Refreshment</span>
                    <span style={{ color: current.accentColor }}>{current.tasteProfile.crispness}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${current.tasteProfile.crispness}%`,
                        backgroundColor: current.accentColor
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Packaging Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {current.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm"
                >
                  <Check
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: current.accentColor }}
                  />
                  <span className="text-xs font-semibold text-white/90 leading-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Sensory Cheers Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfetti}
                className="w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider text-white shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/25"
                style={{
                  backgroundColor: current.accentColor
                }}
              >
                <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
                <span>Celebrate {current.name}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

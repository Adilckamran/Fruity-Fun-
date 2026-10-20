import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye, Sun, Wind } from 'lucide-react';
import { FLAVOURS } from '../types';
import type { FlavourId } from '../types';

interface FlavoursSectionProps {
  onSelectFlavourForShowcase: (flavour: FlavourId) => void;
}

export const FlavoursSection: React.FC<FlavoursSectionProps> = ({
  onSelectFlavourForShowcase
}) => {
  const [mangoTilt, setMangoTilt] = useState({ x: 0, y: 0 });
  const [appleTilt, setAppleTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 7,
      y: (x / (rect.width / 2)) * 7
    });
  };

  const handleMouseLeave = (
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="flavours" className="py-24 sm:py-32 relative overflow-hidden bg-[#0d2313]">
      {/* Background Tropical Canopy & Atmospheric Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e2714] via-[#091b0d] to-[#0a1f10] pointer-events-none" />

      {/* Radiant Sunbeam & Fruit Glows */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#FFAE00]/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#E52424]/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      {/* Floating Tropical Leaves Ambient Elements */}
      <img
        src="/assets/green-leaf.png"
        alt="Natural leaf"
        className="absolute top-16 left-12 w-16 h-16 object-contain opacity-55 animate-float-slow pointer-events-none hidden md:block"
      />
      <img
        src="/assets/green-leaf.png"
        alt="Natural leaf"
        className="absolute bottom-16 right-16 w-18 h-18 object-contain opacity-55 animate-float-reverse pointer-events-none hidden md:block rotate-90"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-xs font-black uppercase tracking-widest text-[#FFD200] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD200]" />
            <span>Two Iconic Flavours • Pure Fruit Joy</span>
          </div>
          <h2 className="font-['Fredoka'] text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Our Signature <span className="bg-gradient-to-r from-[#FFD200] to-[#FFAE00] bg-clip-text text-transparent">Flavours</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/85 font-medium leading-relaxed">
            Step into two vibrant fruit worlds. Crafted for pure refreshment in every sip, sealed in convenient 200 ml cartons with an attached straw.
          </p>
        </div>

        {/* Two Flavour Worlds Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* ==================== 1. MANGO MAGIC WORLD ==================== */}
          <div
            onMouseMove={(e) => handleMouseMove(e, setMangoTilt)}
            onMouseLeave={() => handleMouseLeave(setMangoTilt)}
            className="group relative rounded-3xl p-8 sm:p-10 border border-amber-300/40 shadow-2xl hover:shadow-[0_20px_50px_rgba(255,174,0,0.35)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255, 174, 0, 0.25), rgba(18, 12, 2, 0.85)), url(/assets/mango-orchard-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `perspective(1000px) rotateX(${mangoTilt.x}deg) rotateY(${mangoTilt.y}deg)`,
              transition: 'transform 0.15s ease-out, box-shadow 0.3s ease'
            }}
          >
            {/* Golden Sunlight Sheen & Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-amber-400/40 via-amber-600/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFAE00] to-[#FF7B00] text-white text-xs font-black tracking-wide uppercase shadow-lg shadow-amber-500/40 flex items-center gap-1.5 border border-white/20">
                <Sun className="w-3.5 h-3.5" />
                200 ml Carton
              </span>
              <span className="text-xs font-bold text-amber-200 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/30">
                Tropical Sunshine
              </span>
            </div>

            {/* Product Centerpiece */}
            <div className="relative my-4 flex items-center justify-center min-h-[360px] sm:min-h-[420px]">
              {/* Radial Sunburst Flare */}
              <div className="absolute w-72 h-72 bg-amber-400/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

              {/* Realistic Mango Cubes Cutout */}
              <img
                src="/assets/mango-cubes.png"
                alt="Mango cubes"
                className="absolute bottom-2 -left-3 w-32 h-32 object-contain rounded-2xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] animate-float-slow pointer-events-none hidden sm:block opacity-95 group-hover:rotate-6 transition-transform"
              />

              {/* Mango Green Leaf */}
              <img
                src="/assets/green-leaf.png"
                alt="Green mango leaf"
                className="absolute top-4 right-4 w-16 h-16 object-contain drop-shadow-md animate-float-reverse pointer-events-none opacity-90 group-hover:-rotate-12 transition-transform"
              />

              {/* Actual Fruity Fun Mango 200 ml Carton */}
              <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.05] group-hover:-translate-y-3">
                <img
                  src="/assets/mango-carton.png"
                  alt="Fruity Fun Mango Fruit Drink 200 ml Carton"
                  className="w-52 sm:w-60 h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] mx-auto"
                />
              </div>
            </div>

            {/* Flavour Copy & Details Glassmorphic Card */}
            <div className="relative z-10 mt-6 p-6 rounded-2xl bg-black/55 backdrop-blur-md border border-amber-300/30 flex flex-col gap-4">
              <div>
                <h3 className="font-['Fredoka'] text-3xl sm:text-4xl font-extrabold text-[#FFD200] drop-shadow-sm">
                  Mango Magic!
                </h3>
                <p className="text-xs uppercase font-bold tracking-wider text-amber-200 mt-1">
                  Mango Fruit Drink — 200 ml Carton
                </p>
                <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                  “Bring a burst of mango-inspired fun to your day.”
                </p>
              </div>

              {/* Sensory Notes Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {FLAVOURS.mango.sensoryNotes.map((note) => (
                  <span
                    key={note}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/25 text-amber-100 border border-amber-400/40"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Taste Profile Bars */}
              <div className="space-y-2 bg-black/30 p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-amber-100">
                  <span className="font-semibold">Sweetness</span>
                  <div className="w-32 bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#FFAE00] h-full rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-amber-100">
                  <span className="font-semibold">Fruit Richness</span>
                  <div className="w-32 bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#FF7B00] h-full rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>

              {/* Interactive CTA */}
              <button
                type="button"
                onClick={() => onSelectFlavourForShowcase('mango')}
                className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FFAE00] via-[#FF7B00] to-[#E52424] shadow-lg shadow-amber-900/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <Eye className="w-4 h-4" />
                <span>Explore Mango in 3D</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>


          {/* ==================== 2. APPLE FRESHNESS WORLD ==================== */}
          <div
            onMouseMove={(e) => handleMouseMove(e, setAppleTilt)}
            onMouseLeave={() => handleMouseLeave(setAppleTilt)}
            className="group relative rounded-3xl p-8 sm:p-10 border border-red-300/40 shadow-2xl hover:shadow-[0_20px_50px_rgba(229,36,36,0.35)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(229, 36, 36, 0.25), rgba(16, 2, 4, 0.85)), url(/assets/apple-orchard-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `perspective(1000px) rotateX(${appleTilt.x}deg) rotateY(${appleTilt.y}deg)`,
              transition: 'transform 0.15s ease-out, box-shadow 0.3s ease'
            }}
          >
            {/* Apple Orchard Sunlight Sheen */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-radial from-red-500/35 via-red-600/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E52424] to-[#B71C1C] text-white text-xs font-black tracking-wide uppercase shadow-lg shadow-red-500/40 flex items-center gap-1.5 border border-white/20">
                <Wind className="w-3.5 h-3.5" />
                200 ml Carton
              </span>
              <span className="text-xs font-bold text-red-200 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-red-400/30">
                Crisp Orchard Fresh
              </span>
            </div>

            {/* Product Centerpiece */}
            <div className="relative my-4 flex items-center justify-center min-h-[360px] sm:min-h-[420px]">
              {/* Radial Ruby Glow */}
              <div className="absolute w-72 h-72 bg-red-500/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

              {/* Realistic Apple Slice Cutout */}
              <img
                src="/assets/apple-slice.png"
                alt="Crisp apple slice"
                className="absolute bottom-2 -right-3 w-32 h-32 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] animate-float-slow pointer-events-none hidden sm:block opacity-95 group-hover:-rotate-6 transition-transform"
              />

              {/* Whole Red Apple */}
              <img
                src="/assets/apple-whole.png"
                alt="Fresh whole red apple"
                className="absolute top-4 left-4 w-22 h-22 object-contain drop-shadow-md animate-float-reverse pointer-events-none hidden sm:block opacity-90 group-hover:rotate-12 transition-transform"
              />

              {/* Actual Fruity Fun Apple 200 ml Carton */}
              <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.05] group-hover:-translate-y-3">
                <img
                  src="/assets/apple-carton.png"
                  alt="Fruity Fun Apple Fruit Drink 200 ml Carton"
                  className="w-52 sm:w-60 h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] mx-auto"
                />
              </div>
            </div>

            {/* Flavour Copy & Details Glassmorphic Card */}
            <div className="relative z-10 mt-6 p-6 rounded-2xl bg-black/55 backdrop-blur-md border border-red-300/30 flex flex-col gap-4">
              <div>
                <h3 className="font-['Fredoka'] text-3xl sm:text-4xl font-extrabold text-[#FF6B6B] drop-shadow-sm">
                  Apple Freshness!
                </h3>
                <p className="text-xs uppercase font-bold tracking-wider text-red-200 mt-1">
                  Apple Fruit Drink — 200 ml Carton
                </p>
                <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                  “A fruity little moment of fun in every sip.”
                </p>
              </div>

              {/* Sensory Notes Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {FLAVOURS.apple.sensoryNotes.map((note) => (
                  <span
                    key={note}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/25 text-red-100 border border-red-400/40"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Taste Profile Bars */}
              <div className="space-y-2 bg-black/30 p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-red-100">
                  <span className="font-semibold">Crispness</span>
                  <div className="w-32 bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#E52424] h-full rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-red-100">
                  <span className="font-semibold">Sweet Balance</span>
                  <div className="w-32 bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#2E9B34] h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>

              {/* Interactive CTA */}
              <button
                type="button"
                onClick={() => onSelectFlavourForShowcase('apple')}
                className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#E52424] to-[#B71C1C] shadow-lg shadow-red-900/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <Eye className="w-4 h-4" />
                <span>Explore Apple in 3D</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

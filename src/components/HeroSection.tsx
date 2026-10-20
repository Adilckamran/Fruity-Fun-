import React from 'react';
import { Sparkles, ArrowDown, ArrowRight, Sun, Wind } from 'lucide-react';
import { HeroScene3D } from './HeroScene3D';
import type { FlavourId } from '../types';

interface HeroSectionProps {
  onSelectFlavour: (flavour: FlavourId) => void;
  activeFocus: 'both' | 'mango' | 'apple';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectFlavour,
  activeFocus
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] lg:min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url(/assets/hero-tropical-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Cinematic Ambient Atmosphere Overlays */}
      {/* 1. Warm Sunbeam Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/15 via-transparent to-emerald-950/40 pointer-events-none" />

      {/* 2. Golden Mango & Ruby Apple Ambient Lighting Halos */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFAE00]/30 to-[#FF7B00]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#E52424]/25 to-[#2E9B34]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* 3. Lush Tropical Leaves Framing Overlay for Cinematic Optical Depth */}
      <img
        src="/assets/tropical-leaves-framing.png"
        alt="Tropical foliage frame"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 opacity-75 mix-blend-multiply select-none"
      />

      {/* 4. Bottom Blend into Flavours Section */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#0e2714]/85 via-[#0e2714]/40 to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: HERO HEADLINE & CTAS ================= */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Top Brand Pill with Glassmorphism */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-white/80 shadow-lg shadow-emerald-950/15 mb-6 transform hover:scale-105 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FFAE00] to-[#E52424] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-neutral-800">
                Fruity Fun Fruit Drink
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-xs font-bold text-[#1b7a24] bg-emerald-100/80 px-2 py-0.5 rounded-full">
                200 ml
              </span>
            </div>

            {/* Prominent Fruity Fun Logo */}
            <div className="mb-3 flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md p-1.5 shadow-xl shadow-black/10 border border-white">
                <img
                  src="/assets/brand-logo-mango.png"
                  alt="Fruity Fun Logo"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <span className="font-['Fredoka'] text-3xl sm:text-4xl font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                Fruity Fun
              </span>
            </div>

            {/* Main Headline: “TASTE THE FUN!” */}
            <h1 className="font-['Fredoka'] text-5xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05] mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
              TASTE THE{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#FFD200] via-[#FFAE00] to-[#FF5500] bg-clip-text text-transparent filter drop-shadow-[0_2px_8px_rgba(255,120,0,0.5)]">
                  FUN!
                </span>
                <Sparkles className="absolute -top-3 -right-7 w-7 h-7 text-[#FFD200] animate-bounce filter drop-shadow" />
              </span>
            </h1>

            {/* Supporting Headline: “Refreshment in Every Sip!” */}
            <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-[#FFF3D6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] mb-3">
              “Refreshment in Every Sip!”
            </h2>

            {/* Supporting text */}
            <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-white/90 font-medium leading-relaxed max-w-lg mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Big Fruit Flavour. Little Moments of Happiness. Sealed in 200 ml aseptic packs for peak taste and pure tropical joy.
            </p>

            {/* The Two CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
              <button
                type="button"
                onClick={() => scrollTo('flavours')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#FFAE00] via-[#FF7B00] to-[#E52424] shadow-xl shadow-amber-900/30 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-[1.04] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer group border border-white/20"
              >
                <span>Explore Our Flavours</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('showcase')}
                className="w-full sm:w-auto px-7 py-4 rounded-full font-bold text-sm text-neutral-900 bg-white/90 backdrop-blur-md border border-white hover:bg-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discover Fruity Fun</span>
                <ArrowRight className="w-4 h-4 text-neutral-600" />
              </button>
            </div>

            {/* Flavour Highlights Chips with Glassmorphic Badges */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  onSelectFlavour('mango');
                  scrollTo('flavours');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-amber-200/80 shadow-md hover:shadow-lg transition-all text-xs font-bold text-amber-900 cursor-pointer"
              >
                <Sun className="w-3.5 h-3.5 text-[#FFAE00]" />
                <span>Mango Magic (200 ml)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectFlavour('apple');
                  scrollTo('flavours');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-red-200/80 shadow-md hover:shadow-lg transition-all text-xs font-bold text-red-900 cursor-pointer"
              >
                <Wind className="w-3.5 h-3.5 text-[#E52424]" />
                <span>Apple Freshness (200 ml)</span>
              </button>
            </div>

          </div>


          {/* ================= RIGHT COLUMN: 3D PRODUCT SCENE ================= */}
          <div className="lg:col-span-7 relative w-full h-[500px] sm:h-[580px] lg:h-[700px] flex items-center justify-center">
            
            {/* Soft Ambient Product Radial Pedestal Light */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[450px] h-[450px] bg-radial from-amber-200/40 via-amber-400/15 to-transparent rounded-full blur-2xl animate-pulse-glow" />
            </div>

            {/* The 3D WebGL Canvas */}
            <HeroScene3D
              onSelectFlavour={onSelectFlavour}
              activeFlavourFocus={activeFocus}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

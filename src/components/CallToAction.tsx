import React from 'react';
import { Sparkles, ArrowRight, Sun, Wind } from 'lucide-react';
import type { FlavourId } from '../types';

interface CallToActionProps {
  onSelectFlavour: (flavour: FlavourId) => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onSelectFlavour }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden bg-[#061208]">
      {/* Background Tropical Canopy & Radiant Ambient Flares */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1e11] via-[#08150c] to-[#040c06] pointer-events-none" />

      {/* Golden and Ruby Halos */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFAE00]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#E52424]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-xs font-black uppercase tracking-widest text-[#FFD200] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD200]" />
          <span>The Big Choice</span>
        </div>

        {/* Headline */}
        <h2 className="font-['Fredoka'] text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-md">
          Which Flavour Is Your <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#FFD200] via-[#FFAE00] to-[#FF6B6B] bg-clip-text text-transparent">
            Favourite?
          </span>
        </h2>

        {/* Supporting line */}
        <p className="mt-4 text-base sm:text-xl text-emerald-100/90 max-w-2xl mx-auto font-medium">
          “Mango or Apple? Discover your Fruity Fun favourite.”
        </p>

        {/* Both Cartons Displayed Together */}
        <div className="my-14 sm:my-16 flex items-center justify-center gap-6 sm:gap-14">
          
          {/* Mango Carton Presentation */}
          <div
            onClick={() => {
              onSelectFlavour('mango');
              scrollToSection('flavours');
            }}
            className="group cursor-pointer flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFAE00]/30 rounded-full blur-2xl group-hover:scale-130 transition-transform" />
              <img
                src="/assets/mango-carton.png"
                alt="Fruity Fun Mango Fruit Drink 200 ml"
                className="w-40 sm:w-52 md:w-60 h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] relative z-10 -rotate-3 group-hover:rotate-0 transition-transform duration-300"
              />
            </div>
            <span className="mt-5 text-xs sm:text-sm font-black uppercase tracking-wider text-amber-200 bg-amber-500/25 border border-amber-400/40 px-4 py-1.5 rounded-full group-hover:bg-[#FFAE00] group-hover:text-neutral-900 transition-colors shadow-md">
              Mango Magic
            </span>
          </div>

          {/* Apple Carton Presentation */}
          <div
            onClick={() => {
              onSelectFlavour('apple');
              scrollToSection('flavours');
            }}
            className="group cursor-pointer flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#E52424]/30 rounded-full blur-2xl group-hover:scale-130 transition-transform" />
              <img
                src="/assets/apple-carton.png"
                alt="Fruity Fun Apple Fruit Drink 200 ml"
                className="w-40 sm:w-52 md:w-60 h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] relative z-10 rotate-3 group-hover:rotate-0 transition-transform duration-300"
              />
            </div>
            <span className="mt-5 text-xs sm:text-sm font-black uppercase tracking-wider text-red-200 bg-red-500/25 border border-red-400/40 px-4 py-1.5 rounded-full group-hover:bg-[#E52424] group-hover:text-white transition-colors shadow-md">
              Apple Freshness
            </span>
          </div>

        </div>

        {/* Dual Simple Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => {
              onSelectFlavour('mango');
              scrollToSection('flavours');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#FFAE00] to-[#FF7B00] shadow-xl shadow-amber-900/40 hover:shadow-2xl hover:scale-[1.04] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/25"
          >
            <Sun className="w-4 h-4" />
            <span>Taste Mango Magic</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectFlavour('apple');
              scrollToSection('flavours');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#E52424] to-[#B71C1C] shadow-xl shadow-red-900/40 hover:shadow-2xl hover:scale-[1.04] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/25"
          >
            <Wind className="w-4 h-4" />
            <span>Taste Apple Freshness</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

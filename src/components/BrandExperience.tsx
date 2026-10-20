import React from 'react';
import { Sparkles, Sun, Smile, PackageCheck } from 'lucide-react';

export const BrandExperience: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 relative overflow-hidden bg-[#07160b]">
      {/* Background Soft Lighting Gradients & Tropical Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f10] via-[#07160b] to-[#0d1e11] pointer-events-none" />

      {/* Radiant Tropical Halos */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#FFAE00]/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#E52424]/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Decorative Leaf Accents */}
      <img
        src="/assets/green-leaf.png"
        alt="Green leaf"
        className="absolute top-12 left-12 w-16 h-16 object-contain opacity-60 animate-float-slow pointer-events-none hidden md:block"
      />
      <img
        src="/assets/green-leaf.png"
        alt="Green leaf"
        className="absolute bottom-16 right-16 w-18 h-18 object-contain opacity-60 animate-float-reverse pointer-events-none hidden md:block rotate-45"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-xs font-black uppercase tracking-widest text-[#FFD200] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD200]" />
            <span>The Fruity Fun Way</span>
          </div>
          <h2 className="font-['Fredoka'] text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Real Fruit Vibes. <br />
            <span className="bg-gradient-to-r from-[#FFD200] via-[#FFAE00] to-[#FF6B6B] bg-clip-text text-transparent">
              Fruity Fun Moments.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-emerald-100/85 font-medium leading-relaxed">
            Every carton of Fruity Fun is made to bring instant smiles. Crafted for on-the-go refreshment, sealed in 200 ml aseptic packs for delicious fruit moments anytime, anywhere.
          </p>
        </div>

        {/* 3 Brand Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Pillar 1 */}
          <div className="group relative rounded-3xl bg-white/10 backdrop-blur-xl p-8 border border-amber-300/30 shadow-xl hover:shadow-[0_15px_35px_rgba(255,174,0,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sun className="w-8 h-8 text-[#FFD200]" />
            </div>
            <div>
              <h3 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-white mb-2">
                Big Fruit Flavour
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                Bursting with rich, colorful fruit taste that awakens your senses from the very first sip.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
              <span>Mango Magic & Apple Freshness</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="group relative rounded-3xl bg-white/10 backdrop-blur-xl p-8 border border-red-300/30 shadow-xl hover:shadow-[0_15px_35px_rgba(229,36,36,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smile className="w-8 h-8 text-[#FF6B6B]" />
            </div>
            <div>
              <h3 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-white mb-2">
                Little Moments of Fun
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                Whether at lunch, on study breaks, or chilling with friends, Fruity Fun brings pure joy to everyday moments.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-red-300 flex items-center gap-1.5 uppercase tracking-wide">
              <span>Made for daily refreshment</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="group relative rounded-3xl bg-white/10 backdrop-blur-xl p-8 border border-emerald-300/30 shadow-xl hover:shadow-[0_15px_35px_rgba(46,155,52,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PackageCheck className="w-8 h-8 text-[#4ade80]" />
            </div>
            <div>
              <h3 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-white mb-2">
                Convenient 200 ml Pack
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                Sealed in aseptic packaging with an attached straw for hygienic, travel-friendly refreshment wherever you go.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wide">
              <span>Aseptic tetra packaging</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

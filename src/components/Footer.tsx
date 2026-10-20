import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030904] border-t border-white/10 pt-16 pb-12 relative overflow-hidden text-white">
      {/* Subtle Ambient Bottom Halo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Identity & Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-lg border border-white/50">
                <img
                  src="/assets/brand-logo-mango.png"
                  alt="Fruity Fun Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Fredoka'] text-2xl font-black tracking-tight text-white leading-none">
                  Fruity Fun
                </span>
                <span className="text-[10px] uppercase font-black tracking-widest text-[#4ade80] mt-1">
                  Fruit Drink
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              Big Fruit Flavour. Little Moments of Happiness. Sealed in convenient 200 ml aseptic packs for peak taste and pure tropical joy.
            </p>
          </div>

          {/* Official Contact Links (Only Official Info as Requested) */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#FFD200]">
              Official Contact & Social
            </span>

            {/* Official Email */}
            <a
              href="mailto:thefruityfun@gmail.com"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-amber-400 text-sm font-bold text-white transition-all shadow-md group"
            >
              <Mail className="w-4 h-4 text-[#FFD200] group-hover:scale-110 transition-transform" />
              <span>thefruityfun@gmail.com</span>
            </a>

            {/* Official Facebook Page */}
            <a
              href="https://www.facebook.com/profile.php?id=61595111115863"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#1877F2]/30 border border-white/20 hover:border-[#1877F2] text-sm font-bold text-white transition-all shadow-md group"
            >
              <svg
                className="w-4 h-4 fill-[#1877F2] group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Official Facebook Page</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
            </a>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>
            © {new Date().getFullYear()} Fruity Fun Fruit Drink. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-amber-300 font-semibold">Mango 200 ml</span>
            <span>•</span>
            <span className="text-red-400 font-semibold">Apple 200 ml</span>
            <span>•</span>
            <span className="text-[#4ade80] font-bold">Taste the Fun!</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

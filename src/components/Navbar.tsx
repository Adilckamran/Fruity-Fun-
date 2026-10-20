import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const triggerFunBurst = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1, x: 0.85 },
      colors: ['#FFAE00', '#E52424', '#2E9B34', '#FF5500']
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-black/65 backdrop-blur-xl shadow-2xl border-b border-white/15'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 text-left group transition-transform active:scale-95 focus:outline-none cursor-pointer"
        >
          <div className="relative w-11 h-11 rounded-2xl bg-white p-1 shadow-lg shadow-black/20 group-hover:scale-105 transition-transform border border-white/50">
            <img
              src="/assets/brand-logo-mango.png"
              alt="Fruity Fun Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-['Fredoka'] text-2xl font-black tracking-tight text-white group-hover:text-[#FFD200] transition-colors leading-none drop-shadow">
              Fruity Fun
            </span>
            <span className="text-[10px] uppercase font-black tracking-widest text-[#4ade80] mt-0.5 drop-shadow">
              Fruit Drink
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-white/90">
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="hover:text-[#FFD200] transition-colors cursor-pointer drop-shadow-sm"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('flavours')}
            className="hover:text-[#FFD200] transition-colors cursor-pointer drop-shadow-sm"
          >
            Our Flavours
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('showcase')}
            className="hover:text-[#FFD200] transition-colors cursor-pointer drop-shadow-sm"
          >
            3D Showcase
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('experience')}
            className="hover:text-[#FFD200] transition-colors cursor-pointer drop-shadow-sm"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="hover:text-[#FFD200] transition-colors cursor-pointer drop-shadow-sm"
          >
            Contact
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              triggerFunBurst();
              handleNavClick('flavours');
            }}
            className="relative px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#FFAE00] to-[#FF7B00] shadow-lg shadow-amber-900/40 hover:shadow-xl hover:shadow-amber-500/50 hover:scale-[1.04] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer border border-white/25"
          >
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Taste the Fun!</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-2xl bg-black/40 backdrop-blur-md text-white border border-white/20 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-2xl border-b border-white/15 shadow-2xl px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-base font-bold text-white">
            <button
              type="button"
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 hover:text-[#FFD200] transition-colors border-b border-white/10 flex items-center justify-between"
            >
              <span>Home</span>
              <span className="text-xs text-neutral-400">01</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('flavours')}
              className="text-left py-2 hover:text-[#FFD200] transition-colors border-b border-white/10 flex items-center justify-between"
            >
              <span>Our Flavours</span>
              <span className="text-xs text-[#FFD200] font-black">Mango & Apple</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('showcase')}
              className="text-left py-2 hover:text-[#FFD200] transition-colors border-b border-white/10 flex items-center justify-between"
            >
              <span>3D Showcase</span>
              <span className="text-xs text-neutral-400">Interactive</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('experience')}
              className="text-left py-2 hover:text-[#FFD200] transition-colors border-b border-white/10 flex items-center justify-between"
            >
              <span>About</span>
              <span className="text-xs text-neutral-400">03</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-[#FFD200] transition-colors flex items-center justify-between"
            >
              <span>Contact</span>
              <span className="text-xs text-neutral-400">04</span>
            </button>
          </nav>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                triggerFunBurst();
                handleNavClick('flavours');
              }}
              className="w-full py-3.5 rounded-full font-black text-center text-sm text-white bg-gradient-to-r from-[#FFAE00] to-[#FF7B00] shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Taste the Fun!</span>
            </button>
            <a
              href="mailto:thefruityfun@gmail.com"
              className="w-full py-2.5 rounded-full text-xs font-bold text-center text-neutral-300 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFD200]" />
              <span>thefruityfun@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

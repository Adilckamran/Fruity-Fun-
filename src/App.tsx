import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlavoursSection } from './components/FlavoursSection';
import { ProductShowcase } from './components/ProductShowcase';
import { BrandExperience } from './components/BrandExperience';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import type { FlavourId } from './types';

export function App() {
  const [activeFlavour, setActiveFlavour] = useState<FlavourId>('mango');
  const [heroFocus, setHeroFocus] = useState<'both' | 'mango' | 'apple'>('both');

  const handleSelectFlavour = (flavour: FlavourId) => {
    setActiveFlavour(flavour);
    setHeroFocus(flavour);
  };

  const handleSelectForShowcase = (flavour: FlavourId) => {
    setActiveFlavour(flavour);
    const el = document.getElementById('showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07160b] text-white selection:bg-[#FFAE00] selection:text-neutral-950 flex flex-col font-['Outfit',sans-serif]">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section (Cinematic Tropical 3D Product Scene) */}
        <HeroSection
          onSelectFlavour={handleSelectFlavour}
          activeFocus={heroFocus}
        />

        {/* 2. Our Flavours Section (Mango Magic & Apple Freshness in dedicated environments) */}
        <FlavoursSection
          onSelectFlavourForShowcase={handleSelectForShowcase}
        />

        {/* 3. Interactive Product Showcase (360° Drag Inspector & Flavour Switcher) */}
        <ProductShowcase
          activeFlavour={activeFlavour}
          onChangeFlavour={setActiveFlavour}
        />

        {/* 4. Brand Experience Section (Real Fruit Vibes. Fruity Fun Moments.) */}
        <BrandExperience />

        {/* 5. Final Call-to-Action Section (Which Flavour Is Your Favourite?) */}
        <CallToAction
          onSelectFlavour={handleSelectFlavour}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

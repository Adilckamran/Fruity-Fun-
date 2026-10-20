export type FlavourId = 'mango' | 'apple';

export interface FlavourInfo {
  id: FlavourId;
  name: string;
  tagline: string;
  headline: string;
  subtext: string;
  volume: string;
  accentColor: string;
  secondaryColor: string;
  glowColor: string;
  cartonImage: string;
  textureImage: string;
  topTexture: string;
  sideTexture: string;
  sensoryNotes: string[];
  tasteProfile: {
    sweetness: number;
    fruitiness: number;
    crispness: number;
    richness: number;
  };
  features: string[];
}

export const FLAVOURS: Record<FlavourId, FlavourInfo> = {
  mango: {
    id: 'mango',
    name: 'Mango Fruit Drink',
    tagline: 'Burst of Tropical Sunshine',
    headline: 'Mango Magic!',
    subtext: 'Bring a burst of mango-inspired fun to your day.',
    volume: '200 ml',
    accentColor: '#FFAE00',
    secondaryColor: '#FF7B00',
    glowColor: 'rgba(255, 174, 0, 0.35)',
    cartonImage: '/assets/mango-carton.png',
    textureImage: '/assets/mango-texture.png',
    topTexture: '/assets/mango-top.png',
    sideTexture: '/assets/mango-side.png',
    sensoryNotes: ['Sun-Ripened Mangoes', 'Velvety Smooth Finish', 'Sweet Golden Burst'],
    tasteProfile: {
      sweetness: 90,
      fruitiness: 95,
      crispness: 65,
      richness: 90,
    },
    features: [
      'Authentic 200 ml Aseptic Carton',
      'Rich, velvety mango fruit flavour',
      'Convenient travel-friendly pack',
      'Best enjoyed chilled'
    ]
  },
  apple: {
    id: 'apple',
    name: 'Apple Fruit Drink',
    tagline: 'Orchard Fresh Crispness',
    headline: 'Apple Freshness!',
    subtext: 'A fruity little moment of fun in every sip.',
    volume: '200 ml',
    accentColor: '#E52424',
    secondaryColor: '#B71C1C',
    glowColor: 'rgba(229, 36, 36, 0.35)',
    cartonImage: '/assets/apple-carton.png',
    textureImage: '/assets/apple-texture.png',
    topTexture: '/assets/apple-top.png',
    sideTexture: '/assets/apple-side.png',
    sensoryNotes: ['Crisp Red Apples', 'Zesty Orchard Refreshment', 'Clean Sweet Finish'],
    tasteProfile: {
      sweetness: 80,
      fruitiness: 92,
      crispness: 95,
      richness: 75,
    },
    features: [
      'Authentic 200 ml Aseptic Carton',
      'Crisp, refreshing red apple flavour',
      'Refreshing everyday fruity companion',
      'Best enjoyed chilled'
    ]
  }
};

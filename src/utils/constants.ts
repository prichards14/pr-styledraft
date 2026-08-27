import {
  FontPair,
  TypeScale,
  ThemeConfig,
  ThemeMode,
  Preset,
  DesignTokens,
  SpaceUnitValue,
} from '../types';

export const FONT_PAIRS: FontPair[] = [
  {
    id: 'plus-jakarta-inter',
    name: 'Plus Jakarta Sans + Inter',
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    headingFamily: "'Plus Jakarta Sans', sans-serif",
    bodyFamily: "'Inter', sans-serif",
    description: 'Modern, crisp, high-clarity SaaS standard.',
    tags: ['Tech', 'SaaS', 'Clean'],
  },
  {
    id: 'montserrat-open-sans',
    name: 'Montserrat + Open Sans',
    headingFont: 'Montserrat',
    bodyFont: 'Open Sans',
    headingFamily: "'Montserrat', sans-serif",
    bodyFamily: "'Open Sans', sans-serif",
    description: 'Geometric authority paired with neutral legibility.',
    tags: ['Agency', 'Studio', 'Modern'],
  },
  {
    id: 'playfair-lato',
    name: 'Playfair Display + Lato',
    headingFont: 'Playfair Display',
    bodyFont: 'Lato',
    headingFamily: "'Playfair Display', serif",
    bodyFamily: "'Lato', sans-serif",
    description: 'Editorial elegance balanced with humanistic body.',
    tags: ['Editorial', 'Luxury', 'Classic'],
  },
  {
    id: 'fraunces-outfit',
    name: 'Fraunces + Outfit',
    headingFont: 'Fraunces',
    bodyFont: 'Outfit',
    headingFamily: "'Fraunces', serif",
    bodyFamily: "'Outfit', sans-serif",
    description: 'Warm, tactile serif with rounded contemporary sans.',
    tags: ['Organic', 'Brand', 'Warm'],
  },
  {
    id: 'syne-space-grotesk',
    name: 'Syne + Space Grotesk',
    headingFont: 'Syne',
    bodyFont: 'Space Grotesk',
    headingFamily: "'Syne', sans-serif",
    bodyFamily: "'Space Grotesk', sans-serif",
    description: 'Bold expressive display with tech-forward mono feel.',
    tags: ['Avant-Garde', 'Creative', 'Bold'],
  },
];

export const TYPE_SCALES: TypeScale[] = [
  {
    id: 'compact',
    name: 'Compact',
    ratio: 1.125,
    description: '1.125 (Major Second) — Dense dashboards and data tools.',
  },
  {
    id: 'standard',
    name: 'Standard',
    ratio: 1.25,
    description: '1.250 (Major Third) — Balanced web marketing & product pages.',
  },
  {
    id: 'bold',
    name: 'Bold',
    ratio: 1.414,
    description: '1.414 (Augmented 4th) — High-contrast editorial & hero layouts.',
  },
];

export const THEME_CONFIGS: Record<ThemeMode, ThemeConfig> = {
  light: {
    id: 'light',
    name: 'Light',
    bgCanvas: '#f8fafc',
    bgSurface: '#ffffff',
    bgSurface2: '#f1f5f9',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    borderDefault: '#e2e8f0',
    cardBg: '#ffffff',
    inputBg: '#f8fafc',
    description: 'High contrast crisp white and cool slate.',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    bgCanvas: '#090d16',
    bgSurface: '#111827',
    bgSurface2: '#1f2937',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',
    borderDefault: '#1e293b',
    cardBg: '#111827',
    inputBg: '#0f172a',
    description: 'Deep navy midnight with luminous typography.',
  },
  soft: {
    id: 'soft',
    name: 'Soft',
    bgCanvas: '#fbf9f5',
    bgSurface: '#f5f0e8',
    bgSurface2: '#ece4d8',
    textPrimary: '#28231d',
    textSecondary: '#5c5449',
    textMuted: '#8c8273',
    borderDefault: '#e3dad0',
    cardBg: '#faf7f2',
    inputBg: '#f0ece3',
    description: 'Warm cream, organic paper and refined charcoal.',
  },
};

export const CURATED_PALETTES = [
  { name: 'Indigo Accent', hex: '#4f46e5' },
  { name: 'Ocean Cyan', hex: '#0284c7' },
  { name: 'Emerald Forest', hex: '#059669' },
  { name: 'Crimson Rose', hex: '#e11d48' },
  { name: 'Amber Ochre', hex: '#d97706' },
  { name: 'Violet Regal', hex: '#7c3aed' },
  { name: 'Slate Carbon', hex: '#334155' },
  { name: 'Terracotta', hex: '#ea580c' },
];

export const RADIUS_OPTIONS = [
  { value: '0px', label: '0px (Sharp)', desc: 'Brutalist & structured' },
  { value: '4px', label: '4px (Subtle)', desc: 'Micro rounded corners' },
  { value: '12px', label: '12px (Smooth)', desc: 'Modern ergonomic' },
  { value: '24px', label: '24px (Pill)', desc: 'Soft & friendly' },
] as const;

export const SHADOW_OPTIONS = [
  {
    value: 'none',
    label: 'None',
    desc: 'Flat & minimal',
    css: 'none',
  },
  {
    value: 'subtle',
    label: 'Subtle',
    desc: '0 1px 3px rgba(0,0,0,0.08)',
    css: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
  },
  {
    value: 'lifted',
    label: 'Lifted',
    desc: '0 4px 6px -1px rgba(0,0,0,0.1)',
    css: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.08)',
  },
  {
    value: 'floating',
    label: 'Floating',
    desc: '0 20px 25px -5px rgba(0,0,0,0.12)',
    css: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
  },
] as const;

export const BORDER_WIDTH_OPTIONS = [
  { value: '0px', label: '0px', desc: 'Frameless' },
  { value: '1px', label: '1px', desc: 'Hairline rule' },
  { value: '2px', label: '2px', desc: 'Distinct frame' },
] as const;

export const SPACE_UNIT_OPTIONS: SpaceUnitValue[] = [4, 6, 8, 10, 12];

export const PRESETS: Preset[] = [
  {
    id: 'modern-saas',
    name: 'Modern SaaS',
    tagline: 'Clean, reliable high-tech product standard',
    tokens: {
      fontPair: FONT_PAIRS[0], // Plus Jakarta + Inter
      typeScale: TYPE_SCALES[1], // Standard
      primaryColor: '#4f46e5',
      theme: 'light',
      radius: '12px',
      shadow: 'lifted',
      borderWidth: '1px',
      spaceUnit: 8,
    },
  },
  {
    id: 'editorial-luxury',
    name: 'Editorial Luxury',
    tagline: 'High-contrast typography with warm heritage paper',
    tokens: {
      fontPair: FONT_PAIRS[2], // Playfair + Lato
      typeScale: TYPE_SCALES[2], // Bold
      primaryColor: '#92400e',
      theme: 'soft',
      radius: '0px',
      shadow: 'none',
      borderWidth: '1px',
      spaceUnit: 10,
    },
  },
  {
    id: 'clean-studio',
    name: 'Clean Studio',
    tagline: 'Geometric Swiss minimalism with precise hairline borders',
    tokens: {
      fontPair: FONT_PAIRS[1], // Montserrat + Open Sans
      typeScale: TYPE_SCALES[1], // Standard
      primaryColor: '#0f172a',
      theme: 'light',
      radius: '4px',
      shadow: 'subtle',
      borderWidth: '1px',
      spaceUnit: 8,
    },
  },
  {
    id: 'cyber-dark',
    name: 'Cyber Dark',
    tagline: 'Deep midnight navy with high-luminance cyan glow',
    tokens: {
      fontPair: FONT_PAIRS[4], // Syne + Space Grotesk
      typeScale: TYPE_SCALES[2], // Bold
      primaryColor: '#06b6d4',
      theme: 'dark',
      radius: '4px',
      shadow: 'floating',
      borderWidth: '1px',
      spaceUnit: 8,
    },
  },
  {
    id: 'warm-organic',
    name: 'Warm Organic',
    tagline: 'Tactile editorial serif with terracotta tones and soft radius',
    tokens: {
      fontPair: FONT_PAIRS[3], // Fraunces + Outfit
      typeScale: TYPE_SCALES[1], // Standard
      primaryColor: '#c2410c',
      theme: 'soft',
      radius: '24px',
      shadow: 'subtle',
      borderWidth: '0px',
      spaceUnit: 8,
    },
  },
];

export const DEFAULT_TOKENS: DesignTokens = PRESETS[0].tokens;

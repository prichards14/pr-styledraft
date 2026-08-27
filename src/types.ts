export interface FontPair {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  headingFamily: string;
  bodyFamily: string;
  description: string;
  tags: string[];
}

export type TypeScaleId = 'compact' | 'standard' | 'bold';

export interface TypeScale {
  id: TypeScaleId;
  name: string;
  ratio: number;
  description: string;
}

export type ThemeMode = 'light' | 'dark' | 'soft';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  bgCanvas: string;
  bgSurface: string;
  bgSurface2: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderDefault: string;
  cardBg: string;
  inputBg: string;
  description: string;
}

export type RadiusValue = '0px' | '4px' | '12px' | '24px';
export type ShadowValue = 'none' | 'subtle' | 'lifted' | 'floating';
export type BorderWidthValue = '0px' | '1px' | '2px';
export type SpaceUnitValue = 4 | 6 | 8 | 10 | 12;

export interface DesignTokens {
  fontPair: FontPair;
  typeScale: TypeScale;
  primaryColor: string;
  theme: ThemeMode;
  radius: RadiusValue;
  shadow: ShadowValue;
  borderWidth: BorderWidthValue;
  spaceUnit: SpaceUnitValue;
}

export interface Preset {
  id: string;
  name: string;
  tagline: string;
  tokens: DesignTokens;
}

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface ContrastResult {
  ratio: number;
  ratioFormatted: string;
  passesAA: boolean;
  passesAALarge: boolean;
  passesAAA: boolean;
  score: 'Fail' | 'AA Large' | 'AA' | 'AAA';
  primaryVsThemeBg: number;
  textOnPrimary: string;
  textOnPrimaryRatio: number;
  textOnPrimaryPassesAA: boolean;
}

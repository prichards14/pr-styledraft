import { ContrastResult, ThemeConfig, DesignTokens } from '../types';
import { THEME_CONFIGS, SHADOW_OPTIONS } from './constants';

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const sanitized = hex.replace('#', '').trim();
  if (sanitized.length === 3) {
    const r = parseInt(sanitized[0] + sanitized[0], 16);
    const g = parseInt(sanitized[1] + sanitized[1], 16);
    const b = parseInt(sanitized[2] + sanitized[2], 16);
    return { r, g, b };
  }
  if (sanitized.length === 6) {
    const r = parseInt(sanitized.substring(0, 2), 16);
    const g = parseInt(sanitized.substring(2, 4), 16);
    const b = parseInt(sanitized.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function evaluateContrast(
  primaryColor: string,
  themeConfig: ThemeConfig
): ContrastResult {
  // Contrast of textPrimary vs bgCanvas (main readability)
  const textBgRatio = getContrastRatio(themeConfig.textPrimary, themeConfig.bgCanvas);
  
  // Contrast of primary accent color vs theme background
  const primaryBgRatio = getContrastRatio(primaryColor, themeConfig.bgCanvas);
  
  // Text color on Primary button (white vs dark)
  const whiteOnPrimaryRatio = getContrastRatio('#ffffff', primaryColor);
  const darkOnPrimaryRatio = getContrastRatio('#090d16', primaryColor);
  const textOnPrimary = whiteOnPrimaryRatio >= darkOnPrimaryRatio ? '#ffffff' : '#090d16';
  const textOnPrimaryRatio = Math.max(whiteOnPrimaryRatio, darkOnPrimaryRatio);

  const passesAA = textBgRatio >= 4.5;
  const passesAALarge = textBgRatio >= 3.0;
  const passesAAA = textBgRatio >= 7.0;

  let score: 'Fail' | 'AA Large' | 'AA' | 'AAA' = 'Fail';
  if (passesAAA) score = 'AAA';
  else if (passesAA) score = 'AA';
  else if (passesAALarge) score = 'AA Large';

  return {
    ratio: Number(textBgRatio.toFixed(2)),
    ratioFormatted: `${textBgRatio.toFixed(2)}:1`,
    passesAA,
    passesAALarge,
    passesAAA,
    score,
    primaryVsThemeBg: Number(primaryBgRatio.toFixed(2)),
    textOnPrimary,
    textOnPrimaryRatio: Number(textOnPrimaryRatio.toFixed(2)),
    textOnPrimaryPassesAA: textOnPrimaryRatio >= 4.5,
  };
}

export function getHoverTint(hex: string, opacity: number = 0.1): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(79, 70, 229, ${opacity})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

export function getActiveShade(hex: string, percent: number = -15): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const adjust = (val: number) => {
    const res = Math.round(val + (val * percent) / 100);
    return Math.max(0, Math.min(255, res));
  };
  const r = adjust(rgb.r).toString(16).padStart(2, '0');
  const g = adjust(rgb.g).toString(16).padStart(2, '0');
  const b = adjust(rgb.b).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

export function calculateTypeScales(ratio: number) {
  const base = 16; // 1rem
  return {
    base: `${base}px`,
    h6: `${Math.round(base * Math.pow(ratio, 0.5) * 10) / 10}px`,
    h5: `${Math.round(base * Math.pow(ratio, 1) * 10) / 10}px`,
    h4: `${Math.round(base * Math.pow(ratio, 2) * 10) / 10}px`,
    h3: `${Math.round(base * Math.pow(ratio, 3) * 10) / 10}px`,
    h2: `${Math.round(base * Math.pow(ratio, 4) * 10) / 10}px`,
    h1: `${Math.round(base * Math.pow(ratio, 5) * 10) / 10}px`,
  };
}

export function getCssVariablesFromTokens(tokens: DesignTokens): Record<string, string> {
  const theme = THEME_CONFIGS[tokens.theme];
  const contrast = evaluateContrast(tokens.primaryColor, theme);
  const typeScales = calculateTypeScales(tokens.typeScale.ratio);
  const shadowObj = SHADOW_OPTIONS.find((s) => s.value === tokens.shadow) || SHADOW_OPTIONS[2];

  return {
    '--font-heading': tokens.fontPair.headingFamily,
    '--font-body': tokens.fontPair.bodyFamily,
    '--font-size-base': typeScales.base,
    '--font-size-h6': typeScales.h6,
    '--font-size-h5': typeScales.h5,
    '--font-size-h4': typeScales.h4,
    '--font-size-h3': typeScales.h3,
    '--font-size-h2': typeScales.h2,
    '--font-size-h1': typeScales.h1,
    '--color-primary': tokens.primaryColor,
    '--color-primary-hover': getHoverTint(tokens.primaryColor, 0.12),
    '--color-primary-active': getActiveShade(tokens.primaryColor, -12),
    '--color-primary-text': contrast.textOnPrimary,
    '--color-canvas': theme.bgCanvas,
    '--color-surface': theme.bgSurface,
    '--color-surface-2': theme.bgSurface2,
    '--color-card': theme.cardBg,
    '--color-input': theme.inputBg,
    '--color-text-primary': theme.textPrimary,
    '--color-text-secondary': theme.textSecondary,
    '--color-text-muted': theme.textMuted,
    '--color-border': theme.borderDefault,
    '--border-radius': tokens.radius,
    '--box-shadow': shadowObj.css,
    '--border-width': tokens.borderWidth,
    '--space-unit': `${tokens.spaceUnit}px`,
    '--space-xs': `${tokens.spaceUnit * 1}px`,
    '--space-sm': `${tokens.spaceUnit * 2}px`,
    '--space-md': `${tokens.spaceUnit * 3}px`,
    '--space-lg': `${tokens.spaceUnit * 5}px`,
    '--space-xl': `${tokens.spaceUnit * 8}px`,
    '--space-2xl': `${tokens.spaceUnit * 12}px`,
  };
}

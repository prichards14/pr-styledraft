import { useState } from 'react';
import {
  FontPair,
  TypeScaleId,
  ThemeMode,
  RadiusValue,
  ShadowValue,
  BorderWidthValue,
  SpaceUnitValue,
  DesignTokens,
} from '../types';
import {
  FONT_PAIRS,
  TYPE_SCALES,
  THEME_CONFIGS,
  CURATED_PALETTES,
  RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  SPACE_UNIT_OPTIONS,
  PRESETS,
  DEFAULT_TOKENS,
} from '../utils/constants';
import { evaluateContrast, getHoverTint } from '../utils/contrast';
import {
  Type,
  Palette,
  Layers,
  Maximize2,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Code2,
  SlidersHorizontal,
  ChevronDown,
  Sun,
  Moon,
  Coffee,
} from 'lucide-react';

interface SidebarProps {
  tokens: DesignTokens;
  onChange: (updater: (prev: DesignTokens) => DesignTokens) => void;
  onOpenExport: () => void;
}

export function Sidebar({ tokens, onChange, onOpenExport }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<'all' | 'presets' | 'typography' | 'color' | 'geometry' | 'spacing'>('all');
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);

  const activeTheme = THEME_CONFIGS[tokens.theme];
  const contrast = evaluateContrast(tokens.primaryColor, activeTheme);

  const handleFontSelect = (font: FontPair) => {
    onChange((prev) => ({ ...prev, fontPair: font }));
    setFontDropdownOpen(false);
  };

  const handleTypeScaleSelect = (scaleId: TypeScaleId) => {
    const scale = TYPE_SCALES.find((s) => s.id === scaleId) || TYPE_SCALES[1];
    onChange((prev) => ({ ...prev, typeScale: scale }));
  };

  const handleThemeSelect = (theme: ThemeMode) => {
    onChange((prev) => ({ ...prev, theme }));
  };

  const handlePrimaryColorChange = (hex: string) => {
    onChange((prev) => ({ ...prev, primaryColor: hex }));
  };

  const handleRadiusSelect = (radius: RadiusValue) => {
    onChange((prev) => ({ ...prev, radius }));
  };

  const handleShadowSelect = (shadow: ShadowValue) => {
    onChange((prev) => ({ ...prev, shadow }));
  };

  const handleBorderWidthSelect = (borderWidth: BorderWidthValue) => {
    onChange((prev) => ({ ...prev, borderWidth }));
  };

  const handleSpaceUnitSelect = (spaceUnit: SpaceUnitValue) => {
    onChange((prev) => ({ ...prev, spaceUnit }));
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (preset) {
      onChange(() => ({ ...preset.tokens }));
    }
  };

  const resetToDefault = () => {
    onChange(() => ({ ...DEFAULT_TOKENS }));
  };

  return (
    <aside
      id="styledraft-sidebar"
      className="w-80 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-screen overflow-hidden select-none text-slate-200 z-30 shadow-2xl"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
            <span className="text-sm tracking-tighter">SD</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              StyleDraft
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-medium border border-indigo-800/50">
                v2.4
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Guardrailed Design System</p>
          </div>
        </div>

        <button
          id="btn-reset-tokens"
          onClick={resetToDefault}
          title="Reset to default"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Presets Bar */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Curated Presets
          </span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {PRESETS.map((p) => {
            const isSelected =
              tokens.fontPair.id === p.tokens.fontPair.id &&
              tokens.theme === p.tokens.theme &&
              tokens.primaryColor === p.tokens.primaryColor;
            return (
              <button
                key={p.id}
                id={`preset-btn-${p.id}`}
                onClick={() => applyPreset(p.id)}
                className={`px-2.5 py-1 text-[11px] rounded-md whitespace-nowrap font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40 border border-indigo-500'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Panels Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 text-xs scrollbar-thin">
        {/* 1. TYPOGRAPHY */}
        <section className="space-y-3" id="sidebar-typography">
          <div className="flex items-center justify-between text-slate-300 font-semibold border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5 text-slate-100">
              <Type className="w-4 h-4 text-indigo-400" />
              1. Typography
            </span>
            <span className="text-[10px] text-indigo-400 font-mono">5 Curated Pairs</span>
          </div>

          {/* Font Pair Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-400 font-medium">Curated Font Pair</label>
            <div className="relative">
              <button
                id="btn-font-dropdown-toggle"
                onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
                className="w-full text-left bg-slate-800/90 border border-slate-700 hover:border-slate-600 rounded-lg p-2.5 flex items-center justify-between transition-colors shadow-sm"
              >
                <div>
                  <div className="font-semibold text-slate-100 text-xs">{tokens.fontPair.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {tokens.fontPair.headingFont} (Headings) + {tokens.fontPair.bodyFont} (Body)
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${fontDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {fontDropdownOpen && (
                <div
                  id="font-pairs-menu"
                  className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden divide-y divide-slate-800 max-h-72 overflow-y-auto"
                >
                  {FONT_PAIRS.map((pair) => (
                    <button
                      key={pair.id}
                      id={`font-pair-option-${pair.id}`}
                      onClick={() => handleFontSelect(pair)}
                      className={`w-full text-left p-2.5 transition-colors flex items-start justify-between ${
                        tokens.fontPair.id === pair.id
                          ? 'bg-indigo-950/60 text-indigo-200 border-l-2 border-indigo-500'
                          : 'hover:bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-xs text-white">{pair.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{pair.description}</div>
                        <div className="flex gap-1 mt-1.5">
                          {pair.tags.map((t) => (
                            <span key={t} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      {tokens.fontPair.id === pair.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Type Scale Selector */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] text-slate-400 font-medium">Modular Type Scale</label>
              <span className="text-[10px] font-mono text-indigo-400">Ratio: {tokens.typeScale.ratio}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {TYPE_SCALES.map((scale) => {
                const isSelected = tokens.typeScale.id === scale.id;
                return (
                  <button
                    key={scale.id}
                    id={`type-scale-btn-${scale.id}`}
                    onClick={() => handleTypeScaleSelect(scale.id)}
                    className={`py-2 px-1.5 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-xs">{scale.name}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{scale.ratio}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. COLOR PALETTE */}
        <section className="space-y-3" id="sidebar-color">
          <div className="flex items-center justify-between text-slate-300 font-semibold border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5 text-slate-100">
              <Palette className="w-4 h-4 text-emerald-400" />
              2. Color Palette & Theme
            </span>
          </div>

          {/* Theme Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-400 font-medium">Surface Theme</label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                id="theme-btn-light"
                onClick={() => handleThemeSelect('light')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border text-xs font-medium transition-all ${
                  tokens.theme === 'light'
                    ? 'bg-slate-100 text-slate-900 border-white shadow-md font-semibold'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                Light
              </button>

              <button
                id="theme-btn-dark"
                onClick={() => handleThemeSelect('dark')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border text-xs font-medium transition-all ${
                  tokens.theme === 'dark'
                    ? 'bg-slate-950 text-white border-indigo-500 shadow-md font-semibold ring-1 ring-indigo-500'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                Dark
              </button>

              <button
                id="theme-btn-soft"
                onClick={() => handleThemeSelect('soft')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border text-xs font-medium transition-all ${
                  tokens.theme === 'soft'
                    ? 'bg-[#f4efe6] text-[#2b251d] border-[#d6cbbe] shadow-md font-semibold'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Coffee className="w-3.5 h-3.5 text-amber-700" />
                Soft
              </button>
            </div>
          </div>

          {/* Primary Accent Picker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] text-slate-400 font-medium">Primary Accent Color</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  id="primary-color-native-picker"
                  value={tokens.primaryColor}
                  onChange={(e) => handlePrimaryColorChange(e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  id="primary-color-hex-input"
                  value={tokens.primaryColor.toUpperCase()}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                      handlePrimaryColorChange(e.target.value);
                    }
                  }}
                  className="w-16 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-[11px] font-mono text-white text-center focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Curated Swatches */}
            <div className="grid grid-cols-4 gap-1.5">
              {CURATED_PALETTES.map((color) => (
                <button
                  key={color.hex}
                  id={`color-swatch-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handlePrimaryColorChange(color.hex)}
                  title={color.name}
                  className={`h-7 rounded-md border flex items-center justify-center transition-transform hover:scale-105 relative ${
                    tokens.primaryColor.toLowerCase() === color.hex.toLowerCase()
                      ? 'border-white ring-2 ring-indigo-400/60'
                      : 'border-slate-700/60'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {tokens.primaryColor.toLowerCase() === color.hex.toLowerCase() && (
                    <CheckCircle2 className="w-3 h-3 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Guardrail: Real-Time WCAG Contrast Checker */}
          <div
            id="guardrail-contrast-card"
            className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                {contrast.passesAA ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                )}
                WCAG Contrast Guardrail
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  contrast.passesAAA
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : contrast.passesAA
                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}
              >
                {contrast.score}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800/80">
                <div className="text-[10px] text-slate-400">Body Text vs Bg</div>
                <div className="font-mono font-bold text-slate-200 mt-0.5">{contrast.ratioFormatted}</div>
              </div>
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800/80">
                <div className="text-[10px] text-slate-400">Btn Text on Primary</div>
                <div className="font-mono font-bold text-slate-200 mt-0.5">{contrast.textOnPrimaryRatio}:1</div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
              <span>Auto-generated hover tint:</span>
              <span
                className="w-4 h-4 rounded border border-slate-700 inline-block"
                style={{ backgroundColor: getHoverTint(tokens.primaryColor, 0.2) }}
              />
            </div>
          </div>
        </section>

        {/* 3. GEOMETRY & ELEVATION */}
        <section className="space-y-3" id="sidebar-geometry">
          <div className="flex items-center justify-between text-slate-300 font-semibold border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5 text-slate-100">
              <Layers className="w-4 h-4 text-cyan-400" />
              3. Geometry & Elevation
            </span>
          </div>

          {/* Radius Selector (Discrete steps: 0px, 4px, 12px, 24px) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] text-slate-400 font-medium">Border Radius</label>
              <span className="text-[10px] font-mono text-cyan-400">{tokens.radius}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {RADIUS_OPTIONS.map((opt) => {
                const isSelected = tokens.radius === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`radius-btn-${opt.value}`}
                    onClick={() => handleRadiusSelect(opt.value)}
                    className={`p-1.5 rounded-lg border text-center flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-cyan-600/20 border-cyan-500 text-white font-semibold shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <div
                      className="w-4 h-4 border border-cyan-400 bg-cyan-400/20"
                      style={{ borderRadius: opt.value }}
                    />
                    <span className="text-[10px]">{opt.value}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shadow Selector (4 levels: None, Subtle, Lifted, Floating) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] text-slate-400 font-medium">Elevation & Shadow</label>
              <span className="text-[10px] font-mono text-cyan-400 capitalize">{tokens.shadow}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {SHADOW_OPTIONS.map((opt) => {
                const isSelected = tokens.shadow === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`shadow-btn-${opt.value}`}
                    onClick={() => handleShadowSelect(opt.value)}
                    className={`py-2 px-1 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'bg-cyan-600/20 border-cyan-500 text-white font-semibold shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px]">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Border Width (Choice of 0px, 1px, 2px) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] text-slate-400 font-medium">Border Width</label>
              <span className="text-[10px] font-mono text-cyan-400">{tokens.borderWidth}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {BORDER_WIDTH_OPTIONS.map((opt) => {
                const isSelected = tokens.borderWidth === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`border-width-btn-${opt.value}`}
                    onClick={() => handleBorderWidthSelect(opt.value)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'bg-cyan-600/20 border-cyan-500 text-white font-semibold'
                        : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-[11px]">{opt.label}</div>
                    <div className="text-[9px] text-slate-400">{opt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. SPACING & RHYTHM */}
        <section className="space-y-3" id="sidebar-spacing">
          <div className="flex items-center justify-between text-slate-300 font-semibold border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5 text-slate-100">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              4. Spacing & Rhythm
            </span>
            <span className="text-[10px] font-mono text-amber-400">Base: {tokens.spaceUnit}px</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Density Slider (--space-unit)</span>
              <span className="font-mono text-white">{tokens.spaceUnit}px unit</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {SPACE_UNIT_OPTIONS.map((val) => {
                const isSelected = tokens.spaceUnit === val;
                return (
                  <button
                    key={val}
                    id={`space-unit-btn-${val}`}
                    onClick={() => handleSpaceUnitSelect(val)}
                    className={`py-1.5 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-600/20 border-amber-500 text-white font-bold'
                        : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-[11px] font-mono">{val}px</span>
                  </button>
                );
              })}
            </div>

            {/* Visual Rhythm Scale bars */}
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>Rhythm steps:</span>
                <span className="font-mono text-[9px] text-slate-400">
                  {tokens.spaceUnit} / {tokens.spaceUnit * 2} / {tokens.spaceUnit * 3} / {tokens.spaceUnit * 5}px
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-6 pt-1">
                <div
                  className="bg-amber-400/80 rounded-sm"
                  style={{ width: `${tokens.spaceUnit * 2}px`, height: '6px' }}
                />
                <div
                  className="bg-amber-400/80 rounded-sm"
                  style={{ width: `${tokens.spaceUnit * 3}px`, height: '10px' }}
                />
                <div
                  className="bg-amber-400/80 rounded-sm"
                  style={{ width: `${tokens.spaceUnit * 4}px`, height: '16px' }}
                />
                <div
                  className="bg-amber-400/80 rounded-sm"
                  style={{ width: `${tokens.spaceUnit * 6}px`, height: '22px' }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer / Export Trigger Button */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/95 space-y-2">
        <button
          id="btn-generate-spec-sidebar"
          onClick={onOpenExport}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Code2 className="w-4 h-4" />
          Generate Spec & Handoff
        </button>
      </div>
    </aside>
  );
}

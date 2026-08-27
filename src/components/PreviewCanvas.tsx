import React, { useState } from 'react';
import { DesignTokens, DeviceMode } from '../types';
import { getCssVariablesFromTokens } from '../utils/contrast';
import {
  Monitor,
  Tablet,
  Smartphone,
  Check,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  Compass,
  Cpu,
  Zap,
  ExternalLink,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Disc as Discord,
  CheckCircle,
  HelpCircle,
  Eye,
  Menu,
} from 'lucide-react';

interface PreviewCanvasProps {
  tokens: DesignTokens;
  onOpenExport: () => void;
}

export function PreviewCanvas({ tokens, onOpenExport }: PreviewCanvasProps) {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showCssInspector, setShowCssInspector] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compute CSS custom properties dict
  const cssVariables = getCssVariablesFromTokens(tokens);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput('');
    }
  };

  const getCanvasWidthClass = () => {
    switch (device) {
      case 'mobile':
        return 'w-[375px] max-w-[375px] my-6 rounded-2xl shadow-2xl border-4 border-slate-800';
      case 'tablet':
        return 'w-[768px] max-w-[768px] my-6 rounded-xl shadow-2xl border-2 border-slate-800';
      case 'desktop':
      default:
        return 'w-full max-w-full';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Canvas Top Control Bar */}
      <header className="h-14 px-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between flex-shrink-0 z-20">
        {/* Left: Device viewport toggles */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            id="device-btn-desktop"
            onClick={() => setDevice('desktop')}
            title="Desktop View (Fluid 100%)"
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition-all ${
              device === 'desktop'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            id="device-btn-tablet"
            onClick={() => setDevice('tablet')}
            title="Tablet View (768px)"
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition-all ${
              device === 'tablet'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            id="device-btn-mobile"
            onClick={() => setDevice('mobile')}
            title="Mobile View (375px)"
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition-all ${
              device === 'mobile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Center: Token Badges summary */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            {tokens.fontPair.name}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            Scale: {tokens.typeScale.ratio}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tokens.primaryColor }} />
            {tokens.primaryColor}
          </span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-inspector"
            onClick={() => setShowCssInspector(!showCssInspector)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors ${
              showCssInspector
                ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{showCssInspector ? 'Hide Tokens' : 'Inspect Tokens'}</span>
          </button>

          <button
            id="btn-export-topbar"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Export Spec</span>
          </button>
        </div>
      </header>

      {/* Floating CSS Tokens Inspector Drawer */}
      {showCssInspector && (
        <div
          id="css-inspector-drawer"
          className="bg-slate-900 border-b border-slate-800 p-3 max-h-48 overflow-y-auto z-20 text-xs font-mono scrollbar-thin shadow-xl flex-shrink-0"
        >
          <div className="flex items-center justify-between mb-2 text-slate-400">
            <span className="text-[11px] font-semibold text-indigo-400 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" />
              Live CSS Custom Properties in :root
            </span>
            <span className="text-[10px] text-slate-500">Updated in real-time</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-[11px]">
            {Object.entries(cssVariables).map(([prop, val]) => (
              <div key={prop} className="p-1.5 bg-slate-950 rounded border border-slate-800/80 truncate">
                <span className="text-slate-400">{prop}: </span>
                <span className="text-emerald-400 font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scrollable Canvas Viewport */}
      <div className="flex-1 overflow-y-auto flex justify-center items-start bg-slate-950 p-0 sm:p-4 overflow-x-hidden">
        {/* Homepage Preview Container with CSS Variables applied directly */}
        <div
          id="styledraft-preview-root"
          className={`transition-all duration-300 overflow-hidden bg-white text-slate-900 ${getCanvasWidthClass()}`}
          style={{
            ...cssVariables,
            fontFamily: 'var(--font-body)',
            backgroundColor: 'var(--color-canvas)',
            color: 'var(--color-text-primary)',
          } as React.CSSProperties}
        >
          {/* =================================================================
              1. NAVIGATION
             ================================================================= */}
          <header
            id="preview-navigation"
            className="sticky top-0 z-30 transition-colors"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderBottom: 'var(--border-width) solid var(--color-border)',
              boxShadow: 'var(--box-shadow)',
            }}
          >
            <div
              className="max-w-6xl mx-auto flex items-center justify-between transition-all"
              style={{
                paddingLeft: 'var(--space-md)',
                paddingRight: 'var(--space-md)',
                paddingTop: 'var(--space-sm)',
                paddingBottom: 'var(--space-sm)',
              }}
            >
              {/* Logo */}
              <a href="#hero" className="flex items-center gap-2 text-decoration-none group">
                <div
                  className="w-8 h-8 flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-text)',
                    borderRadius: 'var(--border-radius)',
                  }}
                >
                  ▲
                </div>
                <span
                  className="font-bold text-lg tracking-tight"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  StyleDraft
                </span>
              </a>

              {/* Centered Navigation Links */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <a
                  href="#hero"
                  className="transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Overview
                </a>
                <a
                  href="#features"
                  className="transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Features
                </a>
                <a
                  href="#typography"
                  className="transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Typography
                </a>
                <a
                  href="#interactive"
                  className="transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Components
                </a>
                <a
                  href="#faq"
                  className="transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  FAQ
                </a>
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="hidden sm:inline-flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer"
                  style={{
                    padding: 'var(--space-xs) var(--space-sm)',
                    color: 'var(--color-text-secondary)',
                    borderRadius: 'var(--border-radius)',
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  id="nav-primary-cta"
                  className="inline-flex items-center justify-center font-semibold text-sm transition-transform active:scale-95 cursor-pointer shadow-sm"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-text)',
                    padding: 'var(--space-sm) var(--space-md)',
                    borderRadius: 'var(--border-radius)',
                    border: 'var(--border-width) solid var(--color-primary)',
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </header>

          {/* =================================================================
              2. HERO SECTION
             ================================================================= */}
          <section
            id="hero"
            className="transition-all"
            style={{
              paddingTop: 'var(--space-2xl)',
              paddingBottom: 'var(--space-2xl)',
              paddingLeft: 'var(--space-md)',
              paddingRight: 'var(--space-md)',
              borderBottom: 'var(--border-width) solid var(--color-border)',
            }}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Hero Content */}
              <div className="lg:col-span-7 space-y-6">
                {/* Pill Badge */}
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1"
                  style={{
                    backgroundColor: 'var(--color-primary-hover)',
                    color: 'var(--color-primary)',
                    borderRadius: '9999px',
                    border: 'var(--border-width) solid var(--color-border)',
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>v2.4 Design Engine Live</span>
                </div>

                {/* H1 Headline */}
                <h1
                  className="font-bold tracking-tight leading-tight"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h1)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Design with precision. Deliver with confidence.
                </h1>

                {/* Sub-headline */}
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{
                    color: 'var(--color-text-secondary)',
                    maxWidth: '42rem',
                  }}
                >
                  StyleDraft bridges the gap between design and code by enforcing mathematical type scales,
                  strict 8px spatial rhythm, and automated WCAG AA contrast compliance in real time.
                </p>

                {/* Primary & Secondary Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    id="hero-cta-primary"
                    className="inline-flex items-center gap-2 font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-text)',
                      padding: 'var(--space-sm) var(--space-lg)',
                      borderRadius: 'var(--border-radius)',
                      border: 'var(--border-width) solid var(--color-primary)',
                    }}
                  >
                    Start Designing Free
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    id="hero-cta-secondary"
                    className="inline-flex items-center gap-2 font-semibold text-base transition-colors cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text-primary)',
                      padding: 'var(--space-sm) var(--space-lg)',
                      borderRadius: 'var(--border-radius)',
                      border: 'var(--border-width) solid var(--color-border)',
                      boxShadow: 'var(--box-shadow)',
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    Live Specimen
                  </button>
                </div>

                {/* Trust Points */}
                <div
                  className="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>WCAG AA Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Zero CSS Bloat</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Tailwind & SCSS Ready</span>
                  </div>
                </div>
              </div>

              {/* Hero Media / Preview Visual */}
              <div className="lg:col-span-5 relative">
                <div
                  className="relative overflow-hidden transition-all"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--border-radius)',
                    border: 'var(--border-width) solid var(--color-border)',
                    boxShadow: 'var(--box-shadow)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80"
                    alt="Creative Design Workspace"
                    className="w-full h-72 object-cover"
                  />
                  {/* Floating Metric Card */}
                  <div
                    className="p-4 transition-all"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      borderTop: 'var(--border-width) solid var(--color-border)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          Design System Harmony
                        </div>
                        <div
                          className="text-xl font-bold mt-0.5"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          99.98% Guardrailed
                        </div>
                      </div>
                      <div
                        className="px-3 py-1 text-xs font-bold rounded-full"
                        style={{
                          backgroundColor: 'var(--color-primary-hover)',
                          color: 'var(--color-primary)',
                        }}
                      >
                        Active
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              3. FEATURE GRID
             ================================================================= */}
          <section
            id="features"
            className="transition-all"
            style={{
              paddingTop: 'var(--space-2xl)',
              paddingBottom: 'var(--space-2xl)',
              paddingLeft: 'var(--space-md)',
              paddingRight: 'var(--space-md)',
              backgroundColor: 'var(--color-surface-2)',
              borderBottom: 'var(--border-width) solid var(--color-border)',
            }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Core Architectural Pillars
                </div>
                <h2
                  className="font-bold tracking-tight mb-3"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h2)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Built on strict mathematical rules
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Say goodbye to random pixel guesses. StyleDraft enforces strict design guardrails so every
                  mockup is immediately production-ready.
                </p>
              </div>

              {/* 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div
                  className="p-6 transition-all hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    borderRadius: 'var(--border-radius)',
                    border: 'var(--border-width) solid var(--color-border)',
                    boxShadow: 'var(--box-shadow)',
                  }}
                >
                  <div
                    className="w-12 h-12 mb-5 flex items-center justify-center font-bold text-lg shadow-sm"
                    style={{
                      backgroundColor: 'var(--color-primary-hover)',
                      color: 'var(--color-primary)',
                      borderRadius: 'var(--border-radius)',
                    }}
                  >
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3
                    className="font-bold mb-2.5"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Mathematical Scales
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    Modular type ratios (1.125, 1.25, 1.414) guarantee typographic harmony and visual rhythm
                    across every headline tier from H1 to H6.
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  className="p-6 transition-all hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    borderRadius: 'var(--border-radius)',
                    border: 'var(--border-width) solid var(--color-border)',
                    boxShadow: 'var(--box-shadow)',
                  }}
                >
                  <div
                    className="w-12 h-12 mb-5 flex items-center justify-center font-bold text-lg shadow-sm"
                    style={{
                      backgroundColor: 'var(--color-primary-hover)',
                      color: 'var(--color-primary)',
                      borderRadius: 'var(--border-radius)',
                    }}
                  >
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3
                    className="font-bold mb-2.5"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    WCAG AA Guardrails
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    Automated color contrast algorithms verify every surface and button interaction against
                    strict 4.5:1 accessibility compliance standards.
                  </p>
                </div>

                {/* Card 3 */}
                <div
                  className="p-6 transition-all hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    borderRadius: 'var(--border-radius)',
                    border: 'var(--border-width) solid var(--color-border)',
                    boxShadow: 'var(--box-shadow)',
                  }}
                >
                  <div
                    className="w-12 h-12 mb-5 flex items-center justify-center font-bold text-lg shadow-sm"
                    style={{
                      backgroundColor: 'var(--color-primary-hover)',
                      color: 'var(--color-primary)',
                      borderRadius: 'var(--border-radius)',
                    }}
                  >
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3
                    className="font-bold mb-2.5"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Instant Code Export
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    Generate clean :root CSS variables, semantic HTML5 snippets, JSON design tokens, and
                    Tailwind configuration files in one click.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              4. TYPOGRAPHY SHOWCASE
             ================================================================= */}
          <section
            id="typography"
            className="transition-all"
            style={{
              paddingTop: 'var(--space-2xl)',
              paddingBottom: 'var(--space-2xl)',
              paddingLeft: 'var(--space-md)',
              paddingRight: 'var(--space-md)',
              borderBottom: 'var(--border-width) solid var(--color-border)',
            }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 text-center">
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Type Specimen & Hierarchy
                </div>
                <h2
                  className="font-bold tracking-tight mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h2)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Complete Typographic Hierarchy
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Pairing {tokens.fontPair.headingFont} with {tokens.fontPair.bodyFont} on a{' '}
                  {tokens.typeScale.name} scale ({tokens.typeScale.ratio}).
                </p>
              </div>

              {/* Hierarchy Specimen Card */}
              <div
                className="p-8 space-y-6 transition-all"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--border-radius)',
                  border: 'var(--border-width) solid var(--color-border)',
                  boxShadow: 'var(--box-shadow)',
                }}
              >
                {/* H1 */}
                <div className="pb-4 border-b border-slate-200/40 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono">H1 — Hero Headline</span>
                    <span className="font-mono">{cssVariables['--font-size-h1']}</span>
                  </div>
                  <h1
                    className="font-bold m-0"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h1)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    The Quick Brown Fox Jumps Over the Lazy Dog
                  </h1>
                </div>

                {/* H2 */}
                <div className="pb-4 border-b border-slate-200/40 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono">H2 — Section Header</span>
                    <span className="font-mono">{cssVariables['--font-size-h2']}</span>
                  </div>
                  <h2
                    className="font-bold m-0"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h2)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Modular Scaling Guarantees Visual Balance
                  </h2>
                </div>

                {/* H3 */}
                <div className="pb-4 border-b border-slate-200/40 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono">H3 — Subsection Header</span>
                    <span className="font-mono">{cssVariables['--font-size-h3']}</span>
                  </div>
                  <h3
                    className="font-bold m-0"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h3)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Component Cards & Content Modules
                  </h3>
                </div>

                {/* H4 */}
                <div className="pb-4 border-b border-slate-200/40 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono">H4 — Feature Title</span>
                    <span className="font-mono">{cssVariables['--font-size-h4']}</span>
                  </div>
                  <h4
                    className="font-bold m-0"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h4)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Discrete Step Intervals Over Arbitrary Sliders
                  </h4>
                </div>

                {/* H5 */}
                <div className="pb-4 border-b border-slate-200/40 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono">H5 — Small Header</span>
                    <span className="font-mono">{cssVariables['--font-size-h5']}</span>
                  </div>
                  <h5
                    className="font-bold m-0"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h5)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Metadata Label & Grouping Indicator
                  </h5>
                </div>

                {/* H6 */}
                <div className="pb-4 border-b border-slate-200/40 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono">H6 — Overline Tag</span>
                    <span className="font-mono">{cssVariables['--font-size-h6']}</span>
                  </div>
                  <h6
                    className="font-bold m-0 uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-h6)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    DESIGN SYSTEM TOKEN SPECIFICATION
                  </h6>
                </div>

                {/* Body text & paragraph */}
                <div>
                  <div className="text-xs text-slate-400 font-mono mb-1">Body Text (16px Base)</div>
                  <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    Good design is as little design as possible. Less, but better — because it concentrates on
                    the essential aspects, and the products are not burdened with non-essentials. Back to
                    purity, back to simplicity.
                  </p>
                </div>

                {/* Blockquote with vertical rule */}
                <blockquote
                  className="pl-4 py-1 italic font-medium my-4"
                  style={{
                    borderLeft: '4px solid var(--color-primary)',
                    color: 'var(--color-text-primary)',
                    backgroundColor: 'var(--color-surface-2)',
                    padding: 'var(--space-md)',
                    borderRadius: '0 var(--border-radius) var(--border-radius) 0',
                  }}
                >
                  "Simplicity is about subtracting the obvious and adding the meaningful."
                  <footer className="text-xs not-italic mt-2 opacity-80" style={{ color: 'var(--color-text-muted)' }}>
                    — John Maeda, <cite>The Laws of Simplicity</cite>
                  </footer>
                </blockquote>

                {/* Unordered List */}
                <div className="pt-2">
                  <div className="text-xs text-slate-400 font-mono mb-2">Unordered List Specimen</div>
                  <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <li className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      />
                      <span>Strict 8px grid alignment across all components and containers.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      />
                      <span>Calculated nested corner radius formulas (Inner = Outer - Padding).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      />
                      <span>Predictable token inheritance through CSS custom properties.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              5. INTERACTIVE ELEMENTS & FAQ ACCORDION
             ================================================================= */}
          <section
            id="interactive"
            className="transition-all"
            style={{
              paddingTop: 'var(--space-2xl)',
              paddingBottom: 'var(--space-2xl)',
              paddingLeft: 'var(--space-md)',
              paddingRight: 'var(--space-md)',
              backgroundColor: 'var(--color-surface-2)',
              borderBottom: 'var(--border-width) solid var(--color-border)',
            }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Interactive Component Specimen
                </div>
                <h2
                  className="font-bold tracking-tight mb-2"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-h2)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Button States & Accordions
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Test real-time hover styles, focus indicators, and smooth accordions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Button States Panel */}
                <div
                  className="lg:col-span-6 p-6 space-y-6"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    borderRadius: 'var(--border-radius)',
                    border: 'var(--border-width) solid var(--color-border)',
                    boxShadow: 'var(--box-shadow)',
                  }}
                >
                  <h3
                    className="font-bold text-lg"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Button Hierarchy & Elevations
                  </h3>

                  {/* Solid Primary */}
                  <div className="space-y-1.5">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Solid Primary</span>
                      <span className="font-mono">.btn-primary</span>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        type="button"
                        className="font-semibold text-sm transition-all hover:opacity-90 active:scale-95 cursor-pointer shadow-sm"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'var(--color-primary-text)',
                          padding: 'var(--space-sm) var(--space-md)',
                          borderRadius: 'var(--border-radius)',
                          border: 'var(--border-width) solid var(--color-primary)',
                        }}
                      >
                        Primary Action
                      </button>
                      <button
                        type="button"
                        className="font-semibold text-sm transition-all cursor-not-allowed opacity-50"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'var(--color-primary-text)',
                          padding: 'var(--space-sm) var(--space-md)',
                          borderRadius: 'var(--border-radius)',
                          border: 'var(--border-width) solid var(--color-primary)',
                        }}
                      >
                        Disabled State
                      </button>
                    </div>
                  </div>

                  {/* Outline Button */}
                  <div className="space-y-1.5">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Outline Secondary</span>
                      <span className="font-mono">.btn-outline</span>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        type="button"
                        className="font-semibold text-sm transition-colors hover:bg-slate-100 cursor-pointer"
                        style={{
                          backgroundColor: 'transparent',
                          color: 'var(--color-text-primary)',
                          padding: 'var(--space-sm) var(--space-md)',
                          borderRadius: 'var(--border-radius)',
                          border: 'max(1px, var(--border-width)) solid var(--color-border)',
                        }}
                      >
                        Outline Action
                      </button>
                    </div>
                  </div>

                  {/* Ghost Button */}
                  <div className="space-y-1.5">
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>Ghost Tertiary</span>
                      <span className="font-mono">.btn-ghost</span>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        type="button"
                        className="font-semibold text-sm transition-colors cursor-pointer"
                        style={{
                          backgroundColor: 'var(--color-primary-hover)',
                          color: 'var(--color-primary)',
                          padding: 'var(--space-sm) var(--space-md)',
                          borderRadius: 'var(--border-radius)',
                        }}
                      >
                        Ghost Link / Action
                      </button>
                    </div>
                  </div>
                </div>

                {/* FAQ Accordion Panel */}
                <div
                  id="faq"
                  className="lg:col-span-6 p-6 space-y-4"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    borderRadius: 'var(--border-radius)',
                    border: 'var(--border-width) solid var(--color-border)',
                    boxShadow: 'var(--box-shadow)',
                  }}
                >
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Interactive FAQ Accordion
                  </h3>

                  {/* FAQ 1 */}
                  <div
                    className="overflow-hidden transition-all"
                    style={{
                      border: 'var(--border-width) solid var(--color-border)',
                      borderRadius: 'var(--border-radius)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                      className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm transition-colors cursor-pointer"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      <span>How do CSS custom properties update instantly?</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeFaq === 0 ? 'rotate-180 text-indigo-500' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {activeFaq === 0 && (
                      <div
                        className="px-4 pb-4 text-xs leading-relaxed border-t border-slate-200/40 dark:border-slate-800 pt-3"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        StyleDraft binds all sidebar controls directly to CSS variable definitions in the DOM root,
                        allowing instantaneous cascading without page reloads or layout recalculation overhead.
                      </div>
                    )}
                  </div>

                  {/* FAQ 2 */}
                  <div
                    className="overflow-hidden transition-all"
                    style={{
                      border: 'var(--border-width) solid var(--color-border)',
                      borderRadius: 'var(--border-radius)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                      className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm transition-colors cursor-pointer"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      <span>Can I export this spec directly into Tailwind CSS?</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeFaq === 1 ? 'rotate-180 text-indigo-500' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {activeFaq === 1 && (
                      <div
                        className="px-4 pb-4 text-xs leading-relaxed border-t border-slate-200/40 dark:border-slate-800 pt-3"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Yes! The export modal outputs a fully typed tailwind.config.js theme extension mapping your
                        chosen typography, colors, border radii, and spacing scales.
                      </div>
                    )}
                  </div>

                  {/* FAQ 3 */}
                  <div
                    className="overflow-hidden transition-all"
                    style={{
                      border: 'var(--border-width) solid var(--color-border)',
                      borderRadius: 'var(--border-radius)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                      className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm transition-colors cursor-pointer"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      <span>Why are the sliders restricted to discrete steps?</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeFaq === 2 ? 'rotate-180 text-indigo-500' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {activeFaq === 2 && (
                      <div
                        className="px-4 pb-4 text-xs leading-relaxed border-t border-slate-200/40 dark:border-slate-800 pt-3"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Design guardrails eliminate arbitrary pixel values. By locking sizes to an 8px grid and
                        modular type ratios, designs maintain structural elegance automatically.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              6. CTA STRIP (FULL-WIDTH PRIMARY COLOR DOMINANCE)
             ================================================================= */}
          <section
            id="cta-strip"
            className="transition-all"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-text)',
              paddingTop: 'var(--space-2xl)',
              paddingBottom: 'var(--space-2xl)',
              paddingLeft: 'var(--space-md)',
              paddingRight: 'var(--space-md)',
            }}
          >
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2
                className="font-bold tracking-tight leading-tight"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  color: 'var(--color-primary-text)',
                }}
              >
                Ready to standardize your frontend design system?
              </h2>

              <p
                className="text-base sm:text-lg max-w-2xl mx-auto opacity-90"
                style={{ color: 'var(--color-primary-text)' }}
              >
                Generate your design spec, copy your CSS custom properties, and ship consistent, accessible UI in
                minutes.
              </p>

              {/* Newsletter / Action Form */}
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 text-sm rounded-lg bg-white/95 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white shadow-inner"
                  style={{ borderRadius: 'var(--border-radius)' }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-bold bg-slate-950 text-white hover:bg-slate-900 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  style={{ borderRadius: 'var(--border-radius)' }}
                >
                  {subscribed ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Get Spec Code
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* =================================================================
              7. FOOTER
             ================================================================= */}
          <footer
            id="preview-footer"
            className="transition-all"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderTop: 'var(--border-width) solid var(--color-border)',
              paddingTop: 'var(--space-2xl)',
              paddingBottom: 'var(--space-xl)',
              paddingLeft: 'var(--space-md)',
              paddingRight: 'var(--space-md)',
            }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                {/* Brand Info */}
                <div className="md:col-span-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 flex items-center justify-center font-bold text-xs"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-primary-text)',
                        borderRadius: 'var(--border-radius)',
                      }}
                    >
                      ▲
                    </div>
                    <span
                      className="font-bold text-base"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      StyleDraft
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    The guardrailed design mock-up engine for modern web engineering teams. Bridging Figma and
                    code with zero friction.
                  </p>
                  {/* Social Icons */}
                  <div className="flex items-center gap-3 pt-1 text-slate-400">
                    <a href="#" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Discord className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Column 1: Product */}
                <div className="md:col-span-2 space-y-3">
                  <h4
                    className="font-bold text-xs uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Product
                  </h4>
                  <ul className="space-y-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><a href="#features" className="hover:underline">Design Tokens</a></li>
                    <li><a href="#typography" className="hover:underline">Type Scales</a></li>
                    <li><a href="#interactive" className="hover:underline">Component UI</a></li>
                    <li><a href="#cta-strip" className="hover:underline">WCAG Verifier</a></li>
                  </ul>
                </div>

                {/* Column 2: Resources */}
                <div className="md:col-span-2 space-y-3">
                  <h4
                    className="font-bold text-xs uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Resources
                  </h4>
                  <ul className="space-y-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    <li><a href="#" className="hover:underline">Documentation</a></li>
                    <li><a href="#" className="hover:underline">Tailwind Plugin</a></li>
                    <li><a href="#" className="hover:underline">SCSS Mixins</a></li>
                    <li><a href="#" className="hover:underline">Design Specs</a></li>
                  </ul>
                </div>

                {/* Column 3: Newsletter Sign-up */}
                <div className="md:col-span-4 space-y-3">
                  <h4
                    className="font-bold text-xs uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Stay in the loop
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    Subscribe to our weekly curated token engineering brief.
                  </p>
                  <form onSubmit={handleSubscribe} className="flex gap-1.5">
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      className="px-3 py-2 text-xs flex-1 rounded border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900 focus:outline-none focus:border-indigo-500"
                      style={{ borderRadius: 'var(--border-radius)' }}
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-primary-text)',
                        borderRadius: 'var(--border-radius)',
                      }}
                    >
                      Join
                    </button>
                  </form>
                </div>
              </div>

              {/* Bottom bar */}
              <div
                className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs border-t border-slate-200/50 dark:border-slate-800"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <div>© 2026 StyleDraft Studio. All rights reserved.</div>
                <div className="flex gap-4 mt-2 sm:mt-0">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                  <a href="#" className="hover:underline">Terms of Service</a>
                  <a href="#" className="hover:underline">Security</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

import { DesignTokens } from '../types';
import { THEME_CONFIGS, SHADOW_OPTIONS } from './constants';
import {
  evaluateContrast,
  getHoverTint,
  getActiveShade,
  calculateTypeScales,
} from './contrast';

export function generateCleanCSS(tokens: DesignTokens): string {
  const theme = THEME_CONFIGS[tokens.theme];
  const contrast = evaluateContrast(tokens.primaryColor, theme);
  const scales = calculateTypeScales(tokens.typeScale.ratio);
  const shadowObj = SHADOW_OPTIONS.find((s) => s.value === tokens.shadow) || SHADOW_OPTIONS[2];

  return `/* ==========================================================================
   StyleDraft Design Tokens — Generated CSS Variables
   Theme: ${theme.name} | Ratio: ${tokens.typeScale.name} (${tokens.typeScale.ratio})
   ========================================================================== */

:root {
  /* Typography Tokens */
  --font-heading: ${tokens.fontPair.headingFamily};
  --font-body: ${tokens.fontPair.bodyFamily};
  --font-size-base: ${scales.base};
  --font-size-h6: ${scales.h6};
  --font-size-h5: ${scales.h5};
  --font-size-h4: ${scales.h4};
  --font-size-h3: ${scales.h3};
  --font-size-h2: ${scales.h2};
  --font-size-h1: ${scales.h1};
  --line-height-heading: 1.2;
  --line-height-body: 1.6;

  /* Color Tokens */
  --color-primary: ${tokens.primaryColor};
  --color-primary-hover: ${getHoverTint(tokens.primaryColor, 0.15)};
  --color-primary-active: ${getActiveShade(tokens.primaryColor, -12)};
  --color-primary-text: ${contrast.textOnPrimary};
  --color-canvas: ${theme.bgCanvas};
  --color-surface: ${theme.bgSurface};
  --color-surface-2: ${theme.bgSurface2};
  --color-card: ${theme.cardBg};
  --color-input: ${theme.inputBg};
  --color-text-primary: ${theme.textPrimary};
  --color-text-secondary: ${theme.textSecondary};
  --color-text-muted: ${theme.textMuted};
  --color-border: ${theme.borderDefault};

  /* Elevation & Geometry Tokens */
  --border-radius: ${tokens.radius};
  --border-radius-sm: ${tokens.radius === '0px' ? '0px' : tokens.radius === '4px' ? '2px' : tokens.radius === '12px' ? '6px' : '12px'};
  --border-radius-pill: 9999px;
  --border-width: ${tokens.borderWidth};
  --box-shadow: ${shadowObj.css};

  /* Spacing Scale (Base Unit: ${tokens.spaceUnit}px) */
  --space-unit: ${tokens.spaceUnit}px;
  --space-xs: ${tokens.spaceUnit * 1}px;
  --space-sm: ${tokens.spaceUnit * 2}px;
  --space-md: ${tokens.spaceUnit * 3}px;
  --space-lg: ${tokens.spaceUnit * 5}px;
  --space-xl: ${tokens.spaceUnit * 8}px;
  --space-2xl: ${tokens.spaceUnit * 12}px;
}

/* ==========================================================================
   Base Component Styles
   ========================================================================== */

body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-body);
  color: var(--color-text-primary);
  background-color: var(--color-canvas);
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  line-height: var(--line-height-heading);
  color: var(--color-text-primary);
  margin-top: 0;
  font-weight: 700;
}

h1 { font-size: var(--font-size-h1); letter-spacing: -0.02em; }
h2 { font-size: var(--font-size-h2); letter-spacing: -0.015em; }
h3 { font-size: var(--font-size-h3); }
h4 { font-size: var(--font-size-h4); }
h5 { font-size: var(--font-size-h5); }
h6 { font-size: var(--font-size-h6); text-transform: uppercase; letter-spacing: 0.05em; }

p {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-weight: 600;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius);
  border: var(--border-width) solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: var(--font-size-base);
  line-height: 1;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  border-color: var(--color-primary);
}

.btn-primary:hover {
  filter: brightness(1.1);
  box-shadow: var(--box-shadow);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.btn-outline:hover {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-text-secondary);
  border: none;
}

.btn-ghost:hover {
  background-color: var(--color-primary-hover);
  color: var(--color-primary);
}

/* Cards & Surfaces */
.card {
  background-color: var(--color-card);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: var(--space-lg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}

/* Typography Showcase Elements */
blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: var(--space-md);
  margin: var(--space-lg) 0;
  font-style: italic;
  color: var(--color-text-secondary);
}

/* Form Controls */
.input-field {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius);
  border: var(--border-width) solid var(--color-border);
  background-color: var(--color-input);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  outline: none;
}

.input-field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-hover);
}
`;
}

export function generateHTMLTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page — StyleDraft Design System</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- 1. Navigation -->
  <header class="site-header">
    <div class="container nav-wrapper">
      <a href="#" class="brand-logo">
        <span class="logo-mark">▲</span>
        <span class="logo-text">StyleDraft</span>
      </a>
      <nav class="nav-links">
        <a href="#features">Features</a>
        <a href="#typography">Typography</a>
        <a href="#components">Components</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="nav-actions">
        <a href="#" class="btn btn-ghost">Sign In</a>
        <a href="#" class="btn btn-primary">Get Started</a>
      </div>
    </div>
  </header>

  <main>
    <!-- 2. Hero Section -->
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="badge">v2.4 Design Engine Live</div>
          <h1 class="hero-title">Design with precision. Deliver with confidence.</h1>
          <p class="hero-subtitle">
            StyleDraft enforces typographic scale harmony, discrete spatial rhythm, and WCAG AA contrast compliance in real-time.
          </p>
          <div class="hero-cta-group">
            <a href="#" class="btn btn-primary">Start Designing Now</a>
            <a href="#" class="btn btn-outline">Explore Guidelines</a>
          </div>
        </div>
        <div class="hero-media">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Design Interface Preview" class="hero-image">
        </div>
      </div>
    </section>

    <!-- 3. Feature Grid -->
    <section id="features" class="features-section">
      <div class="container">
        <div class="section-header">
          <h2>Engineered for visual rhythm</h2>
          <p>Enforcing foundational design rules directly in your CSS architecture.</p>
        </div>
        <div class="feature-grid">
          <div class="card">
            <div class="feature-icon">📐</div>
            <h3>Mathematical Scales</h3>
            <p>Discrete modular type scales ensure harmonious visual hierarchy across all viewports.</p>
          </div>
          <div class="card">
            <div class="feature-icon">👁️</div>
            <h3>WCAG AA Verified</h3>
            <p>Continuous contrast checking protects your accessibility scores before deployment.</p>
          </div>
          <div class="card">
            <div class="feature-icon">⚡</div>
            <h3>Instant Token Handoff</h3>
            <p>Export directly to clean CSS variables, JSON tokens, and Tailwind theme extensions.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Typography Showcase -->
    <section id="typography" class="typography-section">
      <div class="container">
        <div class="section-header">
          <h2>Typographic Hierarchy</h2>
          <p>Live specimen scale from display headlines to nested lists and citations.</p>
        </div>
        <div class="typography-card card">
          <div class="specimen-row"><h1>Heading Level 1 (Hero Title)</h1></div>
          <div class="specimen-row"><h2>Heading Level 2 (Section Title)</h2></div>
          <div class="specimen-row"><h3>Heading Level 3 (Subsection Title)</h3></div>
          <div class="specimen-row"><h4>Heading Level 4 (Card Title)</h4></div>
          <div class="specimen-row"><h5>Heading Level 5 (Component Label)</h5></div>
          <div class="specimen-row"><h6>Heading Level 6 (Overline Tag)</h6></div>
          
          <p>
            Standard paragraph: Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects, and the products are not burdened with non-essentials.
          </p>

          <blockquote>
            "Simplicity is about subtracting the obvious and adding the meaningful."
            <cite>— John Maeda, The Laws of Simplicity</cite>
          </blockquote>

          <ul class="styled-list">
            <li>Strict 8px grid alignment across all components</li>
            <li>Calculated nested corner radius formulas</li>
            <li>Predictable token inheritance through CSS custom properties</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 5. Interactive Elements & FAQ -->
    <section id="components" class="components-section">
      <div class="container">
        <div class="section-header">
          <h2>Interactive Elements & Components</h2>
          <p>Test button elevations, focus rings, and accordion behavior.</p>
        </div>
        <div class="component-demo-grid">
          <!-- Button States -->
          <div class="card">
            <h3>Button Elevations</h3>
            <div class="btn-demo-group">
              <button class="btn btn-primary">Primary Action</button>
              <button class="btn btn-outline">Outline Action</button>
              <button class="btn btn-ghost">Ghost Link</button>
            </div>
          </div>
          <!-- FAQ Accordion -->
          <div class="card">
            <h3>Frequently Asked Questions</h3>
            <details class="accordion-item" open>
              <summary>How are CSS variables updated in real time?</summary>
              <div class="accordion-content">
                StyleDraft binds input changes to document custom properties, instantly cascading new colors and scales without reflows.
              </div>
            </details>
            <details class="accordion-item">
              <summary>Can I import this into Tailwind CSS or SCSS?</summary>
              <div class="accordion-content">
                Yes! The export modal provides both a ready-to-use tailwind.config.js theme extension and structured JSON tokens.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. High-Impact CTA Strip -->
    <section class="cta-strip">
      <div class="container cta-content">
        <h2>Ready to build your next design system?</h2>
        <p>Export your tokens or copy the standalone CSS file with a single click.</p>
        <div class="cta-form">
          <input type="email" placeholder="Enter your work email" class="input-field">
          <button class="btn btn-primary">Claim Early Access</button>
        </div>
      </div>
    </section>
  </main>

  <!-- 7. Footer -->
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="brand-logo">▲ StyleDraft</div>
        <p>The guardrailed design mock-up engine for modern web developers.</p>
      </div>
      <div class="footer-col">
        <h4>Product</h4>
        <a href="#">Design Tokens</a>
        <a href="#">Type Scales</a>
        <a href="#">Contrast Checker</a>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <a href="#">Documentation</a>
        <a href="#">Tailwind Plugin</a>
        <a href="#">GitHub Repo</a>
      </div>
      <div class="footer-col">
        <h4>Newsletter</h4>
        <p>Subscribe for weekly frontend architecture briefs.</p>
        <input type="email" placeholder="you@company.com" class="input-field">
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© 2026 StyleDraft Studio. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
}

export function generateJSONTokens(tokens: DesignTokens): string {
  const theme = THEME_CONFIGS[tokens.theme];
  const contrast = evaluateContrast(tokens.primaryColor, theme);
  const scales = calculateTypeScales(tokens.typeScale.ratio);
  const shadowObj = SHADOW_OPTIONS.find((s) => s.value === tokens.shadow) || SHADOW_OPTIONS[2];

  const manifest = {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    name: 'StyleDraft Design Tokens',
    version: '1.0.0',
    meta: {
      generatedAt: new Date().toISOString(),
      theme: tokens.theme,
      wcagRatio: contrast.ratioFormatted,
      wcagCompliance: contrast.score,
    },
    typography: {
      fontFamily: {
        heading: { value: tokens.fontPair.headingFamily, type: 'fontFamily' },
        body: { value: tokens.fontPair.bodyFamily, type: 'fontFamily' },
      },
      scale: {
        ratio: { value: tokens.typeScale.ratio, type: 'number' },
        base: { value: scales.base, type: 'dimension' },
        h6: { value: scales.h6, type: 'dimension' },
        h5: { value: scales.h5, type: 'dimension' },
        h4: { value: scales.h4, type: 'dimension' },
        h3: { value: scales.h3, type: 'dimension' },
        h2: { value: scales.h2, type: 'dimension' },
        h1: { value: scales.h1, type: 'dimension' },
      },
    },
    color: {
      primary: {
        default: { value: tokens.primaryColor, type: 'color' },
        hover: { value: getHoverTint(tokens.primaryColor, 0.15), type: 'color' },
        active: { value: getActiveShade(tokens.primaryColor, -12), type: 'color' },
        contrastText: { value: contrast.textOnPrimary, type: 'color' },
      },
      canvas: { value: theme.bgCanvas, type: 'color' },
      surface: { value: theme.bgSurface, type: 'color' },
      surface2: { value: theme.bgSurface2, type: 'color' },
      card: { value: theme.cardBg, type: 'color' },
      border: { value: theme.borderDefault, type: 'color' },
      text: {
        primary: { value: theme.textPrimary, type: 'color' },
        secondary: { value: theme.textSecondary, type: 'color' },
        muted: { value: theme.textMuted, type: 'color' },
      },
    },
    geometry: {
      borderRadius: {
        default: { value: tokens.radius, type: 'dimension' },
      },
      borderWidth: {
        default: { value: tokens.borderWidth, type: 'dimension' },
      },
      elevation: {
        boxShadow: { value: shadowObj.css, type: 'shadow' },
      },
    },
    spacing: {
      unit: { value: `${tokens.spaceUnit}px`, type: 'dimension' },
      xs: { value: `${tokens.spaceUnit * 1}px`, type: 'dimension' },
      sm: { value: `${tokens.spaceUnit * 2}px`, type: 'dimension' },
      md: { value: `${tokens.spaceUnit * 3}px`, type: 'dimension' },
      lg: { value: `${tokens.spaceUnit * 5}px`, type: 'dimension' },
      xl: { value: `${tokens.spaceUnit * 8}px`, type: 'dimension' },
      '2xl': { value: `${tokens.spaceUnit * 12}px`, type: 'dimension' },
    },
  };

  return JSON.stringify(manifest, null, 2);
}

export function generateTailwindConfig(tokens: DesignTokens): string {
  const theme = THEME_CONFIGS[tokens.theme];
  const shadowObj = SHADOW_OPTIONS.find((s) => s.value === tokens.shadow) || SHADOW_OPTIONS[2];

  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: [${tokens.fontPair.headingFamily}],
        body: [${tokens.fontPair.bodyFamily}],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary, ${tokens.primaryColor})',
          hover: 'var(--color-primary-hover, ${getHoverTint(tokens.primaryColor, 0.15)})',
          active: 'var(--color-primary-active, ${getActiveShade(tokens.primaryColor, -12)})',
          foreground: 'var(--color-primary-text, #ffffff)',
        },
        canvas: 'var(--color-canvas, ${theme.bgCanvas})',
        surface: 'var(--color-surface, ${theme.bgSurface})',
        card: 'var(--color-card, ${theme.cardBg})',
        border: 'var(--color-border, ${theme.borderDefault})',
        body: 'var(--color-text-primary, ${theme.textPrimary})',
        muted: 'var(--color-text-muted, ${theme.textMuted})',
      },
      borderRadius: {
        custom: 'var(--border-radius, ${tokens.radius})',
      },
      boxShadow: {
        custom: 'var(--box-shadow, ${shadowObj.css})',
      },
      spacing: {
        'token-xs': 'var(--space-xs, ${tokens.spaceUnit * 1}px)',
        'token-sm': 'var(--space-sm, ${tokens.spaceUnit * 2}px)',
        'token-md': 'var(--space-md, ${tokens.spaceUnit * 3}px)',
        'token-lg': 'var(--space-lg, ${tokens.spaceUnit * 5}px)',
        'token-xl': 'var(--space-xl, ${tokens.spaceUnit * 8}px)',
      },
    },
  },
  plugins: [],
};
`;
}

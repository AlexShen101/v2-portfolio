import { css } from 'styled-components';

const variables = css`
  :root {
    /* Minimal Black & White Color System - Dark Mode (Default) */
    --bg-primary: #050505; /* decide-black */
    --bg-secondary: #0a0a0a;
    --bg-tertiary: #151515;
    --bg-elevated: #121212; /* decide-darkgray */

    --cream: #fdfcf8;
    --light-gray: #a3a3a3;
    --medium-gray: #737373;

    --border-primary: #333333; /* decide-border */
    --border-secondary: #1a1a1a;

    --accent: #ffffff;
    --accent-hover: #d4d4d4;

    --shadow: rgba(0, 0, 0, 0.3);
    --overlay: rgba(0, 0, 0, 0.8);

    /* Custom Theme Colors - Decide (Dark) */
    --decide-black: #050505;
    --decide-neon: #00ff94;
    --decide-darkgray: #121212;
    --decide-border: #333333;

    /* Custom Theme Colors - Adaline (Light) */
    --adaline-paper: #fdfcf8;
    --adaline-ink: #1a1a1a;
    --adaline-soft: #e5e5e5;
    --adaline-accent: #2f4f4f;

    /* Accent Colors */
    --green: #22c55e;
    --blue: #3b82f6;
    --purple: #a855f7;
    --pink: #ec4899;
    --orange: #f97316;

    /* Typography */
    --font-sans: 'Calibre', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
    --font-serif: 'Playfair Display', 'Georgia', serif;
    --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    /* Font Sizes - Refined minimal scale */
    --fz-xxs: 11px;
    --fz-xs: 12px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 24px;
    --fz-heading: 32px;

    /* Spacing - Generous minimal spacing */
    --spacing-xs: 8px;
    --spacing-sm: 16px;
    --spacing-md: 24px;
    --spacing-lg: 32px;
    --spacing-xl: 48px;
    --spacing-xxl: 64px;
    --spacing-xxxl: 96px;

    /* Layout */
    --border-radius: 0px; /* Sharp edges for minimal aesthetic */
    --nav-height: 80px;
    --nav-scroll-height: 64px;
    --max-width: 1400px;

    /* Animations - Subtle and refined */
    --easing: cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    /* Interactive Elements */
    --tab-height: 48px;
    --tab-width: 140px;
    --hamburger-width: 28px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;

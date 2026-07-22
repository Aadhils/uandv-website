/**
 * U&V Design Tokens — TypeScript mirror of CSS custom properties.
 * Single source of truth for colors, type, space, and motion.
 */

export const brandColors = {
  50: '#f7f5ff',
  100: '#ede9fe',
  200: '#ddd6fe',
  300: '#c4b5fd',
  400: '#a78bfa',
  500: '#8b5cf6',
  600: '#7c3aed',
  700: '#6d28d9',
  800: '#5b21b6',
  900: '#3b1c78',
  950: '#08152f',
} as const;

export const navyColors = {
  deep: '#08152f',
  blue: '#102a56',
  mid: '#3b1c78',
} as const;

export const neutralColors = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#09090b',
} as const;

export const semanticColors = {
  success: '#16a34a',
  successMuted: '#dcfce7',
  warning: '#d97706',
  warningMuted: '#fef3c7',
  error: '#dc2626',
  errorMuted: '#fee2e2',
  info: '#2563eb',
  infoMuted: '#dbeafe',
} as const;

/** Semantic surface/text tokens shared by light + dark themes */
export const colorRoles = {
  background: 'var(--uv-background)',
  backgroundSubtle: 'var(--uv-background-subtle)',
  backgroundMuted: 'var(--uv-background-muted)',
  foreground: 'var(--uv-foreground)',
  foregroundMuted: 'var(--uv-foreground-muted)',
  foregroundSubtle: 'var(--uv-foreground-subtle)',
  border: 'var(--uv-border)',
  borderStrong: 'var(--uv-border-strong)',
  ring: 'var(--uv-ring)',
  navy: 'var(--uv-navy)',
  navyBlue: 'var(--uv-navy-blue)',
  brand: 'var(--uv-brand)',
  brandHover: 'var(--uv-brand-hover)',
  brandForeground: 'var(--uv-brand-foreground)',
  brandMuted: 'var(--uv-brand-muted)',
  accent: 'var(--uv-accent)',
  softViolet: 'var(--uv-soft-violet)',
  card: 'var(--uv-card)',
  cardForeground: 'var(--uv-card-foreground)',
  overlay: 'var(--uv-overlay)',
  disabled: 'var(--uv-disabled)',
  disabledForeground: 'var(--uv-disabled-foreground)',
} as const;

export const typography = {
  fontFamily: {
    sans: 'var(--font-uv-sans)',
    mono: 'var(--font-uv-mono)',
    display: 'var(--font-uv-display)',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: '1',
    tight: '1.2',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.08em',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
} as const;

export const radii = {
  none: '0',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  full: '9999px',
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 var(--uv-shadow-color)',
  md: '0 4px 6px -1px var(--uv-shadow-color)',
  lg: '0 10px 15px -3px var(--uv-shadow-color)',
  xl: '0 20px 25px -5px var(--uv-shadow-color)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  toast: 1600,
} as const;

export const motion = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  },
} as const;

export const designTokens = {
  brand: brandColors,
  neutral: neutralColors,
  semantic: semanticColors,
  colorRoles,
  typography,
  spacing,
  radii,
  shadows,
  breakpoints,
  zIndex,
  motion,
} as const;

export type DesignTokens = typeof designTokens;
export type BrandColorShade = keyof typeof brandColors;
export type NeutralColorShade = keyof typeof neutralColors;

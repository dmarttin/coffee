/**
 * Coffee App Design System
 *
 * Aesthetic: Clean, modern, minimalist with warm undertones
 * Inspired by: Vivino's data elegance + Nomad Coffee's craft refinement
 * Special touches: Subtle gradients, dithering textures, generous whitespace
 */

// ============================================
// COLOR PALETTE
// ============================================

export const colors = {
  // Core palette - warm neutrals
  cream: {
    50: '#FDFCFA',   // Lightest - page backgrounds
    100: '#FAF8F5',  // Cards, elevated surfaces
    200: '#F5F1EB',  // Subtle borders, dividers
    300: '#EBE5DB',  // Input backgrounds
    400: '#DED5C7',  // Disabled states
  },

  // Coffee browns - rich and warm
  coffee: {
    50: '#F5F0EB',
    100: '#E6DDD3',
    200: '#D4C4B0',
    300: '#B8A08A',
    400: '#9A7B5D',
    500: '#7D5A3C',  // Primary brown
    600: '#654832',
    700: '#4D3726',
    800: '#36271B',
    900: '#1F1712',  // Near black
  },

  // Accent - burnt amber/terracotta (from your existing primary)
  accent: {
    light: '#E8A878',
    DEFAULT: '#C65D21',  // Primary accent
    dark: '#9E4A1A',
  },

  // Semantic colors
  success: '#3D7A4A',
  warning: '#C4912A',
  error: '#B84C4C',

  // Roast level colors (for visual indicators)
  roast: {
    light: '#D4A574',
    medium: '#8B6B4A',
    mediumDark: '#5C4332',
    dark: '#2C1810',
  },

  // Origin region colors (for maps/badges)
  origin: {
    africa: '#E07B4C',
    centralAmerica: '#5B8A3C',
    southAmerica: '#C4912A',
    asia: '#7B5CB8',
  },
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

// Font families - to be loaded with expo-font
export const fonts = {
  // Display: Fraunces - variable optical, beautiful serifs
  // Perfect for headlines, coffee names, brand feel
  display: {
    regular: 'Fraunces_400Regular',
    medium: 'Fraunces_500Medium',
    semibold: 'Fraunces_600SemiBold',
    bold: 'Fraunces_700Bold',
  },

  // Body: DM Sans - clean, modern, highly readable
  // Perfect for UI text, descriptions, data
  body: {
    regular: 'DMSans_400Regular',
    medium: 'DMSans_500Medium',
    semibold: 'DMSans_600SemiBold',
    bold: 'DMSans_700Bold',
  },

  // Mono: JetBrains Mono - for metrics, data
  mono: {
    regular: 'JetBrainsMono_400Regular',
    medium: 'JetBrainsMono_500Medium',
  },
} as const;

// Type scale - intentional hierarchy
export const typography = {
  // Display styles (Fraunces)
  displayLarge: {
    fontFamily: fonts.display.bold,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -1,
  },
  displayMedium: {
    fontFamily: fonts.display.semibold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  displaySmall: {
    fontFamily: fonts.display.medium,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.25,
  },

  // Headings (Fraunces)
  h1: {
    fontFamily: fonts.display.semibold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.25,
  },
  h2: {
    fontFamily: fonts.display.medium,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  h3: {
    fontFamily: fonts.display.medium,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Body text (DM Sans)
  bodyLarge: {
    fontFamily: fonts.body.regular,
    fontSize: 17,
    lineHeight: 26,
    letterSpacing: 0,
  },
  body: {
    fontFamily: fonts.body.regular,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fonts.body.regular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.1,
  },

  // UI text (DM Sans)
  label: {
    fontFamily: fonts.body.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  labelSmall: {
    fontFamily: fonts.body.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  caption: {
    fontFamily: fonts.body.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },

  // Data/metrics (JetBrains Mono)
  metric: {
    fontFamily: fonts.mono.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  metricLarge: {
    fontFamily: fonts.mono.medium,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.5,
  },
} as const;

// ============================================
// SPACING
// ============================================

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,

  // Semantic spacing
  screenPadding: 20,
  cardPadding: 16,
  sectionGap: 32,
  itemGap: 12,
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  sm: {
    shadowColor: '#1F1712',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#1F1712',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#1F1712',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  // Special: warm glow for cards
  warmGlow: {
    shadowColor: '#C65D21',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

// ============================================
// GRADIENTS (for LinearGradient components)
// ============================================

export const gradients = {
  // Warm cream fade (for backgrounds)
  creamFade: ['#FDFCFA', '#F5F1EB'],

  // Coffee depth (for hero sections)
  coffeeDepth: ['#4D3726', '#1F1712'],

  // Accent glow
  accentGlow: ['#E8A878', '#C65D21'],

  // Subtle warmth (for cards on hover/press)
  warmth: ['rgba(198, 93, 33, 0.03)', 'rgba(198, 93, 33, 0)'],

  // Roast spectrum
  roastSpectrum: ['#D4A574', '#8B6B4A', '#5C4332', '#2C1810'],
} as const;

// ============================================
// ANIMATION DURATIONS
// ============================================

export const animation = {
  fast: 150,
  normal: 250,
  slow: 400,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 0.5,
  },
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
  base: 0,
  card: 10,
  sticky: 100,
  modal: 500,
  toast: 1000,
} as const;

// ============================================
// COMPONENT-SPECIFIC TOKENS
// ============================================

export const components = {
  card: {
    background: colors.cream[100],
    border: colors.cream[200],
    borderRadius: radius.lg,
    padding: spacing.cardPadding,
  },

  button: {
    height: {
      sm: 36,
      md: 44,
      lg: 52,
    },
    borderRadius: radius.md,
  },

  input: {
    height: 48,
    borderRadius: radius.md,
    background: colors.cream[50],
    border: colors.cream[300],
  },

  badge: {
    height: 24,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
  },

  header: {
    height: 56,
  },

  tabBar: {
    height: 84, // Includes safe area
  },
} as const;

// ============================================
// EXPORT THEME OBJECT
// ============================================

export const theme = {
  colors,
  fonts,
  typography,
  spacing,
  radius,
  shadows,
  gradients,
  animation,
  zIndex,
  components,
} as const;

export type Theme = typeof theme;
export default theme;

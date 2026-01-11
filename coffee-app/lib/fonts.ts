/**
 * Font loading configuration for the Coffee App
 *
 * Fonts:
 * - Fraunces: Display/headlines - elegant variable serif
 * - DM Sans: Body text - clean, modern sans-serif
 * - JetBrains Mono: Metrics/data - readable monospace
 */

import {
  Fraunces_400Regular,
  Fraunces_500Medium,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';

import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
} from '@expo-google-fonts/jetbrains-mono';

// Font map for expo-font
export const fontAssets = {
  // Fraunces - Display
  'Fraunces_400Regular': Fraunces_400Regular,
  'Fraunces_500Medium': Fraunces_500Medium,
  'Fraunces_600SemiBold': Fraunces_600SemiBold,
  'Fraunces_700Bold': Fraunces_700Bold,

  // DM Sans - Body
  'DMSans_400Regular': DMSans_400Regular,
  'DMSans_500Medium': DMSans_500Medium,
  'DMSans_600SemiBold': DMSans_600SemiBold,
  'DMSans_700Bold': DMSans_700Bold,

  // JetBrains Mono - Metrics
  'JetBrainsMono_400Regular': JetBrainsMono_400Regular,
  'JetBrainsMono_500Medium': JetBrainsMono_500Medium,
};

// Font family names for use in styles
export const fontFamilies = {
  display: {
    regular: 'Fraunces_400Regular',
    medium: 'Fraunces_500Medium',
    semibold: 'Fraunces_600SemiBold',
    bold: 'Fraunces_700Bold',
  },
  body: {
    regular: 'DMSans_400Regular',
    medium: 'DMSans_500Medium',
    semibold: 'DMSans_600SemiBold',
    bold: 'DMSans_700Bold',
  },
  mono: {
    regular: 'JetBrainsMono_400Regular',
    medium: 'JetBrainsMono_500Medium',
  },
} as const;

export type FontFamily = keyof typeof fontFamilies;
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

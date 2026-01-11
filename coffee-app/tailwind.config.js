/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // CSS variable-based colors (for dark mode switching)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Extended color palette
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EBE5DB',
          400: '#DED5C7',
        },
        coffee: {
          50: '#F5F0EB',
          100: '#E6DDD3',
          200: '#D4C4B0',
          300: '#B8A08A',
          400: '#9A7B5D',
          500: '#7D5A3C',
          600: '#654832',
          700: '#4D3726',
          800: '#36271B',
          900: '#1F1712',
        },
        amber: {
          light: '#E8A878',
          DEFAULT: '#C65D21',
          dark: '#9E4A1A',
        },
        success: '#3D7A4A',
        warning: '#C4912A',
        error: '#B84C4C',
        roast: {
          light: '#D4A574',
          medium: '#8B6B4A',
          'medium-dark': '#5C4332',
          dark: '#2C1810',
        },
        origin: {
          africa: '#E07B4C',
          'central-america': '#5B8A3C',
          'south-america': '#C4912A',
          asia: '#7B5CB8',
        },
      },
      fontFamily: {
        display: ['Fraunces'],
        body: ['DMSans'],
        mono: ['JetBrainsMono'],
      },
      fontSize: {
        'display-lg': ['40px', { lineHeight: '48px', letterSpacing: '-1px' }],
        'display-md': ['32px', { lineHeight: '40px', letterSpacing: '-0.5px' }],
        'display-sm': ['24px', { lineHeight: '32px', letterSpacing: '-0.25px' }],
      },
      spacing: {
        'screen': '20px',
        'card': '16px',
        'section': '32px',
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};

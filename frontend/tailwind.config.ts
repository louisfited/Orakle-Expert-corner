import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        'sei-standard': '#403E99',
        'textGray': '#454A6C',
        'black': '#2D2E31',
        'textDark': '#18276D',
        'lightBlue': '#EBF8FF',
        'textPrimary': '#1026C4',
        'textPrimaryFaded': 'rgba(16, 38, 196, 0.35)',
        'grayBg': '#F5F7FF',
        'grayBg01': '#F9FDFF',
        'green': '#00BB8E',
        'greenBg': '#06D5A31C',
        'red': '#E10028',
        'redBg': '#C410301A',
        'borderBottom': '#1026C41A',
        'darkBlue': '#18276D',
        'fadedIcon': 'rgba(169, 177, 235, 0.35)',
      },
      fontWeight: {
        'semibold': '500',
      },
      fontSize: {
        '3xl': '32px',
        'lg': '16px',
        'md': '14px',
        'tiny': '0.65rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config

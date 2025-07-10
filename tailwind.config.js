/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD1DC',
          blue: '#AEC6CF',
          yellow: '#FDFD96',
          green: '#B4EEB4',
          purple: '#E6E6FA',
          peach: '#FFDAB9',
          mint: '#98FF98',
          lavender: '#E6E6FA',
          coral: '#FFB6B6',
          sky: '#B0E2FF'
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        sand: {
          50: '#fdfaf5',
          100: '#faf5eb',
          200: '#f5ebd7',
          300: '#efe0c3',
          400: '#e9d5af',
          500: '#e3ca9b',
          600: '#dcbf87',
          700: '#d6b473',
          800: '#d0a95f',
          900: '#ca9e4b',
        }
      }
    },
  },
  plugins: [],
};
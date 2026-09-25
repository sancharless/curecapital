/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#07111F',
          secondary: '#091525',
          tertiary: '#0c1a2e',
        },
        card: {
          DEFAULT: '#0B172A',
          elevated: '#101E33',
          glass: 'rgba(11, 23, 42, 0.78)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          glass: 'rgba(255, 255, 255, 0.06)',
          active: 'rgba(54, 197, 240, 0.25)',
        },
        text: {
          primary: '#F7F9FC',
          secondary: '#94A3B8',
          tertiary: '#64748B',
        },
        brand: {
          blue: '#2563EB',
          'blue-hover': '#3B82F6',
          cyan: '#36C5F0',
        },
        positive: {
          DEFAULT: '#19C37D',
          soft: '#34D399',
        },
        negative: {
          DEFAULT: '#EF4444',
        },
        crypto: {
          bitcoin: '#F5A623',
          litecoin: '#B8C2CC',
        },
        alert: {
          DEFAULT: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Geist Mono', 'SF Mono', 'Roboto Mono', 'monospace'],
      },
      borderRadius: {
        'card-lg': '20px',
        'card-md': '16px',
        'input': '12px',
        'btn': '12px',
        'badge': '999px',
      },
      boxShadow: {
        'financial-glass': '0 16px 40px rgba(0, 0, 0, 0.22)',
        'financial-elevated': '0 20px 48px rgba(0, 0, 0, 0.32)',
        'glow-cyan': '0 0 24px rgba(54, 197, 240, 0.15)',
        'glow-blue': '0 0 24px rgba(37, 99, 235, 0.18)',
        'glow-green': '0 0 24px rgba(25, 195, 125, 0.15)',
      },
      screens: {
        'xs': '375px',
        'sm': '390px',
        'sm-plus': '430px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}

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
          hero: 'linear-gradient(145deg, rgba(15,31,55,.96), rgba(11,25,45,.96))',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.055)',
          secondary: 'rgba(255, 255, 255, 0.045)',
          glass: 'rgba(255, 255, 255, 0.055)',
          active: 'rgba(54, 197, 240, 0.25)',
        },
        text: {
          primary: '#F5F7FB',
          secondary: '#91A0B5',
          tertiary: '#66778F',
        },
        brand: {
          blue: '#2563EB',
          'blue-hover': '#2D6CF6',
          cyan: '#36C5F0',
        },
        positive: {
          DEFAULT: '#20D692',
          soft: '#34D399',
          bg: 'rgba(25,195,125,.08)',
          border: 'rgba(25,195,125,.18)',
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
        'card-hero': '22px',
        'card-lg': '20px',
        'card-md': '16px',
        'input': '12px',
        'btn': '12px',
        'badge': '999px',
      },
      boxShadow: {
        'financial-glass': '0 16px 40px rgba(0, 0, 0, 0.18)',
        'financial-elevated': '0 20px 48px rgba(0, 0, 0, 0.28)',
        'btn-primary': '0 8px 24px rgba(37, 99, 235, 0.18)',
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

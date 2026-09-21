/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#08080a',
          card: '#0f0f13',
          surface: '#141419',
          border: 'rgba(255, 255, 255, 0.08)',
          amber: '#f59e0b',
          amberDark: '#d97706',
          amberLight: '#fcd34d',
          steel: '#71717a',
          silver: '#e4e4e7',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      screens: {
        'xs': '420px',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        vercel: {
          50: '#fafafa',
          100: '#eaeaea',
          200: '#999',
          300: '#666',
          400: '#444',
          500: '#333',
          600: '#111',
          700: '#000',
        },
      },
    },
  },
  plugins: [],
};
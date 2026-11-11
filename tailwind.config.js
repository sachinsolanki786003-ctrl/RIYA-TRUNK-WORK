/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          DEFAULT: '#151515',
          dark: '#0D0D0D',
          light: '#222222',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          light: '#FAF7F2',
          dark: '#EAE1D2',
        },
        orange: {
          electric: '#FF6538',
          hover: '#E55328',
          subtle: '#FFF0EB',
        },
        silver: {
          DEFAULT: '#A8ADB2',
          light: '#E2E6E9',
          dark: '#737A82',
        },
        darkgrey: {
          DEFAULT: '#303030',
          elevated: '#3D3D3D',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #151515',
        'brutal-orange': '4px 4px 0px 0px #FF6538',
        'brutal-sm': '2px 2px 0px 0px #151515',
        'brutal-lg': '6px 6px 0px 0px #151515',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

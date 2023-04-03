/** @type {import('tailwindcss').Config} */

const { colors } = require('tailwindcss/colors')

module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './next.config.js'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
}

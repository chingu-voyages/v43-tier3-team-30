/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './next.config.js'],
  variants: {
    backgroundColor: ['children', 'DEFAULT', 'hover', 'focus'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

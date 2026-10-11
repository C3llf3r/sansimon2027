/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        simonDark: '#0a0a0a',
        simonLight: '#f5f5f5',
        simonRed: '#a41d21',
        simonBlue: '#003087',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
        varsity: ['"Varsity Team"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

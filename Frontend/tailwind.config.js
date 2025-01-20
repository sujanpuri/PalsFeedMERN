/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainCol: "#82b1e5",
        light: "#f8fbfd"
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
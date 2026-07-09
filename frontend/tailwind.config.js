/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f75c03',
        secondary: '#fca311',
        accent: '#3f37c9',
        heading: '#0d1b2a',
        bodytext: '#415a77',
        sitebg: '#f8f9fa',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        island: ['Island Moments', 'cursive'],
      },
    },
  },
  plugins: [],
}

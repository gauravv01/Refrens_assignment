/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tahiti: 'rgb(188,192,198)',
        darkTahiti: '#128374',
        silver: '#ecebff',
        'bubble-gum': '#ff77e9'
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '992px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: []
};

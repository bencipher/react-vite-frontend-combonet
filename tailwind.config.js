/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      translate: {
        'custom-x': '727px',
        'custom-y': '58px',
      },
      gridTemplateColumns: {
        '70/30': '70% 30%',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};

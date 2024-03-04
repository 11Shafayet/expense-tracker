/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B20A0B',
        secondary: '#F2F2F2',
      },
      ringColor: {
        DEFAULT: 'transparent',
      },
    },
  },
  plugins: [],
};

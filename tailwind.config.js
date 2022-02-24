const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cardo: ['Cardo'].concat(defaultTheme.fontFamily.sans),
        montserrat: ['Montserrat'].concat(defaultTheme.fontFamily.sans),
      },
      colors: {
        gold: '#c48a52',
      },
      spacing: {
        125: '31.25rem',
        150: '37.5rem',
        176: '44rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './pages/**/*.js',
    './pages/**/*.jsx',
    './pages/**/*.ts',
    './pages/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        cardo: ['Cardo'].concat(defaultTheme.fontFamily.sans),
        montserrat: ['Montserrat'].concat(defaultTheme.fontFamily.sans),
      },
      colors: {},
      spacing: {
        125: '31.25rem',
        150: '37.5rem',
        176: '44rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

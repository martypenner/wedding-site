const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.ts', './src/**/.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cardo'].concat(defaultTheme.fontFamily.sans),
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

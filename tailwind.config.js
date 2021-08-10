const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './pages/**/*.js',
    './pages/**/*.jsx',
    './pages/**/*.ts',
    './pages/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  important: '#app.a.b.c.d.e',
  theme: {
    extend: {
      fontFamily: {
        cardo: ['Cardo'].concat(defaultTheme.fontFamily.sans),
      },
      colors: {
        gray: 'rgb(67, 67, 67)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

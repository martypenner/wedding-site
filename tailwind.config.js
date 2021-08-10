const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.ts', './src/**/.tsx'],
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

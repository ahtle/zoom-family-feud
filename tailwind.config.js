module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '90vh': '90vh',
      'full': '100%',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

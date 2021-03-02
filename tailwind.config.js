module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '90vh': '90vh',
      'full': '100%',
    },
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        border: 'border 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        border: {
          '0%, 100%': { borderColor: 'yellow' },
          '50%': { borderColor: 'red' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

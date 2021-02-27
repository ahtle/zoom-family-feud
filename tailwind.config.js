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
        textSize: 'textSize 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        textSize: {
          '0%, 100%': { fontSize: '1em' },
          '50%': { fontSize: '1.1em' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

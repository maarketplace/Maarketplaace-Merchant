/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: "class", // or 'media' or 'class'
    theme: {
      extend: {
        keyframes: {
          slideUp: {
            '0%': { transform: 'translateY(100%)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
        },
        animation: {
          slideUp: 'slideUp 2s ease-out',
        },
        fontSize: {
          'clamp': 'clamp(1.5rem, 2vw + 1rem, 2.5rem)',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  
  
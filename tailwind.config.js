// tailwind.config.js
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
          'londrina-black': ['LondrinaSolid-Black', 'sans-serif'],
          'londrina-thin': ['LondrinaSolid-Thin', 'sans-serif'],
          'robot-mono': ['Roboto Mono', 'monospace'],
        },
        extend: {
            colors: {
                'purple-primary': '#5633D5',
                'red-primary': '#E41B23',
                'pink-primary': '#D689D7',
                'white-primary': '#FFFFFF',
                'white-secondary': '#F2F2F2',
                'gray-primary': '#C2C2C2',
                'gray-secondary': '#B0B0B0',
                'black-primary': '#0A0A0A',
            },
            rotate: {
              '15': '15deg',
              '-15': '-15deg',
              '-180': '-180deg',
            },
            zIndex: {
              '-10': '-10',
              '-20': '-20',
            },
            width: {
              '1/7': '14.28571%',
            },
            fontSize: {
              'tn': '0.5rem'
            },
            boxShadow: {
              '3xl': '0 4px 20px rgba(86, 51, 213, 0.5)',
              '4xl': '0 4px 20px rgba(121, 121, 121, 0.5)',
              '5xl': '0 10px 40px rgba(0, 0, 0, 0.07)',
              '6xl': '0 10px 50px rgba(0, 0, 0, 0.1)',
            },
            inset: {
              '1/5': '20%',
            },
            height: {
              '80vh': '80vh',
              '100': '30rem',
            }
        },
    },
    variants: {
        extend: {},
    },
    corePlugins: {
      container: true
    },
    plugins: [
        require('@tailwindcss/forms'),
        function ({ addComponents }) {
            addComponents({
              '.container': {
                width: '100%',
                margin: '0 auto',
                '@screen sm': {
                  maxWidth: '640px',
                },
                '@screen md': {
                  maxWidth: '768px',
                },
                '@screen lg': {
                  maxWidth: '1024px',
                },
                '@screen xl': {
                  maxWidth: '1200px',
                },
                '@screen 2xl': {
                  maxWidth: '1380px',
                },
              }
            })
          }
    ],
}
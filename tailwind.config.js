/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'gray-100':'rgba(197, 197, 197, 0.568)',
        'crimson': {
          100: 'rgba(220, 20, 60, 0.1)',   
          200: 'rgba(220, 20, 60, 0.2)',
          300: 'rgba(220, 20, 60, 0.3)',
          400: 'rgba(220, 20, 60, 0.4)',
          500: 'rgba(220, 20, 60, 0.5)',   
          600: 'rgba(220, 20, 60, 0.6)',
          700: 'rgba(220, 20, 60, 0.7)',
          800: 'rgba(220, 20, 60, 0.8)',
          900: 'rgba(220, 20, 60, 0.9)',
        },
        'container-color1': '#222',
        'main-bg': {
          600: '#d1411e',
        },
        'teal':'teal',
      },
      colors: {
        'main-color': '#d1411e',
        'motto-color': '#d3d3d3',
        'lightgray': 'lightgray',
        'mytitle-color': '#b7903c',
      },
      fontSize:{
        'mytitle-size': '18px',
        'xss': '12px',
        '20px': '20px',
        '30px': '30px',
      },
      fontWeight: {
        'extralight': 350,
        'my500':'500',
      },
      height: {
        'calc-screen-minus-100': 'calc(100vh - 100px)',
        'my-50': '50px',
      },
      padding: {
        '15': '10px',
        'x-15': '50px',
      },
      'z-index': {
        '999': 999,
      },
      width: {
        'my-50': '50px',
      },
    },
  },
  plugins: [],
}
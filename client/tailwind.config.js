import PreviousMap from 'postcss/lib/previous-map';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2885ff",
        secondary: "#ef863e",
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'peach': '#DCD5F8',
        'midnight': '#8b83db',
        'black': '#000',
        'bgc': '#bdbad9',
      }
    },
  },
  plugins: [],
}


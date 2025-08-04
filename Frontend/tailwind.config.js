/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#eeeae1',    // warm cream
        secondary: '#B22222',   // firebrick red
        textColor: '#000000',  // black
      },
    },
  },
  plugins: [],
}


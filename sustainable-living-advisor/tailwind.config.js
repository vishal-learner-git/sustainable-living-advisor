/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f2fbf5',
          100: '#dff6e5',
          200: '#c0ebd2',
          300: '#94d9b4',
          400: '#5fb895',
          500: '#3a9b7b',
          600: '#2b7c63',
          700: '#266452',
          800: '#235043',
          900: '#1e4238',
          950: '#0e2520',
        }
      }
    },
  },
  plugins: [],
}

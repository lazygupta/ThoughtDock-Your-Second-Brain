/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#e0e6fe",
          400: "#5047e5",
          500: "#443dba"
        }
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "Login": "500px"
      },
      height: {
        "Login": "500px"
      }
    },
  },
  plugins: [],
}


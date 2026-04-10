/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // App Router
    "./components/**/*.{js,ts,jsx,tsx}", // Your components
    "./pages/**/*.{js,ts,jsx,tsx}",      // (optional, safe)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
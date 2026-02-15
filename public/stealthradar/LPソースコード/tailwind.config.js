/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stealthBackground: "#101820",
        stealthText: "#e0ffff",
        radarCyan: "#00f0ff",
        emeraldGreen: "#1abc9c",
        alertRed: "#ff3b30",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(to right, rgba(16, 24, 32, 0.9), rgba(16, 24, 32, 0.7)), url('/src/assets/images/hero.png')",
      },
    },
  },
  plugins: [],
}
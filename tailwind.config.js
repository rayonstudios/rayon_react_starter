/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DAA520",
        text: "#333",
        danger: "#EC4949",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

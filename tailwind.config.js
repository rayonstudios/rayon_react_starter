/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#314E7D",
        text: "#04275E",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

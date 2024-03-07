/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#11141b",
        headline: "#fffffe",
        paragraph: "#94a1b2",
        button: "#009EED",
        buttonText: "#fffffe",
        stroke: "#010101",
        main: "#fffffe",
        secondary: "#A1A1AA",
        tertiary: "#2cb67d",
        highlight: "#75dab4",
        cardBg: "#16161a",
        backgroundSecondary: "#151921",
        backgroundLow: "#242629",
      },
    },
  },
  darkMode: "class",
  // plugins: [nextui()],
};

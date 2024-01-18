/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#16161a",
        headline: "#fffffe",
        paragraph: "#94a1b2",
        button: "#7f5af0",
        buttonText: "#fffffe",
        stroke: "#010101",
        main: "#fffffe",
        secondary: "#A1A1AA",
        tertiary: "#2cb67d",
        highlight: "#75dab4",
        cardBg: "#16161a"
      },
    },
  },
  plugins: [],
};

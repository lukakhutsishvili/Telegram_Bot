/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#fc4747",
        dark: "#10141e",
        gray: "#5a698f",
        darkBlue: "#161d2f",
        bookmarkDiv: "rgba(16, 20, 30, 0.5)",
        hoverDiv: "rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        outfit: ['"Outfit", sans-serif'],
      },
      width: {
        available: "-webkit-fill-available",
      },
      screens: {
        lg: "1440px",
      },
    },
  },
  plugins: [],
};

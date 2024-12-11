/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        "max-785": { max: "785px" },
        "max-784": { max: "784px" },
        "max-724": { max: "724px" },
        "max-650": { max: "650px" },
        "max-460": { max: "460px" },
        "max-442": { max: "442px" },
        "max-400": { max: "400px" },
        "max-384": { max: "384px" },
        "max-330": { max: "330px" },
        "max-300": { max: "300px" },
        "min-785": { min: "785px" },
        "min-650": { min: "650px" },
        "min-460": { min: "460px" },
        "min-400": { min: "400px" },
        "min-330": { min: "330px" },
        "min-260": { min: "260px" },
      },
    },
  },
  plugins: [require("daisyui")],
};

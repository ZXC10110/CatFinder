/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "salmon": "#FA8072",
        "light-salmon": "#FDEFED",
        "iris": "#5D5FEF",
        "iris-80": "#7879F1",
        "iris-60": "#A5A6F6",
        "iris-100": "#5D5FEF",
        "iris-20": "#E4E5FF",
        "bright-salmon": "#FFCFCA",
        "white-salmon": "#FFF2F0",
        "white-light": "#DEE2E6",
        "paw": "#FFCFCA",
        "error": "#EF4444",
        "true": "#6FCF97"

      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-font-inter'),

  ],


}

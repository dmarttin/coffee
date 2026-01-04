/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        flexoki: {
          black: "#100F0F",
          "base-950": "#1C1B1A",
          "base-900": "#282726",
          "base-850": "#343331",
          "base-800": "#403E3C",
          "base-700": "#575653",
          "base-600": "#6F6E69",
          "base-500": "#878580",
          "base-300": "#B7B5AC",
          "base-200": "#CECDC3",
          "base-150": "#E6E4D9",
          "base-100": "#F2F0E5",
          "base-50": "#FFFCF0",
          paper: "#FFFCF0",

          "red-600": "#AF3029",
          "red-400": "#D14D41",
          "orange-600": "#BC5215",
          "orange-400": "#DA702C",
          "yellow-600": "#AD8301",
          "yellow-400": "#D0A215",
          "green-600": "#66800B",
          "green-400": "#879A39",
          "cyan-600": "#24837B",
          "cyan-400": "#3AA99F",
          "blue-600": "#205EA6",
          "blue-400": "#4385BE",
          "purple-600": "#5E409D",
          "purple-400": "#8B7EC8",
          "magenta-600": "#A02F6F",
          "magenta-400": "#CE5D97",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
    },
  },
  plugins: [],
}


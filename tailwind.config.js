/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx}", "./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f766e",
          dark: "#115e59",
          light: "#ccfbf1",
        },
        cashin: "#16a34a",
        cashout: "#dc2626",
        ink: "#0f172a",
        subtle: "#64748b",
        line: "#e2e8f0",
        surface: "#ffffff",
        canvas: "#f4f6f8",
      },
    },
  },
  plugins: [],
};

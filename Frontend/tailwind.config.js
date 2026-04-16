/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A237E",
          light:   "#3949AB",
          dark:    "#0D1757",
          50:      "#E8EAF6",
          100:     "#C5CAE9",
        },
        secondary: {
          DEFAULT: "#00BFA5",
          light:   "#1DE9B6",
          dark:    "#00897B",
          50:      "#E0F2F1",
        },
        tertiary: {
          DEFAULT: "#5C1800",
          light:   "#8B2500",
          dark:    "#3B0F00",
        },
        neutral: {
          DEFAULT: "#F5F7F9",
          100:     "#EEF1F4",
          200:     "#DDE2E8",
          600:     "#6B7280",
          800:     "#1F2937",
        },
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body:     ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

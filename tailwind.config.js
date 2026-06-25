/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#060709",
          900: "#0b0d10",
          800: "#15181d",
          700: "#1e2329",
        },
        mist: {
          50: "#f5f1e8",
          100: "#d8d1c2",
          200: "#b0a793",
          300: "#8f8572",
        },
        ember: {
          200: "#d6b48a",
          300: "#bc8e61",
          400: "#a06d47",
        },
        tide: {
          300: "#6b8791",
          400: "#516a73",
          500: "#34464d",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif SC"', "serif"],
        sans: ['"Manrope"', '"Noto Sans SC"', "sans-serif"],
      },
      letterSpacing: {
        prose: "0.04em",
        echo: "0.02em",
      },
      boxShadow: {
        haze: "0 0 140px rgba(85, 101, 112, 0.12)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

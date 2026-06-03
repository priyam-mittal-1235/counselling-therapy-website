import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f0f4f8",
          100: "#dbe5f0",
          200: "#bccee1",
          300: "#90afcf",
          400: "#618aba",
          500: "#416e9f",
          600: "#31547f",
          700: "#284467",
          800: "#223955",
          900: "#1e3046",
          950: "#132238"
        },
        softblue: {
          50: "#fdfbf2",
          100: "#fbf5d6",
          200: "#f7eba3",
          300: "#f2dd6b",
          400: "#eccd42",
          500: "#e2bb2c",
          600: "#c49c1f",
          700: "#a37a1b",
          800: "#835d1b",
          900: "#6b4b19"
        },
        cream: {
          50: "#faf7f2",
          100: "#f3ebe1",
          200: "#e7dbcb",
          300: "#dac8b2",
          400: "#c9b093",
          500: "#b99775"
        },
        neutralwarm: {
          50: "#fbfbfa",
          100: "#f5f3f0",
          200: "#e7e3dd",
          300: "#d1c9bd",
          400: "#b3a897",
          500: "#958978",
          600: "#776c5d",
          700: "#5b5247",
          800: "#423b33",
          900: "#1e3046",
          950: "#132238"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(19, 34, 56, 0.10)",
        card: "0 12px 30px rgba(19, 34, 56, 0.08)"
      }
    },
  },
  plugins: [],
};

export default config;

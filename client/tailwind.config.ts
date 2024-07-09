import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          100: "#eff229",
          200: "#c2d71e",
          300: "#92a323",
        },
        green: {
          100: "#cee972",
          200: "#c2d71e",
          300: "#95c711",
          400: "#71bc1d",
          500: "#239554",
        },
        blue: {
          100: "#3fbcaa",
        },
      },
    },
  },
  plugins: [],
};
export default config;

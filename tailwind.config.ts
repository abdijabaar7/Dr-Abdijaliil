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
        teal: {
          50: "#f0fbfb",
          100: "#dcf4f5",
          200: "#b9e9eb",
          300: "#86d6d9",
          400: "#4cbcc1",
          500: "#087F8C", // Primary Brand Teal
          600: "#066873",
          700: "#07545d",
          800: "#123B46", // Dark Teal
          900: "#0c2830",
          950: "#06181d",
        },
        mint: {
          50: "#F3F8F8",
          100: "#e7f2f2",
          200: "#d0e5e6",
        },
        navy: {
          800: "#123B46",
          900: "#0B252C",
          950: "#071B20",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;


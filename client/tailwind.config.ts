import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "serif"],
        heading: ["var(--font-heading)", "serif"],
        display: ["var(--font-display)", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#997E67",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "#F4D087",
          foreground: "var(--secondary-foreground)",
        },
        dark: "#111828",
      },
    },
  },
  plugins: [],
};

export default config;

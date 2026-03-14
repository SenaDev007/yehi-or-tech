import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)",
        blue: "var(--blue)",
        gold: "var(--gold)",
        orange: "var(--orange)",
        black: "var(--black)",
        white: "var(--white)",
        gray: "var(--gray)",
        lgray: "var(--lgray)",
        "gold-lt": "var(--gold-lt)",
        "blue-xl": "var(--blue-xl)",
        "blue-lt": "var(--blue-lt)",
        success: "var(--success)",
        "success-lt": "var(--success-lt)",
        error: "var(--error)",
        "error-lt": "var(--error-lt)",
        "dark-bg": "var(--dark-bg)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "gold-cta": "0 2px 8px rgba(245, 168, 0, 0.3)",
        "card-hover": "0 8px 32px rgba(13, 46, 140, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;

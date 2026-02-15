import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette YEHI OR Tech
        primary: {
          DEFAULT: "#0a1628",
          dark: "#061020",
          light: "#0f2847",
        },
        accent: {
          blue: "#2563eb",
          electric: "#3b82f6",
        },
        cta: {
          DEFAULT: "#eab308",
          hover: "#f59e0b",
        },
        neutral: {
          black: "#0f0f0f",
          white: "#fafafa",
          gray: "#94a3b8",
          "gray-light": "#cbd5e1",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

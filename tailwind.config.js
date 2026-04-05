/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0055A5",
          dark: "#003D7A",
          light: "#E8F0FA",
          50: "#F0F6FC",
          100: "#D6E6F5",
          600: "#0055A5",
          700: "#004488",
          800: "#003366",
          900: "#002244",
        },
        accent: {
          DEFAULT: "#FBB62E",
          dark: "#E5A520",
          light: "#FFF5DC",
          50: "#FFFAED",
          100: "#FFF0CC",
          500: "#FBB62E",
          600: "#E5A520",
          700: "#C98E10",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.375rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        "brand": "0 4px 14px 0 rgba(0, 85, 165, 0.15)",
        "brand-lg": "0 10px 30px 0 rgba(0, 85, 165, 0.2)",
        "card": "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
      },
      spacing: {
        section: "6rem",
        "section-sm": "3.5rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-left": {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-right": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        "slide-left": "slide-left 0.6s ease forwards",
        "slide-right": "slide-right 0.6s ease forwards",
        "scale-in": "scale-in 0.5s ease forwards",
        shimmer: "shimmer 2.5s infinite linear",
      },
    },
  },
  plugins: [],
};

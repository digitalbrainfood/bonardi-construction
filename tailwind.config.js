/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0D0D0B",
        carbon: "#161614",
        charcoal: "#1E1E1B",
        slate: "#2C2C28",
        stone: "#4A4A44",
        cement: "#7A7A72",
        ash: "#B0AFA6",
        ivory: "#F2EDE4",
        parchment: "#FAF7F0",
        gold: "#C9A44A",
        "gold-light": "#E8C96A",
        "gold-dark": "#9E7E32",
        rust: "#B04A2A",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "section": "7rem",
        "section-sm": "4rem",
      },
      backgroundImage: {
        "noise": "url('/noise.png')",
      },
    },
  },
  plugins: [],
};

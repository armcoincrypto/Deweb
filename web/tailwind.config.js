/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deweb: {
          bg: "#05070a",
          surface: "#0a0e14",
          card: "rgba(12, 18, 28, 0.72)",
          cyan: "#00f2ff",
          "cyan-dim": "#00b8c4",
          purple: "#7c3aed",
          magenta: "#c026d3",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 242, 255, 0.35)",
        "glow-sm": "0 0 20px rgba(0, 242, 255, 0.25)",
        "glow-lg": "0 0 80px rgba(0, 242, 255, 0.2)",
        card: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-mesh":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 242, 255, 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(124, 58, 237, 0.12), transparent), radial-gradient(ellipse 50% 30% at 0% 50%, rgba(192, 38, 211, 0.08), transparent)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

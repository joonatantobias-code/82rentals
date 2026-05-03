import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6EC6FF",   // light brand blue (logo color)
          "primary-600": "#3DAEFF",
          "primary-50": "#E8F4FF",
          secondary: "#0A3D62", // deep ocean
          "secondary-700": "#062a45",
          turquoise: "#1DD3B0",
          orange: "#FF7A00",
          bg: "#F2F6F9",
          text: "#2E2E2E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(10, 61, 98, 0.18)",
        glow: "0 0 60px -10px rgba(110, 198, 255, 0.55)",
        cta: "0 14px 32px -10px rgba(10, 61, 98, 0.55)",
        ring: "0 0 0 4px rgba(110, 198, 255, 0.25)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "wave-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "wave-x": "wave-x 18s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-ring": "pulse-ring 2.6s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

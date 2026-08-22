import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: {
          950: "#080A0E",
          900: "#0B0E14",
          850: "#10141C",
          800: "#151A24",
          700: "#1C222E",
          600: "#262D3B",
          500: "#39414F",
        },
        brand: {
          50: "#FFF3EC",
          100: "#FFE1D1",
          200: "#FFC1A3",
          300: "#FF9D70",
          400: "#FF7A2F",
          500: "#F2600F",
          600: "#CC4A06",
          700: "#A03A08",
          800: "#7A2E0C",
          900: "#5C240C",
        },
        wa: {
          400: "#3DDC7F",
          500: "#25D366",
          600: "#128C7E",
          700: "#075E54",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,122,47,0.18), 0 18px 60px -20px rgba(255,122,47,0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,122,47,0.16), transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

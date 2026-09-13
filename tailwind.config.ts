import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Derived from the Karuna Sneham Foundation logo
        primary: {
          DEFAULT: "#1B3A5C", // deep navy — the protecting "hand" in the mark
          light: "#2C517D",
          dark: "#122A44",
        },
        secondary: {
          DEFAULT: "#E1638A", // warm rose — the outer heart
          light: "#F0A0BB",
          dark: "#C24A6E",
        },
        accent: {
          DEFAULT: "#6E8B3D", // leaf green
          light: "#8FAE5C",
        },
        cta: {
          DEFAULT: "#E1638A", // primary call-to-action (booking)
          hover: "#C24A6E",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          hover: "#1EBE5A",
        },
        // Neon accent palette
        neon: {
          cyan:   "#00F5FF",
          violet: "#BF5FFF",
          rose:   "#FF2D78",
          green:  "#39FF14",
        },
        background: "#FDF8F4", // warm cream
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#22303F", // main text
          soft: "#5B6B7A", // secondary text
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-karla)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        warm: "0 12px 32px -12px rgba(27, 58, 92, 0.18)",
        soft: "0 8px 24px -10px rgba(225, 99, 138, 0.25)",
        glow: "0 0 25px -5px rgba(225, 99, 138, 0.4)",
        card: "0 10px 30px -5px rgba(27, 58, 92, 0.08)",
        "card-hover": "0 20px 40px -10px rgba(27, 58, 92, 0.15)",
        // Neon glow shadows
        "neon-cyan":   "0 0 20px rgba(0, 245, 255, 0.55), 0 0 40px rgba(0, 245, 255, 0.25)",
        "neon-rose":   "0 0 20px rgba(255, 45, 120, 0.55), 0 0 40px rgba(255, 45, 120, 0.25)",
        "neon-violet": "0 0 20px rgba(191, 95, 255, 0.55), 0 0 40px rgba(191, 95, 255, 0.25)",
        "neon-green":  "0 0 20px rgba(57, 255, 20, 0.55), 0 0 40px rgba(57, 255, 20, 0.25)",
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        neonPulse: {
          "0%, 100%": { opacity: "1",  boxShadow: "0 0 12px rgba(0,245,255,0.5), 0 0 30px rgba(0,245,255,0.2)" },
          "50%":      { opacity: "0.7", boxShadow: "0 0 24px rgba(0,245,255,0.9), 0 0 60px rgba(0,245,255,0.4)" },
        },
        orbDrift: {
          "0%":   { transform: "translate(0px, 0px) scale(1)" },
          "33%":  { transform: "translate(30px, -20px) scale(1.05)" },
          "66%":  { transform: "translate(-20px, 15px) scale(0.95)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        slideInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        spinSlow: {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float:       "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        shimmer:     "shimmer 3s linear infinite",
        ticker:      "ticker 28s linear infinite",
        "neon-pulse": "neonPulse 2.5s ease-in-out infinite",
        "orb-drift":  "orbDrift 12s ease-in-out infinite",
        "slide-in-up": "slideInUp 0.5s ease-out forwards",
        "fade-in":   "fadeIn 0.6s ease-out forwards",
        "spin-slow": "spinSlow 20s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;

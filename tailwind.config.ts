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
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

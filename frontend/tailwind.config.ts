import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#05070C",
          surface: "#0B0F19",
          raised: "#101526",
        },
        ice: {
          DEFAULT: "#5EE1FF",
          dim: "#3BB8D9",
        },
        signal: {
          DEFAULT: "#2F6FED",
          soft: "#4C86F5",
          deep: "#1B4FC4",
        },
        ink: {
          DEFAULT: "#F5F7FA",
          muted: "#8B93A7",
          faint: "#5A6178",
        },
        line: "rgba(255,255,255,0.08)",
        success: "#34D399",
        danger: "#F87171",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(5,7,12,0.9) 85%), radial-gradient(1200px 600px at 50% -10%, rgba(47,111,237,0.25), transparent)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        glow: "0 0 40px rgba(94,225,255,0.15)",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "bar-pulse": {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 18s ease infinite",
        "bar-pulse": "bar-pulse 1s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

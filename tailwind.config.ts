import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        museum: {
          void: "#050508",
          surface: "#0c0c14",
          panel: "#12121c",
          border: "#1e1e2e",
          muted: "#5c5c78",
          text: "#e4e4f0",
          neon: "#ff003c",
          "neon-dim": "#cc0030",
          warning: "#ffb020",
          scan: "#00f0ff",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-exo2)", "sans-serif"],
        mono: ["var(--font-share-tech)", "monospace"],
      },
      backgroundImage: {
        "grid-cyber":
          "linear-gradient(rgba(255,0,60,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,60,0.03) 1px, transparent 1px)",
        "scan-line":
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.02) 2px, rgba(0,240,255,0.02) 4px)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(255, 0, 60, 0.35), 0 0 60px rgba(255, 0, 60, 0.1)",
        "neon-sm": "0 0 12px rgba(255, 0, 60, 0.4)",
      },
      animation: {
        "pulse-neon": "pulse-neon 2.5s ease-in-out infinite",
        glitch: "glitch 4s infinite",
        scan: "scan 8s linear infinite",
      },
      keyframes: {
        "pulse-neon": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        glitch: {
          "0%, 90%, 100%": { transform: "translate(0)" },
          "92%": { transform: "translate(-2px, 1px)" },
          "94%": { transform: "translate(2px, -1px)" },
          "96%": { transform: "translate(-1px, -1px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

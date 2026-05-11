import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        "scrunch-blue": "#2A4AEA",
        "cloud-blue": "#93C0FE",
        "botanic-green": "#6E8920",
        "ai-green": "#D8FC3B",
        paper: "#FFFFFF",
        porcelain: "#F7F3EB",
        glaze: "#F1E8C7",
        earth: "#93886F",
        clay: "#40362E",
        coal: "#242220",
        ink: "#1D1107",
        // Data viz
        "viz-blue-300": "#93C0FE",
        "viz-blue-500": "#3C67F5",
        "viz-blue-800": "#1F2CAE",
        "viz-green-400": "#AECE31",
        "viz-green-600": "#84A027",
        "viz-green-800": "#586B16",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-newsreader)", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      animation: {
        "particle-flow": "particleFlow 3s linear infinite",
        "count-up": "countUp 1.2s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "grid-scan": "gridScan 4s ease-in-out infinite",
      },
      keyframes: {
        particleFlow: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(200%)", opacity: "0" },
        },
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(216, 252, 59, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(216, 252, 59, 0.8)" },
        },
        gridScan: {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

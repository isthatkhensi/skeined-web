/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#f7f7f7", // site background
        hero: "#687A57", // green hero base — deep enough for white text
        primary: "#849A70", // Skeined green — CTAs, active states
        "primary-light": "#C4CEBA", // light green highlights
        ink: "#2E2A27", // text-1 — warm charcoal for headings/body (softer than black)
        card: "#E6DDF3", // clearly lilac card background
        muted: "#6B5548", // text-2 — warm secondary copy
        faint: "#A09080", // text-3 — warm meta / captions
        sage: "#CFD0BA", // cozy craft accent (founding card border)
        linen: "#D6D0C2", // warm hairline borders / progress track
      },
      fontFamily: {
        sans: ["Urbanist", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
      },
      maxWidth: {
        content: "1440px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [],
};

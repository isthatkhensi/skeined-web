/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm-clay direction (2026-08) — matches the palette that just shipped
        // in the app. Clay is the thing you click; sage is demoted to
        // growth/progress accents only; gold/lavender are reserved for future use.
        page: "#FBF7F2", // site background
        card: "#FFFDFA", // card surface
        hero: "#B8795A", // clay-deep — token for the app's hero/pressed colour (decorative uses only, e.g. ring-offset; see .hero-cloud in index.css for the AA-safe gradient actually used behind white text)
        clay: "#E0A886", // Skeined clay — CTA fill, active states. Always pair with text-ink, never white.
        primary: "#8F5233", // AA-safe clay ink — links + accent text/icons on light surfaces
        "primary-light": "#F6E5DA", // clay tint — soft banners, card fills
        // text-1 — warm CHARCOAL, not near-black. Was #211814, which read as
        // flat black against the cream page and fought the softness of the rest
        // of the palette (founder, 2026-08). Still 11.75:1 on `page`, so the
        // warmth costs nothing in legibility.
        ink: "#3A322E",
        muted: "#75655C", // text-2 — warm secondary copy
        faint: "#7A6A5D", // text-3 — warm meta / captions (darkened from the app's textTertiary to clear AA on this bg)
        sage: "#7E9466", // growth/progress accent only — do not use for CTAs
        linen: "#EBE3DA", // warm hairline borders / progress track
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

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ───────────────────────────────────────────────────────────────
        // The same hierarchy the app runs on (2026-08):
        //   PRIMARY   clay      — the thing you click, and progress
        //   SECONDARY sage      — growth / completion
        //   TERTIARY  lavender + mulberry — supporting territory
        //   ACCENT    gold + rose — meaning, used sparingly
        //   NEUTRAL   page · card · linen · ink · muted · faint
        //
        // Each family is named after its ANCHOR — the solid the family is
        // built from. Tints and inks below are derived from that anchor, never
        // invented separately, which is what keeps the site and the app the
        // same colour rather than merely similar.
        //
        // Contrast rule inherited from the app: a CLAY FILL ALWAYS CARRIES DARK
        // INK, never white. Ignoring that is what turned the hero brown — the
        // only clay dark enough for white text isn't clay any more.
        // ───────────────────────────────────────────────────────────────

        // PRIMARY — clay
        clay: "#E0A886", // ANCHOR. CTA fills, active states, the 1-2-3 step circles.
        "clay-deep": "#B8795A", // pressed / deep fills
        "clay-ink": "#8F5233", // AA-safe clay ink for text + icons on light surfaces
        "clay-tint": "#F6E5DA", // chips, tiles, soft banners
        "clay-wash": "#FDF7F4", // the softest clay surface — large section fills (founder's tint, 2026-08)
        heroWash: "#E9C2A5", // the hero gradient's mid tone (ring-offset etc.)

        // SECONDARY — sage
        sage: "#7E9466", // ANCHOR
        "sage-deep": "#5F6E50",
        "sage-ink": "#4A5E3A", // AA-safe sage ink
        "sage-tint": "#E4EBD9",

        // TERTIARY — lavender + mulberry
        lavender: "#6B5A8A", // ANCHOR
        "lavender-tint": "#EAE5F5",
        mulberry: "#4E3F4C", // ANCHOR

        // ACCENT — gold + rose
        gold: "#CBA255", // ANCHOR
        "gold-ink": "#9A6F2C", // AA-safe gold ink
        "gold-tint": "#F4EBD7",
        rose: "#A85C6B", // ANCHOR
        "rose-ink": "#8E4152", // AA-safe rose ink
        "rose-tint": "#F6E6EA",

        // NEUTRAL
        page: "#FBF7F2", // site background
        card: "#FFFDFA", // card surface
        linen: "#EBE3DA", // warm hairline borders / tracks
        // text-1 — warm CHARCOAL, not near-black. Was #211814, which read as
        // flat black against the cream page and fought the softness of the rest
        // of the palette (founder, 2026-08). Still 11.75:1 on `page`.
        ink: "#3A322E",
        muted: "#75655C", // text-2 — warm secondary copy
        faint: "#7A6A5D", // text-3 — warm meta / captions

        // Back-compat aliases — existing markup uses these names.
        hero: "#B8795A", // = clay-deep
        primary: "#8F5233", // = clay-ink
        "primary-light": "#F6E5DA", // = clay-tint
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

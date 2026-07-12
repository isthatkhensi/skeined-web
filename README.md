# Nearo — Waitlist Landing (Clone)

A faithful clone of the [Nearo waitlist template](https://nearo-temlis.framer.website/), rebuilt as a modern React app.

## Tech stack

- **React 18** (Vite, functional components + hooks)
- **TypeScript**
- **Tailwind CSS v3** for styling
- **Framer Motion** for scroll-reveal animations and hero transitions
- **react-hook-form** for the email waitlist form (with validation)
- Semantic HTML, mobile-first responsive design
- Full meta / Open Graph / Twitter tags for social sharing

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Structure

```
src/
  components/
    Hero.tsx          # hero + waitlist form (react-hook-form) + Framer Motion intro
    Features.tsx      # "Features designed for your success" 2×2 grid
    FeatureCard.tsx   # shared card (used by Features + Steps)
    Steps.tsx         # "Get started in 3 simple steps" with numbered rail
    Testimonials.tsx  # infinite CSS marquee of beta-client quotes
    Footer.tsx        # dark footer
    Brand.tsx         # Nearo wordmark + glyph
    Reveal.tsx        # reusable scroll-into-view animation wrapper
  data.ts             # feature / step / testimonial content + asset imports
  assets/             # images downloaded from the original site
  index.css           # Tailwind layers + marquee/connector utilities
```

## Notes

- The waitlist form validates the email client-side and logs the value on submit
  (`console.info`) — wire `onSubmit` in `Hero.tsx` to your backend/ESP.
- Design tokens (colors, radius) live in `tailwind.config.js` under `theme.extend`.
- Animations respect `prefers-reduced-motion`.

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

## Deploying (automatic)

The site deploys itself. **To publish a change: commit and push to `main`** — in VS Code
that's the Source Control panel → *Commit* → *Sync/Push*. No `npm run build`, no zip, no
manual cPanel upload.

On every push to `main`, GitHub Actions (`.github/workflows/deploy.yml`):

1. installs dependencies and runs `npm run build` on a clean machine, and
2. uploads the resulting `dist/` to cPanel `public_html/` over **SSH/rsync** (key-based).

It's live in ~1–2 minutes. Watch progress (or re-run) in the repo's **Actions** tab.

### One-time setup — repository secrets

Add these under **GitHub → repo → Settings → Secrets and variables → Actions**. Plain FTP
is disabled on the host, so deploys go over SSH with a dedicated key — no password stored.

| Secret | What it is |
| --- | --- |
| `SSH_PRIVATE_KEY` | Private half of the deploy keypair. The matching public key is authorized in cPanel → SSH Access. |
| `FTP_SERVER` | The server host — reused as the SSH host (`skeined.com`). |
| `FTP_USERNAME` | cPanel account username — reused as the SSH user. |
| `VITE_SUPABASE_URL` | Same value as in your local `.env`. |
| `VITE_SUPABASE_ANON_KEY` | Same value as in your local `.env` (public client key). |

> The deploy connects on port 22 and writes to `public_html/` (relative to the cPanel
> account home). Both are set in `.github/workflows/deploy.yml`.

## Notes

- The waitlist form validates the email client-side and logs the value on submit
  (`console.info`) — wire `onSubmit` in `Hero.tsx` to your backend/ESP.
- Design tokens (colors, radius) live in `tailwind.config.js` under `theme.extend`.
- Animations respect `prefers-reduced-motion`.

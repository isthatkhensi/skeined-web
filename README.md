# Skeined — Marketing Site

The marketing and early-access waitlist site for **Skeined**, the calmest way to import
knitting and crochet patterns, follow clear charts, and never lose your place in a row.
Live at **[skeined.com](https://skeined.com)**.

## Tech stack

- **React 18** (Vite, functional components + hooks)
- **TypeScript**
- **Tailwind CSS v3** for styling
- **Framer Motion** for scroll-reveal animations and hero transitions
- **react-hook-form** for the waitlist form (with validation)
- **Supabase** for the waitlist backend
- **react-router-dom** for the legal/support pages
- Semantic HTML, mobile-first responsive design, full Open Graph / Twitter meta

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the Supabase values
npm run dev            # start the dev server (http://localhost:5173)
npm run build          # type-check + production build to /dist
npm run preview        # preview the production build
```

## Structure

```
src/
  components/          # Hero, Features, Steps, Pricing, Testimonials, Footer, Brand, …
  pages/              # Legal + support routes (Privacy, Terms, Support, Get, …)
  content/            # FAQ and legal copy
  lib/                # supabase client, pricing, links
  data.ts             # feature / step / testimonial content + asset imports
  assets/             # site imagery
  index.css           # Tailwind layers + marquee/connector utilities
```

Design tokens (colors, radius, fonts) live in `tailwind.config.js` under `theme.extend`.
The logo is an inline SVG in `components/Brand.tsx` that inherits its color from context
(white on dark surfaces, ink on light). Animations respect `prefers-reduced-motion`.

## Deploying (automatic)

The site deploys itself over SSH — no `npm run build`, no zip, no manual cPanel upload.
There are two environments, each tied to a branch:

| Push / merge to | Deploys to | For |
| --- | --- | --- |
| `develop` | **staging.skeined.com** | Previewing changes |
| `main` | **skeined.com** | Production (customers) |

**Do not commit directly to `main` or `develop`** — they're protected. Work on a feature
branch and open a Pull Request. The full playbook (with copy-paste commands) is in
[CONTRIBUTING.md](CONTRIBUTING.md).

On every merge, GitHub Actions (`.github/workflows/deploy.yml`) runs `npm run build` on a
clean machine and rsyncs `dist/` to the right cPanel folder over key-based SSH. Live in
~1–2 minutes. Every Pull Request also runs a build check (`.github/workflows/ci.yml`) that
must pass before it can merge. Watch everything in the repo's **Actions** tab.

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

> Production writes to `public_html/`; staging writes to `public_html/staging.skeined.com/`.
> Both targets are set per-branch in `.github/workflows/deploy.yml`.

# skeined Waitlist Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React waitlist landing site for skeined (knitting/crochet companion app) that clones the Nearo Framer template's layout patterns but replaces all colours, typography, and copy with skeined's brand and the founding-member-offer waitlist spec.

**Architecture:** Vite + React 18 + TypeScript SPA, no router (single page, six stacked sections). Tailwind CSS v3 with the skeined design tokens registered in `tailwind.config.js` theme. Framer Motion drives all scroll/mount animations. `react-hook-form` handles the single email field. Each page section is one component under `src/components/`; three small presentational primitives (`PhoneMockup`, `CobwebSVG`, `ProgressBar`) live under `src/components/ui/` and are shared across sections. No backend integration yet — the form logs to console and shows a success state, with a `TODO` marking where the Loops API call goes.

**Tech Stack:** React 18, TypeScript 5, Vite 5, Tailwind CSS v3, Framer Motion 11, react-hook-form 7, lucide-react (icons), Vitest (for the one piece of real calculation logic — progress-bar math).

## Global Constraints

- Colours (exact hex, register as Tailwind theme colors): `bg` #FAF6F0, `surface` #FFFFFF, `elevated` #F4F3FA, `primary` #B8AACF, `primary-light` #DDD7EC, `primary-dark` #7B6A9F, `secondary` #CFD0BA, `sage-light` #EAF0E6, `linen` #D6D0C2, `text-1` #111111, `text-2` #6B7280, `text-3` #9CA3AF, `cobweb` #D4D0DC.
- Typography: Urbanist only, loaded from Google Fonts, weights 400/500/600/700. Never use weight 900/black. No italics anywhere.
- Border radius scale: 4px (sm) / 8px (md, default) / 12px (lg) / 9999px (pill).
- Shadow: exactly one level, `0 1px 4px rgba(0,0,0,0.08)` — Tailwind's default `shadow` utility, no other shadow utilities used.
- Border: hairline `0.5px solid #D6D0C2` everywhere a border is needed. Always write this as the Tailwind pair `border-[0.5px] border-linen` (not a custom `.hairline` class — avoids cascade-order ambiguity when combined with per-side overrides like `border-l-[3px]`).
- No emojis in the UI anywhere except the lock icon in the hero pill badge, which must be the Lucide `Lock` icon (SVG), not a literal 🔒 character. Feature-card "screenshot" icons (PDF / paste / YouTube) also use Lucide icons (`FileText`, `Type`, `PlayCircle`), not emoji.
- Phone mockups are pure CSS/SVG — no external image assets, no image dependencies.
- All touch targets (buttons, nav CTA) are minimum 44×44px.
- Testing approach for this project: this is a static marketing page with almost no branching logic, so per-component "tests" are typecheck (`tsc --noEmit`) + a successful `vite build` + a documented manual visual-verification checklist (start `npm run dev`, check specific elements in the browser at 375px and 430px widths). The one piece of real calculation logic — the waitlist progress-bar math — gets an actual TDD unit test with Vitest; everything else does not need a test framework, since there is no logic to assert on beyond "does it render the exact copy and structure from the spec."
- Copy (headlines, body text, testimonials, footer text) must match the spec verbatim — do not paraphrase.

---

## File Structure

```
skeined-web root (this repo)
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── lib/
    │   ├── progress.ts          ← pure fn: claimed/total -> {percent, remaining}
    │   └── progress.test.ts
    └── components/
        ├── Nav.tsx
        ├── Hero.tsx
        ├── Features.tsx
        ├── Steps.tsx
        ├── Testimonials.tsx
        ├── Footer.tsx
        └── ui/
            ├── PhoneMockup.tsx
            ├── CobwebSVG.tsx
            └── ProgressBar.tsx
```

---

### Task 1: Project scaffolding — Vite + React + TypeScript + git

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx` (placeholder, replaced in Task 12)
- Create: `src/index.css` (placeholder, replaced in Task 2)

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, `npm run typecheck`, `npm run test` scripts that every later task relies on.

- [ ] **Step 1: Initialize git**

```bash
cd "/Users/isthatkhensi/Documents/Projects/Websites/Skeined"
git init
```

Expected: `Initialized empty Git repository in .../Skeined/.git/`

- [ ] **Step 2: Write `.gitignore`**

```
node_modules
dist
.DS_Store
*.local
```

- [ ] **Step 3: Write `package.json`**

```json
{
  "name": "skeined-web",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.11.9",
    "react-hook-form": "^7.53.0",
    "lucide-react": "^0.451.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.2",
    "vite": "^5.4.8",
    "vitest": "^2.1.2"
  }
}
```

- [ ] **Step 4: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 5: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vite/client"]
  },
  "include": ["src", "vite.config.ts"]
}
```

- [ ] **Step 6: Write placeholder `index.html`** (full meta tags added in Task 2)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>skeined</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Write placeholder `src/main.tsx`, `src/App.tsx`, `src/index.css`**

`src/main.tsx`:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

`src/App.tsx`:
```tsx
export default function App() {
  return <div>skeined</div>
}
```

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Install dependencies**

```bash
npm install
```

Expected: installs succeed, `node_modules/` created, no peer-dependency errors.

- [ ] **Step 9: Verify dev server boots**

```bash
npm run dev -- --port 5183 &
sleep 2
curl -s http://localhost:5183 | grep -o '<title>skeined</title>'
kill %1
```

Expected: prints `<title>skeined</title>`.

- [ ] **Step 10: Commit**

```bash
git add package.json vite.config.ts tsconfig.json .gitignore index.html src
git commit -m "chore: scaffold vite + react + typescript project"
```

---

### Task 2: Tailwind design tokens, global styles, favicon, full meta tags

**Files:**
- Create: `postcss.config.js`
- Create: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`
- Create: `public/favicon.svg`

**Interfaces:**
- Consumes: nothing (config-only task).
- Produces: Tailwind color tokens (`bg`, `surface`, `elevated`, `primary`, `primary-light`, `primary-dark`, `secondary`, `sage-light`, `linen`, `text-1`, `text-2`, `text-3`, `cobweb`), radius tokens (`sm`/`md`/`lg`/`pill`), `animate-marquee` utility — every later component task uses these class names.

- [ ] **Step 1: Write `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 2: Write `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF6F0',
        surface: '#FFFFFF',
        elevated: '#F4F3FA',
        primary: '#B8AACF',
        'primary-light': '#DDD7EC',
        'primary-dark': '#7B6A9F',
        secondary: '#CFD0BA',
        'sage-light': '#EAF0E6',
        linen: '#D6D0C2',
        'text-1': '#111111',
        'text-2': '#6B7280',
        'text-3': '#9CA3AF',
        cobweb: '#D4D0DC',
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        pill: '9999px',
      },
      boxShadow: {
        DEFAULT: '0 1px 4px rgba(0,0,0,0.08)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Replace `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  background-color: #faf6f0;
  font-family: 'Urbanist', sans-serif;
  color: #111111;
}
```

- [ ] **Step 4: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#B8AACF"/>
  <text x="16" y="22" font-family="Urbanist, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" text-anchor="middle">s</text>
</svg>
```

- [ ] **Step 5: Replace `index.html` with full meta tags**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>skeined — Make more. Frog less.</title>
    <meta
      name="description"
      content="The all-in-one crafting app for knitters and crocheters. Import patterns, track every row, scan yarn labels. Never lose your place again."
    />
    <meta property="og:title" content="skeined — Make more. Frog less." />
    <meta
      property="og:description"
      content="Import patterns from PDFs and YouTube. Track every row. Never lose your place. Founding member offer: skeined+ Pro, R499 once, 50 spots only."
    />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:url" content="https://skeined.app" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: exits 0, `dist/` produced, no Tailwind/PostCSS errors.

- [ ] **Step 7: Commit**

```bash
git add postcss.config.js tailwind.config.js src/index.css index.html public/favicon.svg
git commit -m "feat: register skeined design tokens and page meta tags"
```

---

### Task 3: `ProgressBar` primitive (with real TDD on the math)

**Files:**
- Create: `src/lib/progress.ts`
- Create: `src/lib/progress.test.ts`
- Create: `src/components/ui/ProgressBar.tsx`

**Interfaces:**
- Produces: `getProgress(claimed: number, total: number): { percent: number; remaining: number }`, `<ProgressBar claimed={number} total={number} />` — Hero (Task 7) renders this directly.

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/progress.test.ts
import { describe, expect, it } from 'vitest'
import { getProgress } from './progress'

describe('getProgress', () => {
  it('computes percent and remaining for a partial claim', () => {
    expect(getProgress(43, 50)).toEqual({ percent: 86, remaining: 7 })
  })

  it('clamps percent at 100 when claimed exceeds total', () => {
    expect(getProgress(60, 50)).toEqual({ percent: 100, remaining: 0 })
  })

  it('handles zero claimed', () => {
    expect(getProgress(0, 50)).toEqual({ percent: 0, remaining: 50 })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/lib/progress.test.ts
```

Expected: FAIL — `Cannot find module './progress'`.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/progress.ts
export function getProgress(claimed: number, total: number) {
  const percent = Math.min(100, Math.round((claimed / total) * 100))
  const remaining = Math.max(0, total - claimed)
  return { percent, remaining }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/lib/progress.test.ts
```

Expected: PASS, 3 tests passed.

- [ ] **Step 5: Write `ProgressBar` component**

```tsx
// src/components/ui/ProgressBar.tsx
import { getProgress } from '../../lib/progress'

interface ProgressBarProps {
  claimed: number
  total: number
}

export default function ProgressBar({ claimed, total }: ProgressBarProps) {
  const { percent, remaining } = getProgress(claimed, total)

  return (
    <div className="w-full max-w-sm">
      <div className="h-2 w-full overflow-hidden rounded-pill bg-linen">
        <div
          className="h-full rounded-pill bg-primary transition-[width] duration-500"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={claimed}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
      <p className="mt-2 text-sm text-text-3">
        {remaining} of {total} spots remaining
      </p>
    </div>
  )
}
```

- [ ] **Step 6: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/progress.ts src/lib/progress.test.ts src/components/ui/ProgressBar.tsx
git commit -m "feat: add waitlist progress bar with tested percent math"
```

---

### Task 4: `CobwebSVG` primitive (scroll-triggered draw animation)

**Files:**
- Create: `src/components/ui/CobwebSVG.tsx`

**Interfaces:**
- Produces: `<CobwebSVG />` — no props. Features (Task 8) places it absolutely inside the cobweb card.

- [ ] **Step 1: Write the component**

```tsx
// src/components/ui/CobwebSVG.tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const RADIAL_LINES = [
  'M80 0 L20 60',
  'M80 0 L40 40',
  'M80 0 L60 20',
  'M80 0 L0 80',
  'M80 0 L45 0',
]

const CROSS_THREADS = [
  'M62 18 Q 50 30 38 42',
  'M50 30 Q 35 45 20 60',
  'M35 45 Q 18 60 5 75',
]

const PATHS = [...RADIAL_LINES, ...CROSS_THREADS]

export default function CobwebSVG() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <svg
      ref={ref}
      className="pointer-events-none absolute right-0 top-0 h-20 w-20 opacity-40"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      {PATHS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#D4D0DC"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
        />
      ))}
    </svg>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/CobwebSVG.tsx
git commit -m "feat: add scroll-triggered cobweb svg primitive"
```

---

### Task 5: `PhoneMockup` primitive

**Files:**
- Create: `src/components/ui/PhoneMockup.tsx`

**Interfaces:**
- Produces: `<PhoneMockup className?: string>{children}</PhoneMockup>` — an iPhone frame (CSS only, no image) with a notch and rounded screen area. Hero (Task 7) and Steps (Task 9) both render arbitrary screen content through `children`.

- [ ] **Step 1: Write the component**

```tsx
// src/components/ui/PhoneMockup.tsx
import type { ReactNode } from 'react'

interface PhoneMockupProps {
  children: ReactNode
  className?: string
}

export default function PhoneMockup({ children, className = '' }: PhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto h-[572px] w-[280px] rounded-[40px] bg-[#111111] p-3 shadow-lg ${className}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-pill bg-[#111111]" />
      <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-bg">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/PhoneMockup.tsx
git commit -m "feat: add css-only iphone mockup primitive"
```

---

### Task 6: `Nav` component

**Files:**
- Create: `src/components/Nav.tsx`

**Interfaces:**
- Produces: `<Nav />` — sticky top bar. The CTA links to `#waitlist-form`, an anchor that Task 7 must place on the email form's wrapping element.

- [ ] **Step 1: Write the component**

```tsx
// src/components/Nav.tsx
export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b-[0.5px] border-linen bg-bg/90 px-6 py-4 backdrop-blur-sm">
      <span className="text-xl font-bold lowercase text-primary-dark">skeined.</span>
      <a
        href="#waitlist-form"
        className="flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-white"
      >
        Claim your spot
      </a>
    </nav>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add sticky nav with claim-your-spot cta"
```

---

### Task 7: `Hero` component

**Files:**
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `ProgressBar` (Task 3, props `claimed`/`total`), `PhoneMockup` (Task 5).
- Produces: `<Hero />`. Renders the `id="waitlist-form"` anchor target that `Nav`'s CTA (Task 6) scrolls to.

- [ ] **Step 1: Write the component**

```tsx
// src/components/Hero.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Lock } from 'lucide-react'
import ProgressBar from './ui/ProgressBar'
import PhoneMockup from './ui/PhoneMockup'

const TOTAL_SPOTS = 50
const SPOTS_REMAINING = 7 // TODO: wire to backend; currently hardcoded at 43/50 claimed

interface WaitlistFormValues {
  email: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

function ExecutionScreen() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="text-7xl font-bold text-text-1">47</span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-text-3">
        Current row
      </span>
      <p className="text-sm text-text-2">dc in next 3 sts, ch 2, sk 2 sts</p>
      <div className="absolute bottom-6 left-6 right-6 h-1.5 overflow-hidden rounded-pill bg-linen">
        <div className="h-full w-2/3 rounded-pill bg-primary" />
      </div>
    </div>
  )
}

export default function Hero() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormValues>()

  const onSubmit = (data: WaitlistFormValues) => {
    // TODO: Replace with Loops API call
    // POST https://app.loops.so/api/v1/contacts/create
    // Headers: Authorization: Bearer LOOPS_API_KEY
    // Body: { email, userGroup: "waitlist", source: "landing-page" }
    console.log(data.email)
    setSubmitted(true)
  }

  return (
    <section
      className="relative overflow-hidden px-6 pb-20 pt-16 text-center"
      style={{ background: 'linear-gradient(180deg, #EDE8F5 0%, #FAF6F0 60%)' }}
    >
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mb-6 inline-flex items-center gap-2 rounded-pill bg-sage-light px-4 py-2 text-sm text-primary-dark"
      >
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Founding member offer · 50 spots only
      </motion.div>

      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto max-w-2xl text-4xl font-bold leading-tight text-text-1 md:text-6xl"
      >
        Make more.
        <br />
        Frog less.
      </motion.h1>

      <motion.p
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-5 max-w-lg text-base text-text-2"
      >
        Import patterns from PDFs and YouTube tutorials. Track every row. Scan yarn labels.
        Organise your stash. Pick up exactly where you left off.
      </motion.p>

      <motion.p
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-2 text-sm text-text-3"
      >
        One less thing to unravel.
      </motion.p>

      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-8 max-w-sm rounded-md border-[0.5px] border-linen border-l-[3px] border-l-secondary bg-surface p-4 text-left"
      >
        <p className="text-sm font-semibold text-text-1">
          skeined+ Pro — everything, forever — R499 once.
        </p>
        <p className="mt-1 text-sm text-text-2">After launch: R89/month or R649/year.</p>
      </motion.div>

      <motion.div
        id="waitlist-form"
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-8 max-w-md scroll-mt-24"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex h-[52px]">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="h-full min-w-0 flex-1 rounded-l-md border-[0.5px] border-linen bg-surface px-4 text-sm text-text-1 outline-none focus:ring-1 focus:ring-primary"
                {...register('email', {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
              <button
                type="submit"
                className="h-full shrink-0 rounded-r-md bg-primary px-6 text-sm font-semibold text-white"
              >
                Claim my spot →
              </button>
            </div>
            {errors.email && (
              <p className="mt-2 text-left text-sm text-red-500">
                Enter a valid email address.
              </p>
            )}
            <div className="mt-4 flex justify-center">
              <ProgressBar claimed={TOTAL_SPOTS - SPOTS_REMAINING} total={TOTAL_SPOTS} />
            </div>
            <p className="mt-3 text-sm text-text-3">
              No spam. One email when early access opens.
              <br />
              We&apos;ll tell you exactly where you are in the queue.
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border-[0.5px] border-linen bg-sage-light p-4 text-sm font-semibold text-primary-dark"
          >
            You&apos;re on the list. We&apos;ll be in touch.
          </motion.div>
        )}
      </motion.div>

      <motion.ul
        custom={6}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-6 flex max-w-md flex-col items-start gap-2 text-sm text-text-2"
      >
        <li>✓ Early access before public launch</li>
        <li>✓ skeined+ Pro locked at R499 — yours forever</li>
        <li>✓ Direct line to the founder during beta</li>
      </motion.ul>

      <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} className="mt-12">
        <PhoneMockup>
          <ExecutionScreen />
        </PhoneMockup>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Manual visual check**

```bash
npm run dev
```

Open `http://localhost:5173` and confirm: pill badge shows a lock icon (not emoji), headline reads "Make more. / Frog less." on two lines, submitting a valid email swaps the form for the sage success message, submitting an invalid email shows the red validation line, progress bar reads "7 of 50 spots remaining". Resize to 375px and 430px widths and confirm no horizontal overflow.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add hero section with waitlist form and founding member offer"
```

---

### Task 8: `Features` component (4-card grid incl. cobweb card)

**Files:**
- Create: `src/components/Features.tsx`

**Interfaces:**
- Consumes: `CobwebSVG` (Task 4).
- Produces: `<Features />`.

- [ ] **Step 1: Write the component**

```tsx
// src/components/Features.tsx
import { motion } from 'framer-motion'
import { FileText, PlayCircle, Type } from 'lucide-react'
import CobwebSVG from './ui/CobwebSVG'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

function ImportScreenshot() {
  const rows = [
    { Icon: FileText, label: 'PDF', active: false },
    { Icon: Type, label: 'Paste text', active: false },
    { Icon: PlayCircle, label: 'YouTube link', active: true },
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4">
      {rows.map(({ Icon, label, active }) => (
        <div
          key={label}
          className={`flex items-center gap-2 rounded-sm px-3 py-2 text-sm ${
            active ? 'bg-primary-light text-primary-dark' : 'bg-surface text-text-2'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </div>
      ))}
    </div>
  )
}

function CounterScreenshot() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1">
      <span className="text-5xl font-bold text-text-1">47</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-text-3">
        Current row
      </span>
      <p className="mt-1 text-xs text-text-2">dc in next 3 sts, ch 2, sk 2 sts</p>
    </div>
  )
}

function StashScreenshot() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="w-full rounded-sm border-[0.5px] border-linen bg-surface p-3 text-sm text-text-2">
        Drops Safran · Vanilla Yellow · DK · 229 yds
      </div>
    </div>
  )
}

const CARDS = [
  {
    Screenshot: ImportScreenshot,
    title: 'Import Any Pattern',
    copy: 'PDF, paste, or paste a YouTube link. skeined reads the captions and builds you a row-by-row guide.',
  },
  {
    Screenshot: CounterScreenshot,
    title: 'Row by Row',
    copy: 'One tap advances your row. Press and hold to undo. Your linked counters move with you.',
  },
  {
    Screenshot: StashScreenshot,
    title: 'Stash. Scanned.',
    copy: 'Point your camera at a yarn label. skeined reads it and fills your stash entry. You set the quantity.',
  },
]

export default function Features() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold text-text-1 md:text-4xl">Not just a row counter.</h2>
          <p className="mt-3 text-base text-text-2">Explore what makes skeined different.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CARDS.map(({ Screenshot, title, copy }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="overflow-hidden rounded-md border-[0.5px] border-linen bg-surface shadow"
            >
              <div className="h-40 bg-elevated">
                <Screenshot />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-text-1">{title}</h3>
                <p className="mt-2 text-sm text-text-2">{copy}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-md border-[0.5px] border-linen border-l-[3px] border-l-cobweb p-6"
            style={{ backgroundColor: '#F7F3EC' }}
          >
            <CobwebSVG />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-text-3">
              One less thing to unravel
            </span>
            <h3 className="mt-3 text-xl font-semibold text-text-1">
              If a project goes quiet, skeined leaves a quiet signal.
            </h3>
            <p className="mt-3 text-sm text-text-2">
              No alarm. No guilt. Just a reminder that your Forest Cardigan is still waiting.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Manual visual check**

Start `npm run dev`, scroll to the features section, confirm the fourth card (cobweb) has the warmer `#F7F3EC` background distinct from the other three white cards, and that the cobweb lines draw in when the card scrolls into view.

- [ ] **Step 4: Commit**

```bash
git add src/components/Features.tsx
git commit -m "feat: add features grid with cobweb-treatment card"
```

---

### Task 9: `Steps` component (scroll-driven numbered steps + phone mockup)

**Files:**
- Create: `src/components/Steps.tsx`

**Interfaces:**
- Consumes: `PhoneMockup` (Task 5).
- Produces: `<Steps />`.

- [ ] **Step 1: Write the component**

```tsx
// src/components/Steps.tsx
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import PhoneMockup from './ui/PhoneMockup'

const STEPS = [
  {
    number: '01',
    title: 'Import your pattern.',
    copy: 'PDF from your files, paste the written instructions, or drop in a YouTube tutorial link. skeined does the reading.',
  },
  {
    number: '02',
    title: 'Follow it row by row.',
    copy: "One instruction at a time. Press and hold any abbreviation you don't recognise and get the answer instantly.",
  },
  {
    number: '03',
    title: 'Never lose your place.',
    copy: 'Put your phone down. Pick it up tomorrow. Row 12 is still waiting. Right where you left it.',
  },
]

function ImportMockup() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-6">
      {['PDF', 'Paste text', 'YouTube link'].map((label) => (
        <div
          key={label}
          className="rounded-sm border-[0.5px] border-linen bg-surface px-3 py-2 text-sm text-text-2"
        >
          {label}
        </div>
      ))}
    </div>
  )
}

function ExecutionMockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
      <span className="text-6xl font-bold text-text-1">12</span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-text-3">
        Current row
      </span>
      <p className="text-sm text-text-2">sc in each st across</p>
      <div className="mt-2 rounded-sm border-[0.5px] border-linen bg-primary-light px-3 py-1 text-xs text-primary-dark">
        sc = single crochet
      </div>
    </div>
  )
}

function ReturnMockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
      <span className="text-6xl font-bold text-text-1">12</span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-text-3">
        Current row
      </span>
      <p className="text-xs text-text-3">Last session: yesterday</p>
    </div>
  )
}

const MOCKUPS = [ImportMockup, ExecutionMockup, ReturnMockup]

interface StepProps {
  step: (typeof STEPS)[number]
  index: number
  isLast: boolean
  onActive: (index: number) => void
}

function Step({ step, index, isLast, onActive }: StepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' })

  useEffect(() => {
    if (isInView) onActive(index)
  }, [isInView, index, onActive])

  return (
    <div ref={ref} className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            isInView ? 'bg-primary-dark text-white' : 'bg-linen text-text-3'
          }`}
        >
          {step.number}
        </div>
        {!isLast && <div className="mt-1 h-full w-px border-l border-dashed border-linen" />}
      </div>
      <div className="pb-16">
        <h3 className="text-xl font-semibold text-text-1">{step.title}</h3>
        <p className="mt-2 max-w-sm text-sm text-text-2">{step.copy}</p>
      </div>
    </div>
  )
}

export default function Steps() {
  const [active, setActive] = useState(0)
  const ActiveMockup = MOCKUPS[active]

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold text-text-1 md:text-4xl">
            Get started in three steps.
          </h2>
          <p className="mt-3 text-base text-text-2">
            From nothing to row-by-row in under two minutes.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            {STEPS.map((step, i) => (
              <Step
                key={step.number}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
                onActive={setActive}
              />
            ))}
          </div>

          <div className="sticky top-24 self-start">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <PhoneMockup>
                <ActiveMockup />
              </PhoneMockup>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Manual visual check**

Start `npm run dev`, scroll through the steps section, confirm the active step's numbered circle turns `primary-dark`/white while inactive ones stay `linen`/`text-3`, and the phone mockup content swaps between the import/execution/return screens as you scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/Steps.tsx
git commit -m "feat: add scroll-driven three-step section"
```

---

### Task 10: `Testimonials` component (infinite marquee)

**Files:**
- Create: `src/components/Testimonials.tsx`

**Interfaces:**
- Produces: `<Testimonials />`.

- [ ] **Step 1: Write the component**

```tsx
// src/components/Testimonials.tsx
const TESTIMONIALS = [
  {
    quote:
      "I finally stopped losing my place mid-row. It sounds small but it changed how I crochet entirely.",
    name: 'Thandi M.',
    craft: 'Crochet hobbyist',
    initial: 'T',
  },
  {
    quote:
      "The YouTube import is the feature I didn't know I needed. I paste a link and I have a pattern.",
    name: 'James K.',
    craft: 'Knitter',
    initial: 'J',
  },
  {
    quote:
      'Finally an app made by someone who actually crafts. You can feel it in every little detail.',
    name: 'Ayesha R.',
    craft: 'Knitter & crocheter',
    initial: 'A',
  },
  {
    quote:
      "I've tried five different counter apps. This is the only one I've kept on my home screen.",
    name: 'Priya N.',
    craft: 'Crochet maker',
    initial: 'P',
  },
]

function TestimonialCard({ quote, name, craft, initial }: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="w-80 shrink-0 rounded-md border-[0.5px] border-linen bg-surface p-5 shadow">
      <p className="text-sm text-text-2">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary-dark">
          {initial}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-1">{name}</p>
          <p className="text-xs text-text-3">{craft}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto max-w-lg px-6 text-center">
        <h2 className="text-3xl font-bold text-text-1 md:text-4xl">What crafters are saying.</h2>
        <p className="mt-3 text-base text-text-2">
          From beta testers who&apos;ve been using skeined in their craft sessions.
        </p>
      </div>

      <div className="mt-12 flex w-max animate-marquee gap-6 px-6 hover:[animation-play-state:paused]">
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Manual visual check**

Start `npm run dev`, confirm the testimonial row scrolls continuously left and loops seamlessly, and that hovering over it pauses the scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/Testimonials.tsx
git commit -m "feat: add infinite-scroll testimonials carousel"
```

---

### Task 11: `Footer` component

**Files:**
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Produces: `<Footer />`.

- [ ] **Step 1: Write the component**

```tsx
// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[#111111] px-6 py-12 text-text-3">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <p className="text-lg font-bold text-white">skeined.</p>
          <p className="mt-2 text-sm">Keep your craft. We&apos;ll keep your place.</p>
          <p className="mt-1 text-sm">© 2026 MalHQ · Johannesburg, South Africa</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3">
            <div
              className="h-11 w-32 rounded-md bg-[#1c1c1c]"
              role="img"
              aria-label="App Store badge placeholder"
            />
            <div
              className="h-11 w-32 rounded-md bg-[#1c1c1c]"
              role="img"
              aria-label="Play Store badge placeholder"
            />
          </div>
          <p className="text-sm">Launching soon</p>
        </div>

        <nav className="flex flex-col items-center gap-2 text-sm md:items-end">
          <a href="#" className="text-white hover:text-primary-light">
            Instagram
          </a>
          <a href="#" className="text-white hover:text-primary-light">
            TikTok
          </a>
          <a href="/privacy" className="text-white hover:text-primary-light">
            Privacy Policy
          </a>
          <a href="/terms" className="text-white hover:text-primary-light">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add footer with wordmark, store badges, and legal links"
```

---

### Task 12: Wire `App`, final integration build, cross-check against spec

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Nav` (Task 6), `Hero` (Task 7), `Features` (Task 8), `Steps` (Task 9), `Testimonials` (Task 10), `Footer` (Task 11).

- [ ] **Step 1: Replace `src/App.tsx`**

```tsx
// src/App.tsx
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import Steps from './components/Steps'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text-1">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Steps />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Run full test suite**

```bash
npm run test
```

Expected: all `progress.test.ts` cases pass.

- [ ] **Step 3: Typecheck and production build**

```bash
npm run build
```

Expected: exits 0, `dist/` contains `index.html` and hashed JS/CSS assets, no TypeScript or Tailwind errors.

- [ ] **Step 4: Full manual walkthrough**

```bash
npm run dev
```

Open the page and, at both 375px and 430px viewport widths, verify against the spec:
- Nav is sticky, wordmark lowercase, CTA scrolls to the form.
- Hero shows lock-icon pill, two-line headline, founding member card, working form (valid submit → success state, invalid submit → error), progress bar text "7 of 50 spots remaining", phone mockup with "47" / "CURRENT ROW" / instruction line.
- Features shows 4 cards; the cobweb card is visually distinct (warm `#F7F3EC` bg, cobweb SVG, larger copy).
- Steps: 3 numbered items, dashed connector, phone mockup content changes on scroll.
- Testimonials: 4 cards looping infinitely, pauses on hover.
- Footer: dark background, wordmark, store badge placeholders, legal links.
- No horizontal scroll at either width; page background is `#FAF6F0` (not pure white) visible above/below the hero gradient.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: assemble skeined waitlist landing page"
```

---

## Self-Review Notes

- Spec coverage checked section-by-section (nav, hero incl. pill/headline/subhead/tagline/offer card/form/progress bar/proof lines/phone mockup, features incl. cobweb card, steps, testimonials, footer, meta tags, animations, form TODO comment, file structure) — every item maps to a task above.
- No placeholder steps remain; every step has complete, runnable code.
- Cross-file naming checked: `getProgress`/`ProgressBar` (Task 3) matches its only consumer in Hero (Task 7); `PhoneMockup` children prop (Task 5) matches usage in Hero and Steps; `CobwebSVG` (Task 4) takes no props, matching its usage in Features (Task 8); the `#waitlist-form` anchor produced in Hero (Task 7) matches the href consumed by Nav (Task 6).
- Deliberately did not add a full component-testing framework (React Testing Library etc.) since none of the components beyond `ProgressBar`'s math have branching logic to assert on — see the Testing Approach constraint above.

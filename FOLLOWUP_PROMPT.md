# Skeined landing page — follow-up fixes (send this as-is)

Please make the following fixes to the existing build. Nothing here is a rebuild — these are
targeted corrections.

## 1. Feature ordering — pattern import (especially YouTube import) goes FIRST, everywhere a
## feature list appears

Import is Skeined's shining, most differentiating feature — pasting a messy PDF or a YouTube
tutorial link and getting a clean, row-by-row pattern back. Wherever features are listed as an
ordered set, import must be the first item:
- The 4 feature cards on the landing page (already first if it currently reads "Pattern Import" as
  card 1 — verify and keep it that way).
- The Pro tier's feature bullets in `src/lib/pricing.ts` — "Unlimited pattern imports" (or a
  YouTube-specific mention) must lead the list, not sit wherever it currently is.
- Any other ordered feature list you find (hero proof-lines, etc.) — same rule.

## 2. Pricing/feature copy — factual corrections in `src/lib/pricing.ts`

The current tier feature lists don't match what the real app does. Replace with:

**Free:**
```
"Import 3 starter patterns to try",
"Row counter with up to 4 linked counters",
"Full stitch dictionary + tooltips",
"XP, levels, badges & streaks",
"5 active projects, 5 yarn scans/month",
```

**Pro** (import-related item first, per §1):
```
"Unlimited pattern imports — PDF, paste, or YouTube link",
"Auto-generated stitch charts",
"Unlimited projects & yarn scanning",
"Craft assistant for Q&A and sizing help",
"All-device sync",
```
Remove "Priority support" — it isn't a real, confirmed feature; don't advertise it.

**Creator** — remove "Sales insights" entirely. **Skeined is explicitly not a pattern
marketplace** (founder's own product rule) — this promises something that doesn't exist and could
create a real support/trust problem later. Replace the Creator feature list with:
```
"Everything in Pro",
"Chart builder & image-to-chart design tools",
"Publish and share your own patterns",
"Run tester calls for your designs",
"Voice notes while designing",
```

## 3. Wire up the real Supabase env values (needed for /reset-password to actually work)

Read `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`'s real values directly from
`/Users/isthatkhensi/Documents/Projects/Apps/skeined/.env.local` (the app repo, same machine) —
they're named `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` there, same values, just
copy them across under the `VITE_*` names into a new `.env` file in this project. These are public
anon keys, safe to use in a frontend.

## 4. Fix `.gitignore` before creating that `.env` file

Add explicit entries — the current file only catches `.env.local`/`*.local`, not a plain `.env`:
```
.env
.env.local
```

## 5. Initialize git

This project has no version control at all yet (`git status` returns "not a git repository").
Run `git init`, make sure the `.gitignore` fix above is in place FIRST, then create a sensible
initial commit. Don't push anywhere yet — just get local history started.

## 6. Fix the placeholder Play Store URL's package name

In `src/lib/links.ts`, `PLAY_STORE_URL` uses `com.skeined.app` — the real Android package name is
**`com.malhq.skeined`**. Fix the placeholder to use the correct package name even though the full
URL is still a TODO.

## 7. Colour token precision — two values are close but not exact

In `tailwind.config.js`:
```
sage:  "#9FB295"  →  "#CFD0BA"
linen: "#E7DFCF"  →  "#D6D0C2"
```
(`ink`, `muted`, `faint` are already correct or close enough — no change needed there.)

## 8. `og:url` in `index.html`

Currently `https://skeined.example.com/` — change to `https://skeined.com/` (the app's actual
domain, per its own docs) even though the site isn't deployed there yet.

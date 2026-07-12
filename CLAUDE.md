# Skeined Website

## What Skeined is

A "cozy productivity" companion app for knitters and crocheters — smart row counting, pattern
tracking, gamification. Tagline: **"Keep your place. Keep your peace."** Domain: skeined.com /
skeined.app. Cozy, calm, unhurried voice — never salesy or aggressive. UK/South African English.

This repo is the **marketing website**, separate from the Expo/React Native app. Avoid AI-generic
design defaults (cream+serif+terracotta, purple-gradient hero, Inter/Space Grotesk as the "safe"
font) — Skeined already has a considered palette and voice; extend it, don't default past it.

## Design tokens (match these, don't invent new ones)

```
background  #FAF6F0   linen      #D6D0C2   sage       #CFD0BA
lavender    #B8AACF   warmBark   #4A3030   chocolate  #2C1A0C
textPrimary #1C1714   textSecondary #6B5548
```

- Typography: **Urbanist** only (weights up to 700, never 900/black).
- Border radius: 4 / 6 / 8 / 10 / 999 (pill).
- Cards: no fill in light mode, linen border + soft shadow — content IS the card, not a filled box.

## Repo separation — do NOT put this work in the app repo

The Expo/React Native app lives at `/Users/isthatkhensi/Documents/Projects/Apps/skeined`
(different stack, different deploy target — e.g. Next.js/Astro on Vercel vs. EAS/App Store).
The only shared resource between the two projects is the **Supabase project** (same backend,
different frontend) — see below.

## Pages required

Full list at `docs/web-pages-required.md` in the app repo (founder is building most of these).
Three groups:

- **Review-blocking**: privacy, support, terms, delete-account-info.
- **Auth landers**: `/reset-password`, `/confirm`, `/auth-error` — these receive Supabase's auth
  redirect links and must either complete the flow on web or deep-link into the app.
- **Marketing**: landing page, waitlist, download redirect.

**Auth landers are the important technical bit.** Supabase's password-reset/email-confirm links
point at a URL configured in Supabase Auth settings (Site URL + redirect URLs) — currently
placeholder/localhost, and pointing this site at them is the actual production fix. The lander
pages receive a token in the URL and either complete the action via the Supabase JS client (anon
key only, safe to expose) or hand off to the app via a `skeined://` deep link.

## The Supabase project (shared backend — do not create a new one)

The website's waitlist form writes to a Supabase table in the **existing** Skeined Supabase
project — get the URL + anon key from the founder (same values as the app's `.env.local`:
`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` — anon key is safe for a public web
form). A `waitlist` table (email, created_at, referral/source if wanted) with RLS allowing
**anon insert-only, no read** is the right shape — migrations for this live in the app repo's
`supabase/migrations/` folder, applied by the founder. Ask the founder (or whoever picks this up
in the app repo) to add that migration if it doesn't exist yet.

## Founding Member offer — the plan, so waitlist copy matches reality

Decided in the app-side session (2026-07-12):

- **Lifetime = a genuine one-time purchase**, first 50 buyers only, grants **Pro forever** (not
  Creator — Creator is always paid separately, full price, even for founding members).
- **The waitlist page collects email ONLY — no payment, no payment gateway.** Apple requires
  in-app digital unlocks to go through In-App Purchase, not an external processor, so charging on
  the website would risk App Store rejection, and isn't possible before the app/product exists
  anyway. Flow: join waitlist (free) → early access opens → download the app → complete the
  Founding Member purchase *inside the app* via Apple's own payment system (already wired via
  RevenueCat on the app side).
- Scarcity messaging ("only 50 lifetime spots") is fine on the landing page as a queue-priority
  signal — don't build or imply a checkout flow on the website itself.
- Backend scaffolding for the count/cap/entitlement lives in the app repo (`founding_members`
  table + RPC), independent of this website work.

## Voice reference

Calm, warm, honest, never hypey. If you have file access to the app repo, `CLAUDE.md` there has
the full design system — the tokens above cover the essentials for this repo.

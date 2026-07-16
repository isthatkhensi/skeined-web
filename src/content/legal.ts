// ─────────────────────────────────────────────────────────────────────────────
// LEGAL COPY — verbatim source provided by the founder (MalHQ / Skeined).
// TODO(founder): set the real "Last updated" date in each document below, and
// have a lawyer glance over the subscriptions/refund/liability/governing-law
// sections before taking real payments.
// ─────────────────────────────────────────────────────────────────────────────

export const LEGAL_READY = true;

export const privacyMarkdown = `**Last updated:** [date you publish this]

Skeined ("we," "us") is a knitting and crochet companion app, made by MalHQ, based in Johannesburg, South Africa. This policy explains what we collect, why, and what your rights are. Questions: **privacy@skeined.com**.

## What we collect

**Account information.** Email address, a username, an optional display name and avatar, and which craft you make (knitting/crochet/both). Handled through our authentication provider (Supabase). You can start using Skeined anonymously with limited features before creating a full account.

**Your content.** The patterns you import (PDF files, pasted text, or YouTube links), your projects and row progress, your yarn stash entries — including any photos you take to scan a yarn label — and your notes. This is yours; we store it to run the app, not to use it for anything else.

**Purchase information.** Whether you're on Free or Pro, or hold a Founding Member lifetime purchase. Payment itself is handled entirely by Apple's App Store or Google Play — **we never see or store your card details.** We receive only a confirmation of your subscription/purchase status.

**Usage data.** Session activity, rows counted, streaks — the numbers that power Skeined's own progress features (XP, badges, streaks). Used to run those features and to understand which parts of the app are actually useful, not shared with advertisers.

**Device information.** A push-notification token, if you've enabled notifications, so we can send you the reminders you've asked for. Basic device and app-version info for crash diagnostics.

## How pattern content is processed

When you import a pattern (PDF, pasted text, or a YouTube link) or scan a yarn label, that content is sent from our own servers to a third-party AI service provider (Anthropic) to be read and turned into a structured, row-by-row pattern. This happens through our backend, not directly from your device to Anthropic, and the content is not used by Anthropic to train their models under our agreement with them. This is genuinely how the "paste a messy pattern, get a clean counter" feature works — we're telling you plainly rather than burying it.

## Who else sees your data

- **Supabase** — hosts our database and handles authentication.
- **Anthropic** — processes pattern/photo content you submit for import or scanning, as above.
- **Apple App Store / Google Play / RevenueCat** — process purchases and report back your subscription status. They handle your payment details under their own privacy policies; we never receive them.
- **Expo** — delivers push notifications you've opted into.

**We do not use advertising networks. We do not sell your data, ever, to anyone.** We don't share your patterns, photos, or projects with other Skeined users unless a future feature explicitly asks you to publish or share something, and you choose to.

## How long we keep it

We keep your data while your account is active. Deleting your account (Settings → Delete account, or Settings → Reset — if you only want to clear specific content) removes the corresponding data from our systems. Some records — like purchase receipts — may be kept longer where Apple, Google, or the law requires it.

## Your rights

- **Export** your data (Settings → Export data).
- **Delete** your account and content (Settings → Delete account).
- **Reset** selected categories of your data without deleting your account (Settings → Reset).
- **Correct** your account info anytime by editing your profile.

## Children

Skeined isn't directed at children, and we don't knowingly collect data from anyone under 13 (or 16, where local law sets a higher age). If you believe a child has created an account, contact us and we'll remove it.

## Security

We take reasonable technical and organisational measures to protect your data. No method of storage or transmission is 100% secure, and we can't guarantee absolute security — but we treat your craft data with the same care we'd want for our own.

## Changes to this policy

If we make a material change, we'll let you know — through the app or by email — before it takes effect.

## Contact

**privacy@skeined.com**
`;

export const termsMarkdown = `**Last updated:** [date you publish this]

These terms govern your use of Skeined, made by MalHQ. By creating an account or using the app, you agree to them. Questions: **legal@skeined.com** (or privacy@skeined.com — your call whether to run one shared inbox for both).

## What Skeined is

A companion app for knitters and crocheters: row counting, pattern import (PDF/paste/YouTube), yarn stash tracking, and progress/gamification features. Free to use, with an optional Pro subscription, and a limited-time Founding Member lifetime offer.

## Accounts

You're responsible for the accuracy of your account information and for keeping your credentials secure. One account per person. You can use core features anonymously before creating a full account; some features require a signed-in account.

## Subscriptions and purchases

- **Pro** is an auto-renewing subscription (monthly or annual), billed through the Apple App Store or Google Play. Every new account gets a 7-day free trial of Pro; it converts to a paid subscription automatically unless you cancel first, through your App Store or Play Store account settings — we can't cancel it from our side.
- **Founding Member** is a **one-time, non-recurring purchase**, limited to the first 50 buyers, granting **permanent Pro access** — never billed again.
- Refunds are handled by Apple or Google per their own policies, not directly by us — we're not able to issue refunds ourselves for purchases made through their stores.

## Your content

You keep ownership of the patterns, designs, and notes you create or import into Skeined. You're responsible for having the right to use any pattern you import — Skeined is a tool for working with patterns you're entitled to use, not a claim over pattern designers' own copyright.

## Using Skeined fairly

Please don't: attempt to circumvent purchase or subscription checks; use the craft assistant for anything outside knitting/crochet/craft questions (it's built and restricted to stay that way); scrape, reverse-engineer, or resell access to the app; or use the service in a way that disrupts it for other makers.

## The pattern engine is a tool, not a guarantee

Pattern parsing and chart generation are automated, best-effort tools. They read your pattern and build a working structure from it — but they can occasionally misread ambiguous instructions, especially in prose that doesn't follow a common convention. Always keep an eye on your work against the original pattern, particularly for anything load-bearing (fit, sizing, stitch counts at a critical row). We're always working to make this more accurate, but craft mistakes happen to the best tools and the best crafters alike, and we can't be liable for them.

## Ending your account

You can delete your account anytime (Settings → Delete account). We may suspend or terminate accounts that violate these terms.

## Disclaimers and liability

Skeined is provided "as is." We work hard to make it reliable, but we don't guarantee it will be error-free or uninterrupted. To the extent permitted by law, MalHQ isn't liable for indirect damages arising from your use of the app, including craft outcomes.

## Governing law

These terms are governed by the laws of South Africa.

## Changes to these terms

We'll notify you of material changes before they take effect.

## Contact

**legal@skeined.com**
`;

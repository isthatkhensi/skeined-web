import { Link } from "react-router-dom";
import Brand from "./Brand";

const socials = [
  {
    label: "Instagram (@skeined)",
    href: "https://instagram.com/skeined",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2zm0 3.13A6.67 6.67 0 1 0 18.67 12 6.67 6.67 0 0 0 12 5.33zm0 11a4.33 4.33 0 1 1 4.33-4.33A4.33 4.33 0 0 1 12 16.33zm6.93-11.2a1.56 1.56 0 1 1-1.56-1.55 1.56 1.56 0 0 1 1.56 1.55z",
  },
  {
    label: "TikTok (@skeined)",
    href: "https://tiktok.com/@skeined",
    path: "M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.3v13.15a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-.9-5.04v-3.4a5.9 5.9 0 0 0 .9 11.72 5.9 5.9 0 0 0 5.9-5.9V8.98a7.55 7.55 0 0 0 4.44 1.42V7.1a4.28 4.28 0 0 1-3.28-1.28z",
  },
];

const footerLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQs", href: "/#faqs" },
];

export default function Footer() {
  return (
    <footer className="rounded-t-card bg-clay text-ink">
      <div className="mx-auto max-w-content px-5 py-14 sm:px-10">
        <div className="grid gap-12 pb-12 md:grid-cols-3">
          {/* brand + socials */}
          <div className="max-w-sm">
            <Brand className="text-ink" />
            <p className="mt-4 text-sm leading-relaxed text-ink/90">
              The calmest way to import patterns, keep your yarn in order, and
              never lose your place in a row. Coming soon to iOS and Android.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink/90 transition hover:border-ink hover:text-ink"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* product links */}
          <nav aria-label="Footer" className="md:justify-self-center">
            <h3 className="text-sm font-semibold text-ink">Product</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink/90">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative inline-block transition before:absolute before:-inset-x-2 before:-inset-y-3.5 before:content-[''] hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className="md:justify-self-end md:text-right">
            <h3 className="text-lg font-semibold text-ink">
              Ready to cast on?
            </h3>
            <p className="mt-2 max-w-xs text-sm text-ink/90">
              Join the waitlist and lock in Pro for life as a Founding Member.
            </p>
            <a
              href="/#waitlist"
              className="mt-5 inline-flex rounded-full bg-card px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:opacity-90"
            >
              Join waitlist
            </a>
          </div>
        </div>

        {/* bottom bar: copyright + legal */}
        <div className="flex flex-col items-center gap-4 border-t border-ink/15 pt-8 text-sm text-ink/90 sm:flex-row sm:justify-between">
          <p>© 2026 Skeined. All rights reserved.</p>
          <nav className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="relative inline-block transition before:absolute before:-inset-x-2 before:-inset-y-3.5 before:content-[''] hover:text-ink"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="relative inline-block transition before:absolute before:-inset-x-2 before:-inset-y-3.5 before:content-[''] hover:text-ink"
            >
              Terms of Service
            </Link>
            <Link
              to="/support"
              className="relative inline-block transition before:absolute before:-inset-x-2 before:-inset-y-3.5 before:content-[''] hover:text-ink"
            >
              Support
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

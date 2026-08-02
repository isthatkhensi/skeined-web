import type { ReactNode } from "react";
import Brand from "./Brand";
import Footer from "./Footer";

// Anchor links back to the homepage sections (work from any subpage).
const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Why", href: "/#why" },
];

interface PageShellProps {
  title: string;
  intro?: string;
  /** show the site footer (legal + support pages); hide for bare utility pages */
  withFooter?: boolean;
  children: ReactNode;
}

/** Light, calm layout for standalone pages: home-linked header, title, content. */
export default function PageShell({
  title,
  intro,
  withFooter = true,
  children,
}: PageShellProps) {
  return (
    <>
      <header className="border-b border-black/5">
        <div className="relative mx-auto flex max-w-content items-center justify-between px-5 py-5 sm:px-10">
          <Brand to="/" className="text-ink" />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-muted lg:flex">
            {navLinks.map((link) => (
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

          <a
            href="/#waitlist"
            className="rounded-full bg-ink px-5 py-3.5 text-xs font-semibold tracking-wide text-white transition hover:opacity-90"
          >
            Join waitlist
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[760px] px-5 py-16 sm:px-10 sm:py-20">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-[-0.02em] text-ink">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{intro}</p>
        )}
        <div className="mt-10">{children}</div>
      </main>

      {withFooter && <Footer />}
    </>
  );
}

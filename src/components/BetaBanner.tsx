import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Site-wide invitation to the Android beta.
 *
 * Deliberately a banner and not a timed pop-up. The site's one job is the
 * waitlist, and a modal that interrupts someone on their way to that form
 * spends the conversion we actually need in order to ask for six testers.
 * A banner is seen without being in the way, which is also the only version
 * of this that suits an app whose promise is "keep your peace".
 *
 * Sticky rather than fixed: sticky keeps its space in the flow, so it can
 * never overlap the hero's own nav the way a fixed bar would.
 *
 * Mulberry rather than clay: clay is the CTA colour everywhere else on the
 * site, and a clay bar would compete with "Join waitlist" for the same eye.
 * Mulberry is the brand's supporting colour — the email hero and the app
 * icon are both this pairing — and cream on it measures 9.2:1.
 */
const DISMISSED_KEY = "skeined.betaBannerDismissed";

export default function BetaBanner() {
  // Start hidden and reveal after the storage read, so a dismissed banner
  // never flashes up on a repeat visit.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISSED_KEY) !== "1") setVisible(true);
    } catch {
      // Private browsing can throw on localStorage. Showing the banner is the
      // safer failure: the worst case is someone dismisses it twice.
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* nothing to do — it reappears next visit, which is survivable */
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-mulberry text-page">
      <div className="mx-auto flex max-w-content items-center gap-3 px-5 py-2.5 sm:px-10">
        <p className="min-w-0 flex-1 text-[13px] leading-snug sm:text-sm">
          <span className="font-semibold">Testers wanted.</span>{" "}
          <span className="text-page/80">
            Try Skeined on iPhone or Android before anyone else, and help shape it.
          </span>{" "}
          <Link
            to="/beta"
            className="whitespace-nowrap font-semibold underline underline-offset-2 transition hover:text-clay"
          >
            Count me in
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="-mr-1 flex-shrink-0 rounded-full p-1.5 text-page/70 transition hover:bg-white/10 hover:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-page"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

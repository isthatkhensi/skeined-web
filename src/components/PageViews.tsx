import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Send a GA4 page_view on every route change.
 *
 * gtag's `config` fires exactly one page_view, at load. This is a single-page
 * app, so without this every visit to /privacy, /terms or /support would be
 * invisible and the homepage would appear to be the only page anyone reads.
 *
 * The first navigation after load is skipped: `config` has already counted it,
 * and sending another would double every landing.
 *
 * No-ops when gtag is absent — it only loads on the live domain, so staging and
 * localhost fall through harmlessly.
 */
export default function PageViews() {
  const { pathname, search } = useLocation();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    window.gtag?.("event", "page_view", {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}

import { useEffect } from "react";
import { APP_STORE_URL } from "../lib/links";

/**
 * Permanent hand-off to the App Store listing. Used in shares, QR codes and
 * invites — never browsed to from the site. Redirects immediately, with a
 * manual link as a fallback if the redirect is blocked.
 */
export default function Get() {
  useEffect(() => {
    window.location.replace(APP_STORE_URL);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-[15px] text-muted">Taking you to the App Store…</p>
      <a href={APP_STORE_URL} className="text-sm font-semibold text-primary underline">
        Tap here if nothing happens
      </a>
    </main>
  );
}

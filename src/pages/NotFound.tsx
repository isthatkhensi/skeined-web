import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function NotFound() {
  // The server hands every unknown path index.html with a 200, because a
  // single-page app on static hosting has no way to return a real 404 status.
  // Google calls that a soft 404 and will happily index every typo and stale
  // link as a copy of the site. A noindex tag is the only signal available
  // from here, so it is added on mount and removed on the way out — leaving it
  // behind would de-index whichever real page the visitor navigates to next.
  useEffect(() => {
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex, follow";
    document.head.appendChild(tag);
    return () => {
      tag.remove();
    };
  }, []);

  return (
    <PageShell
      title="Page not found."
      intro="That link doesn't lead anywhere — it may have moved, or never existed."
      withFooter={false}
    >
      <Link
        to="/"
        className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Back to home
      </Link>
    </PageShell>
  );
}

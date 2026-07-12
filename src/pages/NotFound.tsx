import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function NotFound() {
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

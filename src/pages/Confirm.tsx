import PageShell from "../components/PageShell";
import { APP_DEEP_LINK, APP_STORE_URL } from "../lib/links";

export default function Confirm() {
  return (
    <PageShell
      title="You're confirmed."
      intro="Your email is verified — you're all set. Open Skeined and pick up where you left off."
      withFooter={false}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={APP_DEEP_LINK}
          className="rounded-full bg-ink px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
        >
          Open Skeined
        </a>
        <a
          href={APP_STORE_URL}
          className="rounded-full border border-black/10 px-6 py-3 text-center text-sm font-semibold text-ink transition hover:bg-black/5"
        >
          Don't have the app? Download it
        </a>
      </div>
    </PageShell>
  );
}

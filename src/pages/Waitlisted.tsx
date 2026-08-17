import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

/**
 * Where the waitlist form lands on success.
 *
 * It used to be a line of text under the input, which had two problems: it sat
 * below the fold on a phone, so the form appeared to do nothing; and it said no
 * email was coming, which stopped being true the moment the Loops welcome was
 * wired up.
 *
 * A page also gives the signup a URL, which means GA4 counts it as a
 * destination rather than an invisible state change — the closest thing to a
 * conversion metric the site has before launch.
 */
export default function Waitlisted() {
  // Nothing here should be indexed: it is a destination you arrive at, and a
  // search result for it would be a dead end for anyone who found it.
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
      title="You're on the list."
      intro="Check your inbox — there's a note from me confirming your place. If it isn't there in a few minutes, look in spam and mark it 'not spam' so the launch email finds you."
      withFooter={false}
    >
      <p className="mb-8 max-w-prose text-[15px] leading-relaxed text-muted">
        There's nothing else for you to do. I'll be quiet until Skeined opens,
        then send one email with your way in. Waitlist makers get in first, with
        no queue and no scramble.
      </p>
      <Link
        to="/"
        className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Back to home
      </Link>
    </PageShell>
  );
}

import PageShell from "../components/PageShell";
import { BETA_FORM_URL } from "../lib/links";

/**
 * The page an Instagram story sticker points at.
 *
 * Its whole reason to exist is that "skeined.com/beta" reads like a company
 * and a raw forms.gle link reads like a scam. It should stay one screen —
 * anyone arriving here already decided to be curious, so the job is to tell
 * them what they are agreeing to and get out of the way.
 */
export default function Beta() {
  return (
    <PageShell
      title="Be an early tester"
      intro="Skeined is finished and in testing. Before it reaches the Play Store, Google asks for a small group of real makers to live with it for a couple of weeks — and I would rather that group were knitters and crocheters than strangers."
    >
      <div className="rounded-2xl border border-linen bg-card p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-ink">What you get</h2>
        <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
          <li>
            The whole app, early — pattern import, the row counter, yarn
            scanning, the craft assistant.
          </li>
          <li>
            Every Pro feature unlocked for the whole test, free. No card, no
            trial that quietly turns into a subscription.
          </li>
          <li>
            A say in what changes. Testers have already redirected real
            decisions, and I read every message myself.
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-semibold text-ink">What I need</h2>
        <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
          <li>
            An Android phone and the Google account you use on it — that
            address is what Google needs to let you in.
          </li>
          <li>
            To actually install it and use it on something you are making. Two
            weeks, no minimum hours.
          </li>
          <li>
            To tell me when something is wrong. Especially the small
            irritations, which are the ones nobody reports.
          </li>
        </ul>
      </div>

      {BETA_FORM_URL ? (
        <a
          href={BETA_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Count me in
        </a>
      ) : (
        /* No URL yet. A button that goes nowhere costs more trust than an
           honest sentence, particularly for someone arriving from a story. */
        <p className="mt-8 text-[15px] leading-relaxed text-muted">
          Sign-ups open in a moment — the form is being set up. In the
          meantime, joining the waitlist puts you first in line for everything
          else.
        </p>
      )}

      <p className="mt-6 text-sm leading-relaxed text-faint">
        Testing is on Android only for now. If you are on iPhone, the waitlist
        is the place to be — launch is close.
      </p>
    </PageShell>
  );
}

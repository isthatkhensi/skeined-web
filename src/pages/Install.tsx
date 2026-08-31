import PageShell from "../components/PageShell";

const TESTFLIGHT = "https://testflight.apple.com/join/3JpYm9Br";
const PLAY_OPT_IN = "https://play.google.com/apps/testing/com.malhq.skeined";

/**
 * One link to send a tester, whichever phone they have.
 *
 * The tester emails used to fork by platform, which meant knowing which phone
 * someone had before writing to them — and getting it wrong sent them to a link
 * that could not work. This page moves that decision to the person who actually
 * knows the answer.
 *
 * The Android note is not a detail: Play only lets in the exact Google account
 * that was added to the tester list, and "you are not a tester" is what someone
 * sees when they tap it while signed in as someone else. That message reads like
 * a rejection, and it is the most likely reason a willing tester gives up.
 */
export default function Install() {
  return (
    <PageShell
      title="Install Skeined"
      intro="Thank you for testing. Pick your phone below — it takes a minute, and everything is unlocked once you are in."
    >
      <div className="flex flex-col gap-5">
        <section className="rounded-2xl border border-linen bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-ink">On iPhone</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Testing runs through TestFlight, Apple&apos;s official app for trying
            apps before release. The link installs TestFlight if you do not have
            it, then Skeined.
          </p>
          <a
            href={TESTFLIGHT}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Install on iPhone
          </a>
        </section>

        <section className="rounded-2xl border border-linen bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-ink">On Android</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Tap below to join the test, then install from Google Play as normal.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">
            <strong>Use the same Google account you signed up with.</strong> Play
            only lets in the exact address on the tester list, and signing in as
            anyone else shows &ldquo;you are not a tester&rdquo;. If you see that,
            it is not you — email me and I will add the right address.
          </p>
          <a
            href={PLAY_OPT_IN}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Join the test on Android
          </a>
        </section>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-faint">
        Stuck at any point? Reply to the email that brought you here and I will
        sort it out with you. Nothing about this should be your problem to debug.
      </p>
    </PageShell>
  );
}

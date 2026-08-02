import Reveal from "./Reveal";

/**
 * Replaces the old Testimonials marquee, which carried seven invented crafters
 * — names, stock photos and "Founding Member" roles — for an unlaunched app
 * whose 50 founding places are all still open. Fabricated reviews, not
 * placeholder copy; it came down before the page got promoted.
 *
 * The copy below is Khensani's OWN reasons, dictated 2026-08-02 and shaped for
 * the page — the apps she tried, the tab-switching, the stitch she couldn't
 * look up without leaving, not feeling like a beginner, the accountability she
 * wanted without the nagging, the gift-giving procrastination. It is not
 * invented backstory and shouldn't be rewritten into generic founder copy: the
 * specifics ARE the persuasion. Edit the wording freely; keep the substance.
 *
 * Real quotes replace this section after launch.
 */
export default function MakerNote() {
  return (
    <section
      id="why"
      className="scroll-mt-8 py-16 sm:py-24"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-content px-5 sm:px-10">
        <Reveal className="mx-auto max-w-[680px]">
          <h2
            id="why-heading"
            className="text-center text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            Why Skeined exists.
          </h2>

          <div className="mt-8 rounded-card bg-clay-tint p-6 sm:p-9">
            <div className="space-y-5 text-[16px] leading-relaxed text-ink sm:text-[17px]">
              <p>
                I tried a lot of apps before I built this one. Every single one
                was the same thing: a number that goes up.
              </p>
              <p>
                So I'd count in one app, keep the pattern PDF open in another,
                and go hunting for what a stitch meant in a third, and somewhere
                in all that swapping back and forth I'd lose my place, and worst
                of all my crochet hook. This is meant to be the calm part of my
                day. Running four apps to do it is not calm. I wanted to stop
                feeling like a beginner while I was still busy being one.
              </p>
              <p>
                And then the part nobody seems to build: something that keeps me
                honest about the things I've promised people. I am a serial
                gift-giving procrastinator, and a deadline I set myself is not,
                historically, a deadline. So Skeined has streaks and goals and
                gentle nudges, because I needed accountability that doesn't nag.
                And when a project is finally done, it should be worth showing
                off.
              </p>
              <p>
                I made this as a maker, for makers. That's the whole reason.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-[17px] font-bold tracking-[-0.01em] text-mulberry">
                Khensani
              </p>
              <p className="mt-0.5 text-[13px] font-medium uppercase tracking-[0.14em] text-faint">
                Maker of Skeined
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

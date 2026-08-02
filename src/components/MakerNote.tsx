import Reveal from "./Reveal";

/**
 * Replaces the old Testimonials marquee.
 *
 * That section carried seven invented crafters — names, photos and "Founding
 * Member" roles — for an app that hasn't launched and whose 50 founding places
 * are all still open. Presented as reviews, invented quotes are a real problem
 * (App Store review guideline 3.1.2 territory, ASA/consumer-law territory, and
 * a bad first impression if a single reader recognises a stock avatar). It came
 * down before the page gets promoted.
 *
 * What replaces it does the same persuasion job honestly: the reason the app
 * exists, plus an explicit admission that there are no reviews yet. Saying "no
 * reviews yet, and we won't write our own" reads as confidence, not weakness.
 *
 * COPY IS FOUNDER-EDITABLE — the note is written to be true of Skeined as it
 * stands, and deliberately makes no biographical claims beyond building it solo
 * from Johannesburg. Khensani should read it in her own voice and change
 * anything that doesn't sound like her. Real quotes replace this section after
 * launch.
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
            className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            Why Skeined exists.
          </h2>

          <div className="mt-8 rounded-card bg-primary-light p-6 sm:p-9">
            <div className="space-y-5 text-[16px] leading-relaxed text-ink sm:text-[17px]">
              <p>
                Put your work down for four minutes — the kettle, the door, a
                child — and the row is gone. What follows is counting stitches
                backwards with a cold cup of tea, and the calm thing you sat
                down for has quietly turned into admin.
              </p>
              <p>
                Every app I tried treated that as a counting problem. It isn't.
                It's a <em className="not-italic font-semibold">keeping your place</em>{" "}
                problem — the pattern, the row, the note you left yourself last
                week, the yarn already sitting in your basket.
              </p>
              <p>
                So Skeined is built around one idea: put it down whenever you
                like, and pick it up exactly where you were. It opens on your
                last row, reads your pattern so you're not hunting for your
                line, and keeps your stash where you can see it.
              </p>
              <p>
                I'm building it on my own, from Johannesburg, for crafters who
                want their evenings back rather than one more thing to manage.
              </p>
            </div>

            <p className="mt-7 text-[15px] font-semibold text-primary">
              Khensani — maker of Skeined
            </p>
          </div>

          <p className="mt-7 text-[15px] leading-relaxed text-muted">
            <span className="font-semibold text-ink">
              There are no reviews here yet.
            </span>{" "}
            Skeined hasn't launched, so nobody has used it long enough to mean
            it. When they have, their words go here — not ours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

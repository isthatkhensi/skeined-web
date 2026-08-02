import { steps } from "../data";
import FeatureCard from "./FeatureCard";
import Reveal from "./Reveal";

// Three steps, three tiers — the palette hierarchy shown rather than described:
// primary clay, secondary sage, tertiary lavender. Every fill carries dark ink,
// which is the rule that keeps clay looking like clay.
const STEP_TONE = ["bg-clay text-ink", "bg-sage-tint text-sage-ink", "bg-lavender-tint text-lavender"];
/** The card behind each step, in the same family as its number. */
const STEP_TINT = ["bg-clay-tint", "bg-sage-tint", "bg-lavender-tint"];

export default function Steps() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-8 py-16 sm:py-24"
      aria-labelledby="steps-heading"
    >
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <Reveal className="lg:sticky lg:top-10 lg:self-start">
          <h2
            id="steps-heading"
            className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            From pattern to first row, in three steps.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
            Getting the app is the easy part. This is the bit that actually
            saves you an evening.
          </p>
        </Reveal>

        <ol className="flex min-w-0 flex-col">
          {steps.map((step, i) => (
            <li
              key={step.number}
              // The `1fr` track's automatic minimum is min-content, and the card
              // in it holds a ~3500px-wide image. WebKit sizes the track to that
              // intrinsic width unless the track's child is explicitly
              // `min-w-0` (see the Reveal below) — which is what made the whole
              // page 3605px wide on iOS at a 390px viewport.
              className="grid min-w-0 grid-cols-[36px_1fr] gap-5 sm:grid-cols-[44px_1fr] sm:gap-7"
            >
              {/* rail: number + connector line */}
              <div className="relative flex justify-center">
                {i < steps.length - 1 && (
                  <span className="step-connector absolute left-1/2 top-2 bottom-0 w-px -translate-x-1/2" />
                )}
                <span
                  className={`relative z-10 grid h-[34px] w-[34px] place-items-center rounded-full text-sm font-medium ${STEP_TONE[i] ?? STEP_TONE[0]}`}
                >
                  {step.number}
                </span>
              </div>

              <Reveal
                className={`min-w-0 ${i < steps.length - 1 ? "mb-[50px]" : ""}`}
                delay={0.05}
              >
                <FeatureCard
                  tintClass={STEP_TINT[i] ?? STEP_TINT[0]}
                  title={step.title}
                  description={step.description}
                  image={step.image}
                  alt={step.alt}
                  ratio="1095 / 640"
                />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

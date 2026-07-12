import { features } from "../data";
import FeatureCard from "./FeatureCard";
import Reveal from "./Reveal";

export default function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-8 py-20 sm:py-28"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-content px-5 sm:px-10">
        <Reveal className="mx-auto mb-12 max-w-[620px] text-center sm:mb-16">
          <h2
            id="features-heading"
            className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            Made for the way you craft.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            From your first scarf to your most ambitious sweater, Skeined keeps
            every project on track.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 2) * 0.1}>
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

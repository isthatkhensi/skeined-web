import { testimonials } from "../data";
import Reveal from "./Reveal";

export default function Testimonials() {
  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      id="reviews"
      className="scroll-mt-8 overflow-hidden py-16 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-content px-5 sm:px-10">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center sm:mb-14">
          <h2
            id="testimonials-heading"
            className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            What our founding members are saying.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            The first crafters into Skeined — the same 50 who'll keep Pro for
            life.
          </p>
        </Reveal>
      </div>

      <div className="mask-fade-x relative w-full">
        <ul className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= testimonials.length}
              className="flex w-[300px] flex-shrink-0 flex-col justify-between gap-5 rounded-[20px] bg-[#eeeff0] p-4 sm:w-[380px]"
            >
              <blockquote className="rounded-2xl border border-white/50 bg-white/50 p-5 text-[16px] font-medium leading-relaxed tracking-[-0.01em] text-ink backdrop-blur-md">
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 px-1 pb-1">
                <img
                  src={t.avatar}
                  alt=""
                  loading="lazy"
                  className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-2 ring-white"
                />
                <span className="flex flex-col">
                  <strong className="text-sm font-semibold text-ink">
                    {t.name}
                  </strong>
                  <small className="text-[13px] text-muted">{t.role}</small>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Accordion from "./Accordion";
import Reveal from "./Reveal";
import { landingFaqs } from "../content/faqs";

export default function Faq() {
  return (
    <section
      id="faqs"
      className="scroll-mt-8 py-16 sm:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[760px] px-5 sm:px-10">
        <Reveal className="mb-12 text-center sm:mb-14">
          <h2
            id="faq-heading"
            className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            A few of the basics — there's more on our{" "}
            <a href="/support" className="text-primary underline">
              support page
            </a>
            .
          </p>
        </Reveal>

        <Accordion items={landingFaqs} />
      </div>
    </section>
  );
}

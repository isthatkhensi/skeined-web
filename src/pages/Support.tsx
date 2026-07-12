import PageShell from "../components/PageShell";
import Accordion from "../components/Accordion";
import { supportFaqs } from "../content/faqs";
import { SUPPORT_EMAIL } from "../lib/links";

export default function Support() {
  return (
    <PageShell
      title="Support"
      intro="We're a small team and we read every message. The fastest way to reach us is email — we usually reply within a day or two."
    >
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        {SUPPORT_EMAIL}
      </a>

      <h2 className="mb-6 mt-14 text-xl font-semibold text-ink">
        Frequently asked questions
      </h2>
      <Accordion items={supportFaqs} />
    </PageShell>
  );
}

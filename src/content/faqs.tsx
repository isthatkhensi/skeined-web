import { Link } from "react-router-dom";
import type { AccordionItem } from "../components/Accordion";
import { ANDROID_AVAILABLE } from "../lib/links";

// Full FAQ — shown on /support.
export const supportFaqs: AccordionItem[] = [
  {
    q: "What makes this different from a basic row counter app?",
    a: "A row counter is table stakes, and ours is good. The real difference is what sits around it: you can import an existing pattern and follow it row by row, scan a ball band straight into your stash, and ask the craft assistant when you hit a stitch or instruction you don't know. The counter keeps your place; the rest keeps you moving.",
  },
  {
    q: "Does it work without an internet connection?",
    a: "The counter works fully offline — cast on, count, and hold your place with no signal at all. Pattern import and the craft assistant need a connection, since they call our pattern engine to do their work.",
  },
  {
    q: "What happens to my patterns and stash if I cancel Pro?",
    a: "Nothing is deleted. Your patterns and stash stay exactly where they are. The Pro-only features (unlimited imports, unlimited scans, the craft assistant) simply lock again, the same way any freemium app works. Nothing is taken away from you.",
  },
  {
    q: "Is the Founding Member deal really lifetime — will I ever be charged again?",
    a: "Yes, genuinely lifetime. It's a one-time purchase, not a subscription. You pay once and keep Pro for as long as Skeined exists. No renewals, ever.",
  },
  {
    q: "Is there an Android version?",
    a: ANDROID_AVAILABLE
      ? "Yes — Skeined is available on Android as well as iOS."
      : "Not yet — Android is on the way. Join the waitlist and we'll let you know the moment it's ready.",
  },
  {
    q: "Do you sell my data?",
    a: (
      <>
        No. Never. We don't sell your data to anyone. You can read exactly what
        we collect and why in our{" "}
        <Link to="/privacy" className="text-primary underline">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
];

// Short subset — shown on the landing page.
export const landingFaqs: AccordionItem[] = [
  supportFaqs[0], // what makes it different
  supportFaqs[1], // offline
  supportFaqs[3], // lifetime deal
  supportFaqs[2], // cancel Pro
];

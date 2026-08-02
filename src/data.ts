import feature1 from "./assets/feature-1.png";
import feature2 from "./assets/feature-2.png";
import feature3 from "./assets/feature-3.png";
import feature4 from "./assets/feature-4.png";
import step1 from "./assets/step-1.png";
import step2 from "./assets/step-2.png";
import step3 from "./assets/step-3.png";

export interface Feature {
  /** Which part of the app this belongs to — drives the card's accent hue. */
  area: "patterns" | "charts" | "assistant" | "counter";
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const features: Feature[] = [
  {
    area: "patterns",
    title: "Pattern Import",
    description:
      "Bring in any pattern — even a messy PDF — and follow it cleanly on any device.",
    image: feature1,
    alt: "Importing a pattern into Skeined",
  },
  {
    area: "charts",
    title: "Chart Generation",
    description:
      "We turn written patterns into clear, tappable charts you can read at a glance.",
    image: feature2,
    alt: "A generated stitch chart",
  },
  {
    area: "assistant",
    title: "Craft Assistant",
    description:
      "Stuck on a stitch mid-row? Ask and get an answer right there, without losing your place.",
    image: feature3,
    alt: "The craft assistant answering a stitch question",
  },
  {
    area: "counter",
    title: "Offline Row Counter",
    description:
      "Keep your place — and your yarn stash — with a counter that works fully offline.",
    image: feature4,
    alt: "The offline row counter and stash",
  },
];

export const steps: Step[] = [
  {
    number: 1,
    title: "Bring your pattern in",
    description:
      "A PDF you bought, a photo of a magazine page, or a link to a tutorial. Drop it in as it is — no retyping, no reformatting.",
    image: step1,
    alt: "Importing a pattern from a PDF",
  },
  {
    number: 2,
    title: "It becomes rows you can follow",
    description:
      "Your pattern is read into row-by-row instructions and a tappable chart, with every abbreviation ready to explain itself.",
    image: step2,
    alt: "A pattern turned into row-by-row instructions",
  },
  {
    number: 3,
    title: "Put it down whenever you like",
    description:
      "Count rows offline, leave yourself notes mid-row, and come back to the exact stitch you left — however long it's been.",
    image: step3,
    alt: "Tracking a project row by row",
  },
];

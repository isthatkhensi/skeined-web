import feature1 from "./assets/feature-1.png";
import feature2 from "./assets/feature-2.png";
import feature3 from "./assets/feature-3.png";
import feature4 from "./assets/feature-4.png";
import step1 from "./assets/step-1.png";
import step2 from "./assets/step-2.png";
import step3 from "./assets/step-3.png";

export interface Feature {
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
    title: "Pattern Import",
    description:
      "Bring in any pattern — even a messy PDF — and follow it cleanly on any device.",
    image: feature1,
    alt: "Importing a pattern into Skeined",
  },
  {
    title: "Chart Generation",
    description:
      "We turn written patterns into clear, tappable charts you can read at a glance.",
    image: feature2,
    alt: "A generated stitch chart",
  },
  {
    title: "Craft Assistant",
    description:
      "Stuck on a stitch mid-row? Ask and get an answer right there, without losing your place.",
    image: feature3,
    alt: "The craft assistant answering a stitch question",
  },
  {
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
    title: "Download Skeined",
    description: "Skeined is free on the App Store and Play Store.",
    image: step1,
    alt: "Download the app",
  },
  {
    number: 2,
    title: "Import your first pattern",
    description:
      "Bring in a pattern — PDF, photo, or link — and watch it become a clean chart.",
    image: step2,
    alt: "Importing a first pattern",
  },
  {
    number: 3,
    title: "Cast on with confidence",
    description:
      "Track every row offline, ask the assistant when you're stuck, and finish more projects.",
    image: step3,
    alt: "Tracking a project row by row",
  },
];

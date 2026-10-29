// Named for what they show rather than their position, so reordering the
// features below cannot silently pair a card with the wrong screenshot.
import featureImport from "./assets/feature-import.webp";
import featureYarnScan from "./assets/feature-yarn-scan.webp";
import featureAssistant from "./assets/feature-assistant.webp";
import featureLiveActivity from "./assets/feature-live-activity.webp";
import step1 from "./assets/step-1.png";
import step2 from "./assets/step-2.png";
import step3 from "./assets/step-3.png";

export interface Feature {
  title: string;
  description: string;
  image: string;
  alt: string;
  /**
   * The frame's aspect ratio below md, matching THIS card's own artwork.
   *
   * The four images are not the same shape — three are 3:2 phone renders, the
   * Live Activity is a very wide widget. A single shared ratio leaves slack on
   * whichever cards do not match it, and that slack is visible wherever it is
   * put: above the image, or below it in the gap between art and heading.
   * Matching each frame to its own art leaves nothing over.
   *
   * Keep this in step with the file. If an asset is re-exported at a new size,
   * this number moves with it.
   */
  frameMobile: string;
  /** Extra horizontal padding, for art that is one small element not a phone. */
  insetClass?: string;
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
      "Bring in any pattern, even a messy PDF, and follow it cleanly on any device.",
    image: featureImport,
    frameMobile: "1200 / 800",
    alt: "Choosing where a pattern comes from, and Skeined reading a PDF pattern",
  },
  {
    // Replaced Chart Generation, which is held back for v2 (FEATURES.chartView
    // is false in the app). Nothing on this site may promise it until it ships.
    //
    // The ball band in this art is an invented brand (Fernside Yarns), which
    // retires the old Red Heart label and the trademark risk it carried.
    title: "Yarn Scanner",
    description:
      "Point your camera at a ball band. Skeined reads the brand, weight and fibre straight into your stash.",
    image: featureYarnScan,
    frameMobile: "1200 / 800",
    alt: "Scanning a ball band and adding the yarn it found to the stash",
  },
  {
    title: "Craft Assistant",
    description:
      "Not sure what \u201csc2tog\u201d means? Press and hold any stitch for a plain explanation and a tutorial, without losing your place.",
    image: featureAssistant,
    frameMobile: "1200 / 800",
    alt: "Pressing a stitch abbreviation mid-row to see what it means",
  },
  {
    title: "On Your Lock Screen",
    description:
      "Your row and your time stay on the Lock Screen while you work. Add a row without unlocking, and it keeps counting offline.",
    image: featureLiveActivity,
    frameMobile: "1200 / 800",
    alt: "The row counter on the iPhone Lock Screen, with +1 and Pause",
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
      "Your pattern is read into row-by-row instructions, with every abbreviation ready to explain itself.",
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

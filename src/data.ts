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
    frameMobile: "1200 / 634",
    alt: "Importing a pattern from a PDF or a video link",
  },
  {
    // Replaced Chart Generation, which is held back for v2 (FEATURES.chartView
    // is false in the app). Nothing on this site may promise it until it ships.
    //
    // TODO (founder, 12 Aug 2026 — shipped as-is deliberately, revisit after
    // launch): feature-yarn-scan.webp shows a real Red Heart Super Saver ball
    // band, logo and all. Third-party branding in marketing art is a trademark
    // risk we do not need to carry, and it is the only image on the site we
    // could not defend if asked.
    //
    // The replacement is already decided: render the BACK of a ball band
    // instead. The spec block — weight symbol, needle and hook sizes, gauge
    // square, care icons — is the knitter's own language, reads instantly, and
    // carries no logo. In the results card, drop the brand line entirely rather
    // than inventing one, and keep only Fibre content, Weight category and
    // Yardage, which is what the scanner genuinely reads off the label.
    title: "Yarn Scanner",
    description:
      "Point your camera at a ball band. Skeined reads the brand, weight and fibre straight into your stash.",
    image: featureYarnScan,
    frameMobile: "1200 / 800",
    alt: "Scanning a yarn label to read its brand, weight and fibre",
  },
  {
    title: "Craft Assistant",
    description:
      "Stuck on a stitch mid-row? Ask and get an answer right there, without losing your place.",
    image: featureAssistant,
    frameMobile: "1200 / 800",
    alt: "The craft assistant answering a stitch question",
  },
  {
    title: "On Your Lock Screen",
    description:
      "Your row and your time stay on the Lock Screen while you work. Add a row without unlocking, and it keeps counting offline.",
    image: featureLiveActivity,
    frameMobile: "1200 / 327",
    alt: "The row counter running on the iPhone Lock Screen",
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

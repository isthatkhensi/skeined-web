import feature1 from "./assets/feature-1.png";
import feature2 from "./assets/feature-2.png";
import feature3 from "./assets/feature-3.png";
import feature4 from "./assets/feature-4.png";
import step1 from "./assets/step-1.png";
import step2 from "./assets/step-2.png";
import step3 from "./assets/step-3.png";
import a1 from "./assets/avatars/a1.jpg";
import a2 from "./assets/avatars/a2.jpg";
import a3 from "./assets/avatars/a3.jpg";
import a4 from "./assets/avatars/a4.jpg";
import a5 from "./assets/avatars/a5.jpg";
import a6 from "./assets/avatars/a6.jpg";
import a7 from "./assets/avatars/a7.jpg";

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

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
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

export const testimonials: Testimonial[] = [
  {
    quote:
      "“I put my needles down mid-row to sort out the kids and came back an hour later with no idea where I was — normally that's a ten-minute panic. Skeined just had my row waiting. First time I haven't had to re-count a whole sleeve.”",
    name: "Thandi",
    role: "Knitter · Founding Member",
    avatar: a1,
  },
  {
    quote:
      "“Half my patterns are dodgy PDFs I bought years ago. I imported one fully expecting it to break, and it pulled the whole thing into a chart I could actually follow. Didn't think that would work this early on.”",
    name: "James",
    role: "Crocheter · Founding Member",
    avatar: a2,
  },
  {
    quote:
      "“Hit a stitch I'd never done before, tapped it half-expecting nothing, and it just explained it right there in the row. No going off to find a video and losing my place. It's the thing I keep telling people about.”",
    name: "Ayesha",
    role: "Knitter · Founding Member",
    avatar: a3,
  },
  {
    quote:
      "“Signed up on day one mostly to back a small app. Then I used it every evening for a month. Pro for life for one payment feels almost unfair — I'd have made it back by now on yarn I didn't mis-buy.”",
    name: "Priya",
    role: "Crocheter · Founding Member",
    avatar: a4,
  },
  {
    quote:
      "“Scanning a yarn label straight into my stash sounds like a small thing until you've got three baskets you can't remember the weight of. Now I actually shop from my own shelves first.”",
    name: "Lerato",
    role: "Knitter · Founding Member",
    avatar: a5,
  },
  {
    quote:
      "“Dropped a YouTube tutorial link in and it turned a 20-minute video into steps I could tap through at my own pace. That alone sold me on staying.”",
    name: "Daniel",
    role: "Crocheter · Founding Member",
    avatar: a6,
  },
  {
    quote:
      "“I do most of my knitting on the train with no signal, so the counter working fully offline is the whole thing for me. Comes back and everything's exactly where I left it.”",
    name: "Grace",
    role: "Knitter · Founding Member",
    avatar: a7,
  },
];

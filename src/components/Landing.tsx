import Hero from "./Hero";
import Features from "./Features";
import Pricing from "./Pricing";
import Faq from "./Faq";
import MakerNote from "./MakerNote";
import Footer from "./Footer";

/**
 * The three-step section was removed 12 Aug 2026, not deleted — Steps.tsx and
 * its `steps` data in data.ts are untouched, so restoring it is re-adding two
 * lines here.
 *
 * Why it went: it sat between Features and Pricing, and two of its three steps
 * restated feature cards immediately above them ("Bring your pattern in" is the
 * Pattern Import card; "Put it down whenever you like" is the Lock Screen one).
 * On a pre-launch page whose single job is a waitlist signup, that put a
 * repetition between the reader and the only thing we ask them for.
 *
 * The intended replacement is an animation of someone importing a pattern on a
 * real phone — a far better asset than three static cards, and one that wants a
 * shipped app to film. It belongs after launch, not as a placeholder now.
 */
export default function Landing() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Faq />
        <MakerNote />
      </main>
      <Footer />
    </>
  );
}

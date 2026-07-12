import Hero from "./Hero";
import Features from "./Features";
import Steps from "./Steps";
import Pricing from "./Pricing";
import Faq from "./Faq";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

export default function Landing() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Steps />
        <Pricing />
        <Faq />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

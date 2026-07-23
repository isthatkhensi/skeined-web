import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Brand from "./Brand";
import Countdown from "./Countdown";
import heroMockup from "../assets/skeined-counter.png";
import { detectCurrency, FOUNDING_PRICE } from "../lib/pricing";

interface WaitlistForm {
  email: string;
}

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
  { label: "Reviews", href: "#reviews" },
];

// TODO(founder): wire these to the live count (Loops/Supabase).
const SPOTS_TOTAL = 50;
const SPOTS_LEFT = 43;

export default function Hero() {
  const founding = FOUNDING_PRICE[detectCurrency()];
  const claimedPct = Math.round(
    ((SPOTS_TOTAL - SPOTS_LEFT) / SPOTS_TOTAL) * 100
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<WaitlistForm>();

  const onSubmit = (data: WaitlistForm) => {
    // TODO(founder): wire up Loops.so once the account + sequences are ready:
    //   POST https://app.loops.so/api/v1/contacts/create  { email, source: "waitlist-landing" }
    // Proxy through a serverless function so the API key isn't exposed client-side.
    console.info("Waitlist signup:", data.email);
    reset();
  };

  return (
    <section className="p-4">
      <div className="hero-cloud relative flex min-h-[820px] flex-col overflow-hidden rounded-card px-5 pt-7 sm:px-10 lg:px-16">
        {/* nav */}
        <nav className="relative z-10 flex w-full items-center justify-between text-white">
          <Brand className="text-white" />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-white/90 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#waitlist"
            className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-wide text-ink transition hover:opacity-90"
          >
            Join waitlist
          </a>
        </nav>

        {/* two-column: copy left, phone (with counter under it) right */}
        <div className="grid flex-1 gap-8 pt-8 lg:grid-cols-2 lg:items-end lg:gap-10">
          {/* LEFT — copy */}
          <div className="self-center pb-8 text-center text-white lg:pb-16 lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mx-auto max-w-[9ch] text-[clamp(3rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.03em] lg:mx-0"
            >
              <span className="block font-light">Make more.</span>
              <span className="block font-extrabold">Frog less.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mx-auto mt-5 max-w-[440px] text-[18px] leading-relaxed lg:mx-0"
            >
              Import patterns from PDFs and YouTube tutorials.
              <br />
              Track every row. Scan yarn labels. Organise your stash.
              <br />
              Pick up exactly where you left off.
            </motion.p>

            <motion.form
              id="waitlist"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mx-auto mt-7 w-[min(440px,90vw)] scroll-mt-24 lg:mx-0"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-white/25 p-[7px] pl-2 shadow-[inset_0_-4px_100px_20px_rgba(238,238,238,0.08)] backdrop-blur-xl">
                <label htmlFor="email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="min-w-0 flex-1 bg-transparent pl-3.5 text-[15px] text-white placeholder:text-white/80 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-ink transition hover:-translate-y-px hover:opacity-90"
                >
                  Join waitlist
                </button>
              </div>
              <div
                className="mt-2 h-4 text-center text-[13px] lg:text-left"
                aria-live="polite"
              >
                {errors.email && (
                  <span className="text-white/90">{errors.email.message}</span>
                )}
                {isSubmitSuccessful && !errors.email && (
                  <span className="text-white/90">
                    You're on the list — we'll be in touch.
                  </span>
                )}
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mx-auto mt-6 w-[min(440px,90vw)] rounded-xl border border-[#d6d0c2] bg-white p-4 shadow-md shadow-black/5 lg:mx-0"
            >
              <p className="text-sm text-[#2e2a27]">
                <span className="font-bold">Founding Members</span> get Pro for
                life — {founding} once.
              </p>
              <div
                className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#d6d0c2]"
                role="progressbar"
                aria-valuenow={SPOTS_TOTAL - SPOTS_LEFT}
                aria-valuemin={0}
                aria-valuemax={SPOTS_TOTAL}
              >
                <div
                  className="h-full rounded-full bg-[#849a70]"
                  style={{ width: `${claimedPct}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-medium text-[#2e2a27]/70">
                Only {SPOTS_LEFT} of {SPOTS_TOTAL} spots left
              </p>
            </motion.div>
          </div>

          {/* RIGHT — phone flush to block bottom, counter overlapping its base */}
          <div className="relative flex justify-center self-end lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[440px]"
            >
              <img
                src={heroMockup}
                alt="Skeined app preview"
                className="block h-auto w-full object-contain"
                width={1419}
                height={2201}
              />
              <div className="absolute inset-x-0 bottom-5 z-10 w-full px-2 sm:inset-x-auto sm:right-[100px] sm:bottom-8 sm:w-[118%] sm:px-0">
                <Countdown />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

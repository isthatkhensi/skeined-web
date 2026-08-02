import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Brand from "./Brand";
import Countdown from "./Countdown";
import heroMockup from "../assets/skeined-counter.png";
import { detectCurrency, FOUNDING_PRICE } from "../lib/pricing";
import { supabase } from "../lib/supabase";

interface WaitlistForm {
  email: string;
}

type SubmitStatus = "idle" | "success" | "error";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
  { label: "Reviews", href: "#reviews" },
];

// Founding Member isn't purchasable yet, so nobody has claimed a spot — this
// must read as truthfully zero, never fabricated scarcity.
// TODO(founder): once Founding Member purchases go live, wire SPOTS_CLAIMED to
// the real count (a Supabase count query / RPC), remove the hardcoded 0, and
// re-introduce the progress bar once it can reflect real numbers.
const SPOTS_TOTAL = 50;
const SPOTS_CLAIMED = 0;

export default function Hero() {
  const founding = FOUNDING_PRICE[detectCurrency()];
  const claimedPct = Math.round((SPOTS_CLAIMED / SPOTS_TOTAL) * 100);

  const [status, setStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistForm>();

  const onSubmit = async (data: WaitlistForm) => {
    setStatus("idle");

    if (!supabase) {
      // Local/unconfigured build — nothing to call. Don't pretend it worked.
      setStatus("error");
      return;
    }

    const { error } = await supabase.rpc("join_waitlist", {
      p_email: data.email.trim(),
      p_source: "website",
      p_referrer:
        typeof document !== "undefined" && document.referrer
          ? document.referrer
          : null,
    });

    if (error) {
      // Never distinguish "already on the list" from any other failure here —
      // join_waitlist() itself treats duplicates as a silent success, so a
      // real error means something else went wrong (network, validation).
      setStatus("error");
      return;
    }

    setStatus("success");
    reset();
  };

  return (
    <section className="p-4">
      <div className="hero-cloud relative flex min-h-[640px] flex-col overflow-hidden rounded-card px-5 pt-7 sm:min-h-[760px] sm:px-10 lg:min-h-[820px] lg:px-16">
        {/* nav */}
        <nav className="relative z-10 flex w-full items-center justify-between text-white">
          <Brand className="text-white" />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-white/90 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative inline-block transition before:absolute before:-inset-x-2 before:-inset-y-3.5 before:content-[''] hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#waitlist"
            className="rounded-full bg-white px-5 py-3.5 text-xs font-semibold tracking-wide text-ink transition hover:opacity-90"
          >
            Join waitlist
          </a>
        </nav>

        {/* two-column: copy left, phone (with counter under it) right */}
        <div className="grid min-w-0 flex-1 gap-8 pt-8 lg:grid-cols-2 lg:items-end lg:gap-10">
          {/* LEFT — copy */}
          <div className="min-w-0 self-center pb-8 text-center text-white lg:pb-16 lg:text-left">
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
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-white/25 p-[7px] pl-2 shadow-[inset_0_-4px_100px_20px_rgba(238,238,238,0.08)] backdrop-blur-xl transition focus-within:ring-2 focus-within:ring-white/80 focus-within:ring-offset-2 focus-within:ring-offset-hero">
                <label htmlFor="email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  autoComplete="email"
                  disabled={isSubmitting}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Enter a valid email",
                    },
                    onChange: () => setStatus("idle"),
                  })}
                  className="min-w-0 flex-1 bg-transparent pl-3.5 text-[15px] text-white placeholder:text-white/80 focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-shrink-0 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-ink transition hover:-translate-y-px hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Joining…" : "Join waitlist"}
                </button>
              </div>
              <div
                className="mt-2 min-h-[1.25rem] text-center text-[13px] leading-snug lg:text-left"
                aria-live="polite"
                role="status"
              >
                {errors.email && (
                  <span className="text-white/90">{errors.email.message}</span>
                )}
                {!errors.email && status === "success" && (
                  <span className="text-white/90">
                    You're on the list — thank you for waiting with us. We
                    don't have automatic emails wired up yet, so there's
                    nothing in your inbox to watch for just yet — we'll share
                    the news here (and on @skeined) when Skeined opens.
                  </span>
                )}
                {!errors.email && status === "error" && (
                  <span className="text-white/90">
                    That didn't quite make it through — mind trying again in
                    a moment?
                  </span>
                )}
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mx-auto mt-6 w-[min(440px,90vw)] rounded-xl border border-linen bg-card p-4 shadow-md shadow-black/5 lg:mx-0"
            >
              <p className="text-sm text-ink">
                <span className="font-bold">Founding Members</span> get Pro for
                life — {founding} once.
              </p>
              {SPOTS_CLAIMED > 0 && (
                <div
                  className="mt-3 h-2 w-full overflow-hidden rounded-full bg-linen"
                  role="progressbar"
                  aria-valuenow={SPOTS_CLAIMED}
                  aria-valuemin={0}
                  aria-valuemax={SPOTS_TOTAL}
                >
                  <div
                    className="h-full rounded-full bg-clay"
                    style={{ width: `${claimedPct}%` }}
                  />
                </div>
              )}
              <p className="mt-2 text-xs font-medium text-ink/70">
                {SPOTS_CLAIMED > 0
                  ? `${SPOTS_TOTAL - SPOTS_CLAIMED} of ${SPOTS_TOTAL} spots left`
                  : `${SPOTS_TOTAL} Founding Member spots — be first to claim one.`}
              </p>
            </motion.div>
          </div>

          {/* RIGHT — phone flush to block bottom, counter overlapping its base */}
          <div className="relative flex min-w-0 justify-center self-end lg:justify-end">
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

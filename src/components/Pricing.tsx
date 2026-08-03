import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  TIERS,
  CURRENCIES,
  CURRENCY_META,
  annualSaving,
  FOUNDING_PRICE,
  FOUNDING_FALLBACK,
  detectCurrency,
  formatPrice,
  type Currency,
  type Period,
  type Tier,
} from "../lib/pricing";

function Check({ featured }: { featured?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 flex-shrink-0"
    >
      {/* The un-featured tiers (Free) used to fill this with #8F5233, the deep
          clay INK — a dark brown dot repeated down the list. The ink exists for
          small text on light surfaces, not for fills. The fill is the PRIMARY
          anchor (#E0A886) with dark ink on top, exactly like every clay fill in
          the app; featured tiers already sit on clay, so they invert to white. */}
      <circle cx="12" cy="12" r="12" fill={featured ? "#ffffff" : "#E0A886"} />
      <path
        d="m7.5 12.3 3 3 6-6.6"
        stroke={featured ? "#8F5233" : "#3A322E"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small segmented control used for both currency and billing period. */
function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex rounded-full border border-black/[0.08] bg-white p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`relative rounded-full px-4 py-3 text-sm font-medium transition-colors ${
            value === o.value ? "text-white" : "text-muted hover:text-ink"
          }`}
        >
          {value === o.value && (
            <motion.span
              layoutId={`seg-${ariaLabel}`}
              className="absolute inset-0 rounded-full bg-ink"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative z-10">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

function TierCard({
  tier,
  currency,
  period,
}: {
  tier: Tier;
  currency: Currency;
  period: Period;
}) {
  const { monthly, annual } = tier.prices[currency];
  const isFree = monthly === 0 && annual === 0;
  const showAnnual = period === "annual" && !isFree;

  return (
    <article
      className={`flex h-full flex-col rounded-card p-8 ${
        tier.featured
          ? "bg-clay text-ink shadow-lg shadow-clay/25"
          : "border border-black/[0.06] bg-white text-ink shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{tier.name}</h3>
        {tier.featured && (
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink">
            Most popular
          </span>
        )}
      </div>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span
          className={`text-4xl font-bold tracking-tight ${
            tier.featured ? "text-ink" : ""
          }`}
        >
          {isFree
            ? "Free"
            : formatPrice(showAnnual ? annual : monthly, currency)}
        </span>
        {!isFree && (
          <span
            className={`text-sm ${
              tier.featured ? "text-ink/70" : "text-muted"
            }`}
          >
            {showAnnual ? "per year" : "per month"}
          </span>
        )}
      </div>

      {/* per-month equivalent + saving on annual */}
      <p
        className={`mt-1 h-5 text-xs ${
          tier.featured ? "text-ink/55" : "text-faint"
        }`}
      >
        {showAnnual &&
          `${formatPrice(annual / 12, currency)}/mo · save ${annualSaving(currency)}%`}
      </p>

      <p
        className={`mt-3 text-sm leading-relaxed ${
          tier.featured ? "text-ink/80" : "text-muted"
        }`}
      >
        {tier.blurb}
      </p>

      <ul className="mt-7 flex flex-1 flex-col gap-3 text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check featured={tier.featured} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#waitlist"
        className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition hover:opacity-90 ${
          tier.featured ? "bg-ink text-white" : "bg-ink text-white"
        }`}
      >
        Join waitlist
      </a>
    </article>
  );
}

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>(() => detectCurrency());
  const [period, setPeriod] = useState<Period>("annual");

  const founding = FOUNDING_PRICE[currency] ?? FOUNDING_FALLBACK;

  return (
    <section
      id="pricing"
      className="scroll-mt-8 py-16 sm:py-24"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-content px-5 sm:px-10">
        <Reveal className="mx-auto mb-8 max-w-[620px] text-center">
          <h2
            id="pricing-heading"
            className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink"
          >
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Start free. Upgrade when you're ready — or lock in Pro for life as a
            Founding Member.
          </p>
        </Reveal>

        {/* founding-member highlight — deliberately stands out */}
        <Reveal className="mx-auto mb-10 max-w-3xl">
          <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-card border border-clay/40 bg-clay-tint px-7 py-7 text-center text-ink shadow-sm sm:flex-row sm:justify-between sm:text-left">
            <div>
              <span className="mb-2 inline-block rounded-full bg-clay px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
                Only 50 spots
              </span>
              <p className="text-xl font-bold">Founding Member — Pro for life</p>
              <p className="mt-1 text-sm text-muted">
                A one-time {founding}, never a subscription. Yours forever.
              </p>
            </div>
            <a
              href="#waitlist"
              className="flex-shrink-0 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-ink transition hover:opacity-90"
            >
              Claim your spot
            </a>
          </div>
        </Reveal>

        {/* toggles */}
        <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Segmented<Period>
            ariaLabel="Billing period"
            value={period}
            onChange={setPeriod}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "annual", label: `Annual · save ${annualSaving(currency)}%` },
            ]}
          />
          <Segmented<Currency>
            ariaLabel="Currency"
            value={currency}
            onChange={setCurrency}
            options={CURRENCIES.map((c) => ({
              value: c,
              label: CURRENCY_META[c].label,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <TierCard tier={tier} currency={currency} period={period} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export type Currency = "USD" | "GBP" | "ZAR";
export type Period = "monthly" | "annual";

export const CURRENCIES: Currency[] = ["USD", "GBP", "ZAR"];

export const CURRENCY_META: Record<
  Currency,
  { symbol: string; label: string; decimals: number }
> = {
  USD: { symbol: "$", label: "USD", decimals: 2 },
  GBP: { symbol: "£", label: "GBP", decimals: 2 },
  ZAR: { symbol: "R", label: "ZAR", decimals: 0 },
};

interface TierPrices {
  monthly: number;
  annual: number;
}

export interface Tier {
  name: string;
  blurb: string;
  features: string[];
  featured?: boolean;
  prices: Record<Currency, TierPrices>;
}

/**
 * The annual discount, DERIVED per currency rather than asserted.
 *
 * This was a hardcoded 42 for every currency. It happens to be right for USD
 * (41.6%) and GBP (41.5%), but ZAR's annual is R649 against R1,068 of monthly —
 * a 39% saving, not 42%. A stated discount that's three points better than the
 * one you actually get is a price claim we can't make, so the number is now
 * computed from the prices themselves and cannot drift from them again.
 */
export function annualSaving(currency: Currency): number {
  const pro = TIERS.find((t) => t.name === "Pro")!;
  const { monthly, annual } = pro.prices[currency];
  if (!monthly) return 0;
  return Math.round((1 - annual / (monthly * 12)) * 100);
}

export const TIERS: Tier[] = [
  {
    name: "Free",
    blurb: "Everything you need to start your first project.",
    features: [
      "Import 3 starter patterns to try",
      "Row counter with up to 4 linked counters",
      "Full stitch dictionary + tooltips",
      "XP, levels, badges & streaks",
      "5 active projects, 5 yarn scans/month",
    ],
    prices: {
      USD: { monthly: 0, annual: 0 },
      GBP: { monthly: 0, annual: 0 },
      ZAR: { monthly: 0, annual: 0 },
    },
  },
  {
    name: "Pro",
    // Chart generation is held back for v2 (FEATURES.chartView is false in the
    // app), so it cannot appear on a paid tier's feature list. Replaced with
    // unlimited yarn scanning, which does ship.
    blurb: "The full toolkit: imports, yarn scanning, and the craft assistant.",
    features: [
      "Unlimited pattern imports from PDF, paste, or a video link",
      "Unlimited yarn label scans straight into your stash",
      "Unlimited projects and collections",
      "Craft assistant for Q&A and sizing help",
      "All-device sync",
    ],
    featured: true,
    prices: {
      USD: { monthly: 4.99, annual: 34.99 },
      GBP: { monthly: 3.99, annual: 27.99 },
      ZAR: { monthly: 89, annual: 649 },
    },
  },
];

// Founding Member is a one-time lifetime unlock of Pro. R499 (ZAR) is confirmed;
// USD/GBP are the closest matching values (~R499). TODO(founder): confirm exact FX.
export const FOUNDING_PRICE: Record<Currency, string> = {
  USD: "$27",
  GBP: "£21",
  ZAR: "R499",
};
export const FOUNDING_FALLBACK = "$27";

/** Pro tier's monthly/annual formatted for the given currency (for hero copy). */
export function proPrices(currency: Currency) {
  const pro = TIERS.find((t) => t.name === "Pro")!;
  return {
    monthly: formatPrice(pro.prices[currency].monthly, currency),
    annual: formatPrice(pro.prices[currency].annual, currency),
  };
}

/** Best-effort currency guess from the browser locale / timezone. Defaults USD. */
export function detectCurrency(): Currency {
  try {
    const region = new Intl.Locale(navigator.language).region ?? "";
    if (region === "GB") return "GBP";
    if (region === "ZA") return "ZAR";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Johannesburg")) return "ZAR";
    if (/London|Belfast|Edinburgh|Cardiff/.test(tz)) return "GBP";
  } catch {
    /* fall through to default */
  }
  return "USD";
}

export function formatPrice(value: number, currency: Currency): string {
  if (value === 0) return "Free";
  const { symbol, decimals } = CURRENCY_META[currency];
  const num =
    decimals === 0
      ? Math.round(value).toLocaleString("en-US")
      : value.toFixed(2);
  return `${symbol}${num}`;
}

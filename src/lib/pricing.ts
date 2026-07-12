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

export const ANNUAL_SAVING = 42; // % — same across currencies

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
    blurb: "The full toolkit — imports, charts, and the craft assistant.",
    features: [
      "Unlimited pattern imports — PDF, paste, or YouTube link",
      "Auto-generated stitch charts",
      "Unlimited projects & yarn scanning",
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
  {
    name: "Creator",
    blurb: "For designers who publish and share their own patterns.",
    features: [
      "Everything in Pro",
      "Chart builder & image-to-chart design tools",
      "Publish and share your own patterns",
      "Run tester calls for your designs",
      "Voice notes while designing",
    ],
    prices: {
      USD: { monthly: 9.99, annual: 69.99 },
      GBP: { monthly: 7.99, annual: 54.99 },
      ZAR: { monthly: 179, annual: 1299 },
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

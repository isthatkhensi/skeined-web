/**
 * Feature areas → palette family. The site inherits the app's hierarchy —
 * clay primary, sage secondary, lavender/mulberry tertiary, gold/rose accent —
 * and this is where the secondary and tertiary hues earn their place: the
 * accent tells you WHICH part of Skeined a card is about. Without it the page
 * is one colour top to bottom, which is exactly what the founder disliked in
 * the app (2026-08).
 */
const AREA = {
  patterns: { label: "Patterns", className: "text-clay-ink" }, // primary — the core tool
  charts: { label: "Charts", className: "text-sage-ink" }, // secondary
  assistant: { label: "Assistant", className: "text-lavender" }, // tertiary
  counter: { label: "Counter & stash", className: "text-rose-ink" }, // accent
} as const;

export type FeatureArea = keyof typeof AREA;

interface FeatureCardProps {
  /** Omitted by Steps, which is a sequence rather than a set of areas. */
  area?: FeatureArea;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** aspect ratio for the image frame */
  ratio?: string;
}

/** Shared card used by both the Features grid and the Steps list. */
export default function FeatureCard({
  area,
  title,
  description,
  image,
  alt,
  ratio = "1728 / 960",
}: FeatureCardProps) {
  const accent = area ? AREA[area] : null;
  return (
    // `min-w-0` is load-bearing, not decoration. As a flex/grid item the card's
    // automatic minimum size is its min-content width, and in WebKit the
    // min-content contribution of the image below is its INTRINSIC width
    // (~3500px) — `w-full` doesn't shrink it. On iOS that blew the card, and the
    // whole page, to 3605px wide at a 390px viewport, while Chromium rendered it
    // correctly at 294px. Removing `min-w-0` here or on the parent grid item
    // brings that back; it is not safe to "tidy away".
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-card bg-clay-wash">
      <div className="min-w-0 px-[22px] pt-[22px]" style={{ aspectRatio: ratio }}>
        <img
          src={image}
          alt={alt}
          className="h-full w-full max-w-full rounded-[14px] object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="px-7 pb-8 pt-6 sm:px-[30px]">
        {accent && (
          <p
            className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${accent.className}`}
          >
            {accent.label}
          </p>
        )}
        <h3 className="text-xl font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </article>
  );
}

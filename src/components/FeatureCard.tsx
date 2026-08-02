/**
 * Feature areas → palette family, applied to the EYEBROW only.
 *
 * The cards themselves all sit on the primary tint (founder, 2026-08): four
 * different card backgrounds in a row made the grid the loudest thing on the
 * page. The accent survives in the label, which is where it does its actual
 * job — telling you which part of Skeined a card is about — while the Steps
 * section keeps its coloured cards, so secondary and tertiary still appear on
 * the page without competing.
 *
 * Every ink below clears AA on the clay tint: clay 5.01:1 · sage 5.80:1 ·
 * lavender 4.96:1 · rose 5.66:1.
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
  /** Steps passes its own family tint, matching that step's number circle. */
  tintClass?: string;
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
  tintClass,
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
    <article
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-card ${
        tintClass ?? "bg-clay-tint"
      }`}
    >
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

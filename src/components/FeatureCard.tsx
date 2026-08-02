interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  /** aspect ratio for the image frame */
  ratio?: string;
}

/** Shared card used by both the Features grid and the Steps list. */
export default function FeatureCard({
  title,
  description,
  image,
  alt,
  ratio = "1728 / 960",
}: FeatureCardProps) {
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
        <h3 className="text-xl font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </article>
  );
}

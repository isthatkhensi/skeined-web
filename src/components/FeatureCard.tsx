interface FeatureCardProps {
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
  tintClass,
  title,
  description,
  image,
  alt,
  // 20% shorter than the original 1728/960 (960 → 768), per the founder's note
  // that the art was crowding both the top of the card and the copy below it.
  // Shrinking the frame rather than padding it in keeps the images full-bleed
  // to the card's inner width, so nothing has to be re-exported.
  // 1728/845, not the original 1728/768. The art is 1.5:1 inside a frame this
  // wide, so with object-contain the IMAGE IS HEIGHT-LIMITED — the frame's
  // height is what caps it, and widening would do nothing. 768 -> 845 is the
  // frame 10% taller, which is the image 10% bigger (founder, 2026-08-17).
  ratio = "1728 / 845",
}: FeatureCardProps) {
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
      <div className="min-w-0 px-[22px] pt-[28px]" style={{ aspectRatio: ratio }}>
        {/*
          object-CONTAIN, not cover. Cover fills the frame and throws away
          whatever will not fit, which cropped the tops and bottoms off the art
          on a phone — the yarn scanner lost its ball band, the import card lost
          its progress row. Contain scales the whole image down to fit instead,
          so nothing is lost at any width.

          object-bottom stays. The art in this set is not a consistent shape —
          the Lock Screen render is 1864x1049 while the rest are 1536x1024 — and
          these images all have their subject at the BOTTOM of the canvas
          (phones cropped at the lower edge, the widget resting low). Anchoring
          there lines the subjects up across all four cards regardless of shape,
          which matters as much with contain as it did with cover: without it,
          a shorter image would float in the middle of its frame while the
          others sat on the floor.
        */}
        <img
          src={image}
          alt={alt}
          className="h-full w-full max-w-full rounded-[14px] object-contain object-bottom"
          loading="lazy"
        />
      </div>
      {/* pt-7 opens the gap under the art, pb-6 lifts the copy off the floor. */}
      <div className="px-7 pb-6 pt-7 sm:px-[30px]">
        <h3 className="text-xl font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </article>
  );
}

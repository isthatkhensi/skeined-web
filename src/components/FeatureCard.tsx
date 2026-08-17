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
  // No default. An explicit ratio (Steps passes 1095/640) wins; without one the
  // frame is RESPONSIVE, which a single inline aspectRatio cannot be.
  ratio,
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
      {/*
        The art is 1.5:1 inside a frame wider than that, so under object-contain
        THE IMAGE IS HEIGHT-LIMITED — the frame's height is the only thing that
        sizes it, and widening does nothing at all.

        The two viewports want opposite things (founder, 2026-08-17). On a
        desktop the art sits in a multi-column grid and a shorter frame (700)
        is right. On a phone a card is nearly full width and the art still read
        too small to make out detail — the craft assistant card especially.

        Mobile is now 3/2, which is the ART'S OWN ratio. That is the largest
        the image can ever be here: the frame stops letterboxing entirely and
        the image fills it edge to edge. A taller frame would not enlarge it
        further, only pad above and below, because past this point the image
        becomes width-limited instead.
      */}
      <div
        className={`min-w-0 px-[22px] pt-[28px] ${
          ratio ? "" : "aspect-[3/2] md:aspect-[1728/700]"
        }`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
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

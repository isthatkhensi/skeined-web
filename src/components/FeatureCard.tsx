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
        THE FRAME MATCHES THE ART, which is the only way to have no empty band.

        The art is 3:2 (the Live Activity widget 16:9). On mobile the frame is
        3/2 too, so object-contain fills it exactly and there is nothing left
        over to show. Get this wrong in the WIDE direction — a frame wider than
        the art — and the leftover height collects at the top, because
        object-bottom sends the image to the floor. That is what produced the
        big empty bands on Pattern Import and On Your Lock Screen.

        Desktop deliberately goes the other way: a much wider frame (1728/620)
        makes the art height-limited, so it fills the frame vertically, leaves
        its slack at the SIDES where nothing reads as a gap, and comes out
        smaller — which is what a multi-column grid wants.

        Padding is tighter on mobile than on sm+ for the same reason: at
        ~360px every pixel of padding is visibly stolen from the artwork.
      */}
      <div
        className={`min-w-0 px-[14px] pt-[18px] sm:px-[22px] sm:pt-[28px] ${
          ratio ? "" : "aspect-[3/2] md:aspect-[1728/620]"
        }`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        {/*
          object-CONTAIN, not cover: cover fills the frame and throws away what
        will not fit, which cropped the tops and bottoms off the art. Contain
        scales the whole image down, so nothing is lost at any width.

        object-TOP, not bottom. This is the fix for the empty band above the
        Pattern Import and Lock Screen cards. Those two are wider than the
        frame, so contain leaves slack in the height — and anchoring to the
        bottom sent every pixel of that slack to the TOP, where it read as a
        mysterious gap. Anchored to the top instead, the same slack falls
        BELOW the image, where it merges with the space that already separates
        art from heading and reads as ordinary spacing.

        The two files were also trimmed of their own vertical padding (the
        Lock Screen widget carried 169px of transparent nothing above it, 21%
        of its height). Trimming alone was not enough: it only converts the
        image's internal emptiness into frame emptiness. The anchor is what
        decides whether that emptiness is a defect or a margin.
        */}
        <img
          src={image}
          alt={alt}
          className="h-full w-full max-w-full rounded-[14px] object-contain object-top"
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

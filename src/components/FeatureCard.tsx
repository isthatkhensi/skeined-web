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
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-primary-light">
      <div className="px-[22px] pt-[22px]" style={{ aspectRatio: ratio }}>
        <img
          src={image}
          alt={alt}
          className="h-full w-full rounded-[14px] object-cover object-top"
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

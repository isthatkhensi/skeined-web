const TESTIMONIALS = [
  {
    quote:
      "I finally stopped losing my place mid-row. It sounds small but it changed how I crochet entirely.",
    name: 'Thandi M.',
    craft: 'Crochet hobbyist',
    initial: 'T',
  },
  {
    quote:
      "The YouTube import is the feature I didn't know I needed. I paste a link and I have a pattern.",
    name: 'James K.',
    craft: 'Knitter',
    initial: 'J',
  },
  {
    quote:
      'Finally an app made by someone who actually crafts. You can feel it in every little detail.',
    name: 'Ayesha R.',
    craft: 'Knitter & crocheter',
    initial: 'A',
  },
  {
    quote:
      "I've tried five different counter apps. This is the only one I've kept on my home screen.",
    name: 'Priya N.',
    craft: 'Crochet maker',
    initial: 'P',
  },
]

function TestimonialCard({ quote, name, craft, initial }: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="w-80 shrink-0 rounded-md border-[0.5px] border-linen bg-surface p-5 shadow">
      <p className="text-sm text-text-2">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-pill bg-primary-light text-sm font-semibold text-primary-dark">
          {initial}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-1">{name}</p>
          <p className="text-xs text-text-3">{craft}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto max-w-lg px-6 text-center">
        <h2 className="text-3xl font-bold text-text-1 md:text-4xl">What crafters are saying.</h2>
        <p className="mt-3 text-base text-text-2">
          From beta testers who&apos;ve been using skeined in their craft sessions.
        </p>
      </div>

      <div className="mt-12 flex w-max animate-marquee gap-6 px-6 hover:[animation-play-state:paused]">
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </section>
  )
}

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b-[0.5px] border-linen bg-bg/90 px-6 py-4 backdrop-blur-sm">
      <span className="text-xl font-bold lowercase text-primary-dark">skeined.</span>
      <a
        href="#waitlist-form"
        className="flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-white"
      >
        Claim your spot
      </a>
    </nav>
  )
}

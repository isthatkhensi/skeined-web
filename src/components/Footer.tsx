export default function Footer() {
  return (
    <footer className="bg-[#111111] px-6 py-12 text-text-3">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <p className="text-lg font-bold text-white">skeined.</p>
          <p className="mt-2 text-sm">Keep your craft. We&apos;ll keep your place.</p>
          <p className="mt-1 text-sm">© 2026 MalHQ · Johannesburg, South Africa</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3">
            <div
              className="h-11 w-32 rounded-md bg-[#1c1c1c]"
              role="img"
              aria-label="App Store badge placeholder"
            />
            <div
              className="h-11 w-32 rounded-md bg-[#1c1c1c]"
              role="img"
              aria-label="Play Store badge placeholder"
            />
          </div>
          <p className="text-sm">Launching soon</p>
        </div>

        <nav className="flex flex-col items-center gap-2 text-sm md:items-end" aria-label="Footer">
          <a href="#" className="text-white hover:text-primary-light">
            Instagram
          </a>
          <a href="#" className="text-white hover:text-primary-light">
            TikTok
          </a>
          <a href="/privacy" className="text-white hover:text-primary-light">
            Privacy Policy
          </a>
          <a href="/terms" className="text-white hover:text-primary-light">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  )
}

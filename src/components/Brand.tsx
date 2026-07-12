import { Link } from "react-router-dom";

interface BrandProps {
  className?: string;
  /** router path to link to; when omitted, links to "#" (top of current page) */
  to?: string;
}

/** The Skeined wordmark with a solid lavender diamond glyph (reads on any bg). */
export default function Brand({ className = "", to }: BrandProps) {
  const classes = `inline-flex items-center gap-2.5 font-semibold text-[17px] ${className}`;
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="h-5 w-5 rotate-45 rounded-[6px] bg-primary ring-1 ring-inset ring-white/40"
      />
      <span>Skeined</span>
    </>
  );

  return to ? (
    <Link to={to} className={classes}>
      {inner}
    </Link>
  ) : (
    <a href="#" className={classes}>
      {inner}
    </a>
  );
}

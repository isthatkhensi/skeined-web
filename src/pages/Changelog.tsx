import PageShell from "../components/PageShell";
import { changelog } from "../content/changelog";

/** Long dates read warmer than 2026-09-04, and this page is read, not scanned. */
function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Changelog() {
  return (
    <PageShell
      title="What's new"
      intro="Everything that has changed in Skeined, most recent first. Written for makers rather than for engineers — if something here made your knitting easier, that is the version it happened in."
    >
      <div className="flex flex-col gap-12">
        {changelog.map((entry) => (
          <article key={entry.version}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-xl font-semibold text-ink">{entry.version}</h2>
              <span className="text-sm text-faint">
                {entry.date ? formatDate(entry.date) : "Coming with launch"}
              </span>
            </div>

            <p className="mt-2 text-[17px] font-medium text-ink">{entry.headline}</p>

            <ul className="mt-4 flex flex-col gap-3">
              {entry.items.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-[15px] leading-relaxed text-muted
                             before:absolute before:left-0 before:top-[0.65em]
                             before:h-1.5 before:w-1.5 before:rounded-full before:bg-clay"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

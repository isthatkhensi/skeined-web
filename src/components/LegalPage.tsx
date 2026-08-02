import ReactMarkdown from "react-markdown";
import PageShell from "./PageShell";
import { LEGAL_READY } from "../content/legal";

interface LegalPageProps {
  title: string;
  markdown: string;
}

/** Renders legal markdown with light, readable prose styling. */
export default function LegalPage({ title, markdown }: LegalPageProps) {
  return (
    <PageShell title={title}>
      {!LEGAL_READY && (
        <p className="mb-8 rounded-xl border border-linen bg-primary-light px-5 py-4 text-sm text-muted">
          This page is wired up and routed — the verbatim policy copy still needs
          to be pasted into <code>src/content/legal.ts</code>.
        </p>
      )}
      <div className="legal-prose flex flex-col gap-4 text-[15px] leading-relaxed text-muted">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h2 className="mt-8 text-2xl font-semibold text-ink first:mt-0">
                {children}
              </h2>
            ),
            h2: ({ children }) => (
              <h3 className="mt-6 text-xl font-semibold text-ink">{children}</h3>
            ),
            h3: ({ children }) => (
              <h4 className="mt-4 text-base font-semibold text-ink">
                {children}
              </h4>
            ),
            p: ({ children }) => <p>{children}</p>,
            ul: ({ children }) => (
              <ul className="ml-5 list-disc space-y-1.5">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="ml-5 list-decimal space-y-1.5">{children}</ol>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-primary underline">
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-ink">{children}</strong>
            ),
            // Tables (and any other unexpectedly wide block, e.g. a long code
            // span) scroll within their own box rather than pushing the page
            // wider — legal copy is the one place free-form content could
            // introduce something wide.
            table: ({ children }) => (
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border-b border-linen px-3 py-2 font-semibold text-ink">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border-b border-linen px-3 py-2 align-top">
                {children}
              </td>
            ),
            pre: ({ children }) => (
              <pre className="w-full overflow-x-auto rounded-lg bg-primary-light p-4 text-sm">
                {children}
              </pre>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </PageShell>
  );
}

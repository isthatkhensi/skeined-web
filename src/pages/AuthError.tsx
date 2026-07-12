import PageShell from "../components/PageShell";
import { SUPPORT_EMAIL } from "../lib/links";

export default function AuthError() {
  return (
    <PageShell
      title="This link has expired."
      intro="No harm done. Sign-in and reset links only work once, and they time out after a while for your security."
      withFooter={false}
    >
      <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-muted">
        <p>
          Head back to the Skeined app and request a fresh one — it takes a
          second, and the new link will land in your inbox right away.
        </p>
        <p>
          Still stuck? Email us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          and we'll sort it out.
        </p>
      </div>
    </PageShell>
  );
}

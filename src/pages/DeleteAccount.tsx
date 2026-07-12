import PageShell from "../components/PageShell";
import { SUPPORT_EMAIL } from "../lib/links";

export default function DeleteAccount() {
  return (
    <PageShell
      title="Delete your account"
      intro="You're in control of your data. Here's how to remove your Skeined account and everything tied to it."
    >
      <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-muted">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-ink">
            From inside the app
          </h2>
          <p>
            Open Skeined and go to{" "}
            <strong className="font-semibold text-ink">
              Settings → Delete account
            </strong>
            , then confirm. This permanently removes your profile, your imported
            patterns, your stash, and your saved progress. It can't be undone.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-ink">
            Can't get into the app?
          </h2>
          <p>
            Email us at{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-primary underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            from the address on your account and we'll delete it for you. We may
            ask a question or two to make sure it's really you.
          </p>
        </div>

        <p className="text-sm text-faint">
          Note: deleting your account doesn't automatically cancel an App Store
          purchase or subscription — manage those from your Apple ID settings.
        </p>
      </div>
    </PageShell>
  );
}

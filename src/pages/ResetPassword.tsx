import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageShell from "../components/PageShell";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { APP_DEEP_LINK, SUPPORT_EMAIL } from "../lib/links";

type Status = "loading" | "ready" | "invalid" | "success" | "unconfigured";

interface FormValues {
  password: string;
  confirm: string;
}

export default function ResetPassword() {
  // Capture the token from the URL before Supabase's detectSessionInUrl strips
  // it — so we can still hand off to the app via a deep link if needed.
  const [initialHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : ""
  );
  const [status, setStatus] = useState<Status>(
    supabaseConfigured ? "loading" : "unconfigured"
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    if (!supabase) return;
    let resolved = false;

    // The recovery link establishes a short-lived session; once it's present we
    // can update the password.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        resolved = true;
        setStatus("ready");
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        resolved = true;
        setStatus("ready");
      } else {
        // Give detectSessionInUrl a moment to parse the token, then give up.
        setTimeout(() => {
          if (!resolved) setStatus((s) => (s === "loading" ? "invalid" : s));
        }, 1500);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const onSubmit = async ({ password }: FormValues) => {
    if (!supabase) return;
    setServerError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setServerError(error.message);
    else setStatus("success");
  };

  const appHandoff = `${APP_DEEP_LINK}reset-password${initialHash}`;

  return (
    <PageShell
      title="Reset your password"
      intro={
        status === "ready"
          ? "Choose a new password for your Skeined account."
          : undefined
      }
      withFooter={false}
    >
      {status === "loading" && (
        <p className="text-[15px] text-muted">Checking your link…</p>
      )}

      {status === "unconfigured" && (
        <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-muted">
          {/* TODO(founder): add VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY to .env
              to switch this page on (see .env.example). */}
          <p>
            Password reset is temporarily unavailable on the web. Please open the
            Skeined app and request a reset from there, or email us at{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-primary underline"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      )}

      {status === "invalid" && (
        <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-muted">
          <p>
            This reset link is invalid or has expired — they can only be used
            once. Request a fresh one from the Skeined app and we'll send a new
            link right away.
          </p>
          <p>
            <a href={appHandoff} className="text-primary underline">
              Open the Skeined app
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-primary underline"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col gap-5">
          <p className="text-[15px] leading-relaxed text-muted">
            Your password has been updated. You can head back to the app and sign
            in with your new password.
          </p>
          <a
            href={APP_DEEP_LINK}
            className="inline-flex w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Open Skeined
          </a>
        </div>
      )}

      {status === "ready" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex max-w-sm flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">New password</span>
            <input
              type="password"
              autoComplete="new-password"
              {...register("password", {
                required: "Please enter a new password",
                minLength: {
                  value: 8,
                  message: "Use at least 8 characters",
                },
              })}
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-ink outline-none focus:border-primary"
            />
            {errors.password && (
              <span className="text-xs text-red-600">
                {errors.password.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">
              Confirm password
            </span>
            <input
              type="password"
              autoComplete="new-password"
              {...register("confirm", {
                required: "Please confirm your password",
                validate: (v) =>
                  v === watch("password") || "Passwords don't match",
              })}
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-ink outline-none focus:border-primary"
            />
            {errors.confirm && (
              <span className="text-xs text-red-600">
                {errors.confirm.message}
              </span>
            )}
          </label>

          {serverError && (
            <p className="text-xs text-red-600">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Updating…" : "Update password"}
          </button>

          <p className="text-xs text-faint">
            Have the app installed?{" "}
            <a href={appHandoff} className="text-primary underline">
              Reset in the Skeined app instead
            </a>
            .
          </p>
        </form>
      )}
    </PageShell>
  );
}

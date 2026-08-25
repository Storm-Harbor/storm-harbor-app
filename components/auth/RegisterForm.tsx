"use client";

import {FormEvent, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Link, useRouter} from "@/i18n/navigation";

function messageKey(code: string) {
  if (code === "IDENTITY_EXISTS") return "identityExists";
  if (code === "INVALID_REGISTRATION") return "invalidRegistration";
  if (code === "RATE_LIMITED") return "rateLimited";
  if (code === "AUTH_UNAVAILABLE") return "authUnavailable";
  return "genericError";
}

export function RegisterForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const recoveryEmail = String(form.get("recoveryEmail") ?? "");
    if (email.trim().toLowerCase() === recoveryEmail.trim().toLowerCase()) {
      setError("recoveryMustDiffer");
      setPending(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email, recoveryEmail, password: form.get("password"), locale}),
      });
      const result = await response.json() as {code?: string};
      if (!response.ok) {
        setError(messageKey(result.code ?? ""));
        return;
      }
      router.push("/verify-email");
    } catch {
      setError("authUnavailable");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="section-eyebrow text-blue-700">{t("registerEyebrow")}</div>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-slate-950">{t("registerTitle")}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{t("registerBody")}</p>
      <div className="mt-5 rounded-sm border border-blue-200 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-900">
        {t("publicEmailAllowed")}
      </div>

      <form className="mt-7 space-y-4" onSubmit={submit}>
        <label className="auth-field">
          <span>{t("email")}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="auth-field">
          <span>{t("recoveryEmail")}</span>
          <input name="recoveryEmail" type="email" autoComplete="email" required />
          <small>{t("recoveryEmailHint")}</small>
        </label>
        <label className="auth-field">
          <span>{t("password")}</span>
          <input name="password" type="password" autoComplete="new-password" required minLength={8} />
          <small>{t("passwordHint")}</small>
        </label>

        {error && <div className="auth-error" role="alert">{t(`errors.${error}`)}</div>}

        <button className="button button-primary h-12 w-full" type="submit" disabled={pending}>
          {pending ? t("creatingAccount") : t("createAccount")}
        </button>
      </form>

      <div className="mt-7 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
        {t("hasAccount")} <Link href="/login" className="font-bold text-blue-700 hover:text-blue-600">{t("signIn")}</Link>
      </div>
    </div>
  );
}

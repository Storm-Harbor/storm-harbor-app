"use client";

import {FormEvent, useState} from "react";
import {useTranslations} from "next-intl";
import {Link, useRouter} from "@/i18n/navigation";

type LoginFormProps = {returnTo: string};

function messageKey(code: string) {
  if (code === "INVALID_CREDENTIALS") return "invalidCredentials";
  if (code === "EMAIL_NOT_VERIFIED") return "emailNotVerified";
  if (code === "RATE_LIMITED") return "rateLimited";
  if (code === "AUTH_UNAVAILABLE") return "authUnavailable";
  return "genericError";
}

export function LoginForm({returnTo}: LoginFormProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email: form.get("email"), password: form.get("password")}),
      });
      const result = await response.json() as {code?: string; next?: string};
      if (!response.ok) {
        setError(messageKey(result.code ?? ""));
        return;
      }
      router.push(result.next === "mfa" ? "/mfa" : returnTo);
      router.refresh();
    } catch {
      setError("authUnavailable");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="section-eyebrow text-blue-700">{t("loginEyebrow")}</div>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-slate-950">{t("loginTitle")}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{t("loginBody")}</p>

      <form className="mt-8 space-y-5" onSubmit={submit}>
        <label className="auth-field">
          <span>{t("email")}</span>
          <input name="email" type="email" autoComplete="email" required placeholder="name@example.com" />
        </label>
        <label className="auth-field">
          <span>{t("password")}</span>
          <input name="password" type="password" autoComplete="current-password" required minLength={8} />
        </label>

        {error && (
          <div className="auth-error" role="alert">
            {t(`errors.${error}`)}
            {error === "emailNotVerified" && (
              <Link href="/verify-email" className="ml-1 font-bold underline">{t("verifyNow")}</Link>
            )}
          </div>
        )}

        <button className="button button-primary h-12 w-full" type="submit" disabled={pending}>
          {pending ? t("signingIn") : t("signIn")}
        </button>
      </form>

      <div className="mt-7 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
        {t("noAccount")} <Link href="/register" className="font-bold text-blue-700 hover:text-blue-600">{t("createAccount")}</Link>
      </div>
      <p className="mt-5 text-center text-[11px] leading-5 text-slate-500">{t("sessionSecurity")}</p>
    </div>
  );
}

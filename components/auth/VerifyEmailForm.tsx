"use client";

import {FormEvent, useState} from "react";
import {useTranslations} from "next-intl";
import {Link, useRouter} from "@/i18n/navigation";

export function VerifyEmailForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/email-verification/confirm", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email: form.get("email"), code: form.get("code")}),
      });
      const result = await response.json() as {code?: string};
      if (!response.ok) {
        setError(result.code === "AUTH_UNAVAILABLE" ? "authUnavailable" : "invalidVerificationCode");
        return;
      }
      router.push("/login");
    } catch {
      setError("authUnavailable");
    } finally {
      setPending(false);
    }
  }

  async function resend(event: FormEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    const email = form?.elements.namedItem("email") as HTMLInputElement | null;
    if (!email?.value) return;
    setNotice(null);
    setError(null);
    try {
      const response = await fetch("/api/auth/email-verification/request", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email: email.value}),
      });
      if (!response.ok) {
        setError("genericError");
        return;
      }
      setNotice("verificationSent");
    } catch {
      setError("authUnavailable");
    }
  }

  return (
    <div className="auth-card">
      <div className="section-eyebrow text-blue-700">{t("verifyEmailEyebrow")}</div>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-slate-950">{t("verifyEmailTitle")}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{t("verifyEmailBody")}</p>

      <form className="mt-8 space-y-5" onSubmit={submit}>
        <label className="auth-field">
          <span>{t("email")}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="auth-field">
          <span>{t("verificationCode")}</span>
          <input className="text-center font-mono text-xl tracking-[0.32em]" name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" required />
        </label>
        {error && <div className="auth-error" role="alert">{t(`errors.${error}`)}</div>}
        {notice && <div className="auth-notice" role="status">{t(notice)}</div>}
        <button className="button button-primary h-12 w-full" type="submit" disabled={pending}>
          {pending ? t("verifying") : t("confirmEmail")}
        </button>
        <button className="w-full text-center text-xs font-bold text-blue-700 hover:text-blue-600" type="button" onClick={resend}>
          {t("resendCode")}
        </button>
      </form>
      <div className="mt-6 text-center text-sm"><Link href="/login" className="font-bold text-blue-700">{t("backToLogin")}</Link></div>
    </div>
  );
}

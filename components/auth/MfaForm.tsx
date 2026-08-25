"use client";

import {FormEvent, useState} from "react";
import {useTranslations} from "next-intl";
import {Link, useRouter} from "@/i18n/navigation";

export function MfaForm() {
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
      const response = await fetch("/api/auth/mfa", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({code: form.get("code")}),
      });
      const result = await response.json() as {code?: string};
      if (!response.ok) {
        setError(result.code === "AUTH_UNAVAILABLE" ? "authUnavailable" : "invalidMfaCode");
        return;
      }
      router.push("/console");
      router.refresh();
    } catch {
      setError("authUnavailable");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-100 font-mono text-sm font-bold text-blue-700">2FA</div>
      <h2 className="mt-6 text-center text-4xl font-semibold tracking-[-0.055em] text-slate-950">{t("mfaTitle")}</h2>
      <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-6 text-slate-600">{t("mfaBody")}</p>

      <form className="mt-8 space-y-5" onSubmit={submit}>
        <label className="auth-field">
          <span>{t("securityCode")}</span>
          <input className="text-center font-mono text-xl tracking-[0.32em]" name="code" inputMode="numeric" autoComplete="one-time-code" required minLength={6} autoFocus />
        </label>
        {error && <div className="auth-error" role="alert">{t(`errors.${error}`)}</div>}
        <button className="button button-primary h-12 w-full" type="submit" disabled={pending}>
          {pending ? t("verifying") : t("verifyAndContinue")}
        </button>
      </form>

      <div className="mt-7 text-center text-sm">
        <Link href="/login" className="font-bold text-blue-700 hover:text-blue-600">{t("backToLogin")}</Link>
      </div>
    </div>
  );
}

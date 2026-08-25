import {getTranslations, setRequestLocale} from "next-intl/server";
import {AuthShell} from "@/components/auth/AuthShell";
import {VerifyEmailForm} from "@/components/auth/VerifyEmailForm";

export default async function VerifyEmailPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <AuthShell
      eyebrow={t("securityEyebrow")}
      title={t("securityTitle")}
      body={t("securityBody")}
      points={[t("securityPointOne"), t("securityPointTwo"), t("securityPointThree")]}
    >
      <VerifyEmailForm />
    </AuthShell>
  );
}

import {getTranslations, setRequestLocale} from "next-intl/server";
import {AuthShell} from "@/components/auth/AuthShell";
import {RegisterForm} from "@/components/auth/RegisterForm";

export default async function RegisterPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <AuthShell
      eyebrow={t("shellEyebrow")}
      title={t("shellTitle")}
      body={t("shellBody")}
      points={[t("shellPointOne"), t("shellPointTwo"), t("shellPointThree")]}
    >
      <RegisterForm />
    </AuthShell>
  );
}

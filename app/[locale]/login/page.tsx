import {getTranslations, setRequestLocale} from "next-intl/server";
import {AuthShell} from "@/components/auth/AuthShell";
import {LoginForm} from "@/components/auth/LoginForm";
import {safeReturnTo} from "@/lib/auth/contracts";

type PageProps = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{returnTo?: string}>;
};

export default async function LoginPage({params, searchParams}: PageProps) {
  const {locale} = await params;
  const {returnTo} = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <AuthShell
      eyebrow={t("shellEyebrow")}
      title={t("shellTitle")}
      body={t("shellBody")}
      points={[t("shellPointOne"), t("shellPointTwo"), t("shellPointThree")]}
    >
      <LoginForm returnTo={safeReturnTo(returnTo)} />
    </AuthShell>
  );
}

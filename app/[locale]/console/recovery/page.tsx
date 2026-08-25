import {getTranslations, setRequestLocale} from "next-intl/server";
import {ConsoleSection} from "@/components/console/ConsoleSection";

export default async function RecoveryPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("console.sections.recovery");
  return <ConsoleSection eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />;
}

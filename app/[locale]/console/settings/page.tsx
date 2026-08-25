import {getTranslations, setRequestLocale} from "next-intl/server";
import {ConsoleSection} from "@/components/console/ConsoleSection";

export default async function SettingsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("console.sections.settings");
  return <ConsoleSection eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />;
}

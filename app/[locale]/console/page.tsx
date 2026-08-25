import {setRequestLocale} from "next-intl/server";
import {ConsoleOverview} from "@/components/console/ConsoleOverview";

export default async function ConsolePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <ConsoleOverview />;
}

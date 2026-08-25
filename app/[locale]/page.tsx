import {setRequestLocale} from "next-intl/server";
import {Header} from "@/components/Header";
import {HomePage} from "@/components/HomePage";
import {LanguageSwitcher} from "@/components/LanguageSwitcher";

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <HomePage />
      <LanguageSwitcher />
    </>
  );
}

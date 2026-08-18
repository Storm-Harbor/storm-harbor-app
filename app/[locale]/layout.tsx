import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {Header} from "@/components/Header";
import {LanguageSwitcher} from "@/components/LanguageSwitcher";
import {LocalStorageSync} from "@/components/LocalStorageSync";
import {routing} from "@/i18n/routing";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: "meta"});

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://storm-harbor.github.io"),
    icons: {icon: "/logo.svg"},
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "nav"});

  return (
    <html lang={locale} className="scroll-smooth">
      <body>
        <NextIntlClientProvider>
          <a href="#main-content" className="skip-link">{t("skipContent")}</a>
          <Header />
          <LocalStorageSync />
          <div id="main-content">{children}</div>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

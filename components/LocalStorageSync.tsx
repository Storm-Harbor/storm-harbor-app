"use client";

import {useEffect} from "react";
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import {defaultLocale, getStoredLocale, locales, storeLocale} from "@/i18n/config";

function detectLocale() {
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const browserLocale of browserLanguages) {
    if (!browserLocale) continue;
    const exact = locales.find((locale) => locale.toLowerCase() === browserLocale.toLowerCase());
    if (exact) return exact;
    const language = browserLocale.split("-")[0].toLowerCase();
    const match = locales.find((locale) => locale.split("-")[0].toLowerCase() === language);
    if (match) return match;
  }
  return defaultLocale;
}

export function LocalStorageSync() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const preferredLocale = getStoredLocale() ?? detectLocale();
    if (preferredLocale !== locale) {
      router.replace(pathname, {locale: preferredLocale});
      return;
    }
    storeLocale(locale);
  }, [locale, pathname, router]);

  return null;
}

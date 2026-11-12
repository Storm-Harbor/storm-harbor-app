export const localeOptions = [
  {code: "en-GB", flag: "🇬🇧"},
  {code: "en-US", flag: "🇺🇸"},
  {code: "es-ES", flag: "🇪🇸"},
  {code: "ca-ES", flag: "🏴"},
  {code: "pt-PT", flag: "🇵🇹"},
  {code: "pt-BR", flag: "🇧🇷"},
  {code: "it-IT", flag: "🇮🇹"},
  {code: "ru-RU", flag: "🇷🇺"},
  {code: "de-DE", flag: "🇩🇪"},
  {code: "fr-FR", flag: "🇫🇷"},
  {code: "uk-UA", flag: "🇺🇦"},
  {code: "et-EE", flag: "🇪🇪"},
  {code: "pl-PL", flag: "🇵🇱"},
  {code: "bg-BG", flag: "🇧🇬"},
  {code: "zh-Hans", flag: "🌐"},
  {code: "hi-IN", flag: "🇮🇳"},
  {code: "ja-JP", flag: "🇯🇵"},
  {code: "he-IL", flag: "🇮🇱"},
  {code: "ur-PK", flag: "🇵🇰"},
  {code: "af-ZA", flag: "🇿🇦"},
  {code: "ar", flag: "🌐"},
  {code: "ko-KR", flag: "🇰🇷"},
  {code: "tr-TR", flag: "🇹🇷"},
  {code: "id-ID", flag: "🇮🇩"},
  {code: "vi-VN", flag: "🇻🇳"},
] as const;

export const locales = localeOptions.map(({code}) => code);
export type Locale = (typeof localeOptions)[number]["code"];
export const defaultLocale: Locale = "en-GB";
export const localeStorageKey = "storm_harbor_locale";

export function localeDirection(locale: string): "ltr" | "rtl" {
  return ["ar", "he", "ur"].includes(locale.split("-")[0]) ? "rtl" : "ltr";
}

export function matchBrowserLocale(requested: string): Locale | null {
  try {
    const candidate = new Intl.Locale(requested);
    const exact = locales.find(locale => locale.toLowerCase() === candidate.toString().toLowerCase());
    if (exact) return exact;
    return locales.find(locale => {
      const supported = new Intl.Locale(locale);
      return supported.language === candidate.language &&
        supported.maximize().script === candidate.maximize().script;
    }) ?? null;
  } catch {
    return null;
  }
}

export function isSupportedLocale(locale: string): locale is Locale {
  return locales.some((supportedLocale) => supportedLocale === locale);
}

export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  try {
    const storedLocale = window.localStorage.getItem(localeStorageKey);
    return storedLocale && isSupportedLocale(storedLocale) ? storedLocale : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: string) {
  if (!isSupportedLocale(locale) || typeof window === "undefined") return;

  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // Storage may be unavailable in private browsing or restricted contexts.
  }
}

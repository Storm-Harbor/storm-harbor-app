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
] as const;

export const locales = localeOptions.map(({code}) => code);
export type Locale = (typeof localeOptions)[number]["code"];
export const defaultLocale: Locale = "en-GB";
export const localeStorageKey = "storm_harbor_locale";

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

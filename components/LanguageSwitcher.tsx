"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {useLocale, useTranslations} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import {localeOptions, storeLocale} from "@/i18n/config";
import {CheckIcon, ChevronDownIcon} from "./Icons";

function LocaleFlag({code, flag}: {code: string; flag: string}) {
  if (code === "ca-ES") {
    return <span className="catalonia-flag" aria-hidden="true" />;
  }
  return <span className="text-sm leading-none" aria-hidden="true">{flag}</span>;
}

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const current = localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  const changeLanguage = (newLocale: (typeof localeOptions)[number]["code"]) => {
    if (newLocale === locale) return;
    storeLocale(newLocale);
    router.replace(pathname, {locale: newLocale});
  };

  return (
    <div className="fixed bottom-[max(12px,env(safe-area-inset-bottom))] right-[max(12px,env(safe-area-inset-right))] z-[80] sm:bottom-5 sm:right-5">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="language-trigger" type="button" aria-label={t("choose")}>
            <LocaleFlag code={current.code} flag={current.flag} />
            <span className="language-current hidden sm:inline">{t(current.code)}</span>
            <ChevronDownIcon className="hidden size-3.5 opacity-60 sm:block" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content side="top" align="end" sideOffset={9} className="language-menu">
            <DropdownMenu.Label className="px-2.5 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {t("choose")}
            </DropdownMenu.Label>
            {localeOptions.map((option) => (
              <DropdownMenu.Item
                key={option.code}
                onSelect={() => changeLanguage(option.code)}
                className="language-item"
                data-active={locale === option.code || undefined}
              >
                <span className="flex size-5 items-center justify-center">
                  <LocaleFlag code={option.code} flag={option.flag} />
                </span>
                <span>{t(option.code)}</span>
                {locale === option.code && <CheckIcon className="ml-auto size-4 text-blue-400" />}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

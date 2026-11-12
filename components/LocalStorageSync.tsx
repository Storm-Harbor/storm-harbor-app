"use client";

import {useEffect} from "react";
import {useLocale} from "next-intl";
import {storeLocale} from "@/i18n/config";

export function LocalStorageSync() {
  const locale = useLocale();

  useEffect(() => {
    storeLocale(locale);
  }, [locale]);

  return null;
}

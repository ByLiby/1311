"use client";

import { useEffect } from "react";
import { LANG_COOKIE_NAME, type SupportedLang } from "@/lib/i18n";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const htmlLangBySiteLang: Record<SupportedLang, string> = {
  de: "de-AT",
  en: "en",
  ru: "ru",
};

export default function LangCookieSync({ lang }: { lang: SupportedLang }) {
  useEffect(() => {
    document.cookie = `${LANG_COOKIE_NAME}=${lang}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
    document.documentElement.lang = htmlLangBySiteLang[lang];
  }, [lang]);

  return null;
}

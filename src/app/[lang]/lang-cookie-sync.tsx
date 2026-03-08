"use client";

import { useEffect } from "react";
import { LANG_COOKIE_NAME, type SupportedLang } from "@/lib/i18n";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export default function LangCookieSync({ lang }: { lang: SupportedLang }) {
  useEffect(() => {
    document.cookie = `${LANG_COOKIE_NAME}=${lang}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
  }, [lang]);

  return null;
}

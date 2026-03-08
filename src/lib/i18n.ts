export const SUPPORTED_LANGS = ["de", "en", "ru"] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: SupportedLang = "de";
export const LANG_COOKIE_NAME = "site_lang";

export function isSupportedLang(value: string | undefined | null): value is SupportedLang {
  if (!value) {
    return false;
  }

  return SUPPORTED_LANGS.includes(value as SupportedLang);
}

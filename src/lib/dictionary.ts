import deDictionary from "@/dictionaries/de.json";
import type { SupportedLang } from "@/lib/i18n";

export type SiteDictionary = typeof deDictionary;

const dictionaryLoaders: Record<SupportedLang, () => Promise<SiteDictionary>> = {
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ru: () => import("@/dictionaries/ru.json").then((module) => module.default),
};

export function getDictionary(lang: SupportedLang) {
  return dictionaryLoaders[lang]();
}

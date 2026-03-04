import { notFound } from "next/navigation";
import CatalogPage, { type Lang } from "../_components/catalog-page";

type LocalizedPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

const LANGS: Lang[] = ["de", "en", "ru"];

const dictionaries = {
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ru: () => import("@/dictionaries/ru.json").then((module) => module.default),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const { lang } = await params;
  
  if (!LANGS.includes(lang as Lang)) {
    notFound();
  }

  const dictionary = await dictionaries[lang as Lang]();

  return <CatalogPage lang={lang as Lang} dictionary={dictionary} />;
}

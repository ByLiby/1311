import { notFound } from "next/navigation";
import { type Lang } from "../../_components/catalog-page";
import ContactPageClient from "./contact-client";

type LocalizedPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

const LANGS: Lang[] = ["de", "en", "ru"];

const dictionaries = {
  de: () => import("@/dictionaries/de.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
};

export default async function ContactPage({ params }: LocalizedPageProps) {
  const { lang } = await params;

  if (!LANGS.includes(lang as Lang)) {
    notFound();
  }

  const dictionary = await dictionaries[lang as Lang]();

  return <ContactPageClient lang={lang as Lang} dictionary={dictionary} />;
}

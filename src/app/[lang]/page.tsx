import { notFound } from "next/navigation";
import CatalogPage from "../_components/catalog-page";
import { getDictionary } from "@/lib/dictionary";
import { isSupportedLang, SUPPORTED_LANGS } from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return <CatalogPage lang={lang} dictionary={dictionary} />;
}

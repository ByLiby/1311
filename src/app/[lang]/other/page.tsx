import { notFound } from "next/navigation";
import MaterialCatalogPage from "@/app/_components/material-catalog-page";
import { getDictionary } from "@/lib/dictionary";
import { isSupportedLang } from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function OtherMaterialsPage({ params }: LocalizedPageProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return <MaterialCatalogPage lang={lang} category="other" dictionary={dictionary} />;
}

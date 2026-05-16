import { notFound } from "next/navigation";
import MaterialCatalogPage from "@/app/_components/material-catalog-page";
import { getDictionary } from "@/lib/dictionary";
import { isSupportedLang } from "@/lib/i18n";
import type { MaterialPageSlug } from "@/lib/material-catalog";

export type LocalizedMaterialPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export async function renderMaterialCatalogRoute(
  { params }: LocalizedMaterialPageProps,
  category: MaterialPageSlug,
) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return <MaterialCatalogPage lang={lang} category={category} dictionary={dictionary} />;
}

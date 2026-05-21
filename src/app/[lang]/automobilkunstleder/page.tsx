import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MaterialCatalogPage from "@/app/_components/material-catalog-page";
import { generateMaterialCatalogMetadata } from "@/app/_components/material-catalog-route";
import { getDictionary } from "@/lib/dictionary";
import { isSupportedLang } from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata(props: LocalizedPageProps): Promise<Metadata> {
  return generateMaterialCatalogMetadata(props, "automobilkunstleder");
}

export default async function AutomobilkunstlederPage({ params }: LocalizedPageProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <MaterialCatalogPage
      lang={lang}
      category="automobilkunstleder"
      dictionary={dictionary}
    />
  );
}

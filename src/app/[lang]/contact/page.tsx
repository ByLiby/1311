import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import { isSupportedLang } from "@/lib/i18n";
import ContactPageClient from "./contact-client";

type LocalizedPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function ContactPage({ params }: LocalizedPageProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return <ContactPageClient lang={lang} dictionary={dictionary} />;
}

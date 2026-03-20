import { notFound } from "next/navigation";
import ContactPage from "@/app/_components/contact-page";
import { getDictionary } from "@/lib/dictionary";
import { isSupportedLang } from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function KontaktPage({ params }: LocalizedPageProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return <ContactPage lang={lang} dictionary={dictionary} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactPage from "@/app/_components/contact-page";
import { getDictionary } from "@/lib/dictionary";
import { isSupportedLang } from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.contactPage.headline} | Leder Stoffe`,
    description: dictionary.contactPage.intro,
    alternates: {
      languages: {
        "de-AT": "/de/kontakt",
        en: "/en/kontakt",
        ru: "/ru/kontakt",
      },
    },
  };
}

export default async function KontaktPage({ params }: LocalizedPageProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return <ContactPage lang={lang} dictionary={dictionary} />;
}

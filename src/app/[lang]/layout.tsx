import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import { isSupportedLang } from "@/lib/i18n";
import LangCookieSync from "./lang-cookie-sync";

type LocalizedLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({
  params,
}: Omit<LocalizedLayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return {
    title: dictionary.meta.home.title,
    description: dictionary.meta.home.description,
    alternates: {
      languages: {
        "de-AT": "/de",
        en: "/en",
        ru: "/ru",
      },
    },
  };
}

export default async function LocalizedLayout({
  children,
  params,
}: LocalizedLayoutProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  return (
    <>
      <LangCookieSync lang={lang as SupportedLang} />
      {children}
    </>
  );
}

import { notFound, redirect } from "next/navigation";
import { isSupportedLang } from "@/lib/i18n";

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

  redirect(`/${lang}/kontakt`);
}

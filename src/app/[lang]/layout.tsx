import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Lang } from "../_components/catalog-page";

type LocalizedLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

const LANGS: Lang[] = ["de", "en", "ru"];

const metadataByLang: Record<Lang, Metadata> = {
  de: {
    title: "Leder Stoffe | Europäische Automotive-Interieur-Materialien",
    description:
      "Zuverlässige PU- & PVC-Lösungen ab Lager Österreich mit europaweiter Lieferung.",
    alternates: {
      languages: {
        "de-AT": "/de",
        en: "/en",
        ru: "/ru",
      },
    },
  },
  en: {
    title: "Leder Stoffe | European Automotive Interior Materials",
    description:
      "Reliable PU & PVC solutions stocked in Austria and delivered across Europe.",
    alternates: {
      languages: {
        "de-AT": "/de",
        en: "/en",
        ru: "/ru",
      },
    },
  },
  ru: {
    title: "Leder Stoffe | Европейские материалы для автомобильных интерьеров",
    description:
      "Надёжные PU- и PVC-решения со склада в Австрии с доставкой по всей Европе.",
    alternates: {
      languages: {
        "de-AT": "/de",
        en: "/en",
        ru: "/ru",
      },
    },
  },
};

export async function generateMetadata({
  params,
}: Omit<LocalizedLayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) {
    notFound();
  }
  return metadataByLang[lang as Lang];
}

export default async function LocalizedLayout({
  children,
  params,
}: LocalizedLayoutProps) {
  await params;
  return children;
}

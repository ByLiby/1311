"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { Check, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import type { SiteDictionary } from "@/lib/dictionary";
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n";

const HERO_VIEWER_BACKGROUND =
  "radial-gradient(90% 70% at 54% 42%, rgba(40, 44, 50, 0.24), rgba(8, 9, 11, 0.68) 56%, rgba(3, 3, 4, 0.98) 100%), linear-gradient(145deg, #101114, #050506)";
const SOCIAL_PLATFORM_LINKS = {
  tiktok: "https://www.tiktok.com/@leder_stoffe",
  whatsapp: "https://wa.me/436764725428",
} as const;
type SocialPlatform = keyof typeof SOCIAL_PLATFORM_LINKS;

function SocialBrandIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  if (platform === "tiktok") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="currentColor"
      >
        <path d="M15.58 3c.2 1.68 1.14 3.26 2.58 4.14 1.07.67 2.14.93 3.34.98v3.08c-1.72-.06-3.33-.55-4.8-1.44v5.92c0 2.42-1.16 4.47-3.12 5.7A6.82 6.82 0 0 1 10 22c-3.87 0-7-2.95-7-6.6 0-3.65 3.13-6.6 7-6.6.34 0 .69.03 1.02.1v3.17a3.55 3.55 0 0 0-1.02-.15c-1.95 0-3.52 1.53-3.52 3.4 0 1.88 1.57 3.4 3.52 3.4 2.1 0 3.56-1.59 3.56-3.84V3h2.02Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.11 4.89A9.87 9.87 0 0 0 12.09 2C6.57 2 2.08 6.33 2.08 11.66c0 1.7.46 3.35 1.33 4.8L2 22l5.77-1.5a10.15 10.15 0 0 0 4.32.96h.01c5.52 0 10-4.33 10-9.66 0-2.58-1-5.02-2.99-6.91Zm-7.02 14.95c-1.37 0-2.72-.36-3.9-1.03l-.28-.16-3.42.89.92-3.3-.18-.29a7.55 7.55 0 0 1-1.17-4.03c0-4.2 3.6-7.62 8.03-7.62 2.14 0 4.15.81 5.66 2.29a7.4 7.4 0 0 1 2.36 5.33c0 4.2-3.6 7.62-8.02 7.62Zm4.4-5.7c-.24-.12-1.42-.68-1.64-.75-.22-.08-.38-.12-.54.12-.16.23-.62.75-.76.9-.14.16-.28.18-.52.06-.24-.12-1-.36-1.9-1.15-.71-.62-1.18-1.38-1.32-1.61-.14-.23-.01-.36.1-.48.1-.1.24-.26.36-.39.12-.14.16-.23.24-.39.08-.16.04-.29-.02-.41-.06-.12-.54-1.28-.74-1.75-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.29-.22.23-.84.8-.84 1.94 0 1.14.86 2.24.98 2.39.12.16 1.68 2.63 4.17 3.58.59.22 1.05.35 1.41.45.59.15 1.12.13 1.54.08.47-.06 1.42-.57 1.62-1.12.2-.55.2-1.02.14-1.12-.05-.1-.21-.16-.45-.27Z" />
    </svg>
  );
}

const SeatViewerClean = dynamic(() => import("@/components/SeatViewerClean"), {
  loading: () => {
    return (
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ background: HERO_VIEWER_BACKGROUND }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid justify-items-center gap-3 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-divider bg-card-bg">
              <div className="h-[18px] w-[18px] rounded-full bg-gold shadow-[0_0_24px_rgba(0,0,0,0.6)]" />
            </div>
            <div className="text-[0.76rem] uppercase tracking-[0.26em] text-text-primary">
              3D
            </div>
            <div className="text-xs tracking-[0.06em] text-text-secondary">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  },
});

type HomepageCopy = {
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string[];
  };
  social: {
    title: string;
    subtitle: string;
    tiktok: {
      title: string;
      text: string;
      cta: string;
      benefits: string[];
    };
  };
  categories: {
    title: string;
    subtitle: string;
    cards: [title: string, label: string, image: string, slug: string][];
  };
  preview: {
    title: string;
    subtitle: string;
    materials: [name: string, price: string, texture: string][];
  };
  applications: {
    title: string;
    items: [title: string, image: string][];
  };
  warehouse: {
    eyebrow: string;
    title: string;
    text: string;
    points: string[];
  };
  whatsapp: {
    title: string;
    text: string;
    cta: string;
  };
};

const HOMEPAGE_COPY = {
  de: {
    hero: {
      eyebrow: "EU-WEITER VERSAND • LAGER IN ÖSTERREICH",
      title: "Premium Kunstleder",
      text: "Kunstleder, Dachhimmelstoffe und technische Materialien direkt ab Lager.",
      primaryCta: "Muster anfragen",
      secondaryCta: "Materialien ansehen",
      trust: ["Versand in Europa", "Muster verfügbar", "Lagerware", "WhatsApp Beratung"],
    },
    social: {
      title: "Folgen Sie uns",
      subtitle: "Neue Materialien, Lagerware und Einblicke direkt aus unserem Showroom.",
      tiktok: {
        title: "TikTok",
        text: "Aktuelle Materialien, neue Ware und echte Einblicke direkt aus unserem Lager.",
        cta: "TikTok ansehen",
        benefits: [
          "Neue Materialien aus dem Lager",
          "Farben und Oberflächen im Video",
          "Aktuelle Ware vorab ansehen",
        ],
      },
    },
    categories: {
      title: "Materialbereiche",
      subtitle: "Hochwertige Materialien für Interieur, Transport und Objektbereich.",
      cards: [
        ["Automobilkunstleder", "Kunstleder", "/materials/Materialbereiche/Automobilkunstleder.png", "automobilkunstleder"],
        ["Dachhimmelstoffe", "Innenausbau", "/images/Himmelstoffe/1.png", "dachhimmelstoffe"],
        ["Bus & Bahn Stoffe", "Transport", "/materials/Materialbereiche/Busstoff.png", "bus-bahn-stoffe"],
      ],
    },
    preview: {
      title: "Material Vorschau",
      subtitle: "Freigestellte Materialflächen, reduziert auf Name und Preis.",
      materials: [
        ["N19 - Arctic Ivory", "29,99 €", "/materials/kunstleder/Arctic%20Ivory.jpeg"],
        ["Satin Black", "29,99 €", "/materials/kunstleder/Satin%20Black.jpeg"],
        ["Cognac Saddle", "29,99 €", "/materials/kunstleder/Cognac%20Saddle.jpeg"],
        ["Busstoff 46", "15,00 €", "/images/spheres/busstoff-46.png"],
        ["Busstoff 45", "15,00 €", "/images/spheres/busstoff-45.png"],
        ["Busstoff 49", "15,00 €", "/images/spheres/busstoff-49.png"],
      ],
    },
    applications: {
      title: "Wo anwenden?",
      items: [
        ["Auto", "/materials/Wo%20anwenden/Auto2.png"],
        ["Yacht", "/materials/Wo%20anwenden/Yachtpng.png"],
        ["Wohnmobil", "/materials/Wo%20anwenden/Wohnmobil.png"],
        ["Bus", "/materials/Wo%20anwenden/Bus.png"],
        ["Hotel", "/materials/Wo%20anwenden/Hotel.png"],
        ["Möbel", "/materials/Wo%20anwenden/Moebel.png"],
      ],
    },
    warehouse: {
      eyebrow: "LAGER IN ÖSTERREICH",
      title: "Direkt aus unserem Lager in Österreich",
      text: "Materialauswahl, Muster und Versand aus einer klaren europäischen Lieferstruktur.",
      points: [
        "Europaweiter Versand",
        "Muster verfügbar",
        "Großhandelsmengen",
        "WhatsApp Support",
        "Lagerware",
        "Persönliche Beratung",
      ],
    },
    whatsapp: {
      title: "Sie suchen ein bestimmtes Material?",
      text: "Wir helfen Ihnen direkt per WhatsApp.",
      cta: "WhatsApp öffnen",
    },
  },
  en: {
    hero: {
      eyebrow: "EU-WIDE SHIPPING • STOCK IN AUSTRIA",
      title: "Premium Synthetic Leather & Automotive Materials",
      text: "Synthetic leather, headliner fabrics and technical materials directly from stock.",
      primaryCta: "Request samples",
      secondaryCta: "View materials",
      trust: ["Shipping in Europe", "Samples available", "Stocked materials", "WhatsApp advice"],
    },
    social: {
      title: "Follow Us",
      subtitle: "New materials, stock updates and showroom insights directly from our team.",
      tiktok: {
        title: "TikTok",
        text: "Current materials, new stock and real insights directly from our warehouse.",
        cta: "View TikTok",
        benefits: [
          "New materials from stock",
          "Colors and surfaces in video",
          "Preview current stock early",
        ],
      },
    },
    categories: {
      title: "Material Categories",
      subtitle: "Premium materials for interiors, transport and contract projects.",
      cards: [
        ["Automotive Leatherette", "Leatherette", "/materials/Materialbereiche/Automobilkunstleder.png", "automobilkunstleder"],
        ["Headliner fabrics", "Interior fit-out", "/images/Himmelstoffe/1.png", "dachhimmelstoffe"],
        ["Bus & rail fabrics", "Transport", "/materials/Materialbereiche/Busstoff.png", "bus-bahn-stoffe"],
      ],
    },
    preview: {
      title: "Material Preview",
      subtitle: "Freestanding material planes, reduced to name and price.",
      materials: [
        ["N19 - Arctic Ivory", "29.99 €", "/materials/kunstleder/Arctic%20Ivory.jpeg"],
        ["Satin Black", "29.99 €", "/materials/kunstleder/Satin%20Black.jpeg"],
        ["Cognac Saddle", "29.99 €", "/materials/kunstleder/Cognac%20Saddle.jpeg"],
        ["Busstoff 46", "15,00 €", "/images/spheres/busstoff-46.png"],
        ["Busstoff 45", "15,00 €", "/images/spheres/busstoff-45.png"],
        ["Busstoff 49", "15,00 €", "/images/spheres/busstoff-49.png"],
      ],
    },
    applications: {
      title: "For which areas?",
      items: [
        ["Auto", "/materials/Wo%20anwenden/Auto2.png"],
        ["Yacht", "/materials/Wo%20anwenden/Yachtpng.png"],
        ["Motorhome", "/materials/Wo%20anwenden/Wohnmobil.png"],
        ["Bus", "/materials/Wo%20anwenden/Bus.png"],
        ["Hotel", "/materials/Wo%20anwenden/Hotel.png"],
        ["Furniture", "/materials/Wo%20anwenden/Moebel.png"],
      ],
    },
    warehouse: {
      eyebrow: "WAREHOUSE IN AUSTRIA",
      title: "Directly from our warehouse in Austria",
      text: "Material selection, samples and shipping from a clear European supply setup.",
      points: [
        "Europe-wide shipping",
        "Samples available",
        "Wholesale quantities",
        "WhatsApp support",
        "Stocked materials",
        "Personal advice",
      ],
    },
    whatsapp: {
      title: "Looking for a specific material?",
      text: "We help you directly via WhatsApp.",
      cta: "Open WhatsApp",
    },
  },
  ru: {
    hero: {
      eyebrow: "ДОСТАВКА ПО ЕС • СКЛАД В АВСТРИИ",
      title: "Премиальная искусственная кожа и automotive материалы",
      text: "Искусственная кожа, ткани для потолка и технические материалы прямо со склада.",
      primaryCta: "Запросить образцы",
      secondaryCta: "Смотреть материалы",
      trust: ["Доставка по Европе", "Доступны образцы", "Складские позиции", "Консультация WhatsApp"],
    },
    social: {
      title: "Следите за нами",
      subtitle: "Новые материалы, складские поступления и впечатления из нашего шоурума.",
      tiktok: {
        title: "TikTok",
        text: "Актуальные материалы, новые поступления и подлинные впечатления прямо со склада.",
        cta: "Смотреть TikTok",
        benefits: [
          "Новые материалы со склада",
          "Цвета и фактуры в видео",
          "Текущую ассортимент заранее",
        ],
      },
    },
    categories: {
      title: "Категории материалов",
      subtitle: "Премиальные материалы для интерьеров, транспорта и объектов.",
      cards: [
        ["Автомобильный кожзаменитель", "Искусственная кожа", "/materials/Materialbereiche/Automobilkunstleder.png", "automobilkunstleder"],
        ["Потолочные ткани", "Интерьер", "/images/Himmelstoffe/1.png", "dachhimmelstoffe"],
        ["Ткани для автобусов и поездов", "Транспорт", "/materials/Materialbereiche/Busstoff.png", "bus-bahn-stoffe"],
      ],
    },
    preview: {
      title: "Превью материалов",
      subtitle: "Отдельные 3D-плоскости материала: только название и цена.",
      materials: [
        ["N19 - Arctic Ivory", "29,99 €", "/materials/kunstleder/Arctic%20Ivory.jpeg"],
        ["Satin Black", "29,99 €", "/materials/kunstleder/Satin%20Black.jpeg"],
        ["Cognac Saddle", "29,99 €", "/materials/kunstleder/Cognac%20Saddle.jpeg"],
        ["Busstoff 46", "15,00 €", "/images/spheres/busstoff-46.png"],
        ["Busstoff 45", "15,00 €", "/images/spheres/busstoff-45.png"],
        ["Busstoff 49", "15,00 €", "/images/spheres/busstoff-49.png"],
      ],
    },
    applications: {
      title: "Для каких сфер?",
      items: [
        ["Auto", "/materials/Wo%20anwenden/Auto2.png"],
        ["Yacht", "/materials/Wo%20anwenden/Yachtpng.png"],
        ["Wohnmobil", "/materials/Wo%20anwenden/Wohnmobil.png"],
        ["Bus", "/materials/Wo%20anwenden/Bus.png"],
        ["Hotel", "/materials/Wo%20anwenden/Hotel.png"],
        ["Мебель", "/materials/Wo%20anwenden/Moebel.png"],
      ],
    },
    warehouse: {
      eyebrow: "СКЛАД В АВСТРИИ",
      title: "Напрямую с нашего склада в Австрии",
      text: "Материалы, образцы и отправка через понятную европейскую структуру.",
      points: [
        "Доставка по Европе",
        "Доступны образцы",
        "Оптовые объемы",
        "WhatsApp support",
        "Складские позиции",
        "Персональная консультация",
      ],
    },
    whatsapp: {
      title: "Ищете конкретный материал?",
      text: "Мы поможем напрямую через WhatsApp.",
      cta: "Открыть WhatsApp",
    },
  },
} satisfies Record<SupportedLang, HomepageCopy>;

function Navigation({
  lang,
  content,
}: {
  lang: SupportedLang;
  content: SiteDictionary;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const socialNavLabel = lang === "de" ? "Social" : lang === "en" ? "Social" : "Соцсети";
  const languageOptions = SUPPORTED_LANGS.map((code) => ({
    code,
    label: content.languageSwitcher[code],
  }));

  return (
    <header className="luxury-nav fixed inset-x-0 top-0 z-40 border-b border-divider bg-base/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="shrink-0">
          <p className="luxury-brand-mark text-lg font-semibold tracking-tight text-text-primary">
            {content.footer.company}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">
            {content.footer.tagline}
          </p>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          <a href="#home" className="luxury-nav-link text-[13px] text-text-secondary transition hover:text-text-primary">
            {content.nav.home}
          </a>
          <a href="#materialien" className="luxury-nav-link text-[13px] text-text-secondary transition hover:text-text-primary">
            {content.nav.materials}
          </a>
          <a href="#social" className="luxury-nav-link text-[13px] text-text-secondary transition hover:text-text-primary">
            {socialNavLabel}
          </a>
          <a href={`/${lang}/kontakt`} className="luxury-nav-link text-[13px] text-text-secondary transition hover:text-text-primary">
            {content.nav.contact}
          </a>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
            {languageOptions.map((item, index) => (
              <span key={item.code} className="inline-flex items-center gap-1">
                <NextLink
                  href={`/${item.code}`}
                  className={`px-1 py-0.5 transition ${
                    item.code === lang
                      ? "text-text-primary underline decoration-gold underline-offset-4"
                      : "text-text-secondary/50 hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </NextLink>
                {index < languageOptions.length - 1 && (
                  <span className="text-text-secondary/20">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <button
          className="flex items-center justify-center text-text-primary lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={content.common.toggleMenuAriaLabel}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-divider bg-base/95 px-6 py-5 shadow-[0_22px_60px_rgba(0,0,0,0.48)] backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-4 text-[13px] text-text-secondary">
            <a href="#home" onClick={() => setMenuOpen(false)} className="transition hover:text-text-primary">
              {content.nav.home}
            </a>
            <a href="#materialien" onClick={() => setMenuOpen(false)} className="transition hover:text-text-primary">
              {content.nav.materials}
            </a>
            <a href="#social" onClick={() => setMenuOpen(false)} className="transition hover:text-text-primary">
              {socialNavLabel}
            </a>
            <NextLink
              href={`/${lang}/kontakt`}
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-text-primary"
            >
              {content.nav.contact}
            </NextLink>
          </nav>
          <div className="mt-4 flex items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
            {languageOptions.map((item, index) => (
              <span key={item.code} className="inline-flex items-center gap-1">
                <NextLink
                  href={`/${item.code}`}
                  className={`px-1 py-0.5 transition ${
                    item.code === lang
                      ? "text-text-primary underline decoration-gold underline-offset-4"
                      : "text-text-secondary/50 hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </NextLink>
                {index < languageOptions.length - 1 && (
                  <span className="text-text-secondary/20">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].hero;

  return (
    <section id="home" className="luxury-hero relative isolate overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-[1600px] items-center px-6 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32 lg:px-12 xl:px-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10 xl:gap-16">
          <div className="relative z-10 mx-auto flex max-w-[38rem] flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-text-secondary">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 max-w-[38rem] font-serif text-[2.35rem] font-semibold leading-[1.02] tracking-tight text-text-primary sm:text-[3.1rem] lg:text-[3.45rem]">
              {copy.title}
            </h1>

            <p className="mt-5 max-w-[34rem] text-base leading-7 text-text-secondary sm:text-[1.04rem]">
              {copy.text}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-nowrap">
              <NextLink
                href={`/${lang}/kontakt`}
                className="luxury-button luxury-button-primary inline-flex min-h-[52px] items-center justify-center rounded-full border border-gold bg-gold px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-base transition"
              >
                {copy.primaryCta}
              </NextLink>
              <NextLink
                href={`/${lang}#materialien`}
                className="luxury-button luxury-button-secondary inline-flex min-h-[52px] items-center justify-center rounded-full border border-divider bg-card-bg px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-text-primary transition hover:bg-card-bg-hover"
              >
                {copy.secondaryCta}
              </NextLink>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-text-secondary lg:justify-start">
              {copy.trust.map((item) => (
                <div
                  key={item}
                  className="luxury-proof inline-flex items-center gap-2.5"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold/70 bg-card-bg text-gold">
                    <Check size={12} strokeWidth={2.6} />
                  </span>
                  <span className="text-[0.88rem] leading-6 text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:-mr-14 xl:-mr-20">
            <div className="luxury-hero-stage-shell relative h-[clamp(24rem,55vh,38rem)] w-full overflow-hidden rounded-[2rem] border border-divider bg-card-bg shadow-[0_24px_70px_rgba(0,0,0,0.6)] sm:h-[clamp(30rem,66vh,46rem)] lg:h-[clamp(38rem,78vh,58rem)]">
              <div className="luxury-hero-stage-lights" aria-hidden="true">
                <span className="luxury-hero-stage-light luxury-hero-stage-light-left" />
                <span className="luxury-hero-stage-light luxury-hero-stage-light-right" />
              </div>
              <div
                className="relative z-[1] h-full overflow-hidden"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 90% 84% at 62% 54%, #000 42%, rgba(0,0,0,0.98) 62%, rgba(0,0,0,0.82) 76%, rgba(0,0,0,0.28) 90%, transparent 100%)",
                  maskImage:
                    "radial-gradient(ellipse 90% 84% at 62% 54%, #000 42%, rgba(0,0,0,0.98) 62%, rgba(0,0,0,0.82) 76%, rgba(0,0,0,0.28) 90%, transparent 100%)",
                }}
              >
                <div className="luxury-hero-stage-viewer absolute inset-[-4%_-6%_-8%_-8%] lg:inset-[-6%_-8%_-10%_-10%]">
                  <SeatViewerClean
                    className="h-full w-full scale-[1.04] translate-y-[1%] lg:scale-[1.12] lg:translate-y-[3%]"
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].social;
  const { tiktok } = copy;

  return (
    <section id="social" className="relative py-16 sm:py-20">
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-[2.15rem]">
            {copy.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-[0.98rem]">
            {copy.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-9 flex justify-center px-4">
          <article className="luxury-social-card w-full overflow-hidden rounded-[1.45rem] border border-divider shadow-[0_18px_48px_rgba(0,0,0,0.44)] sm:max-w-2xl md:max-w-4xl">
            {/* Gradient border accent */}
            <div className="h-px bg-gradient-to-r from-gold/50 via-gold/30 to-transparent" />
            
            <div className="flex flex-col gap-8 bg-[linear-gradient(135deg,rgba(208,180,111,0.06),transparent),linear-gradient(135deg,rgba(10,10,9,0.96),rgba(6,6,6,0.98))] px-6 py-8 sm:px-8 sm:py-10 md:flex-row md:items-start md:gap-12 md:py-12">
              {/* Left side - Content & CTA */}
              <div className="flex-1">
                <div className="flex items-center gap-3 text-gold">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/25 bg-[linear-gradient(180deg,rgba(208,180,111,0.14),rgba(208,180,111,0.04))]">
                    <SocialBrandIcon platform="tiktok" className="h-5 w-5" />
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-gold/70 via-gold/20 to-transparent" />
                </div>
                
                <h3 className="mt-7 font-serif text-[1.95rem] font-semibold leading-tight tracking-tight text-text-primary sm:text-[2.2rem]">
                  {tiktok.title}
                </h3>
                
                <p className="mt-4 max-w-sm text-base leading-7 text-text-primary/86 sm:text-[1.05rem]">
                  {tiktok.text}
                </p>
                
                <a
                  href={SOCIAL_PLATFORM_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxury-button luxury-button-primary mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full border border-gold bg-gold px-6 py-3 text-sm font-semibold tracking-[0.08em] text-base transition hover:bg-gold/90"
                >
                  {tiktok.cta}
                </a>
              </div>

              {/* Right side - Benefits list */}
              <div className="flex-0 md:w-80 md:mt-7">
                <div className="space-y-3">
                  {tiktok.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold/50 bg-gold/5 text-gold">
                        <Check size={12} strokeWidth={2.8} />
                      </span>
                      <p className="whitespace-nowrap text-sm leading-6 text-text-secondary sm:text-[0.95rem]">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function MaterialsSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].categories;

  return (
    <section
      id="materialien"
      className="relative z-10 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-[2.2rem]">
            {copy.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-[0.98rem]">
            {copy.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-[78rem] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {copy.cards.map(([title, label, image, slug]) => {
            const hasImage = image.length > 0;

            return (
              <NextLink
                key={title}
                href={`/${lang}/${slug}`}
                className="group block overflow-hidden rounded-[1.45rem] border border-divider bg-card-bg shadow-[0_18px_50px_rgba(0,0,0,0.52)] transition hover:border-gold/45"
              >
                <div className="relative h-[19rem] overflow-hidden xl:h-[22rem]">
                  {hasImage ? (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(208,180,111,0.12),transparent_42%),linear-gradient(180deg,rgba(24,22,19,0.98),rgba(10,10,9,0.96)_58%,rgba(6,6,6,0.98))]" />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.5)_54%,rgba(0,0,0,0.88))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[0.66rem] uppercase tracking-[0.2em] text-text-secondary">
                      {label}
                    </p>
                    <h3 className="mt-2 font-serif text-[1.35rem] font-semibold leading-tight text-text-primary">
                      {title}
                    </h3>
                  </div>
                </div>
              </NextLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MaterialPreviewSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].preview;

  return (
    <section className="relative py-16 pb-28 sm:py-20 sm:pb-32 lg:min-h-[42rem] lg:py-24 lg:pb-40">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-[2.2rem]">
            {copy.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-[0.98rem]">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-x-7 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
          {copy.materials.map(([name, price, texture]) => {
            const isSpherePreview = texture.includes("/images/spheres/");

            return (
              <article key={name} className="text-center">
                <div
                  className={`mx-auto grid place-items-center ${
                    isSpherePreview ? "h-80 sm:h-[23.5rem]" : "h-52 sm:h-60"
                  }`}
                  style={{ perspective: "900px" }}
                >
                  {isSpherePreview ? (
                    <Image
                      src={texture}
                      alt={name}
                      width={480}
                      height={480}
                      sizes="384px"
                      className="h-72 w-72 max-w-none object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.72)] sm:h-[21.5rem] sm:w-[21.5rem]"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="h-36 w-36 rounded-[0.85rem] border border-white/10 bg-cover bg-center shadow-[0_28px_70px_rgba(0,0,0,0.72)] sm:h-44 sm:w-44"
                      style={{
                        backgroundImage: `linear-gradient(140deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 32%, rgba(0,0,0,0.18)), url("${texture}")`,
                        transform: "rotateX(58deg) rotateZ(-34deg)",
                        transformStyle: "preserve-3d",
                      }}
                    />
                  )}
                </div>
                <h3
                  className={`text-base font-semibold tracking-tight text-text-primary ${
                  isSpherePreview ? "mt-1 sm:mt-2" : "mt-2"
                  }`}
                >
                  {name}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-gold">{price}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ApplicationSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].applications;

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-[2.2rem]">
            {copy.title}
          </h2>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map(([title, image]) => (
            <article
              key={title}
              className="relative h-44 overflow-hidden rounded-[1.3rem] border border-divider bg-card-bg shadow-[0_16px_44px_rgba(0,0,0,0.48)] sm:h-52"
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.74))]" />
              <h3 className="absolute bottom-5 left-5 font-serif text-[1.45rem] font-semibold text-text-primary">
                {title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WarehouseTrustSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].warehouse;

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="luxury-glass-panel rounded-[2rem] border border-divider px-5 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.62)] sm:px-7 sm:py-7 lg:px-9 lg:py-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div className="max-w-xl">
              <p className="luxury-mini-label inline-flex rounded-full border border-divider px-3 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-text-secondary">
                {copy.eyebrow}
              </p>
              <h2 className="mt-5 max-w-xl font-serif text-[2rem] font-semibold leading-tight tracking-tight text-text-primary sm:text-[2.55rem]">
                {copy.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary">
                {copy.text}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {copy.points.map((point) => (
                <div
                  key={point}
                  className="luxury-trust-tile flex min-h-[5.5rem] items-start gap-3 rounded-[1.15rem] border border-divider bg-card-bg px-4 py-4 text-sm leading-6 text-text-secondary"
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold bg-card-bg-hover text-gold shadow-[0_0_20px_rgba(208,180,111,0.14)]">
                    <Check size={14} strokeWidth={2.6} />
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].whatsapp;

  return (
    <section className="relative pb-16 pt-8 sm:pb-20">
      <div className="mx-auto max-w-[980px] px-4 text-center sm:px-6">
        <div className="rounded-[2rem] border border-divider bg-card-bg px-5 py-10 shadow-[0_22px_62px_rgba(0,0,0,0.56)] sm:px-8 sm:py-12">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-[2.4rem]">
            {copy.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-text-secondary">
            {copy.text}
          </p>
          <a
            href={SOCIAL_PLATFORM_LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-gold bg-gold px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-base transition"
          >
            <SocialBrandIcon platform="whatsapp" className="h-4 w-4" />
            <span>{copy.cta}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({
  lang,
  content,
}: {
  lang: SupportedLang;
  content: SiteDictionary;
}) {
  return (
    <footer id="footer" className="luxury-footer border-t border-divider bg-base">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="luxury-brand-mark text-base font-semibold text-text-primary">
              {content.footer.company}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              {content.footer.tagline}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <MapPin size={15} className="mt-0.5 shrink-0 text-gold/60" />
            <div className="text-sm leading-relaxed text-text-secondary">
              {content.footer.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Mail size={15} className="shrink-0 text-gold/60" />
              <a
                href={`mailto:${content.footer.email}`}
                className="text-sm text-text-secondary transition hover:text-text-primary"
              >
                {content.footer.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={15} className="shrink-0 text-gold/60" />
              <a
                href={`tel:${content.footer.phone.replace(/\s/g, "")}`}
                className="text-sm text-text-secondary transition hover:text-text-primary"
              >
                {content.footer.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-text-secondary/60">
            <NextLink href={`/${lang}/impressum`} className="transition hover:text-text-secondary">
              {content.footer.legalNotice}
            </NextLink>
            <NextLink href={`/${lang}/datenschutz`} className="transition hover:text-text-secondary">
              {content.footer.privacyPolicy}
            </NextLink>
          </div>
        </div>

        <div className="mt-10 border-t border-divider pt-6">
          <p className="text-center text-xs text-text-secondary/40">
            {"© "}
            {new Date().getFullYear()} {content.footer.company}. {content.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function CatalogPage({
  lang,
  dictionary,
}: {
  lang: SupportedLang;
  dictionary: SiteDictionary;
}) {
  return (
    <main className="luxury-home min-h-screen overflow-x-clip bg-base text-text-primary">
      <Navigation lang={lang} content={dictionary} />
      <HeroSection lang={lang} />
      <SocialSection lang={lang} />
      <MaterialsSection lang={lang} />
      <MaterialPreviewSection lang={lang} />
      <ApplicationSection lang={lang} />
      <WarehouseTrustSection lang={lang} />
      <WhatsAppSection lang={lang} />
      <SiteFooter lang={lang} content={dictionary} />
    </main>
  );
}

"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { Check, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import type { SiteDictionary } from "@/lib/dictionary";
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n";

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
    cards: {
      title: string;
      label: string;
      image: string;
      description: string;
      tags: string[];
      slug?: string;
      cta: string;
    }[];
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
      eyebrow: "DARK LUXURY AUTOMOTIVE INTERIOR",
      title: "Materialien für Fahrzeuginterieurs",
      text: "Materialien für Fahrzeuginterieur und Sattlerei.",
      primaryCta: "Materialien ansehen",
      secondaryCta: "WhatsApp",
      trust: [
        "Lager in Österreich",
        "EU Versand",
        "Muster erhältlich",
        "Für Sattlereien & Fahrzeugaufbereiter",
      ],
    },
    social: {
      title: "Folgen Sie uns",
      subtitle: "Neue Ware. Kurze Einblicke.",
      tiktok: {
        title: "TikTok",
        text: "Materialien direkt aus dem Lager.",
        cta: "TikTok ansehen",
        benefits: ["Neue Ware", "Farben im Video", "Lager-Einblicke"],
      },
    },
    categories: {
      title: "Materialbereiche",
      subtitle: "Drei Kernsortimente ab Lager.",
      cards: [
        {
          title: "Automobilkunstleder",
          label: "Automotive",
          image: "/materials/Materialbereiche/Automobilkunstleder.png",
          description: "Für Sitze, Türtafeln und Verkleidungen.",
          tags: ["lagernd"],
          slug: "automobilkunstleder",
          cta: "Anfragen",
        },
        {
          title: "Himmelstoffe",
          label: "Innenausbau",
          image: "/materials/Materialbereiche/himmelstoff.png",
          description: "Kaschierte Stoffe für Autohimmel.",
          tags: ["Meterware"],
          slug: "dachhimmelstoffe",
          cta: "Anfragen",
        },
        {
          title: "Bus- & Bahnstoffe",
          label: "Transport",
          image: "/materials/Materialbereiche/Busstoffe.png",
          description: "Robuste Stoffe für stark beanspruchte Sitze.",
          tags: ["robust"],
          slug: "bus-bahn-stoffe",
          cta: "Anfragen",
        },
      ],
    },
    preview: {
      title: "Material Vorschau",
      subtitle: "Auswahl aus dem Lager.",
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
        ["Wohnmobil", "/materials/Wo%20anwenden/Wohnmobil.png"],
        ["Bus", "/materials/Wo%20anwenden/Bus.png"],
        ["Hotel", "/materials/Wo%20anwenden/Hotel.png"],
        ["Möbel", "/materials/Wo%20anwenden/Moebel.png"],
        ["Yacht", "/materials/Wo%20anwenden/Yachtpng.png"],
      ],
    },
    warehouse: {
      eyebrow: "LAGER IN ÖSTERREICH",
      title: "Lager. Muster. Versand.",
      text: "Direkt aus Österreich. 🇦🇹",
      points: ["EU Versand", "Muster erhältlich", "Meterware", "WhatsApp"],
    },
    whatsapp: {
      title: "Material gesucht?",
      text: "Kurze Anfrage. Schnelle Antwort.",
      cta: "WhatsApp",
    },
  },
  en: {
    hero: {
      eyebrow: "EU-WIDE SHIPPING • STOCK IN AUSTRIA",
      title: "Materials for vehicle interiors",
      text: "Materials for vehicle interiors and upholstery.",
      primaryCta: "View materials",
      secondaryCta: "WhatsApp",
      trust: ["Stock in Austria", "EU shipping", "Samples", "For upholsterers"],
    },
    social: {
      title: "Follow Us",
      subtitle: "New stock. Short updates.",
      tiktok: {
        title: "TikTok",
        text: "Materials straight from stock.",
        cta: "View TikTok",
        benefits: ["New stock", "Colors on video", "Warehouse views"],
      },
    },
    categories: {
      title: "Material Categories",
      subtitle: "Three stocked core ranges.",
      cards: [
        {
          title: "Automotive Leatherette",
          label: "Automotive",
          image: "/materials/Materialbereiche/Automobilkunstleder.png",
          description: "For seats, door panels and trims.",
          tags: ["in stock"],
          slug: "automobilkunstleder",
          cta: "Inquire",
        },
        {
          title: "Headliner Fabrics",
          label: "Interior",
          image: "/materials/Materialbereiche/himmelstoff.png",
          description: "Foam-backed fabrics for headliners.",
          tags: ["by the meter"],
          slug: "dachhimmelstoffe",
          cta: "Inquire",
        },
        {
          title: "Bus & Rail Fabrics",
          label: "Transport",
          image: "/materials/Materialbereiche/Busstoffe.png",
          description: "Robust fabrics for high-use seats.",
          tags: ["robust"],
          slug: "bus-bahn-stoffe",
          cta: "Inquire",
        },
      ],
    },
    preview: {
      title: "Material Preview",
      subtitle: "Selected stock items.",
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
        ["Car", "/materials/Wo%20anwenden/Auto2.png"],
        ["Motorhome", "/materials/Wo%20anwenden/Wohnmobil.png"],
        ["Bus", "/materials/Wo%20anwenden/Bus.png"],
        ["Hotel", "/materials/Wo%20anwenden/Hotel.png"],
        ["Furniture", "/materials/Wo%20anwenden/Moebel.png"],
        ["Yacht", "/materials/Wo%20anwenden/Yachtpng.png"],
      ],
    },
    warehouse: {
      eyebrow: "WAREHOUSE IN AUSTRIA",
      title: "Stock. Samples. Shipping.",
      text: "Directly from Austria. 🇦🇹",
      points: ["EU Shipping", "Samples", "By the meter", "WhatsApp"],
    },
    whatsapp: {
      title: "Looking for material?",
      text: "Quick question. Fast answer.",
      cta: "WhatsApp",
    },
  },
  ru: {
    hero: {
      eyebrow: "ДОСТАВКА ПО ЕС • СКЛАД В АВСТРИИ",
      title: "Материалы для интерьеров авто",
      text: "Материалы для автоинтерьера и ателье.",
      primaryCta: "Смотреть материалы",
      secondaryCta: "WhatsApp",
      trust: ["Склад в Австрии", "Доставка ЕС", "Образцы", "Для ателье"],
    },
    social: {
      title: "Следите за нами",
      subtitle: "Новые поставки. Короткие обзоры.",
      tiktok: {
        title: "TikTok",
        text: "Материалы прямо со склада.",
        cta: "Смотреть TikTok",
        benefits: ["Новые поставки", "Цвета в видео", "Склад"],
      },
    },
    categories: {
      title: "Категории материалов",
      subtitle: "Три основные складские группы.",
      cards: [
        {
          title: "Автомобильный кожзаменитель",
          label: "Automotive",
          image: "/materials/Materialbereiche/Automobilkunstleder.png",
          description: "Для сидений, дверных карт и панелей.",
          tags: ["в наличии"],
          slug: "automobilkunstleder",
          cta: "Запросить",
        },
        {
          title: "Потолочные ткани",
          label: "Интерьер",
          image: "/materials/Materialbereiche/himmelstoff.png",
          description: "Дублированные ткани для автопотолка.",
          tags: ["метраж"],
          slug: "dachhimmelstoffe",
          cta: "Запросить",
        },
        {
          title: "Ткани для автобусов и поездов",
          label: "Транспорт",
          image: "/materials/Materialbereiche/Busstoffe.png",
          description: "Прочные ткани для нагруженных сидений.",
          tags: ["прочно"],
          slug: "bus-bahn-stoffe",
          cta: "Запросить",
        },
      ],
    },
    preview: {
      title: "Превью материалов",
      subtitle: "Выборка со склада.",
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
        ["Авто", "/materials/Wo%20anwenden/Auto2.png"],
        ["Автодом", "/materials/Wo%20anwenden/Wohnmobil.png"],
        ["Автобус", "/materials/Wo%20anwenden/Bus.png"],
        ["Отель", "/materials/Wo%20anwenden/Hotel.png"],
        ["Мебель", "/materials/Wo%20anwenden/Moebel.png"],
        ["Яхта", "/materials/Wo%20anwenden/Yachtpng.png"],
      ],
    },
    warehouse: {
      eyebrow: "СКЛАД В АВСТРИИ",
      title: "Склад. Образцы. Доставка.",
      text: "Напрямую из Австрии. 🇦🇹",
      points: ["Доставка по ЕС", "Образцы", "Продажа метражом", "WhatsApp"],
    },
    whatsapp: {
      title: "Ищете материал?",
      text: "Короткий запрос. Быстрый ответ.",
      cta: "WhatsApp",
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
  const [isInHero, setIsInHero] = useState(true);
  const socialNavLabel = lang === "de" ? "Social" : lang === "en" ? "Social" : "Соцсети";
  const whatsappNavLabel =
    lang === "de" ? "WhatsApp Anfrage" : lang === "en" ? "WhatsApp inquiry" : "WhatsApp запрос";
  const languageOptions = SUPPORTED_LANGS.map((code) => ({
    code,
    label: content.languageSwitcher[code],
  }));

  useEffect(() => {
    const updateHeaderState = () => {
      const hero = document.getElementById("home");
      if (!hero) {
        setIsInHero(window.scrollY < 32);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      setIsInHero(heroBottom > 88);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, []);

  return (
    <header
      className={`luxury-nav ${
        isInHero ? "luxury-nav--hero" : "luxury-nav--scrolled"
      } fixed inset-x-0 top-0 z-40 border-b`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3.5 sm:px-8 sm:py-4 lg:px-12 xl:px-16">
        <NextLink href={`/${lang}`} className="min-w-0 flex-1 pr-2 sm:pr-0 lg:flex-none">
          <p className="luxury-brand-mark truncate text-base font-semibold tracking-tight text-text-primary sm:text-lg">
            {content.footer.company}
          </p>
          <p className="truncate text-[9px] uppercase tracking-[0.16em] text-text-secondary sm:text-[10px] sm:tracking-[0.2em]">
            {content.footer.tagline}
          </p>
        </NextLink>

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
          <a
            href={SOCIAL_PLATFORM_LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="luxury-button luxury-button-primary inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-gold px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-base"
          >
            <MessageCircle size={15} strokeWidth={2.3} />
            <span>{whatsappNavLabel}</span>
          </a>
        </div>

        <button
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-primary transition hover:bg-white/5 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={content.common.toggleMenuAriaLabel}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobileNavPanel border-t border-divider bg-[rgba(10,10,10,0.72)] px-6 py-5 shadow-[0_22px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl lg:hidden">
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
          <a
            href={SOCIAL_PLATFORM_LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="luxury-button luxury-button-primary mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-base"
          >
            <MessageCircle size={15} strokeWidth={2.3} />
            <span>{whatsappNavLabel}</span>
          </a>
        </div>
      )}
    </header>
  );
}

function HeroSection({ lang }: { lang: SupportedLang }) {
  const materialsButtonLabel =
    lang === "de"
      ? "ZU DEN MATERIALIEN"
      : lang === "en"
        ? "TO THE MATERIALS"
        : "К МАТЕРИАЛАМ";

  return (
    <section id="home" className="heroSection isolate">
      <div className="heroContent mx-auto flex min-h-[86vh] max-w-[1600px] items-center justify-center px-6 py-14 sm:px-8 sm:py-18 lg:px-12 xl:px-16">
        <div className="heroMinimalStage relative flex w-full flex-col items-center justify-center">
          <h1
            aria-label="Leder & Stoffe"
            className="heroMinimalTitle relative z-10 font-serif text-[3.6rem] font-semibold leading-none text-white sm:text-[5.5rem] lg:text-[7.5rem]"
          >
            <span className="heroTitleWord">Leder </span>
            <span className="heroAmpersand">
              &amp; 
            </span>
            <span className="heroTitleWord">Stoffe</span>
          </h1>
          <a href="#materialien" className="heroMaterialsButton relative z-10">
            {materialsButtonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroSocialTransition() {
  return <div className="heroSocialTransition" aria-hidden="true" />;
}

function SocialSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].social;
  const { tiktok } = copy;
  const socialLabel =
    lang === "de" ? "Social Presence" : lang === "en" ? "Social Presence" : "Социальное присутствие";
  const highlightsLabel =
    lang === "de" ? "Einblicke" : lang === "en" ? "Highlights" : "Акценты";

  return (
    <section id="social" className="relative z-20 -mt-10 py-18 sm:-mt-12 sm:py-22 lg:-mt-16 lg:py-24">
      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="luxury-glass-panel socialShowcasePanel overflow-hidden rounded-[24px] border border-divider px-6 py-7 shadow-[0_24px_72px_rgba(0,0,0,0.54)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="max-w-xl">
              <p className="luxury-mini-label inline-flex rounded-full border px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-text-secondary">
                {socialLabel}
              </p>
              <h2 className="mt-5 font-serif text-[2rem] font-semibold tracking-tight text-text-primary sm:text-[2.5rem]">
                {copy.title}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-text-secondary sm:text-[1.02rem]">
                {copy.subtitle}
              </p>
              <div className="mt-7 hidden h-px w-full max-w-sm bg-gradient-to-r from-gold/70 via-gold/20 to-transparent lg:block" />
            </div>

            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.62fr)]">
              <article className="luxury-social-card socialPrimaryCard relative overflow-hidden rounded-[1.35rem] border border-divider p-6 sm:p-7">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="luxury-mini-label inline-flex rounded-full border px-3 py-1 text-[0.63rem] font-semibold uppercase tracking-[0.2em] text-text-secondary">
                      TikTok
                    </span>
                    <h3 className="mt-5 font-serif text-[1.85rem] font-semibold leading-tight tracking-tight text-text-primary sm:text-[2.15rem]">
                      {tiktok.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-7 text-text-secondary">
                      {tiktok.text}
                    </p>
                  </div>

                  <span className="luxury-icon-button grid h-14 w-14 shrink-0 place-items-center rounded-full border text-gold">
                    <SocialBrandIcon platform="tiktok" className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={SOCIAL_PLATFORM_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxury-button luxury-button-primary inline-flex min-h-[50px] items-center justify-center rounded-full border border-gold px-6 py-3 text-sm font-semibold tracking-[0.08em] text-base"
                  >
                    {tiktok.cta}
                  </a>
                  <a
                    href={SOCIAL_PLATFORM_LINKS.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="luxury-button luxury-button-secondary inline-flex min-h-[50px] items-center justify-center rounded-full border border-divider px-6 py-3 text-sm font-semibold tracking-[0.08em] text-text-primary"
                  >
                    <MessageCircle size={16} strokeWidth={2.3} className="mr-2" />
                    WhatsApp
                  </a>
                </div>
              </article>

              <article className="luxury-social-card socialInsightsCard rounded-[1.35rem] border border-divider p-5 sm:p-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold/82">
                  {highlightsLabel}
                </p>
                <div className="mt-5 space-y-3">
                  {tiktok.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="rounded-[1.15rem] border border-white/6 bg-[rgba(15,15,15,0.34)] px-4 py-3.5 backdrop-blur-md"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/55 bg-[rgba(16,16,16,0.42)] text-gold">
                          <Check size={12} strokeWidth={2.6} />
                        </span>
                        <p className="text-sm leading-6 text-text-secondary sm:text-[0.95rem]">
                          {benefit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialsSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].categories;
  const sectionLabel =
    lang === "de"
      ? "B2B Interieurmaterialien"
      : lang === "en"
        ? "B2B Interior Materials"
        : "B2B материалы для интерьера";

  return (
    <section
      id="materialien"
      className="relative z-10 overflow-hidden py-18 sm:py-22 lg:py-24"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="luxury-mini-label inline-flex rounded-full border px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-text-secondary">
            {sectionLabel}
          </p>
          <h2 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-[2.45rem]">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary sm:text-[1rem]">
            {copy.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[78rem] justify-center gap-5 md:grid-cols-2 xl:grid-cols-3">
          {copy.cards.map((card) => {
            const href = card.slug ? `/${lang}/${card.slug}` : SOCIAL_PLATFORM_LINKS.whatsapp;

            return (
              <article
                key={card.title}
                className="luxury-material-card group flex min-h-full flex-col overflow-hidden rounded-[1.35rem] border bg-card-bg"
              >
                <div className="relative h-[17rem] overflow-hidden sm:h-[18.5rem]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="materialImageShade absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.5)_54%,rgba(0,0,0,0.86))]" />
                  <p className="absolute left-5 top-5 rounded-full border border-white/10 bg-[rgba(16,16,16,0.48)] px-3 py-1.5 text-[0.63rem] font-semibold uppercase tracking-[0.2em] text-text-secondary backdrop-blur-md">
                    {card.label}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-serif text-[1.45rem] font-semibold leading-tight text-text-primary">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {card.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="materialTag rounded-full border border-white/10 bg-[rgba(16,16,16,0.36)] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {card.slug ? (
                    <NextLink
                      href={href}
                      className="luxury-button luxury-button-secondary mt-6 inline-flex min-h-[46px] w-full items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.08em]"
                    >
                      {card.cta}
                    </NextLink>
                  ) : (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="luxury-button luxury-button-secondary mt-6 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.08em]"
                    >
                      <MessageCircle size={16} strokeWidth={2.3} />
                      {card.cta}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MaterialPreviewSection({ lang }: { lang: SupportedLang }) {
  const copy = HOMEPAGE_COPY[lang].preview;
  const previewLabel =
    lang === "de" ? "Aus dem Lager" : lang === "en" ? "From Stock" : "Со склада";

  return (
    <section className="relative py-18 pb-24 sm:py-22 sm:pb-28 lg:py-24 lg:pb-32">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="luxury-mini-label inline-flex rounded-full border px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-text-secondary">
            {previewLabel}
          </p>
          <h2 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-[2.35rem]">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary sm:text-[1rem]">
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {copy.materials.map(([name, price, texture]) => {
            const isSpherePreview = texture.includes("/images/spheres/");

            return (
              <article
                key={name}
                className="materialPreviewItem flex flex-col text-center"
              >
                <div
                  className={`mx-auto grid place-items-center ${
                    isSpherePreview ? "h-80 sm:h-[23.5rem]" : "h-52 sm:h-60"
                  }`}
                >
                  {isSpherePreview ? (
                    <Image
                      src={texture}
                      alt={name}
                      width={480}
                      height={480}
                      sizes="384px"
                      className="materialPreviewImage h-72 w-72 max-w-none object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.72)] sm:h-[21.5rem] sm:w-[21.5rem]"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="materialPreviewSwatch h-36 w-36 rounded-[0.85rem] bg-cover bg-center shadow-[0_18px_38px_rgba(0,0,0,0.34)] sm:h-44 sm:w-44"
                      style={{
                        backgroundImage: `linear-gradient(140deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 32%, rgba(0,0,0,0.18)), url("${texture}")`,
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
  const applicationLabel =
    lang === "de" ? "Einsatzbereiche" : lang === "en" ? "Applications" : "Области применения";

  return (
    <section className="relative py-18 sm:py-22 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="luxury-mini-label inline-flex rounded-full border px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-text-secondary">
            {applicationLabel}
          </p>
          <h2 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-[2.35rem]">
            {copy.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map(([title, image]) => (
            <article
              key={title}
              className="applicationCard luxury-material-card relative h-44 overflow-hidden rounded-[1.5rem] border border-divider bg-card-bg sm:h-52"
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="applicationImageShade absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.74))]" />
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
    <section className="relative py-18 sm:py-22 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="luxury-glass-panel overflow-hidden rounded-[2rem] border border-divider px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.62)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div className="max-w-xl">
              <p className="luxury-mini-label inline-flex rounded-full border px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-text-secondary">
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
  const whatsappLabel =
    lang === "de" ? "Direkter Kontakt" : lang === "en" ? "Direct Contact" : "Прямой контакт";

  return (
    <section className="relative pb-18 pt-6 sm:pb-22 lg:pb-24">
      <div className="mx-auto max-w-[1600px] px-6 text-center sm:px-8 lg:px-12 xl:px-16">
        <div className="luxury-glass-panel whatsappPanel overflow-hidden rounded-[2rem] border border-divider px-6 py-10 shadow-[0_22px_62px_rgba(0,0,0,0.56)] sm:px-8 sm:py-12">
          <p className="luxury-mini-label inline-flex rounded-full border px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-text-secondary">
            {whatsappLabel}
          </p>
          <h2 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-text-primary sm:text-[2.4rem]">
            {copy.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary">
            {copy.text}
          </p>
          <a
            href={SOCIAL_PLATFORM_LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="luxury-button luxury-button-primary mt-8 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-gold px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-base"
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
      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
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
    <main className="luxury-home automotiveAtelierHome min-h-screen overflow-x-clip bg-base text-text-primary">
      <Navigation lang={lang} content={dictionary} />
      <HeroSection lang={lang} />
      <HeroSocialTransition />
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

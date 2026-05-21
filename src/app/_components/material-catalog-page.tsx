import NextLink from "next/link";
import BackToHomeButton from "@/app/_components/back-to-home-button";
import CatalogCollection from "@/components/catalog/catalog-collection";
import DachhimmelstoffeSection from "@/app/_components/dachhimmelstoffe-section";
import MaterialSupportSection from "@/app/_components/material-support-section";
import type { SiteDictionary } from "@/lib/dictionary";
import {
  getMaterialCatalogCopy,
  getMaterialCategoryContent,
  type MaterialPageSlug,
} from "@/lib/material-catalog";
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n";
import { SAMPLE_REQUEST_LABELS } from "@/lib/whatsapp";

const localeByLang: Record<SupportedLang, string> = {
  de: "de-DE",
  en: "en-US",
  ru: "ru-RU",
};

const WHATSAPP_LINK = "https://wa.me/436764725428";
const CONSULTATION_PRIMARY_CTA_LABEL: Record<SupportedLang, string> = {
  de: "Anfragen",
  en: "Inquire",
  ru: "Запросить",
};

type MaterialSupportCopy = {
  suitableTitle: string;
  suitableItems: string[];
  trustTitle: string;
  trustItems: string[];
  imageAlt: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

const AUTOMOTIVE_LEATHER_SUPPORT_COPY: Record<SupportedLang, MaterialSupportCopy> = {
  de: {
    suitableTitle: "Geeignet für",
    suitableItems: ["Autositze", "Türtafeln", "Verkleidungen", "Wohnmobile"],
    trustTitle: "Service",
    trustItems: ["Lagerware", "Muster", "Meterware", "EU Versand"],
    imageAlt: "Automobilkunstleder im hochwertigen Fahrzeuginnenraum",
    ctaTitle: "Farbe gesucht?",
    ctaText: "Wir senden aktuelle Lagerfotos per WhatsApp.",
    ctaButton: "WhatsApp",
  },
  en: {
    suitableTitle: "Suitable for",
    suitableItems: ["Car seats", "Door panels", "Trims", "Motorhomes"],
    trustTitle: "Service",
    trustItems: ["Stocked", "Samples", "By the meter", "EU shipping"],
    imageAlt: "Automotive synthetic leather in a premium vehicle interior",
    ctaTitle: "Need a color?",
    ctaText: "We send current stock photos via WhatsApp.",
    ctaButton: "WhatsApp",
  },
  ru: {
    suitableTitle: "Подходит для",
    suitableItems: ["Сидений", "Дверных карт", "Панелей", "Автодомов"],
    trustTitle: "Сервис",
    trustItems: ["Со склада", "Образцы", "Метраж", "Доставка ЕС"],
    imageAlt: "Автомобильная искусственная кожа в премиальном салоне",
    ctaTitle: "Нужен цвет?",
    ctaText: "Отправим актуальные фото склада в WhatsApp.",
    ctaButton: "WhatsApp",
  },
};

const BUS_BAHN_SUPPORT_COPY: Record<SupportedLang, MaterialSupportCopy> = {
  de: {
    suitableTitle: "Geeignet für",
    suitableItems: ["Busse", "Bahnen", "Sitze", "Rückenlehnen"],
    trustTitle: "Service",
    trustItems: ["Lagerware", "Meterware", "Muster", "EU Versand"],
    imageAlt: "Bus mit robusten Bus- und Bahnstoffen",
    ctaTitle: "Stoff gesucht?",
    ctaText: "Wir senden Farben und Muster per WhatsApp.",
    ctaButton: "WhatsApp",
  },
  en: {
    suitableTitle: "Suitable for",
    suitableItems: ["Buses", "Rail", "Seats", "Backrests"],
    trustTitle: "Service",
    trustItems: ["Stocked", "By the meter", "Samples", "EU shipping"],
    imageAlt: "Coach with robust bus and rail fabrics",
    ctaTitle: "Need fabric?",
    ctaText: "We send colors and samples via WhatsApp.",
    ctaButton: "WhatsApp",
  },
  ru: {
    suitableTitle: "Подходит для",
    suitableItems: ["Автобусов", "Поездов", "Сидений", "Спинок"],
    trustTitle: "Сервис",
    trustItems: ["Со склада", "Метраж", "Образцы", "Доставка ЕС"],
    imageAlt: "Автобус с прочными тканями для автобусов и поездов",
    ctaTitle: "Нужна ткань?",
    ctaText: "Отправим цвета и образцы в WhatsApp.",
    ctaButton: "WhatsApp",
  },
};

const AUTOMOTIVE_LEATHER_NOTICE_COPY: Record<
  SupportedLang,
  {
    title: string;
    paragraphs: string[];
    highlight: string;
  }
> = {
  de: {
    title: "Hinweis zum Automobilkunstleder",
    paragraphs: [
      "Auf der Website ist momentan nur ein Teil unserer verfügbaren Varianten sichtbar. Viele weitere Farben, Strukturen und Qualitäten sind bereits lagernd, aber noch nicht online eingepflegt.",
      "Wir haben deutlich mehr zu bieten als aktuell dargestellt.",
    ],
    highlight: "über 200 Varianten sind auf Anfrage verfügbar.",
  },
  en: {
    title: "Notice about automotive leatherette",
    paragraphs: [
      "Currently, only a portion of our available variants is displayed on the website. Many additional colors, textures, and qualities are already in stock but have not yet been added online.",
      "We offer significantly more than what is currently shown.",
    ],
    highlight: "Over 200 variants are available on request.",
  },
  ru: {
    title: "Информация об автомобильном кожзаменителе",
    paragraphs: [
      "На сайте сейчас представлена только часть доступных вариантов. Многие другие цвета, структуры и качества уже есть в наличии, но ещё не добавлены на сайт.",
      "Мы можем предложить значительно больше, чем показано сейчас.",
    ],
    highlight: "Более 200 вариантов доступны по запросу.",
  },
};

export default function MaterialCatalogPage({
  lang,
  category,
  dictionary,
}: {
  lang: SupportedLang;
  category: MaterialPageSlug;
  dictionary: SiteDictionary;
}) {
  const currentCategory = getMaterialCategoryContent(category, dictionary, lang);
  const copy = dictionary.materialCatalog;
  const catalogCopy = getMaterialCatalogCopy(lang);
  const automotiveLeatherNoticeCopy = AUTOMOTIVE_LEATHER_NOTICE_COPY[lang];
  const supportSection =
    category === "automobilkunstleder"
      ? {
          copy: AUTOMOTIVE_LEATHER_SUPPORT_COPY[lang],
          imageSrc: "/images/automobilkunstleder.webp",
        }
      : category === "bus-bahn-stoffe"
        ? {
            copy: BUS_BAHN_SUPPORT_COPY[lang],
            imageSrc: "/images/bus-leder-stoffe-hero.webp",
          }
        : null;
  const languageOptions = SUPPORTED_LANGS.map((code) => ({
    code,
    label: dictionary.languageSwitcher[code],
  }));

  return (
    <main className="luxury-home min-h-screen overflow-x-clip bg-base text-text-primary">
      <header className="luxury-nav sticky top-0 z-40 border-b border-divider bg-base/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6 py-4">
          <NextLink href={`/${lang}`} className="shrink-0">
            <p className="luxury-brand-mark text-lg font-semibold tracking-tight text-text-primary">
              {dictionary.footer.company}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              {dictionary.footer.tagline}
            </p>
          </NextLink>

          <div className="flex items-center gap-3 sm:gap-5">
            <NextLink
              href={`/${lang}/kontakt`}
              className="luxury-button luxury-button-primary hidden items-center rounded-full border border-gold px-5 py-2.5 text-[13px] font-semibold tracking-[0.08em] text-base transition sm:inline-flex"
            >
              {dictionary.contactCta}
            </NextLink>
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] sm:text-[11px]">
              {languageOptions.map((item, index) => (
                <span key={item.code} className="inline-flex items-center gap-1">
                  <NextLink
                    href={`/${item.code}/${category}`}
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
        </div>
      </header>

      <section className="premiumPatternBackground border-b border-divider pb-12 pt-5 sm:pb-14 sm:pt-6 xl:pb-16 xl:pt-8">
        <div className="relative mx-auto max-w-[90rem] px-6">
          <div className="mb-5 flex justify-start sm:mb-6">
            <BackToHomeButton href={`/${lang}`} label={copy.backHomeLabel} />
          </div>

          {category === "dachhimmelstoffe" ? (
            <DachhimmelstoffeSection lang={lang} />
          ) : (
            <div className="space-y-8 md:space-y-10">
              <h1 className="sr-only">{currentCategory.title}</h1>
              <CatalogCollection
                products={currentCategory.products}
                locale={localeByLang[lang]}
                priceUnitLabel={copy.priceUnitLabel}
                copy={catalogCopy}
                primaryCtaLabel={CONSULTATION_PRIMARY_CTA_LABEL[lang]}
                primaryCtaHref={`/${lang}/kontakt`}
                secondaryCtaLabel={dictionary.trustSection.contactLabel}
                secondaryCtaHref={WHATSAPP_LINK}
                previewNote={currentCategory.previewNote}
                serviceNotice={
                  category === "automobilkunstleder"
                    ? automotiveLeatherNoticeCopy
                    : undefined
                }
                sampleRequest={{
                  label: SAMPLE_REQUEST_LABELS[lang],
                  baseHref: WHATSAPP_LINK,
                  subject: currentCategory.title,
                  lang,
                }}
                showConsultationPanel={category === "other"}
                productCardVariant={
                  category === "automobilkunstleder"
                    ? "floating"
                    : category === "bus-bahn-stoffe"
                      ? "gallery"
                      : "card"
                }
              />

              {supportSection ? (
                <MaterialSupportSection
                  blocks={[
                    {
                      title: supportSection.copy.suitableTitle,
                      items: supportSection.copy.suitableItems,
                      columns: "two",
                    },
                    {
                      title: supportSection.copy.trustTitle,
                      items: supportSection.copy.trustItems,
                    },
                  ]}
                  image={{
                    src: supportSection.imageSrc,
                    alt: supportSection.copy.imageAlt,
                  }}
                  cta={{
                    title: supportSection.copy.ctaTitle,
                    text: supportSection.copy.ctaText,
                    buttonLabel: supportSection.copy.ctaButton,
                    buttonHref: WHATSAPP_LINK,
                  }}
                />
              ) : null}
            </div>
          )}
        </div>
      </section>

      <footer className="luxury-footer border-t border-divider bg-base">
        <div className="mx-auto max-w-[90rem] px-6 py-8">
          <div className="mb-4 flex items-center justify-center gap-3 text-xs text-text-secondary/60">
            <NextLink href={`/${lang}/impressum`} className="transition hover:text-text-secondary">
              {dictionary.footer.legalNotice}
            </NextLink>
            <span className="text-text-secondary/30">|</span>
            <NextLink href={`/${lang}/datenschutz`} className="transition hover:text-text-secondary">
              {dictionary.footer.privacyPolicy}
            </NextLink>
          </div>
          <p className="text-center text-xs text-text-secondary/40">
            {"© "}
            {new Date().getFullYear()} {dictionary.footer.company}. {dictionary.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}

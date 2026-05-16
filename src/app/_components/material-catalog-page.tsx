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
  de: "Beratung anfragen",
  en: "Request advice",
  ru: "Запросить консультацию",
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
    suitableItems: [
      "Autositze",
      "Türverkleidungen",
      "Seitenverkleidungen",
      "Armlehnen",
      "Innenraumumbauten",
      "Wohnmobile",
      "Boots- und Yachtbereiche je nach Material",
    ],
    trustTitle: "Direkt vom Materialhändler",
    trustItems: [
      "Viele Varianten direkt ab Lager",
      "Muster auf Anfrage",
      "Meterware erhältlich",
      "Versand in ganz Europa",
      "Geeignet für professionelle Fahrzeuginnenräume",
    ],
    imageAlt: "Automobilkunstleder im hochwertigen Fahrzeuginnenraum",
    ctaTitle: "Passendes Automobilkunstleder gesucht?",
    ctaText:
      "Schreiben Sie uns auf WhatsApp. Wir senden Fotos, beraten zur passenden Oberfläche und Farbe und können Muster vorbereiten.",
    ctaButton: "Jetzt Muster anfragen",
  },
  en: {
    suitableTitle: "Suitable for",
    suitableItems: [
      "Car seats",
      "Door panels",
      "Side panels",
      "Armrests",
      "Interior conversions",
      "Motorhomes",
      "Boat and yacht areas depending on material",
    ],
    trustTitle: "Directly from the material supplier",
    trustItems: [
      "Many variants directly from stock",
      "Samples on request",
      "Available by the meter",
      "Shipping across Europe",
      "Suitable for professional vehicle interiors",
    ],
    imageAlt: "Automotive synthetic leather in a premium vehicle interior",
    ctaTitle: "Looking for suitable automotive synthetic leather?",
    ctaText:
      "Message us on WhatsApp. We can send photos, advise on the right surface and color, and prepare samples.",
    ctaButton: "Request samples now",
  },
  ru: {
    suitableTitle: "Подходит для",
    suitableItems: [
      "Автомобильных сидений",
      "Дверных карт",
      "Боковых панелей",
      "Подлокотников",
      "Переделки интерьера",
      "Автодомов",
      "Зон катеров и яхт в зависимости от материала",
    ],
    trustTitle: "Напрямую от поставщика материалов",
    trustItems: [
      "Многие варианты напрямую со склада",
      "Образцы по запросу",
      "Доступно метражом",
      "Доставка по всей Европе",
      "Подходит для профессиональных автомобильных интерьеров",
    ],
    imageAlt: "Автомобильная искусственная кожа в премиальном салоне",
    ctaTitle: "Ищете подходящую автомобильную искусственную кожу?",
    ctaText:
      "Напишите нам в WhatsApp. Мы отправим фото, поможем подобрать поверхность и цвет, а также подготовим образцы.",
    ctaButton: "Запросить образцы",
  },
};

const BUS_BAHN_SUPPORT_COPY: Record<SupportedLang, MaterialSupportCopy> = {
  de: {
    suitableTitle: "Geeignet für",
    suitableItems: [
      "Busse",
      "Bahnen",
      "Straßenbahnen",
      "Reisebusse",
      "Öffentliche Verkehrsmittel",
      "Sitzpolster",
      "Rückenlehnen",
      "Stark beanspruchte Innenräume",
    ],
    trustTitle: "Direkt vom Materialhändler",
    trustItems: [
      "Viele Bus- und Bahnstoffe direkt ab Lager",
      "Meterware erhältlich",
      "Muster auf Anfrage",
      "EU-weiter Versand",
      "Robuste Qualität für professionelle Polsterarbeiten",
      "Geeignet für Werkstätten, Sattlereien und Fahrzeugausstatter",
    ],
    imageAlt: "Bus mit robusten Bus- und Bahnstoffen",
    ctaTitle: "Passenden Stoff für Bus & Bahn gesucht?",
    ctaText:
      "Schreiben Sie uns auf WhatsApp. Wir senden Fotos, beraten zur passenden Farbe und Struktur und können Muster vorbereiten.",
    ctaButton: "Jetzt Muster anfragen",
  },
  en: {
    suitableTitle: "Suitable for",
    suitableItems: [
      "Buses",
      "Rail vehicles",
      "Trams",
      "Coaches",
      "Public transport",
      "Seat cushions",
      "Backrests",
      "High-use interiors",
    ],
    trustTitle: "Directly from the material supplier",
    trustItems: [
      "Many bus and rail fabrics directly from stock",
      "Available by the meter",
      "Samples on request",
      "EU-wide shipping",
      "Robust quality for professional upholstery work",
      "Suitable for workshops, upholsterers and vehicle outfitters",
    ],
    imageAlt: "Coach with robust bus and rail fabrics",
    ctaTitle: "Looking for suitable bus and rail fabric?",
    ctaText:
      "Message us on WhatsApp. We can send photos, advise on the right color and structure, and prepare samples.",
    ctaButton: "Request samples now",
  },
  ru: {
    suitableTitle: "Подходит для",
    suitableItems: [
      "Автобусов",
      "Поездов",
      "Трамваев",
      "Туристических автобусов",
      "Общественного транспорта",
      "Сидений",
      "Спинок сидений",
      "Интерьеров с высокой нагрузкой",
    ],
    trustTitle: "Напрямую от поставщика материалов",
    trustItems: [
      "Многие ткани для автобусов и поездов напрямую со склада",
      "Доступно метражом",
      "Образцы по запросу",
      "Доставка по всему ЕС",
      "Прочное качество для профессиональной перетяжки",
      "Подходит для мастерских, ателье и оснащения транспорта",
    ],
    imageAlt: "Автобус с прочными тканями для автобусов и поездов",
    ctaTitle: "Ищете подходящую ткань для автобуса или поезда?",
    ctaText:
      "Напишите нам в WhatsApp. Мы отправим фото, поможем подобрать цвет и структуру, а также подготовим образцы.",
    ctaButton: "Запросить образцы",
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
      "Unser Automobilkunstleder-Sortiment wird aktuell erweitert. Viele Farben und Varianten sind bereits auf Lager, aber noch nicht vollständig online gelistet.",
      "Bitte schauen Sie sich zuerst unsere aktuellen Materialien und Videos auf TikTok an. Dort zeigen wir regelmäßig verfügbare Farben, Oberflächen und neue Ware aus dem Lager.",
      "Wenn Sie danach eine bestimmte Farbe, Oberfläche oder Qualität suchen, schreiben Sie uns gerne per WhatsApp. Wir senden aktuelle Fotos aus dem Lager und beraten Sie zur passenden Auswahl.",
    ],
    highlight: "Über 200 weitere Automobilkunstleder-Varianten auf Anfrage verfügbar.",
  },
  en: {
    title: "Note on automotive synthetic leather",
    paragraphs: [
      "Our automotive synthetic leather range is currently being expanded. Many colors and variants are already in stock, but not yet fully listed online.",
      "If you are looking for a specific color, surface or quality, message us directly on WhatsApp. We can send current photos from stock and advise on the right selection.",
    ],
    highlight: "Over 200 additional automotive synthetic leather variants available on request.",
  },
  ru: {
    title: "Примечание по автомобильной искусственной коже",
    paragraphs: [
      "Наш ассортимент автомобильной искусственной кожи сейчас расширяется. Многие цвета и варианты уже есть на складе, но еще не полностью размещены онлайн.",
      "Если вы ищете определенный цвет, поверхность или качество, лучше напишите нам напрямую в WhatsApp. Мы отправим актуальные фото со склада и поможем с выбором.",
    ],
    highlight: "Более 200 дополнительных вариантов автомобильной искусственной кожи доступны по запросу.",
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
      <header className="luxury-nav border-b border-divider bg-base/92 backdrop-blur-xl">
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
              className="luxury-button luxury-button-primary hidden items-center rounded-full border border-gold bg-gold px-5 py-2.5 text-[13px] font-medium text-base transition sm:inline-flex"
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

      <section className="border-b border-divider pb-12 pt-5 sm:pb-14 sm:pt-6 xl:pb-16 xl:pt-8">
        <div className="relative mx-auto max-w-[90rem] px-6">
          <div className="mb-5 flex justify-start sm:mb-6">
            <BackToHomeButton href={`/${lang}`} label={copy.backHomeLabel} />
          </div>

          {category === "dachhimmelstoffe" ? (
            <DachhimmelstoffeSection lang={lang} />
          ) : (
            <div className="space-y-8 md:space-y-10">
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

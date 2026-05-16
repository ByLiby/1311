import type { SupportedLang } from "@/lib/i18n";

export const HIMMELSTOFFE_WHATSAPP_LINK = "https://wa.me/436764725428";

type LocalizedText = Record<SupportedLang, string>;

export type HimmelstoffeImage = {
  id: number;
  src: string;
  fullSrc: string;
  alt: string;
};

export type HimmelstoffeVariant = {
  src: string;
  alt: LocalizedText;
  color: LocalizedText;
  name: LocalizedText;
};

export type HimmelstoffeCopy = {
  heroEyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  heroImageAlt: string;
  heroBadges: string[];
  galleryEyebrow: string;
  galleryTitle: string;
  galleryText: string;
  variantsEyebrow: string;
  variantsTitle: string;
  variantsText: string;
  variantText: string;
  variantBenefits: string[];
  variantButton: string;
  suitableTitle: string;
  suitableItems: string[];
  trustTitle: string;
  trustItems: string[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

const himmelstoffImageOrder = [
  12, 15, 10, 17, 11, 9,
  8, 7, 6, 16, 5, 18,
  4, 3, 13, 14, 2, 1,
] as const;

export const himmelstoffImages: HimmelstoffeImage[] = himmelstoffImageOrder.map((id) => ({
  id,
  src: `/images/Himmelstoffe/${id}.png`,
  fullSrc: `/images/Himmelstoffe/${id}.png`,
  alt: `Dachhimmelstoff Beispiel ${id}`,
}));

export const HIMMELSTOFFE_COPY: Record<SupportedLang, HimmelstoffeCopy> = {
  de: {
    heroEyebrow: "Innenausbau ab Lager",
    title: "Dachhimmelstoffe für Auto-Innenräume",
    subtitle:
      "Stoffe für Dachhimmel, Säulen und Innenraumverkleidung – direkt ab Lager in Österreich.",
    intro: "",
    heroImageAlt: "Dachhimmelstoff schwarz im Auto eingebaut",
    heroBadges: ["Meterware", "Muster möglich", "EU-Versand", "Lager in Österreich"],
    galleryEyebrow: "Einbauansicht",
    galleryTitle: "So wirkt Himmelstoff im Fahrzeug",
    galleryText:
      "Große Innenraumansichten zeigen die Oberfläche, Farbe und Lichtwirkung direkt im Auto.",
    variantsEyebrow: "Farben & Varianten",
    variantsTitle: "Kuratiert ab Lager",
    variantsText:
      "Schwarz, Anthrazit, Grau, Hellgrau und Beige für professionelle Innenräume.",
    variantText: "Für Dachhimmel, Säulen und Innenraumverkleidung geeignet.",
    variantBenefits: [
      "Farben direkt ab Lager",
      "Meterware erhältlich",
      "Muster auf Anfrage",
      "EU-weiter Versand",
      "Geeignet für professionelle Dachhimmel- und Innenraumarbeiten",
    ],
    variantButton: "Muster anfragen",
    suitableTitle: "Geeignet für",
    suitableItems: [
      "Autodachhimmel",
      "A-, B- und C-Säulen",
      "Sonnenblenden",
      "Innenraumverkleidung",
      "Oldtimer",
      "Camper und Sonderumbauten",
      "Sattlereien und Werkstätten",
    ],
    trustTitle: "Direkt vom Materialhändler",
    trustItems: [
      "Lager in Österreich",
      "Muster auf Anfrage",
      "Versand in ganz Europa",
      "Beratung per WhatsApp",
      "Meterware für Sattler, Werkstätten und Händler",
    ],
    ctaTitle: "Passende Farbe für den Innenraum gesucht?",
    ctaText:
      "Schreiben Sie uns auf WhatsApp. Wir senden Fotos, beraten zur Farbe und können Muster vorbereiten.",
    ctaButton: "Jetzt Muster anfragen",
  },
  en: {
    heroEyebrow: "INTERIOR MATERIALS FROM STOCK",
    title: "Headliner fabrics for automotive interiors",
    subtitle:
      "Fabrics for headliners, pillars and interior trim – directly from stock in Austria.",
    intro: "",
    heroImageAlt: "Black headliner fabric installed in a car",
    heroBadges: ["By the meter", "Samples available", "EU shipping", "Stock in Austria"],
    galleryEyebrow: "Installed view",
    galleryTitle: "How headliner fabric looks inside the vehicle",
    galleryText:
      "Large interior images show the surface, color and light effect directly inside the car.",
    variantsEyebrow: "Colors & variants",
    variantsTitle: "Stocked colors",
    variantsText:
      "Black, anthracite, grey, light grey and beige for professional interior work.",
    variantText: "Suitable for headliners, pillars and interior trim.",
    variantBenefits: [
      "Colors directly from stock",
      "Available by the meter",
      "Samples on request",
      "EU-wide shipping",
      "Suitable for professional headliner and interior work",
    ],
    variantButton: "Request sample",
    suitableTitle: "Suitable for",
    suitableItems: [
      "Car headliners",
      "A-, B- and C-pillars",
      "Sun visors",
      "Interior trim",
      "Classic cars",
      "Campers and custom builds",
      "Upholsterers and workshops",
    ],
    trustTitle: "Directly from the material supplier",
    trustItems: [
      "Warehouse in Austria",
      "Samples on request",
      "Shipping across Europe",
      "Advice via WhatsApp",
      "Meter goods for upholsterers, workshops and dealers",
    ],
    ctaTitle: "Looking for the right interior color?",
    ctaText:
      "Message us on WhatsApp. We can send photos, advise on color and prepare samples.",
    ctaButton: "Request samples now",
  },
  ru: {
    heroEyebrow: "МАТЕРИАЛЫ ДЛЯ САЛОНА СО СКЛАДА",
    title: "Потолочные ткани для автомобильных салонов",
    subtitle:
      "Ткани для потолка, стоек и внутренней обшивки — напрямую со склада в Австрии.",
    intro: "",
    heroImageAlt: "Черная потолочная ткань установлена в автомобиле",
    heroBadges: ["Метражом", "Образцы доступны", "Доставка по ЕС", "Склад в Австрии"],
    galleryEyebrow: "В интерьере",
    galleryTitle: "Как потолочная ткань выглядит в автомобиле",
    galleryText:
      "Крупные фото салона показывают фактуру, цвет и восприятие материала прямо в машине.",
    variantsEyebrow: "Цвета и варианты",
    variantsTitle: "Цвета со склада",
    variantsText:
      "Черный, антрацит, серый, светло-серый и бежевый для профессиональной отделки интерьера.",
    variantText: "Подходит для потолка, стоек и внутренней обшивки.",
    variantBenefits: [
      "Цвета напрямую со склада",
      "Доступно метражом",
      "Образцы по запросу",
      "Доставка по всему ЕС",
      "Подходит для профессиональной отделки потолка и интерьера",
    ],
    variantButton: "Запросить образец",
    suitableTitle: "Подходит для",
    suitableItems: [
      "Потолков авто",
      "Стоек A, B и C",
      "Солнцезащитных козырьков",
      "Внутренней обшивки",
      "Классических автомобилей",
      "Кемперов и индивидуальных проектов",
      "Ателье и мастерских",
    ],
    trustTitle: "Напрямую от поставщика материалов",
    trustItems: [
      "Склад в Австрии",
      "Образцы по запросу",
      "Доставка по всей Европе",
      "Консультация в WhatsApp",
      "Метраж для ателье, мастерских и дилеров",
    ],
    ctaTitle: "Ищете подходящий цвет для интерьера?",
    ctaText:
      "Напишите нам в WhatsApp. Мы отправим фото, поможем с цветом и подготовим образцы.",
    ctaButton: "Запросить образцы",
  },
};

export const HIMMELSTOFFE_VARIANTS: HimmelstoffeVariant[] = [
  {
    src: "/images/Himmelstoffe/1.png",
    name: {
      de: "Dachhimmelstoff Schwarz",
      en: "Headliner Fabric Black",
      ru: "Потолочная ткань черная",
    },
    color: {
      de: "Schwarz",
      en: "Black",
      ru: "Черный",
    },
    alt: {
      de: "Dachhimmelstoff schwarz im Auto eingebaut",
      en: "Black headliner fabric installed in a car",
      ru: "Черная потолочная ткань установлена в автомобиле",
    },
  },
  {
    src: "/images/Himmelstoffe/2.png",
    name: {
      de: "Dachhimmelstoff Anthrazit",
      en: "Headliner Fabric Anthracite",
      ru: "Потолочная ткань антрацит",
    },
    color: {
      de: "Anthrazit",
      en: "Anthracite",
      ru: "Антрацит",
    },
    alt: {
      de: "Anthrazitfarbener Dachhimmelstoff im Auto eingebaut",
      en: "Anthracite headliner fabric installed in a car",
      ru: "Антрацитовая потолочная ткань установлена в автомобиле",
    },
  },
  {
    src: "/images/Himmelstoffe/8.png",
    name: {
      de: "Dachhimmelstoff Grau",
      en: "Headliner Fabric Grey",
      ru: "Потолочная ткань серая",
    },
    color: {
      de: "Grau",
      en: "Grey",
      ru: "Серый",
    },
    alt: {
      de: "Himmelstoff grau für Autodach",
      en: "Grey headliner fabric for a car roof",
      ru: "Серая потолочная ткань для автомобильного потолка",
    },
  },
  {
    src: "/images/Himmelstoffe/17.png",
    name: {
      de: "Dachhimmelstoff Hellgrau",
      en: "Headliner Fabric Light Grey",
      ru: "Потолочная ткань светло-серая",
    },
    color: {
      de: "Hellgrau",
      en: "Light grey",
      ru: "Светло-серый",
    },
    alt: {
      de: "Hellgrauer Stoff für Autohimmel und Säulen",
      en: "Light grey fabric for car headliner and pillars",
      ru: "Светло-серая ткань для потолка и стоек автомобиля",
    },
  },
  {
    src: "/images/Himmelstoffe/18.png",
    name: {
      de: "Dachhimmelstoff Beige",
      en: "Headliner Fabric Beige",
      ru: "Потолочная ткань бежевая",
    },
    color: {
      de: "Beige",
      en: "Beige",
      ru: "Бежевый",
    },
    alt: {
      de: "Beiger Dachhimmelstoff im Fahrzeuginnenraum",
      en: "Beige headliner fabric inside a vehicle interior",
      ru: "Бежевая потолочная ткань в салоне автомобиля",
    },
  },
];

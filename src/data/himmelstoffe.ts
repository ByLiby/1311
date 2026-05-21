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
    subtitle: "Kaschierte Stoffe für Autohimmel.",
    intro: "",
    heroImageAlt: "Dachhimmelstoff schwarz im Auto eingebaut",
    heroBadges: ["Meterware", "Muster", "EU Versand", "Lager"],
    galleryEyebrow: "Einbauansicht",
    galleryTitle: "Himmelstoff im Fahrzeug",
    galleryText: "Farbe und Oberfläche im eingebauten Zustand.",
    variantsEyebrow: "Farben & Varianten",
    variantsTitle: "Farben ab Lager",
    variantsText: "Schwarz, Anthrazit, Grau, Hellgrau und Beige.",
    variantText: "Für Dachhimmel, Säulen und Innenraumverkleidung geeignet.",
    variantBenefits: ["Lagerfarben", "Meterware", "Muster", "EU Versand"],
    variantButton: "Anfragen",
    suitableTitle: "Geeignet für",
    suitableItems: [
      "Autodachhimmel",
      "A-, B- und C-Säulen",
      "Sonnenblenden",
      "Innenraumverkleidung",
      "Camper und Sonderumbauten",
    ],
    trustTitle: "Service",
    trustItems: ["Lager in Österreich", "Muster", "EU Versand", "WhatsApp"],
    ctaTitle: "Farbe gesucht?",
    ctaText: "Wir senden Muster und Fotos per WhatsApp.",
    ctaButton: "WhatsApp",
  },
  en: {
    heroEyebrow: "INTERIOR MATERIALS FROM STOCK",
    title: "Headliner fabrics for automotive interiors",
    subtitle: "Foam-backed fabrics for headliners.",
    intro: "",
    heroImageAlt: "Black headliner fabric installed in a car",
    heroBadges: ["By the meter", "Samples", "EU shipping", "Stock"],
    galleryEyebrow: "Installed view",
    galleryTitle: "Headliner fabric installed",
    galleryText: "Color and surface in the vehicle.",
    variantsEyebrow: "Colors & variants",
    variantsTitle: "Stocked colors",
    variantsText: "Black, anthracite, grey, light grey and beige.",
    variantText: "Suitable for headliners, pillars and interior trim.",
    variantBenefits: ["Stock colors", "By the meter", "Samples", "EU shipping"],
    variantButton: "Inquire",
    suitableTitle: "Suitable for",
    suitableItems: [
      "Car headliners",
      "A-, B- and C-pillars",
      "Sun visors",
      "Interior trim",
      "Campers and custom builds",
    ],
    trustTitle: "Service",
    trustItems: ["Stock in Austria", "Samples", "EU shipping", "WhatsApp"],
    ctaTitle: "Need a color?",
    ctaText: "We send samples and photos via WhatsApp.",
    ctaButton: "WhatsApp",
  },
  ru: {
    heroEyebrow: "МАТЕРИАЛЫ ДЛЯ САЛОНА СО СКЛАДА",
    title: "Потолочные ткани для автомобильных салонов",
    subtitle: "Дублированные ткани для автопотолка.",
    intro: "",
    heroImageAlt: "Черная потолочная ткань установлена в автомобиле",
    heroBadges: ["Метраж", "Образцы", "Доставка ЕС", "Склад"],
    galleryEyebrow: "В интерьере",
    galleryTitle: "Потолочная ткань в салоне",
    galleryText: "Цвет и фактура в автомобиле.",
    variantsEyebrow: "Цвета и варианты",
    variantsTitle: "Цвета со склада",
    variantsText: "Черный, антрацит, серый, светло-серый и бежевый.",
    variantText: "Подходит для потолка, стоек и внутренней обшивки.",
    variantBenefits: ["Складские цвета", "Метраж", "Образцы", "Доставка ЕС"],
    variantButton: "Запросить",
    suitableTitle: "Подходит для",
    suitableItems: [
      "Потолков авто",
      "Стоек A, B и C",
      "Солнцезащитных козырьков",
      "Внутренней обшивки",
      "Кемперов и индивидуальных проектов",
    ],
    trustTitle: "Сервис",
    trustItems: ["Склад в Австрии", "Образцы", "Доставка ЕС", "WhatsApp"],
    ctaTitle: "Нужен цвет?",
    ctaText: "Отправим образцы и фото в WhatsApp.",
    ctaButton: "WhatsApp",
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

import { readdirSync } from "node:fs";
import { extname, join, parse } from "node:path";
import type { SiteDictionary } from "@/lib/dictionary";
import {
  getMaterialCatalogUiCopy,
  getMaterialProductMetadata,
  type MaterialApplicationTag,
  type MaterialCatalogUiCopy,
  type MaterialCatalogPreviewNote,
  type MaterialCategorySlug as BaseMaterialCategorySlug,
  type MaterialColorTone,
  type MaterialStyleTag,
} from "@/lib/material-catalog-metadata";
import type { SupportedLang } from "@/lib/i18n";

export type {
  MaterialApplicationTag,
  MaterialCatalogUiCopy,
  MaterialCatalogPreviewNote,
  MaterialColorTone,
  MaterialStyleTag,
} from "@/lib/material-catalog-metadata";

type RawMaterialProduct =
  SiteDictionary["materialCatalog"]["categories"][BaseMaterialCategorySlug]["products"][number];

export type MaterialCategorySlug = BaseMaterialCategorySlug;
export type CustomMaterialCategorySlug =
  | "dachhimmelstoffe"
  | "bus-bahn-stoffe"
  | "yacht-marine";
export type MaterialPageSlug = MaterialCategorySlug | CustomMaterialCategorySlug;

export type MaterialProduct = RawMaterialProduct & {
  image: string;
  imageAlt: string;
  primaryColor: MaterialColorTone;
  secondaryColor?: MaterialColorTone;
  styles: MaterialStyleTag[];
  applications: MaterialApplicationTag[];
  subline: string;
  priceLabel?: string;
  badgeLabel?: string;
  focusVideoSrc?: string;
  isPlaceholder?: boolean;
  previewLabel?: string;
  previewStatus?: string;
};

const MATERIAL_CATEGORIES: MaterialPageSlug[] = [
  "automobilkunstleder",
  "dachhimmelstoffe",
  "bus-bahn-stoffe",
  "yacht-marine",
  "other",
];

const CUSTOM_MATERIAL_CATEGORIES: CustomMaterialCategorySlug[] = [
  "dachhimmelstoffe",
  "bus-bahn-stoffe",
  "yacht-marine",
];

type CustomMaterialPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  advantages: string[];
};

type CustomMaterialProductDefinition = {
  id: string;
  name: Record<SupportedLang, string>;
  image: string;
  primaryColor: MaterialColorTone;
  secondaryColor?: MaterialColorTone;
  styles: MaterialStyleTag[];
  applications: MaterialApplicationTag[];
  subline: Record<SupportedLang, string>;
  pricePerMeter?: number;
};

const COLLECTION_REQUEST_LABEL: Record<SupportedLang, string> = {
  de: "Kollektion anfragen",
  en: "Request collection",
  ru: "Запросить коллекцию",
};

const CUSTOM_MATERIAL_COPY: Record<
  SupportedLang,
  Record<CustomMaterialCategorySlug, CustomMaterialPageCopy>
> = {
  de: {
    dachhimmelstoffe: {
      eyebrow: "INNENAUSBAU",
      title: "Dachhimmelstoffe",
      description:
        "Elastische Stoffe für Fahrzeughimmel, Innenverkleidungen, Säulen und individuelle Ausbauprojekte.",
      advantages: [
        "Ideal für Fahrzeughimmel",
        "Elastisch und sauber verarbeitbar",
        "Verschiedene Farben verfügbar",
        "Muster auf Anfrage",
      ],
    },
    "bus-bahn-stoffe": {
      eyebrow: "TRANSPORT",
      title: "Bus & Bahn Stoffe",
      description:
        "Robuste technische Stoffe für Busse, Bahnen, Transport, Objektbereich und stark beanspruchte Innenräume.",
      advantages: [
        "Für Bus, Bahn & Transport",
        "Hohe Belastbarkeit",
        "Professionelle Qualität",
        "Lagerware verfügbar",
      ],
    },
    "yacht-marine": {
      eyebrow: "OUTDOOR & MARINE",
      title: "Yacht & Marine",
      description:
        "Materialien für Boote, Yachten, Outdoor-Polster, Poolbereiche und anspruchsvolle Außenanwendungen.",
      advantages: [
        "Für Yacht & Boot",
        "Für Outdoor geeignet",
        "Pflegeleichte Oberflächen",
        "Muster auf Anfrage",
      ],
    },
  },
  en: {
    dachhimmelstoffe: {
      eyebrow: "INTERIOR FIT-OUT",
      title: "Headliner Fabrics",
      description:
        "Elastic fabrics for vehicle headliners, interior panels, pillars and individual fit-out projects.",
      advantages: [
        "Ideal for headliners",
        "Elastic and clean to process",
        "Various colors available",
        "Samples on request",
      ],
    },
    "bus-bahn-stoffe": {
      eyebrow: "TRANSPORT",
      title: "Bus & Rail Fabrics",
      description:
        "Robust technical fabrics for buses, rail, transport, contract use and heavily used interiors.",
      advantages: [
        "For bus, rail & transport",
        "High resilience",
        "Professional quality",
        "Stock available",
      ],
    },
    "yacht-marine": {
      eyebrow: "OUTDOOR & MARINE",
      title: "Yacht & Marine",
      description:
        "Materials for boats, yachts, outdoor upholstery, pool areas and demanding exterior applications.",
      advantages: [
        "For yacht & boat",
        "Suitable for outdoor use",
        "Easy-care surfaces",
        "Samples on request",
      ],
    },
  },
  ru: {
    dachhimmelstoffe: {
      eyebrow: "ОТДЕЛКА ИНТЕРЬЕРА",
      title: "Потолочные ткани",
      description:
        "Эластичные ткани для автомобильных потолков, внутренних панелей, стоек и индивидуальных проектов отделки.",
      advantages: [
        "Для потолков авто",
        "Эластично и удобно в работе",
        "Разные цвета в наличии",
        "Образцы по запросу",
      ],
    },
    "bus-bahn-stoffe": {
      eyebrow: "ТРАНСПОРТ",
      title: "Ткани для автобусов и поездов",
      description:
        "Прочные технические ткани для автобусов, поездов, транспорта, объектов и интерьеров с высокой нагрузкой.",
      advantages: [
        "Для автобусов и поездов",
        "Высокая износостойкость",
        "Профессиональное качество",
        "Складские позиции",
      ],
    },
    "yacht-marine": {
      eyebrow: "МОРСКОЕ И НАРУЖНОЕ ПРИМЕНЕНИЕ",
      title: "Яхты и морское применение",
      description:
        "Материалы для лодок, яхт, наружных подушек, зон у бассейна и требовательных наружных применений.",
      advantages: [
        "Для яхт и лодок",
        "Для наружного применения",
        "Простые в уходе поверхности",
        "Образцы по запросу",
      ],
    },
  },
};

const getBusstoffImage = (index: number) =>
  `/images/spheres/busstoff-${String(index).padStart(2, "0")}.png`;
const KUNSTLEDER_MATERIAL_DIR = join(process.cwd(), "public", "materials", "kunstleder");
const KUNSTLEDER_IMAGE_EXTENSIONS = new Set([".jpeg", ".jpg", ".png", ".webp"]);
const KUNSTLEDER_PRICE_LABEL: Record<SupportedLang, string> = {
  de: "29,99 €",
  en: "29.99 €",
  ru: "29,99 €",
};
const BESTSELLER_LABEL: Record<SupportedLang, string> = {
  de: "Bestseller",
  en: "Bestseller",
  ru: "Хит продаж",
};
const AUTOMOTIVE_IMAGE_ALT_SUFFIX: Record<SupportedLang, string> = {
  de: "Materialvorschau für Automobilkunstleder",
  en: "automotive leatherette material preview",
  ru: "превью материала автомобильного кожзаменителя",
};
const AUTOMOTIVE_SUBLINE: Record<SupportedLang, string> = {
  de: "Automobilkunstleder aus der aktuellen Lagerkollektion.",
  en: "Automotive leatherette from the current stock collection.",
  ru: "Автомобильный кожзаменитель из актуальной складской коллекции.",
};
const BUS_RAIL_IMAGE_ALT_SUFFIX: Record<SupportedLang, string> = {
  de: "Materialvorschau für Bus- und Bahnstoff",
  en: "bus and rail fabric material preview",
  ru: "превью ткани для автобусов и поездов",
};
const BUS_RAIL_SUBLINE: Record<SupportedLang, string> = {
  de: "Robuster Bus- und Bahnstoff für stark beanspruchte Transportbereiche.",
  en: "Durable bus and rail fabric for heavily used transport interiors.",
  ru: "Прочная ткань для автобусов и поездов для интенсивно используемых транспортных салонов.",
};
const KUNSTLEDER_BESTSELLER_VIDEO_SRC = "/videos/bestseller%20auto.mp4";
const KUNSTLEDER_COLOR_PROGRESSION = [
  "Satin Black.jpeg",
  "Arctic Ivory.jpeg",
  "Ivory Mist.jpeg",
  "Camel Sand.jpeg",
  "Cashmere Taupe.jpeg",
  "Mocha Taupe.jpeg",
  "Cognac Saddle.jpeg",
  "Burnt Orange.jpeg",
  "Neon Chartreuse.jpeg",
  "Ruby Crimson.jpeg",
  "wine red.jpeg",
  "Smoke Grey.jpeg",
  "Asphalt Grey.jpeg",
  "Deep Sage Grey.jpeg",
  "Ocean Blue.jpeg",
  "Anthracite Graphite.jpeg",
  "Graphit Blue.jpeg",
  "Plum Graphite.jpeg",
  "Satin Anthracite.jpeg",
  "Midnight Blue.jpeg",
];
const BUS_BAHN_COLOR_PROGRESSION = [
  26, 27, 40, 31, 29, 12, 25, 30, 15, 41, 7, 18, 38, 22, 24, 5, 6, 34, 9, 13,
  43, 36, 48, 28, 37, 3, 2, 10, 17, 47, 8, 20, 45, 33, 16, 23,
  35, 32, 11, 42, 49, 44, 1, 4,
  21, 14, 19, 39, 46,
];

const CUSTOM_MATERIAL_PRODUCTS: Record<
  Exclude<CustomMaterialCategorySlug, "bus-bahn-stoffe">,
  CustomMaterialProductDefinition[]
> = {
  dachhimmelstoffe: [
    {
      id: "kaschierter-himmelstoff",
      name: {
        de: "Kaschierter Himmelstoff",
        en: "Foam-Backed Headliner",
        ru: "Потолочная ткань с подложкой",
      },
      image: "/textures/pu-cream.jpg",
      primaryColor: "beige",
      secondaryColor: "ivory",
      styles: ["neutral"],
      applications: ["interior", "automotive"],
      subline: {
        de: "Weiche Rueckseite fuer gleichmaessige Verarbeitung.",
        en: "Soft backing for even processing.",
        ru: "Мягкая подложка для ровной обработки.",
      },
    },
    {
      id: "innenverkleidung-velours",
      name: {
        de: "Innenverkleidung Velours",
        en: "Interior Velour Liner",
        ru: "Интерьерный велюр",
      },
      image: "/textures/alcantara-style.jpg",
      primaryColor: "grey",
      secondaryColor: "anthracite",
      styles: ["premium", "neutral"],
      applications: ["interior", "automotive"],
      subline: {
        de: "Feine Veloursoptik fuer Ausbau und Verkleidung.",
        en: "Fine velour look for fit-out and trim panels.",
        ru: "Тонкая велюровая фактура для отделки и панелей.",
      },
    },
    {
      id: "dachhimmel-anthrazit",
      name: {
        de: "Dachhimmel Anthrazit",
        en: "Headliner Anthracite",
        ru: "Потолочная ткань Anthracite",
      },
      image: "/materials/alcantara_black.jpg",
      primaryColor: "anthracite",
      secondaryColor: "black",
      styles: ["neutral"],
      applications: ["automotive", "interior"],
      subline: {
        de: "Elastischer Himmelstoff fuer saubere Flaechen.",
        en: "Elastic headliner fabric for clean ceiling spans.",
        ru: "Эластичная потолочная ткань для аккуратных поверхностей.",
      },
    },
    {
      id: "dachhimmel-schwarz",
      name: {
        de: "Dachhimmel Schwarz",
        en: "Headliner Black",
        ru: "Потолочная ткань Black",
      },
      image: "/materials/alcantara%20black.jpg",
      primaryColor: "black",
      secondaryColor: "anthracite",
      styles: ["modern", "neutral"],
      applications: ["automotive", "interior"],
      subline: {
        de: "Dunkle Stoffqualitaet fuer Himmel, Saeulen und Paneele.",
        en: "Dark fabric quality for headliners, pillars and panels.",
        ru: "Темный материал для потолков, стоек и панелей.",
      },
    },
  ],
  "yacht-marine": [
    {
      id: "outdoor-vinyl-ivory",
      name: {
        de: "Outdoor Vinyl Ivory",
        en: "Outdoor Vinyl Ivory",
        ru: "Outdoor Vinyl Ivory",
      },
      image: "/materials/kunstleder/Arctic%20Ivory.jpeg",
      primaryColor: "ivory",
      secondaryColor: "beige",
      styles: ["premium", "neutral"],
      applications: ["marine-outdoor", "interior"],
      subline: {
        de: "Helle Qualitaet fuer Polster und Aussenbereiche.",
        en: "Light quality for upholstery and outdoor areas.",
        ru: "Светлый материал для подушек и наружных зон.",
      },
    },
    {
      id: "poolbereich-outdoor",
      name: {
        de: "Poolbereich Outdoor",
        en: "Poolside Outdoor",
        ru: "Poolside Outdoor",
      },
      image: "/materials/kunstleder/Camel%20Sand.jpeg",
      primaryColor: "brown",
      secondaryColor: "beige",
      styles: ["neutral", "premium"],
      applications: ["marine-outdoor"],
      subline: {
        de: "Warmer Ton fuer Lounge-, Pool- und Aussenpolster.",
        en: "Warm tone for lounge, pool and outdoor upholstery.",
        ru: "Теплый оттенок для lounge, pool и outdoor подушек.",
      },
    },
    {
      id: "marine-vinyl-ocean",
      name: {
        de: "Marine Vinyl Ocean",
        en: "Marine Vinyl Ocean",
        ru: "Marine Vinyl Ocean",
      },
      image: "/materials/kunstleder/Ocean%20Blue.jpeg",
      primaryColor: "black",
      secondaryColor: "grey",
      styles: ["premium", "neutral"],
      applications: ["marine-outdoor", "interior"],
      subline: {
        de: "Pflegeleichte Marine-Oberflaeche fuer Yacht und Boot.",
        en: "Easy-care marine surface for yachts and boats.",
        ru: "Легкая в уходе marine-поверхность для яхт и лодок.",
      },
    },
    {
      id: "marine-black",
      name: {
        de: "Marine Black",
        en: "Marine Black",
        ru: "Marine Black",
      },
      image: "/materials/kunstleder/Satin%20Black.jpeg",
      primaryColor: "black",
      secondaryColor: "anthracite",
      styles: ["modern", "premium"],
      applications: ["marine-outdoor", "interior"],
      subline: {
        de: "Dunkle Outdoor-Oberflaeche fuer robuste Anwendungen.",
        en: "Dark outdoor surface for robust applications.",
        ru: "Темная outdoor-поверхность для прочных применений.",
      },
    },
  ],
};

export type MaterialCategoryContent = {
  title: string;
  eyebrow: string;
  description: string;
  productCountLabel: string;
  products: MaterialProduct[];
  previewNote?: MaterialCatalogPreviewNote;
};

function isCustomMaterialCategorySlug(value: MaterialPageSlug): value is CustomMaterialCategorySlug {
  return CUSTOM_MATERIAL_CATEGORIES.includes(value as CustomMaterialCategorySlug);
}

export function isMaterialCategorySlug(value: string): value is MaterialPageSlug {
  return MATERIAL_CATEGORIES.includes(value as MaterialPageSlug);
}

function getCategoryProductLabel(productsLength: number, dictionary: SiteDictionary) {
  const countLabel = dictionary.materialCatalog.categories.automobilkunstleder.countLabel;

  return productsLength === 1 ? countLabel.singular : countLabel.plural;
}

function hydrateProduct(
  product: RawMaterialProduct,
  source: BaseMaterialCategorySlug,
  lang: SupportedLang,
  fallbackDescription: string,
): MaterialProduct {
  const metadata = getMaterialProductMetadata(lang, source, product.id);

  if (!metadata) {
    return {
      ...product,
      image: product.image,
      imageAlt: `${product.name} preview`,
      primaryColor: "anthracite" as const,
      styles: ["neutral"] as MaterialStyleTag[],
      applications: ["interior"] as MaterialApplicationTag[],
      subline: fallbackDescription,
    };
  }

  return {
    ...product,
    ...metadata,
    image: metadata.image,
    imageAlt: `${product.name} ${metadata.imageAltSuffix}`,
  };
}

function hydrateCustomProduct(
  product: CustomMaterialProductDefinition,
  lang: SupportedLang,
): MaterialProduct {
  const name = product.name[lang];

  return {
    id: product.id,
    name,
    pricePerMeter: product.pricePerMeter ?? 15,
    image: product.image,
    imageAlt: `${name} Materialvorschau`,
    primaryColor: product.primaryColor,
    secondaryColor: product.secondaryColor,
    styles: product.styles,
    applications: product.applications,
    subline: product.subline[lang],
  };
}

function getKunstlederFiles() {
  const colorProgressionIndex = new Map(
    KUNSTLEDER_COLOR_PROGRESSION.map((fileName, index) => [fileName, index]),
  );

  return readdirSync(KUNSTLEDER_MATERIAL_DIR, { withFileTypes: true })
    .filter((entry) => {
      return (
        entry.isFile() &&
        KUNSTLEDER_IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())
      );
    })
    .map((entry) => entry.name)
    .sort((first, second) => {
      const firstIndex = colorProgressionIndex.get(first) ?? Number.MAX_SAFE_INTEGER;
      const secondIndex = colorProgressionIndex.get(second) ?? Number.MAX_SAFE_INTEGER;

      if (firstIndex !== secondIndex) {
        return firstIndex - secondIndex;
      }

      return first.localeCompare(second, "de", {
        numeric: true,
        sensitivity: "base",
      });
    });
}

function getKunstlederProductName(fileName: string) {
  return parse(fileName)
    .name.split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function getKunstlederColorTone(fileName: string): MaterialColorTone {
  const normalizedName = fileName.toLowerCase();

  if (normalizedName.includes("black")) {
    return "black";
  }

  if (
    normalizedName.includes("red") ||
    normalizedName.includes("ruby") ||
    normalizedName.includes("plum")
  ) {
    return "red";
  }

  if (
    normalizedName.includes("camel") ||
    normalizedName.includes("cashmere") ||
    normalizedName.includes("ivory")
  ) {
    return "ivory";
  }

  if (
    normalizedName.includes("cognac") ||
    normalizedName.includes("mocha") ||
    normalizedName.includes("orange")
  ) {
    return "brown";
  }

  if (
    normalizedName.includes("grey") ||
    normalizedName.includes("gray") ||
    normalizedName.includes("graphite") ||
    normalizedName.includes("graphit") ||
    normalizedName.includes("asphalt")
  ) {
    return "grey";
  }

  return "anthracite";
}

function getKunstlederProducts(lang: SupportedLang): MaterialProduct[] {
  return getKunstlederFiles().map((fileName) => {
    const name = getKunstlederProductName(fileName);
    const primaryColor = getKunstlederColorTone(fileName);
    const isBestseller = name === "Satin Black";

    return {
      id: `kunstleder-${parse(fileName).name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")}`,
      name,
      pricePerMeter: 29.99,
      priceLabel: KUNSTLEDER_PRICE_LABEL[lang],
      badgeLabel: isBestseller ? BESTSELLER_LABEL[lang] : undefined,
      focusVideoSrc: isBestseller ? KUNSTLEDER_BESTSELLER_VIDEO_SRC : undefined,
      image: `/materials/kunstleder/${encodeURIComponent(fileName)}`,
      imageAlt: `${name} ${AUTOMOTIVE_IMAGE_ALT_SUFFIX[lang]}`,
      primaryColor,
      secondaryColor: primaryColor === "black" ? "anthracite" : "black",
      styles: ["premium", "neutral"],
      applications: ["automotive", "interior"],
      subline: AUTOMOTIVE_SUBLINE[lang],
    };
  });
}

function getBusBahnProducts(lang: SupportedLang): MaterialProduct[] {
  const colorCycle: MaterialColorTone[] = ["grey", "anthracite", "black", "beige", "brown", "red"];

  return BUS_BAHN_COLOR_PROGRESSION.map((materialNumber) => {
    const primaryColor = colorCycle[(materialNumber - 1) % colorCycle.length];

    return {
      id: `busstoff-${materialNumber}`,
      name: `Busstoff ${materialNumber}`,
      pricePerMeter: 15,
      image: getBusstoffImage(materialNumber),
      imageAlt: `Busstoff ${materialNumber} ${BUS_RAIL_IMAGE_ALT_SUFFIX[lang]}`,
      primaryColor,
      secondaryColor: primaryColor === "anthracite" ? "black" : "anthracite",
      styles: ["neutral"],
      applications: ["bus-rail"],
      subline: BUS_RAIL_SUBLINE[lang],
    };
  });
}

export function getMaterialCategoryContent(
  category: MaterialPageSlug,
  dictionary: SiteDictionary,
  lang: SupportedLang,
): MaterialCategoryContent {
  if (category === "automobilkunstleder") {
    const uiCopy = getMaterialCatalogUiCopy(lang);
    const categoryContent = dictionary.materialCatalog.categories.automobilkunstleder;
    const products = getKunstlederProducts(lang);
    const materialLabel =
      products.length === 1
        ? categoryContent.countLabel.singular
        : categoryContent.countLabel.plural;

    return {
      title: categoryContent.title,
      eyebrow: uiCopy.categories.automobilkunstleder.eyebrow,
      description: uiCopy.categories.automobilkunstleder.description,
      productCountLabel: `${products.length} ${materialLabel}`,
      products,
      previewNote: uiCopy.categories.automobilkunstleder.previewNote,
    };
  }

  if (isCustomMaterialCategorySlug(category)) {
    const copy = CUSTOM_MATERIAL_COPY[lang][category];
    const products =
      category === "bus-bahn-stoffe"
        ? getBusBahnProducts(lang)
        : CUSTOM_MATERIAL_PRODUCTS[category].map((product) => hydrateCustomProduct(product, lang));
    const materialLabel = getCategoryProductLabel(products.length, dictionary);

    return {
      title: copy.title,
      eyebrow: copy.eyebrow,
      description: copy.description,
      productCountLabel: `${products.length} ${materialLabel}`,
      products,
      previewNote: {
        eyebrow: copy.eyebrow,
        title: copy.title,
        text: copy.description,
        points: copy.advantages,
        actionLabel: COLLECTION_REQUEST_LABEL[lang],
      },
    };
  }

  const categoryContent = dictionary.materialCatalog.categories[category];
  const uiCopy = getMaterialCatalogUiCopy(lang);
  const products = categoryContent.products.map((product) =>
    hydrateProduct(product, category, lang, uiCopy.categories[category].description),
  );
  const materialLabel =
    products.length === 1
      ? categoryContent.countLabel.singular
      : categoryContent.countLabel.plural;

  return {
    title: categoryContent.title,
    eyebrow: uiCopy.categories[category].eyebrow,
    description: uiCopy.categories[category].description,
    productCountLabel: `${products.length} ${materialLabel}`,
    products,
    previewNote:
      "previewNote" in uiCopy.categories[category]
        ? uiCopy.categories[category].previewNote
        : undefined,
  };
}

export function getMaterialCatalogCopy(lang: SupportedLang): MaterialCatalogUiCopy {
  return getMaterialCatalogUiCopy(lang);
}

export function findMaterialById(
  category: MaterialPageSlug,
  productId: string,
  dictionary: SiteDictionary,
  lang: SupportedLang,
): MaterialProduct | undefined {
  return getMaterialCategoryContent(category, dictionary, lang).products.find(
    (product) => product.id === productId,
  );
}

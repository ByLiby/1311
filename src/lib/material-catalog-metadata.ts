import type { SiteDictionary } from "@/lib/dictionary";
import type { SupportedLang } from "@/lib/i18n";

export type MaterialCategorySlug = "automobilkunstleder" | "other";
export type MaterialColorTone =
  | "black"
  | "brown"
  | "grey"
  | "anthracite"
  | "beige"
  | "ivory"
  | "red";
export type MaterialStyleTag = "premium" | "modern" | "neutral";
export type MaterialApplicationTag =
  | "automotive"
  | "interior"
  | "bus-rail"
  | "marine-outdoor";

type ProductIdByCategory = {
  automobilkunstleder:
    SiteDictionary["materialCatalog"]["categories"]["automobilkunstleder"]["products"][number]["id"];
  other: SiteDictionary["materialCatalog"]["categories"]["other"]["products"][number]["id"];
};

export type MaterialProductMetadata = {
  image: string;
  primaryColor: MaterialColorTone;
  secondaryColor?: MaterialColorTone;
  styles: MaterialStyleTag[];
  applications: MaterialApplicationTag[];
  subline: string;
  imageAltSuffix: string;
  isPlaceholder?: boolean;
  previewLabel?: string;
  previewStatus?: string;
};

type MaterialProductBaseMetadata = Omit<MaterialProductMetadata, "subline" | "imageAltSuffix">;

type MaterialProductBaseMetadataMap = {
  [Category in MaterialCategorySlug]: Partial<
    Record<ProductIdByCategory[Category], MaterialProductBaseMetadata>
  >;
};

type MaterialProductLocalizedMetadataMap = {
  [Category in MaterialCategorySlug]: Partial<
    Record<ProductIdByCategory[Category], Pick<MaterialProductMetadata, "subline" | "imageAltSuffix">>
  >;
};

type MaterialCatalogCategoryCopy = {
  eyebrow: string;
  description: string;
  deliveryHint: string;
  previewNote?: MaterialCatalogPreviewNote;
};

export type MaterialCatalogPreviewNote = {
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  actionLabel: string;
};

type MaterialCatalogHighlight = {
  icon: "sample" | "measure" | "shipping";
  label: string;
};

export type MaterialCatalogUiCopy = {
  highlights: MaterialCatalogHighlight[];
  panelEyebrow: string;
  panelTitle: string;
  panelText: string;
  panelPoints: string[];
  filters: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionText: string;
    resultsLabel: string;
    activeFiltersLabel: string;
    colorLabel: string;
    styleLabel: string;
    applicationLabel: string;
    allColorsLabel: string;
    allStylesLabel: string;
    allApplicationsLabel: string;
    resetLabel: string;
    emptyTitle: string;
    emptyText: string;
    colors: Record<MaterialColorTone, string>;
    styles: Record<MaterialStyleTag, string>;
    applications: Record<MaterialApplicationTag, string>;
  };
  categories: Record<MaterialCategorySlug, MaterialCatalogCategoryCopy>;
};

export const MATERIAL_COLOR_SWATCHES: Record<MaterialColorTone, string> = {
  black: "#14171B",
  brown: "#7E5335",
  grey: "#828993",
  anthracite: "#434952",
  beige: "#CDB494",
  ivory: "#ECE6DA",
  red: "#C85146",
};

export const MATERIAL_COLOR_ORDER: MaterialColorTone[] = [
  "black",
  "anthracite",
  "grey",
  "brown",
  "beige",
  "ivory",
  "red",
];

export const MATERIAL_STYLE_ORDER: MaterialStyleTag[] = ["premium", "modern", "neutral"];
export const MATERIAL_APPLICATION_ORDER: MaterialApplicationTag[] = [
  "automotive",
  "interior",
  "bus-rail",
  "marine-outdoor",
];

const getSphereImage = (index: number) =>
  `/images/spheres/busstoff-${String(index).padStart(2, "0")}.png`;

const MATERIAL_PRODUCT_BASE_METADATA = {
  automobilkunstleder: {
    "pu-classic-grain": {
      image: "/materials/kunstleder/Satin%20Black.jpeg",
      primaryColor: "black",
      secondaryColor: "anthracite",
      styles: ["premium", "neutral"],
      applications: ["automotive", "interior"],
    },
    "pu-soft-touch": {
      image: "/materials/kunstleder/Cognac%20Saddle.jpeg",
      primaryColor: "brown",
      secondaryColor: "beige",
      styles: ["premium"],
      applications: ["interior", "automotive"],
    },
    "pvc-heavy-duty": {
      image: "/materials/kunstleder/Asphalt%20Grey.jpeg",
      primaryColor: "grey",
      secondaryColor: "anthracite",
      styles: ["neutral"],
      applications: ["bus-rail", "automotive"],
    },
    "perforated-pu-black": {
      image: "/textures/perforated.png",
      primaryColor: "black",
      secondaryColor: "grey",
      styles: ["modern", "premium"],
      applications: ["automotive", "interior"],
    },
    "double-layer-seat-grade": {
      image: "/materials/kunstleder/Camel%20Sand.jpeg",
      primaryColor: "brown",
      secondaryColor: "anthracite",
      styles: ["premium", "neutral"],
      applications: ["automotive", "interior"],
    },
    "uv-stable-exterior-pu": {
      image: "/materials/kunstleder/Arctic%20Ivory.jpeg",
      primaryColor: "beige",
      secondaryColor: "ivory",
      styles: ["premium", "neutral"],
      applications: ["marine-outdoor", "interior"],
    },
    "micro-fiber-support-pu": {
      image: "/materials/kunstleder/Mocha%20Taupe.jpeg",
      primaryColor: "brown",
      secondaryColor: "black",
      styles: ["premium"],
      applications: ["automotive", "interior"],
    },
    "flame-retardant-pvc": {
      image: "/materials/kunstleder/Anthracite%20Graphite.jpeg",
      primaryColor: "anthracite",
      secondaryColor: "black",
      styles: ["neutral"],
      applications: ["bus-rail", "interior"],
    },
    "nappa-look-pu": {
      image: "/materials/kunstleder/Ivory%20Mist.jpeg",
      primaryColor: "ivory",
      secondaryColor: "beige",
      styles: ["premium"],
      applications: ["automotive", "interior"],
    },
    "oem-matte-pvc": {
      image: "/materials/kunstleder/Satin%20Anthracite.jpeg",
      primaryColor: "black",
      secondaryColor: "grey",
      styles: ["modern", "neutral"],
      applications: ["automotive", "bus-rail"],
    },
    "cold-resistant-vinyl": {
      image: "/materials/kunstleder/Midnight%20Blue.jpeg",
      primaryColor: "black",
      secondaryColor: "anthracite",
      styles: ["neutral"],
      applications: ["marine-outdoor", "automotive"],
    },
    "carbon-embossed-pu": {
      image: "/materials/kunstleder/Graphit%20Blue.jpeg",
      primaryColor: "anthracite",
      secondaryColor: "black",
      styles: ["modern", "premium"],
      applications: ["automotive", "interior"],
    },
    "anti-slip-console-pu": {
      image: "/materials/kunstleder/Smoke%20Grey.jpeg",
      primaryColor: "black",
      secondaryColor: "grey",
      styles: ["modern"],
      applications: ["automotive", "interior"],
    },
    "marine-grade-vinyl": {
      image: "/materials/kunstleder/Ocean%20Blue.jpeg",
      primaryColor: "ivory",
      secondaryColor: "beige",
      styles: ["premium", "neutral"],
      applications: ["marine-outdoor", "interior"],
    },
  },
  other: {
    "alcantara-style": {
      image: getSphereImage(15),
      primaryColor: "black",
      secondaryColor: "anthracite",
      styles: ["premium", "modern"],
      applications: ["interior", "automotive"],
    },
    "headliner-fabric": {
      image: getSphereImage(16),
      primaryColor: "grey",
      secondaryColor: "anthracite",
      styles: ["neutral"],
      applications: ["interior", "automotive"],
    },
    "foam-backing": {
      image: getSphereImage(17),
      primaryColor: "beige",
      secondaryColor: "ivory",
      styles: ["neutral"],
      applications: ["interior"],
    },
    "door-panel-mesh": {
      image: getSphereImage(18),
      primaryColor: "anthracite",
      secondaryColor: "grey",
      styles: ["modern"],
      applications: ["bus-rail", "interior"],
    },
    "carpet-felt": {
      image: getSphereImage(19),
      primaryColor: "anthracite",
      secondaryColor: "black",
      styles: ["neutral"],
      applications: ["interior", "automotive"],
    },
    "neoprene-laminate": {
      image: getSphereImage(20),
      primaryColor: "black",
      secondaryColor: "anthracite",
      styles: ["modern"],
      applications: ["marine-outdoor", "interior"],
    },
    "acoustic-insulation": {
      image: getSphereImage(21),
      primaryColor: "grey",
      secondaryColor: "anthracite",
      styles: ["neutral"],
      applications: ["bus-rail", "interior"],
    },
    "seat-reinforcement": {
      image: getSphereImage(22),
      primaryColor: "grey",
      secondaryColor: "anthracite",
      styles: ["neutral"],
      applications: ["automotive", "bus-rail"],
    },
    "velour-headliner-grey": {
      image: getSphereImage(23),
      primaryColor: "grey",
      secondaryColor: "ivory",
      styles: ["premium", "neutral"],
      applications: ["interior", "automotive"],
    },
    "suede-dash-wrap": {
      image: getSphereImage(24),
      primaryColor: "red",
      secondaryColor: "anthracite",
      styles: ["premium", "modern"],
      applications: ["automotive", "interior"],
    },
    "eva-underlay": {
      image: getSphereImage(25),
      primaryColor: "beige",
      secondaryColor: "ivory",
      styles: ["neutral"],
      applications: ["interior"],
    },
    "trunk-liner-felt": {
      image: getSphereImage(26),
      primaryColor: "anthracite",
      secondaryColor: "black",
      styles: ["neutral"],
      applications: ["automotive", "interior"],
    },
    "spacer-mesh-3d": {
      image: getSphereImage(27),
      primaryColor: "grey",
      secondaryColor: "anthracite",
      styles: ["modern"],
      applications: ["bus-rail", "interior"],
    },
    "quilted-foam-composite": {
      image: getSphereImage(28),
      primaryColor: "anthracite",
      secondaryColor: "black",
      styles: ["premium", "modern"],
      applications: ["interior", "automotive"],
    },
  },
} satisfies MaterialProductBaseMetadataMap;

const MATERIAL_PRODUCT_LOCALIZED_METADATA = {
  de: {
    automobilkunstleder: {
      "pu-classic-grain": {
        subline: "Feine Narbung fuer ruhige, belastbare Sitz- und Paneeloberflaechen.",
        imageAltSuffix: "Materialvorschau",
      },
      "pu-soft-touch": {
        subline: "Weiche Haptik fuer elegante Innenraeume mit wohnlicher Waerme.",
        imageAltSuffix: "Materialvorschau",
      },
      "pvc-heavy-duty": {
        subline: "Robuste PVC-Qualitaet fuer stark beanspruchte Sitz- und Wandbereiche.",
        imageAltSuffix: "Materialvorschau",
      },
      "perforated-pu-black": {
        subline: "Perforierte Optik fuer moderne Automotive-Flaechen mit technischer Anmutung.",
        imageAltSuffix: "Materialvorschau",
      },
      "double-layer-seat-grade": {
        subline: "Doppelschicht-Aufbau fuer stabile Sitzflaechen und verlaessliche Verarbeitung.",
        imageAltSuffix: "Materialvorschau",
      },
      "uv-stable-exterior-pu": {
        subline: "UV-stabile Oberflaeche fuer helle Projekte im Fahrzeug-, Marine- und Outdoor-Bereich.",
        imageAltSuffix: "Materialvorschau",
      },
      "micro-fiber-support-pu": {
        subline: "PU mit Mikrofasertraeger fuer hochwertige Haptik und bessere Formstabilitaet.",
        imageAltSuffix: "Materialvorschau",
      },
      "flame-retardant-pvc": {
        subline: "Flammhemmende PVC-Loesung fuer Transport, Objekt und sicherheitsrelevante Innenraeume.",
        imageAltSuffix: "Materialvorschau",
      },
      "nappa-look-pu": {
        subline: "Ruhige Nappa-Optik fuer elegante Sitz- und Interieurkonzepte.",
        imageAltSuffix: "Materialvorschau",
      },
      "oem-matte-pvc": {
        subline: "Mattes OEM-Finish fuer sachliche Serienoptik und saubere Vergleichbarkeit.",
        imageAltSuffix: "Materialvorschau",
      },
      "cold-resistant-vinyl": {
        subline: "Kaeltebestaendiges Vinyl fuer Fahrzeuge und Einsaetze mit wechselnden Temperaturen.",
        imageAltSuffix: "Materialvorschau",
      },
      "carbon-embossed-pu": {
        subline: "Carbon-Praegung fuer sportliche Akzente mit technischer Premium-Anmutung.",
        imageAltSuffix: "Materialvorschau",
      },
      "anti-slip-console-pu": {
        subline: "Griffige Oberflaeche fuer Konsolen, Seitenbereiche und funktionale Kontaktzonen.",
        imageAltSuffix: "Materialvorschau",
      },
      "marine-grade-vinyl": {
        subline: "Pflegeleichtes Marine-Vinyl fuer helle, feuchtigkeitsresistente Ausstattungen.",
        imageAltSuffix: "Materialvorschau",
      },
    },
    other: {
      "alcantara-style": {
        subline: "Veloursartige Premium-Optik fuer ruhige, hochwertige Interieurflaechen.",
        imageAltSuffix: "Materialvorschau",
      },
      "headliner-fabric": {
        subline: "Feiner Dachhimmelstoff fuer saubere Flaechen und ein stimmiges Raumgefuehl.",
        imageAltSuffix: "Materialvorschau",
      },
      "foam-backing": {
        subline: "Volumen gebende Schaumrueckseite fuer weichere Anmutung und einfachere Kaschierung.",
        imageAltSuffix: "Materialvorschau",
      },
      "door-panel-mesh": {
        subline: "Strapazierfaehiges Mesh fuer Tuerpaneele und technische Zonen mit Luftigkeit.",
        imageAltSuffix: "Materialvorschau",
      },
      "carpet-felt": {
        subline: "Dichter Filz fuer Bodenbereiche mit ruhiger Optik und solider Alltagstauglichkeit.",
        imageAltSuffix: "Materialvorschau",
      },
      "neoprene-laminate": {
        subline: "Elastisches Laminat fuer technische Verkleidungen und anspruchsvolle Ausbauprojekte.",
        imageAltSuffix: "Materialvorschau",
      },
      "acoustic-insulation": {
        subline: "Akustische Daemmlage fuer leisere Kabinen und mehr wahrgenommene Qualitaet.",
        imageAltSuffix: "Materialvorschau",
      },
      "seat-reinforcement": {
        subline: "Verstaerkungstextil fuer belastete Sitzbereiche mit verlaesslicher Stabilisierung.",
        imageAltSuffix: "Materialvorschau",
      },
      "velour-headliner-grey": {
        subline: "Weicher Velours fuer helle Dachhimmel und ruhige Premium-Innenraeume.",
        imageAltSuffix: "Materialvorschau",
      },
      "suede-dash-wrap": {
        subline: "Wildlederartige Flaeche fuer Dashboards, Saeulen und visuelle Fokuszonen.",
        imageAltSuffix: "Materialvorschau",
      },
      "eva-underlay": {
        subline: "Leichte Unterlage fuer saubere Aufbauhoehen und zusaetzliche Materialruhe.",
        imageAltSuffix: "Materialvorschau",
      },
      "trunk-liner-felt": {
        subline: "Robuster Nadelfilz fuer Kofferraum- und Ladebereiche mit gepflegter Optik.",
        imageAltSuffix: "Materialvorschau",
      },
      "spacer-mesh-3d": {
        subline: "3D-Abstandsgewirke fuer atmungsaktive Polsteraufbauten und technische Sitzzonen.",
        imageAltSuffix: "Materialvorschau",
      },
      "quilted-foam-composite": {
        subline: "Gesteppter Verbund fuer dekorative Flaechen mit direkt sichtbarem Komfortsignal.",
        imageAltSuffix: "Materialvorschau",
      },
    },
  },
  en: {
    automobilkunstleder: {
      "pu-classic-grain": {
        subline: "Fine-grain surface for calm, durable seat and panel applications.",
        imageAltSuffix: "material preview",
      },
      "pu-soft-touch": {
        subline: "Soft-touch finish for elegant interiors with a warmer visual tone.",
        imageAltSuffix: "material preview",
      },
      "pvc-heavy-duty": {
        subline: "Robust PVC quality for high-traffic seating and wall zones.",
        imageAltSuffix: "material preview",
      },
      "perforated-pu-black": {
        subline: "Perforated look for modern automotive surfaces with technical character.",
        imageAltSuffix: "material preview",
      },
      "double-layer-seat-grade": {
        subline: "Dual-layer build for stable seating surfaces and dependable processing.",
        imageAltSuffix: "material preview",
      },
      "uv-stable-exterior-pu": {
        subline: "UV-stable finish for light-toned projects in vehicle, marine and outdoor use.",
        imageAltSuffix: "material preview",
      },
      "micro-fiber-support-pu": {
        subline: "PU with microfiber backing for a richer hand feel and added stability.",
        imageAltSuffix: "material preview",
      },
      "flame-retardant-pvc": {
        subline: "Flame-retardant PVC for transport, contract and safety-led interiors.",
        imageAltSuffix: "material preview",
      },
      "nappa-look-pu": {
        subline: "Quiet nappa-style look for elegant seating and interior concepts.",
        imageAltSuffix: "material preview",
      },
      "oem-matte-pvc": {
        subline: "Matte OEM finish for understated serial aesthetics and clean comparisons.",
        imageAltSuffix: "material preview",
      },
      "cold-resistant-vinyl": {
        subline: "Cold-resistant vinyl for vehicles and spaces exposed to shifting temperatures.",
        imageAltSuffix: "material preview",
      },
      "carbon-embossed-pu": {
        subline: "Carbon embossing for sportier accents with a technical premium feel.",
        imageAltSuffix: "material preview",
      },
      "anti-slip-console-pu": {
        subline: "Grip-focused surface for consoles, side panels and functional touch zones.",
        imageAltSuffix: "material preview",
      },
      "marine-grade-vinyl": {
        subline: "Easy-care marine vinyl for light, moisture-resistant upholstery concepts.",
        imageAltSuffix: "material preview",
      },
    },
    other: {
      "alcantara-style": {
        subline: "Velour-like premium look for calm, elevated interior surfaces.",
        imageAltSuffix: "material preview",
      },
      "headliner-fabric": {
        subline: "Refined headliner fabric for clean ceiling spans and cohesive cabins.",
        imageAltSuffix: "material preview",
      },
      "foam-backing": {
        subline: "Volume-building foam backing for a softer touch and easier lamination.",
        imageAltSuffix: "material preview",
      },
      "door-panel-mesh": {
        subline: "Durable mesh for door panels and technical zones that need airflow.",
        imageAltSuffix: "material preview",
      },
      "carpet-felt": {
        subline: "Dense felt for floor zones with a quiet look and solid daily resilience.",
        imageAltSuffix: "material preview",
      },
      "neoprene-laminate": {
        subline: "Flexible laminate for technical trims and demanding fit-out projects.",
        imageAltSuffix: "material preview",
      },
      "acoustic-insulation": {
        subline: "Acoustic layer for quieter cabins and a higher perceived finish.",
        imageAltSuffix: "material preview",
      },
      "seat-reinforcement": {
        subline: "Reinforcement textile for high-load seating zones and stable construction.",
        imageAltSuffix: "material preview",
      },
      "velour-headliner-grey": {
        subline: "Soft velour for lighter headliners and relaxed premium interiors.",
        imageAltSuffix: "material preview",
      },
      "suede-dash-wrap": {
        subline: "Suede-style surface for dashboards, pillars and visual focal areas.",
        imageAltSuffix: "material preview",
      },
      "eva-underlay": {
        subline: "Light underlay for cleaner build heights and extra material control.",
        imageAltSuffix: "material preview",
      },
      "trunk-liner-felt": {
        subline: "Robust needle felt for trunk and cargo zones with a finished appearance.",
        imageAltSuffix: "material preview",
      },
      "spacer-mesh-3d": {
        subline: "3D spacer mesh for breathable cushioning builds and technical seating areas.",
        imageAltSuffix: "material preview",
      },
      "quilted-foam-composite": {
        subline: "Quilted composite for decorative surfaces with an immediate comfort cue.",
        imageAltSuffix: "material preview",
      },
    },
  },
  ru: {
    automobilkunstleder: {
      "pu-classic-grain": {
        subline: "Mелкая фактура для спокойных и износостойких сидений и панелей.",
        imageAltSuffix: "превью материала",
      },
      "pu-soft-touch": {
        subline: "Мягкая на ощупь поверхность для элегантных и теплых интерьеров.",
        imageAltSuffix: "превью материала",
      },
      "pvc-heavy-duty": {
        subline: "Прочный PVC для зон с высокой нагрузкой на сиденьях и стенках.",
        imageAltSuffix: "превью материала",
      },
      "perforated-pu-black": {
        subline: "Перфорированный вид для современных automotive-поверхностей.",
        imageAltSuffix: "превью материала",
      },
      "double-layer-seat-grade": {
        subline: "Двухслойная конструкция для стабильных сидений и надежной обработки.",
        imageAltSuffix: "превью материала",
      },
      "uv-stable-exterior-pu": {
        subline: "UV-стойкая поверхность для светлых проектов в авто, marine и outdoor.",
        imageAltSuffix: "превью материала",
      },
      "micro-fiber-support-pu": {
        subline: "PU с микрофибровой основой для более дорогого ощущения и стабильности.",
        imageAltSuffix: "превью материала",
      },
      "flame-retardant-pvc": {
        subline: "Огнестойкий PVC для транспорта, контрактных объектов и безопасных интерьеров.",
        imageAltSuffix: "превью материала",
      },
      "nappa-look-pu": {
        subline: "Спокойная napppa-оптика для элегантных сидений и интерьерных решений.",
        imageAltSuffix: "превью материала",
      },
      "oem-matte-pvc": {
        subline: "Матовый OEM-финиш для сдержанного серийного вида и чистого сравнения.",
        imageAltSuffix: "превью материала",
      },
      "cold-resistant-vinyl": {
        subline: "Морозостойкий винил для транспорта и зон с меняющейся температурой.",
        imageAltSuffix: "превью материала",
      },
      "carbon-embossed-pu": {
        subline: "Карбоновое тиснение для спортивных акцентов и технической премиальности.",
        imageAltSuffix: "превью материала",
      },
      "anti-slip-console-pu": {
        subline: "Цепкая поверхность для консолей, боковых зон и функциональных деталей.",
        imageAltSuffix: "превью материала",
      },
      "marine-grade-vinyl": {
        subline: "Практичный marine-винил для светлых и влагостойких обивок.",
        imageAltSuffix: "превью материала",
      },
    },
    other: {
      "alcantara-style": {
        subline: "Премиальная велюровая оптика для спокойных и дорогих интерьеров.",
        imageAltSuffix: "превью материала",
      },
      "headliner-fabric": {
        subline: "Аккуратная ткань потолка для чистых плоскостей и цельного салона.",
        imageAltSuffix: "превью материала",
      },
      "foam-backing": {
        subline: "Объемная пенная подложка для более мягкой подачи и удобной ламинации.",
        imageAltSuffix: "превью материала",
      },
      "door-panel-mesh": {
        subline: "Износостойкая сетка для дверных панелей и технических зон с воздухом.",
        imageAltSuffix: "превью материала",
      },
      "carpet-felt": {
        subline: "Плотный войлок для пола со спокойной оптикой и уверенной повседневной стойкостью.",
        imageAltSuffix: "превью материала",
      },
      "neoprene-laminate": {
        subline: "Гибкий ламинат для технической отделки и требовательных проектов.",
        imageAltSuffix: "превью материала",
      },
      "acoustic-insulation": {
        subline: "Акустический слой для более тихих кабин и ощущения высокого качества.",
        imageAltSuffix: "превью материала",
      },
      "seat-reinforcement": {
        subline: "Армирующий текстиль для нагруженных сидений и устойчивой конструкции.",
        imageAltSuffix: "превью материала",
      },
      "velour-headliner-grey": {
        subline: "Мягкий велюр для светлых потолков и спокойных премиальных интерьеров.",
        imageAltSuffix: "превью материала",
      },
      "suede-dash-wrap": {
        subline: "Поверхность под замшу для торпедо, стоек и визуальных акцентов.",
        imageAltSuffix: "превью материала",
      },
      "eva-underlay": {
        subline: "Легкая подложка для аккуратной высоты сборки и лучшего контроля материала.",
        imageAltSuffix: "превью материала",
      },
      "trunk-liner-felt": {
        subline: "Прочный иглопробивной войлок для багажных и грузовых зон.",
        imageAltSuffix: "превью материала",
      },
      "spacer-mesh-3d": {
        subline: "3D-сетка для дышащих наполнений и технических зон сидений.",
        imageAltSuffix: "превью материала",
      },
      "quilted-foam-composite": {
        subline: "Стеганый композит для декоративных поверхностей с заметным сигналом комфорта.",
        imageAltSuffix: "превью материала",
      },
    },
  },
} satisfies Record<SupportedLang, MaterialProductLocalizedMetadataMap>;

const AUTOMOTIVE_PLACEHOLDER_COPY = {
  de: {
    previewLabel: "Online-Vorschau",
    previewStatus: "Kollektion auf Anfrage",
  },
  en: {
    previewLabel: "Online preview",
    previewStatus: "Collection on request",
  },
  ru: {
    previewLabel: "Онлайн-превью",
    previewStatus: "Коллекция по запросу",
  },
} satisfies Record<SupportedLang, Pick<MaterialProductMetadata, "previewLabel" | "previewStatus">>;

const MATERIAL_CATALOG_UI = {
  de: {
    highlights: [
      { icon: "sample", label: "Muster verfuegbar" },
      { icon: "measure", label: "Preis pro Meter" },
      { icon: "shipping", label: "Europaweiter Versand" },
    ],
    panelEyebrow: "Persoenliche Beratung",
    panelTitle: "Beratung & Muster",
    panelText:
      "Sie suchen das passende Material fuer Automobil, Yacht, Innenraum oder Objektbereich? Wir beraten Sie persoenlich und senden auf Anfrage passende Muster.",
    panelPoints: [
      "Direkt aus Oesterreich versendet",
      "Klare Preise pro Meter",
      "Persoenliche Beratung auf Anfrage",
    ],
    filters: {
      sectionEyebrow: "FILTER",
      sectionTitle: "Materialien",
      sectionText: "Nach Farbe, Stil und Einsatz filtern.",
      resultsLabel: "Materialien",
      activeFiltersLabel: "Aktive Filter",
      colorLabel: "Farbe",
      styleLabel: "Stil",
      applicationLabel: "Einsatz",
      allColorsLabel: "Alle Farben",
      allStylesLabel: "Alle Stile",
      allApplicationsLabel: "Alle Einsaetze",
      resetLabel: "Zuruecksetzen",
      emptyTitle: "Keine Materialien fuer diese Auswahl.",
      emptyText: "Filter anpassen oder zuruecksetzen.",
      colors: {
        black: "Schwarz",
        brown: "Braun",
        grey: "Grau",
        anthracite: "Anthrazit",
        beige: "Beige",
        ivory: "Elfenbein",
        red: "Rot",
      },
      styles: {
        premium: "Premium",
        modern: "Modern",
        neutral: "Neutral",
      },
      applications: {
        automotive: "Fahrzeug",
        interior: "Innenraum",
        "bus-rail": "Bus & Bahn",
        "marine-outdoor": "Yacht & Outdoor",
      },
    },
    categories: {
      automobilkunstleder: {
        eyebrow: "Kuratiert fuer Fahrzeug, Objekt und anspruchsvolle Innenraeume",
        description:
          "Kunstleder mit ruhiger Oberflaeche, klarer Preislogik und direkter Verfuegbarkeit fuer Sitze, Seitenverkleidungen und hochwertige Ausbauprojekte.",
        deliveryHint: "Lieferung aus Oesterreich",
        previewNote: {
          eyebrow: "MATERIAL FUER FAHRZEUGINNENRAEUME",
          title: "Automobilkunstleder",
          text:
            "Premium Kunstleder für Fahrzeugsitze, Seitenverkleidungen, Objektbereiche und hochwertige Innenräume.",
          points: [
            "Qualität für Fahrzeuginterieurs",
            "Direkt ab Lager",
            "Viele Farben verfügbar",
            "Muster auf Anfrage",
          ],
          actionLabel: "Kollektion anfragen",
        },
      },
      other: {
        eyebrow: "Technische Stoffe fuer Ausbau, Dachhimmel und Transport",
        description:
          "Velours, Filze und Spezialmaterialien fuer Bus & Bahn, Innenraum, Daemmung und sichtbare Komfortzonen.",
        deliveryHint: "Projektgeeignet fuer Transport & Interior",
      },
    },
  },
  en: {
    highlights: [
      { icon: "sample", label: "Samples available" },
      { icon: "measure", label: "Priced per meter" },
      { icon: "shipping", label: "Shipping across Europe" },
    ],
    panelEyebrow: "Personal advice",
    panelTitle: "Advice & Samples",
    panelText:
      "Looking for the right material for automotive, yacht, interior or contract use? We advise you personally and can send matching samples on request.",
    panelPoints: [
      "Dispatched directly from Austria",
      "Clear prices per meter",
      "Personal guidance on request",
    ],
    filters: {
      sectionEyebrow: "FILTER",
      sectionTitle: "Materials",
      sectionText: "Filter by color, style, and application.",
      resultsLabel: "materials",
      activeFiltersLabel: "Active filters",
      colorLabel: "Color",
      styleLabel: "Style",
      applicationLabel: "Application",
      allColorsLabel: "All colors",
      allStylesLabel: "All styles",
      allApplicationsLabel: "All applications",
      resetLabel: "Reset",
      emptyTitle: "No materials match this selection.",
      emptyText: "Adjust or reset the filters.",
      colors: {
        black: "Black",
        brown: "Brown",
        grey: "Grey",
        anthracite: "Anthracite",
        beige: "Beige",
        ivory: "Ivory",
        red: "Red",
      },
      styles: {
        premium: "Premium",
        modern: "Modern",
        neutral: "Neutral",
      },
      applications: {
        automotive: "Automotive",
        interior: "Interior",
        "bus-rail": "Bus & Rail",
        "marine-outdoor": "Yacht & Outdoor",
      },
    },
    categories: {
      automobilkunstleder: {
        eyebrow: "Curated for vehicle, contract and elevated interior projects",
        description:
          "Synthetic leather surfaces with calm texture, visible pricing logic and direct availability for seating, panels and premium fit-outs.",
        deliveryHint: "Dispatch from Austria",
        previewNote: {
          eyebrow: "AUTOMOTIVE MATERIAL",
          title: "Automotive Leatherette",
          text:
            "Premium synthetic leather for vehicle seats, side panels, contract areas and elevated interior spaces.",
          points: [
            "Automotive quality",
            "Direct from stock",
            "Many colors available",
            "Samples on request",
          ],
          actionLabel: "Request collection",
        },
      },
      other: {
        eyebrow: "Technical fabrics for fit-out, headliners and transport use",
        description:
          "Velours, felts and specialist materials for bus, rail, interior lining, insulation and comfort-led visible surfaces.",
        deliveryHint: "Selected for transport & interior projects",
      },
    },
  },
  ru: {
    highlights: [
      { icon: "sample", label: "Доступны образцы" },
      { icon: "measure", label: "Цена за метр" },
      { icon: "shipping", label: "Доставка по Европе" },
    ],
    panelEyebrow: "Персональная консультация",
    panelTitle: "Консультация и образцы",
    panelText:
      "Ищете подходящий материал для автомобиля, яхты, интерьера или объектного проекта? Мы лично проконсультируем вас и по запросу отправим подходящие образцы.",
    panelPoints: [
      "Отправка напрямую из Австрии",
      "Понятная цена за метр",
      "Персональная консультация по запросу",
    ],
    filters: {
      sectionEyebrow: "ФИЛЬТРЫ",
      sectionTitle: "Материалы",
      sectionText: "Фильтр по цвету, стилю и применению.",
      resultsLabel: "материалов",
      activeFiltersLabel: "Активные фильтры",
      colorLabel: "Цвет",
      styleLabel: "Стиль",
      applicationLabel: "Применение",
      allColorsLabel: "Все цвета",
      allStylesLabel: "Все стили",
      allApplicationsLabel: "Все применения",
      resetLabel: "Сбросить",
      emptyTitle: "Материалы не найдены.",
      emptyText: "Измени или сбрось фильтры.",
      colors: {
        black: "Черный",
        brown: "Коричневый",
        grey: "Серый",
        anthracite: "Антрацит",
        beige: "Бежевый",
        ivory: "Айвори",
        red: "Красный",
      },
      styles: {
        premium: "Премиум",
        modern: "Современный",
        neutral: "Нейтральный",
      },
      applications: {
        automotive: "Автомобильный салон",
        interior: "Интерьер",
        "bus-rail": "Автобус и ж/д",
        "marine-outdoor": "Яхты и наружные зоны",
      },
    },
    categories: {
      automobilkunstleder: {
        eyebrow: "Подборка для транспорта, объектов и премиальных интерьеров",
        description:
          "Искусственная кожа со спокойной фактурой, понятной ценой и прямой доступностью для сидений, панелей и качественной отделки.",
        deliveryHint: "Отправка из Австрии",
        previewNote: {
          eyebrow: "МАТЕРИАЛ ДЛЯ АВТОСАЛОНА",
          title: "Автомобильный кожзаменитель",
          text:
            "Премиальная искусственная кожа для автомобильных сидений, боковых панелей, объектов и качественных интерьеров.",
          points: [
            "Профессиональное качество для автоинтерьера",
            "Прямо со склада",
            "Много цветов в наличии",
            "Образцы по запросу",
          ],
          actionLabel: "Запросить коллекцию",
        },
      },
      other: {
        eyebrow: "Технические ткани для потолков, отделки и транспорта",
        description:
          "Велюр, войлок и специальные материалы для автобусов, поездов, интерьеров, изоляции и видимых зон комфорта.",
        deliveryHint: "Подходит для транспортных и интерьерных проектов",
      },
    },
  },
} satisfies Record<SupportedLang, MaterialCatalogUiCopy>;

export function getMaterialCatalogUiCopy(lang: SupportedLang): MaterialCatalogUiCopy {
  return MATERIAL_CATALOG_UI[lang];
}

export function getMaterialProductMetadata<Category extends MaterialCategorySlug>(
  lang: SupportedLang,
  category: Category,
  productId: ProductIdByCategory[Category],
): MaterialProductMetadata | null {
  const baseByCategory = MATERIAL_PRODUCT_BASE_METADATA[category] as Record<
    string,
    MaterialProductBaseMetadata
  >;
  const localizedByCategory = MATERIAL_PRODUCT_LOCALIZED_METADATA[lang][category] as Record<
    string,
    Pick<MaterialProductMetadata, "subline" | "imageAltSuffix">
  >;
  const baseMetadata = baseByCategory[productId];
  const localizedMetadata = localizedByCategory[productId];

  if (!baseMetadata || !localizedMetadata) {
    return null;
  }

  return {
    ...baseMetadata,
    ...localizedMetadata,
    ...(category === "automobilkunstleder"
      ? {
          isPlaceholder: true,
          ...AUTOMOTIVE_PLACEHOLDER_COPY[lang],
        }
      : {}),
  };
}

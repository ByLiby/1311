"use client";

import { useMemo, useState } from "react";
import SeatViewer from "@/components/SeatViewer";

type SupportedLang = "de" | "en" | "ru";

type MaterialOption = {
  id: string;
  previewTexture: string;
  labels: Record<SupportedLang, string>;
  descriptions: Record<SupportedLang, string>;
};

type ViewerExperienceProps = {
  lang: SupportedLang;
  initialMaterialId: string;
  modelPath: string;
  modelFolderPath: string;
  modelMtlPath?: string;
};

const MATERIAL_OPTIONS: MaterialOption[] = [
  {
    id: "pu-classic-black",
    previewTexture: "/textures/pu-classic-black.jpg",
    labels: {
      de: "Schwarzes PU-Leder",
      en: "Black PU Leather",
      ru: "Black PU Leather",
    },
    descriptions: {
      de: "Tiefes Schwarz mit dezenter Lederpraegung",
      en: "Deep black with subtle leather grain",
      ru: "Deep black with subtle leather grain",
    },
  },
  {
    id: "pu-classic-brown",
    previewTexture: "/textures/pu-brown.jpg",
    labels: {
      de: "Braunes PU-Leder",
      en: "Brown PU Leather",
      ru: "Brown PU Leather",
    },
    descriptions: {
      de: "Warmer Braunton fuer klassischen Luxuslook",
      en: "Warm brown tone for a classic luxury look",
      ru: "Warm brown tone for a classic luxury look",
    },
  },
  {
    id: "pu-classic-white",
    previewTexture: "/textures/pu-cream.jpg",
    labels: {
      de: "Weisses PU-Leder",
      en: "White PU Leather",
      ru: "White PU Leather",
    },
    descriptions: {
      de: "Helle Premiumoptik mit feiner Struktur",
      en: "Light premium finish with fine texture",
      ru: "Light premium finish with fine texture",
    },
  },
  {
    id: "alcantara-style",
    previewTexture: "/materials/alcantara-schwarz.jpg",
    labels: {
      de: "Alcantara-Optik",
      en: "Alcantara Style",
      ru: "Alcantara Style",
    },
    descriptions: {
      de: "Matte Mikrofaser-Optik mit softem Griff",
      en: "Matte microfiber look with a soft touch",
      ru: "Matte microfiber look with a soft touch",
    },
  },
];

const copyByLang: Record<
  SupportedLang,
  {
    title: string;
    description: string;
    controlsHint: string;
    selectorTitle: string;
  }
> = {
  de: {
    title: "Interaktive 360 Grad Innenraumvorschau",
    description:
      "Perspektive vom Fahrersitz: Material auswaehlen und Sitz- sowie Innenraumflaechen direkt vergleichen.",
    controlsHint: "Steuerung: Ziehen fuer 360 Grad Rundumsicht, Mausrad oder Pinch fuer leichten Zoom.",
    selectorTitle: "Material auswaehlen",
  },
  en: {
    title: "Interactive 360 Degree Interior Viewer",
    description:
      "Driver-seat perspective: pick a material and compare seats and key interior surfaces instantly.",
    controlsHint: "Controls: drag for full 360 view, scroll or pinch for slight zoom.",
    selectorTitle: "Select Material",
  },
  ru: {
    title: "Interactive 360 Degree Interior Viewer",
    description:
      "Driver-seat perspective: pick a material and compare seats and key interior surfaces instantly.",
    controlsHint: "Controls: drag for full 360 view, scroll or pinch for slight zoom.",
    selectorTitle: "Select Material",
  },
};

function inferInitialOption(materialId: string) {
  const normalized = materialId.toLowerCase();

  if (normalized.includes("alcantara") || normalized.includes("suede") || normalized.includes("velour")) {
    return "alcantara-style";
  }

  if (normalized.includes("brown") || normalized.includes("cognac") || normalized.includes("tan")) {
    return "pu-classic-brown";
  }

  if (normalized.includes("white") || normalized.includes("ivory") || normalized.includes("cream")) {
    return "pu-classic-white";
  }

  return "pu-classic-black";
}

export default function MaterialViewerExperience({
  lang,
  initialMaterialId,
}: ViewerExperienceProps) {
  const initialOption = inferInitialOption(initialMaterialId);
  const [selectedOptionId, setSelectedOptionId] = useState(initialOption);

  const selectedOption = useMemo(
    () => MATERIAL_OPTIONS.find((option) => option.id === selectedOptionId) ?? MATERIAL_OPTIONS[0],
    [selectedOptionId],
  );
  const selectedVariant = useMemo(() => {
    if (selectedOption.id.includes("alcantara")) {
      return "alcantara";
    }
    if (selectedOption.id.includes("perforated")) {
      return "perforated";
    }
    return "leather";
  }, [selectedOption.id]);

  const copy = copyByLang[lang];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-divider bg-card-bg/70 p-4 md:p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">{copy.selectorTitle}</p>
        <h2 className="mt-2 text-xl font-semibold text-text-primary md:text-2xl">{copy.title}</h2>
        <p className="mt-2 text-sm text-text-secondary md:text-base">{copy.description}</p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MATERIAL_OPTIONS.map((option) => {
            const isSelected = option.id === selectedOption.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedOptionId(option.id)}
                aria-pressed={isSelected}
                className={`text-left rounded-xl border p-3 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  isSelected
                    ? "border-gold bg-gold/10"
                    : "border-divider bg-surface/70 hover:border-gold/45"
                }`}
              >
                <div
                  aria-hidden="true"
                  className="mb-3 h-14 rounded-md border border-divider/70"
                  style={{
                    backgroundImage: `url(${option.previewTexture})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <p className="text-sm font-semibold text-text-primary">{option.labels[lang]}</p>
                <p className="mt-1 text-xs text-text-secondary">{option.descriptions[lang]}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="seat-preview">
        <SeatViewer materialVariant={selectedVariant} />
      </div>

      <p className="text-sm text-text-secondary">{copy.controlsHint}</p>
    </div>
  );
}

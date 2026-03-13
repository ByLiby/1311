"use client";

import SeatViewer from "@/components/SeatViewer";
import {
  DEFAULT_SEAT_MATERIAL_PRESET_ID,
  type SeatMaterialColorPresetId,
} from "@/lib/seat-material-presets";

type SupportedLang = "de" | "en" | "ru";

type ViewerExperienceProps = {
  lang: SupportedLang;
};

const LOCKED_COLOR_PRESET_ID: SeatMaterialColorPresetId = "brown-edition";
const LOCKED_MATERIAL_LABEL = 'Alcantara "Dunkelbraun"';
const LOCKED_PRICE_LABEL = "15 € / Meter";

const copyByLang: Record<
  SupportedLang,
  {
    detailsTitle: string;
    materialLabel: string;
    priceLabel: string;
    controlsHint: string;
  }
> = {
  de: {
    detailsTitle: "Produktdetails",
    materialLabel: "Material",
    priceLabel: "Preis",
    controlsHint: "Steuerung: Ziehen fuer 360 Grad Rundumsicht, Mausrad oder Pinch fuer leichten Zoom.",
  },
  en: {
    detailsTitle: "Product Details",
    materialLabel: "Material",
    priceLabel: "Price",
    controlsHint: "Controls: drag for full 360 view, scroll or pinch for slight zoom.",
  },
  ru: {
    detailsTitle: "Product Details",
    materialLabel: "Material",
    priceLabel: "Price",
    controlsHint: "Controls: drag for full 360 view, scroll or pinch for slight zoom.",
  },
};

export default function MaterialViewerExperience({ lang }: ViewerExperienceProps) {
  const copy = copyByLang[lang];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-divider bg-card-bg/70 p-4 md:p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">{copy.detailsTitle}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-text-secondary">{copy.materialLabel}</p>
            <p className="mt-1 text-base font-semibold text-text-primary">{LOCKED_MATERIAL_LABEL}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-text-secondary">{copy.priceLabel}</p>
            <p className="mt-1 text-base font-semibold text-text-primary">{LOCKED_PRICE_LABEL}</p>
          </div>
        </div>
      </div>

      <div className="seat-preview">
        <SeatViewer
          materialVariant="alcantara"
          materialPresetId={DEFAULT_SEAT_MATERIAL_PRESET_ID}
          colorPresetId={LOCKED_COLOR_PRESET_ID}
        />
      </div>

      <p className="text-sm text-text-secondary">{copy.controlsHint}</p>
    </div>
  );
}

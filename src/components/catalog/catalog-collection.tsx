"use client";

import { Check, Info } from "lucide-react";
import ProductGrid from "@/components/catalog/product-grid";
import type {
  MaterialCatalogUiCopy,
  MaterialCatalogPreviewNote,
  MaterialProduct,
} from "@/lib/material-catalog";
import type { SupportedLang } from "@/lib/i18n";
import type { ProductCardVariant } from "@/components/catalog/product-card";

type CatalogCollectionProps = {
  products: MaterialProduct[];
  locale: string;
  priceUnitLabel: string;
  copy: MaterialCatalogUiCopy;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  previewNote?: MaterialCatalogPreviewNote;
  serviceNotice?: {
    title: string;
    paragraphs: string[];
    highlight: string;
  };
  sampleRequest?: {
    label: string;
    baseHref: string;
    subject: string;
    lang: SupportedLang;
  };
  showConsultationPanel?: boolean;
  productCardVariant?: ProductCardVariant;
};

export default function CatalogCollection({
  products,
  locale,
  priceUnitLabel,
  copy,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  previewNote,
  serviceNotice,
  sampleRequest,
  showConsultationPanel = true,
  productCardVariant = "card",
}: CatalogCollectionProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      {showConsultationPanel ? (
        <section className="rounded-[2rem] border border-divider bg-surface shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
          <div className="grid gap-8 px-5 py-6 sm:px-6 sm:py-8 xl:min-h-[22rem] xl:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.8fr)] xl:px-8 xl:py-10">
            <div className="flex min-w-0 flex-col justify-center">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-text-secondary">
                {copy.panelEyebrow}
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-[2.2rem] font-semibold tracking-tight text-text-primary sm:text-[2.7rem] sm:leading-[1.05] xl:text-[3.2rem]">
                {copy.panelTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary sm:text-[1.02rem]">
                {copy.panelText}
              </p>
            </div>

            <aside className="flex min-w-0 flex-col justify-center gap-4 border-t border-divider pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
              <a
                href={primaryCtaHref}
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-gold bg-gold px-6 py-3 text-sm font-medium text-base transition hover:shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
              >
                {primaryCtaLabel}
              </a>
              <a
                href={secondaryCtaHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-divider bg-card-bg px-6 py-3 text-sm font-medium text-text-primary transition hover:bg-card-bg-hover"
              >
                {secondaryCtaLabel}
              </a>
            </aside>
          </div>
        </section>
      ) : null}

      {previewNote ? (
        <section className="luxury-glass-panel rounded-[1.7rem] border border-divider bg-surface px-5 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.6)] sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-text-secondary">
                {previewNote.eyebrow}
              </p>
              <h2 className="luxury-heading mt-3 font-serif text-[1.8rem] font-semibold tracking-tight text-text-primary sm:text-[2.15rem]">
                {previewNote.title}
              </h2>
              <p className="luxury-section-copy mt-3 max-w-2xl text-sm leading-6 text-text-secondary sm:text-[0.95rem]">
                {previewNote.text}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={secondaryCtaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-button luxury-button-primary inline-flex min-h-[48px] items-center justify-center rounded-full border border-gold bg-gold px-5 py-3 text-sm font-medium text-base transition"
                >
                  {previewNote.actionLabel}
                </a>
                <a
                  href={primaryCtaHref}
                  className="luxury-button luxury-button-secondary inline-flex min-h-[48px] items-center justify-center rounded-full border border-divider bg-card-bg px-5 py-3 text-sm font-medium text-text-primary transition hover:bg-card-bg-hover"
                >
                  {primaryCtaLabel}
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {previewNote.points.map((point) => (
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
        </section>
      ) : null}

      {serviceNotice ? (
        <section className="relative overflow-hidden rounded-[1.45rem] border border-[#d99a86]/25 bg-[linear-gradient(135deg,rgba(138,78,68,0.28),rgba(45,24,22,0.46)_58%,rgba(19,13,12,0.72))] px-5 py-5 shadow-[0_20px_58px_rgba(0,0,0,0.44),0_0_0_1px_rgba(255,228,218,0.035)_inset] sm:px-6 sm:py-6 lg:px-7">
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(235,170,146,0.52),transparent)]" />
          <div className="flex gap-4">
            <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#e4aa94]/28 bg-black/24 text-[#efc1af] shadow-[0_12px_30px_rgba(0,0,0,0.32)]">
              <Info size={17} strokeWidth={2.2} />
            </span>
            <div className="min-w-0 text-left">
              <h2
                className="inline-flex rounded-full border border-[#f0a99d]/28 bg-[linear-gradient(135deg,rgba(224,116,104,0.2),rgba(178,78,72,0.12))] px-3.5 py-1.5 text-base font-semibold tracking-tight shadow-[0_10px_28px_rgba(224,116,104,0.09)] sm:text-[1.08rem]"
                style={{ color: "#f2b6b6" }}
              >
                {serviceNotice.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-6 text-[#f0d8cf]/82 sm:text-[0.95rem]">
                {serviceNotice.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-[#ffe5dc] sm:text-[0.95rem]">
                {serviceNotice.highlight}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <ProductGrid
        products={products}
        locale={locale}
        priceUnitLabel={priceUnitLabel}
        cardVariant={productCardVariant}
        sampleRequest={sampleRequest}
      />
    </div>
  );
}

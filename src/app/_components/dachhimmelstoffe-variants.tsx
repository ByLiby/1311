"use client";

import Image from "next/image";
import { Check, MessageCircle, ZoomIn } from "lucide-react";
import { useMemo, useState } from "react";
import ImageLightbox, { type LightboxImage } from "@/components/ImageLightbox";
import type { HimmelstoffeVariant } from "@/data/himmelstoffe";
import type { SupportedLang } from "@/lib/i18n";
import {
  createSampleRequestWhatsappLink,
  SAMPLE_REQUEST_LABELS,
} from "@/lib/whatsapp";

const VARIANT_LIGHTBOX_COPY: Record<
  SupportedLang,
  {
    enlarge: string;
    closeLightbox: string;
    previousImage: string;
    nextImage: string;
  }
> = {
  de: {
    enlarge: "Bild vergrößern",
    closeLightbox: "Bild schließen",
    previousImage: "Vorheriges Bild",
    nextImage: "Nächstes Bild",
  },
  en: {
    enlarge: "Enlarge image",
    closeLightbox: "Close image",
    previousImage: "Previous image",
    nextImage: "Next image",
  },
  ru: {
    enlarge: "Увеличить изображение",
    closeLightbox: "Закрыть изображение",
    previousImage: "Предыдущее изображение",
    nextImage: "Следующее изображение",
  },
};

type DachhimmelstoffeVariantsProps = {
  variants: HimmelstoffeVariant[];
  lang: SupportedLang;
  variantText: string;
  variantBenefits: string[];
  variantButton: string;
  whatsappLink: string;
};

export default function DachhimmelstoffeVariants({
  variants,
  lang,
  variantText,
  variantBenefits,
  variantButton,
  whatsappLink,
}: DachhimmelstoffeVariantsProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const copy = VARIANT_LIGHTBOX_COPY[lang];
  const lightboxImages = useMemo<LightboxImage[]>(
    () =>
      variants.map((variant) => ({
        src: variant.src,
        alt: variant.alt[lang],
        title: variant.name[lang],
        caption: variantText,
      })),
    [lang, variantText, variants],
  );

  return (
    <>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/14 bg-[linear-gradient(145deg,rgba(24,24,24,0.58),rgba(16,16,16,0.64))] px-4 py-5 shadow-[0_22px_68px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:px-5 sm:py-6 lg:px-6">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(208,180,111,0.5),transparent)]" />

        <div className="-mx-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:-mx-5 sm:px-5 lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="flex snap-x snap-mandatory gap-4 lg:grid lg:grid-cols-5 lg:gap-5">
            {variants.map((variant, index) => (
              <figure
                key={variant.name.de}
                className="min-w-[74vw] snap-start sm:min-w-[40vw] lg:min-w-0"
              >
                <button
                  type="button"
                  aria-label={`${variant.name[lang]} - ${copy.enlarge}`}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[1rem] border border-white/8 bg-[rgba(16,16,16,0.38)] text-left shadow-[0_18px_42px_rgba(0,0,0,0.3)] transition duration-500 hover:border-gold/32 sm:aspect-[5/4] lg:aspect-[4/5]"
                >
                  <Image
                    src={variant.src}
                    alt={variant.alt[lang]}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1280px) 17vw, (min-width: 1024px) 19vw, (min-width: 640px) 40vw, 74vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.035] group-hover:brightness-110"
                  />
                  <span className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-gold/22 bg-[rgba(16,16,16,0.46)] text-text-primary opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.34)] backdrop-blur-md transition duration-300 group-hover:opacity-100">
                    <ZoomIn size={15} strokeWidth={2.2} />
                  </span>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.24))]" />
                </button>
                <figcaption className="mt-3 flex items-center gap-3 text-[0.75rem] font-medium uppercase text-text-secondary">
                  <span className="h-px w-8 bg-gold/36" />
                  <span>{variant.color[lang]}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-6 border-t border-gold/14 pt-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
            {variantBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 text-sm leading-5 text-text-secondary"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                  <Check size={13} strokeWidth={2.4} />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="luxury-button luxury-button-primary inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full border border-gold bg-gold px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-base transition sm:w-fit lg:justify-self-end"
          >
            <MessageCircle size={17} strokeWidth={2.2} />
            <span>{variantButton}</span>
          </a>
        </div>
      </div>

      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        labels={{
          close: copy.closeLightbox,
          previous: copy.previousImage,
          next: copy.nextImage,
        }}
        sampleRequest={{
          label: SAMPLE_REQUEST_LABELS[lang],
          href: createSampleRequestWhatsappLink(
            whatsappLink,
            variants[lightboxIndex ?? 0]?.name[lang] ?? variantText,
            lang,
          ),
        }}
      />
    </>
  );
}

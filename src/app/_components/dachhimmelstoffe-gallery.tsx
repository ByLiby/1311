"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";
import { useMemo, useRef, useState, type TouchEvent } from "react";
import ImageLightbox, { type LightboxImage } from "@/components/ImageLightbox";
import {
  HIMMELSTOFFE_COPY,
  HIMMELSTOFFE_WHATSAPP_LINK,
  himmelstoffImages,
} from "@/data/himmelstoffe";
import type { SupportedLang } from "@/lib/i18n";
import {
  createSampleRequestWhatsappLink,
  SAMPLE_REQUEST_LABELS,
} from "@/lib/whatsapp";

const imagesPerPage = 6;
const SWIPE_THRESHOLD_PX = 56;

const GALLERY_CONTROL_COPY: Record<
  SupportedLang,
  {
    previous: string;
    next: string;
    previousAria: string;
    nextAria: string;
    enlarge: string;
    closeLightbox: string;
    previousImage: string;
    nextImage: string;
  }
> = {
  de: {
    previous: "Zurück",
    next: "Nächste Seite",
    previousAria: "Vorherige Bilder anzeigen",
    nextAria: "Nächste Bilder anzeigen",
    enlarge: "Bild vergrößern",
    closeLightbox: "Bild schließen",
    previousImage: "Vorheriges Bild",
    nextImage: "Nächstes Bild",
  },
  en: {
    previous: "Back",
    next: "Next page",
    previousAria: "Show previous images",
    nextAria: "Show next images",
    enlarge: "Enlarge image",
    closeLightbox: "Close image",
    previousImage: "Previous image",
    nextImage: "Next image",
  },
  ru: {
    previous: "Назад",
    next: "Следующая",
    previousAria: "Показать предыдущие изображения",
    nextAria: "Показать следующие изображения",
    enlarge: "Увеличить изображение",
    closeLightbox: "Закрыть изображение",
    previousImage: "Предыдущее изображение",
    nextImage: "Следующее изображение",
  },
};

type DachhimmelstoffeGalleryProps = {
  lang: SupportedLang;
};

export default function DachhimmelstoffeGallery({
  lang,
}: DachhimmelstoffeGalleryProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const copy = GALLERY_CONTROL_COPY[lang];
  const materialCopy = HIMMELSTOFFE_COPY[lang];
  const totalPages = Math.max(1, Math.ceil(himmelstoffImages.length / imagesPerPage));
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const visibleImages = useMemo(() => {
    const start = currentPage * imagesPerPage;

    return himmelstoffImages.slice(
      start,
      start + imagesPerPage,
    );
  }, [currentPage]);
  const lightboxImages = useMemo<LightboxImage[]>(
    () =>
      himmelstoffImages.map((image) => ({
        fullSrc: image.fullSrc,
        alt: image.alt,
      })),
    [],
  );

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(0, page - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages - 1, page + 1));
  };

  const openLightbox = (imageId: number) => {
    const imageIndex = himmelstoffImages.findIndex((image) => image.id === imageId);

    if (imageIndex >= 0) {
      setLightboxIndex(imageIndex);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];

    touchStartRef.current = null;

    if (!start || !touch) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0 && !isLastPage) {
      goToNextPage();
    }

    if (deltaX > 0 && !isFirstPage) {
      goToPreviousPage();
    }
  };

  return (
    <div className="space-y-5">
      <div
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {visibleImages.map((image, index) => {
          return (
            <button
              type="button"
              key={image.id}
              aria-label={`${image.alt} - ${copy.enlarge}`}
              onClick={() => openLightbox(image.id)}
              className="group relative aspect-[1448/1086] w-full cursor-pointer overflow-hidden rounded-[1.45rem] border border-divider bg-card-bg text-left shadow-[0_20px_58px_rgba(0,0,0,0.54)] transition duration-500 hover:border-gold/38"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={currentPage === 0 && index < 2}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.045] group-hover:brightness-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.34))]" />
              <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-gold/22 bg-black/42 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-text-primary opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.42)] backdrop-blur-md transition duration-300 group-hover:opacity-100">
                <ZoomIn size={14} strokeWidth={2.2} />
                {copy.enlarge}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 sm:justify-end">
        <button
          type="button"
          aria-label={copy.previousAria}
          disabled={isFirstPage}
          onClick={goToPreviousPage}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold/20 bg-card-bg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-text-primary shadow-[0_14px_36px_rgba(0,0,0,0.38)] transition hover:border-gold/42 hover:bg-card-bg-hover disabled:pointer-events-none disabled:opacity-35"
        >
          <ArrowLeft size={15} strokeWidth={2.3} />
          <span>{copy.previous}</span>
        </button>

        <span className="min-w-[4.25rem] rounded-full border border-divider bg-black/24 px-3.5 py-2 text-center text-xs font-medium tracking-[0.14em] text-text-secondary">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          type="button"
          aria-label={copy.nextAria}
          disabled={isLastPage}
          onClick={goToNextPage}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold/20 bg-card-bg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-text-primary shadow-[0_14px_36px_rgba(0,0,0,0.38)] transition hover:border-gold/42 hover:bg-card-bg-hover disabled:pointer-events-none disabled:opacity-35"
        >
          <span>{copy.next}</span>
          <ArrowRight size={15} strokeWidth={2.3} />
        </button>
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
            HIMMELSTOFFE_WHATSAPP_LINK,
            materialCopy.title,
            lang,
          ),
        }}
      />
    </div>
  );
}

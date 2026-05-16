"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, MessageCircle, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";

export type LightboxImage = {
  src?: string;
  fullSrc?: string;
  alt: string;
  title?: string;
  caption?: string;
};

type ImageLightboxLabels = {
  close: string;
  previous: string;
  next: string;
};

type ImageLightboxProps = {
  images: LightboxImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  labels?: ImageLightboxLabels;
  sampleRequest?: {
    label: string;
    href: string;
  };
};

const DEFAULT_LABELS: ImageLightboxLabels = {
  close: "Bild schließen",
  previous: "Vorheriges Bild",
  next: "Nächstes Bild",
};

function getBoundedIndex(index: number, imageCount: number) {
  if (imageCount <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), imageCount - 1);
}

export default function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
  labels = DEFAULT_LABELS,
  sampleRequest,
}: ImageLightboxProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(() =>
    getBoundedIndex(initialIndex, images.length),
  );
  const activeImage = images[activeIndex];
  const activeImageSrc = activeImage?.fullSrc ?? activeImage?.src;
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveIndex(getBoundedIndex(initialIndex, images.length));
  }, [images.length, initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + images.length) % images.length);
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasMultipleImages, images.length, isOpen, onClose]);

  if (!isOpen || !activeImage || !activeImageSrc || typeof document === "undefined") {
    return null;
  }

  const goToPrevious = () => {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setActiveIndex((index) => (index + 1) % images.length);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={activeImage.title ? titleId : undefined}
      aria-label={activeImage.title ? undefined : activeImage.alt}
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/85 px-3 py-5 backdrop-blur-sm sm:px-6 sm:py-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_72%_at_50%_40%,rgba(208,180,111,0.08),transparent_58%)]" />

      <figure
        className="relative z-10 flex max-h-[92vh] w-full max-w-[92rem] flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label={labels.close}
          onClick={onClose}
          className="absolute right-1 top-1 z-30 grid h-11 w-11 place-items-center rounded-full border border-gold/24 bg-black/48 text-text-primary shadow-[0_16px_38px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:border-gold/48 hover:bg-black/68 sm:right-0 sm:top-0"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        <div className="relative aspect-[1448/1086] w-[min(90vw,1448px,calc(86vh*1448/1086))] overflow-hidden rounded-[1.55rem] border border-gold/20 bg-black/42 shadow-[0_30px_90px_rgba(0,0,0,0.76),0_0_0_1px_rgba(255,255,255,0.035)_inset]">
          <Image
            src={activeImageSrc}
            alt={activeImage.alt}
            fill
            priority
            quality={100}
            unoptimized
            sizes="90vw"
            className="object-contain p-2 sm:p-4"
          />
        </div>

        {hasMultipleImages ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-1 sm:px-3">
            <button
              type="button"
              aria-label={labels.previous}
              onClick={goToPrevious}
              className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-gold/24 bg-black/46 text-text-primary shadow-[0_16px_38px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:border-gold/48 hover:bg-black/68 sm:h-12 sm:w-12"
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>

            <button
              type="button"
              aria-label={labels.next}
              onClick={goToNext}
              className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-gold/24 bg-black/46 text-text-primary shadow-[0_16px_38px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:border-gold/48 hover:bg-black/68 sm:h-12 sm:w-12"
            >
              <ArrowRight size={18} strokeWidth={2.3} />
            </button>
          </div>
        ) : null}

        <figcaption className="mt-4 flex max-w-3xl flex-col items-center gap-2 rounded-[1.1rem] border border-divider bg-black/38 px-4 py-3 text-center shadow-[0_14px_40px_rgba(0,0,0,0.4)] backdrop-blur-md">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <span className="text-xs font-medium tracking-[0.14em] text-text-secondary">
              {activeIndex + 1} / {images.length}
            </span>
            {sampleRequest ? (
              <a
                href={sampleRequest.href}
                target="_blank"
                rel="noreferrer"
                className="luxury-button luxury-button-primary inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-gold bg-gold px-4 py-2.5 text-xs font-semibold tracking-[0.08em] text-base transition"
              >
                <MessageCircle size={14} strokeWidth={2.3} />
                <span>{sampleRequest.label}</span>
              </a>
            ) : null}
          </div>
          {activeImage.title ? (
            <h2
              id={titleId}
              className="font-serif text-[1.35rem] font-semibold leading-tight text-text-primary sm:text-[1.65rem]"
            >
              {activeImage.title}
            </h2>
          ) : null}
          {activeImage.caption ? (
            <p className="text-sm leading-6 text-text-secondary">
              {activeImage.caption}
            </p>
          ) : null}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}

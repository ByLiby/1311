"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useRef, useState, type TouchEvent } from "react";
import type { MaterialProduct } from "@/lib/material-catalog";
import type { SupportedLang } from "@/lib/i18n";
import { createSampleRequestWhatsappLink } from "@/lib/whatsapp";
import ProductCard, {
  getProductPriceLabel,
  ProductBadge,
  type ProductCardVariant,
} from "./product-card";

type ProductGridProps = {
  products: MaterialProduct[];
  locale: string;
  priceUnitLabel: string;
  cardVariant?: ProductCardVariant;
  sampleRequest?: ProductSampleRequest;
};

type ProductSampleRequest = {
  label: string;
  baseHref: string;
  subject: string;
  lang: SupportedLang;
};

type ProductFocusOverlayProps = {
  products: MaterialProduct[];
  initialIndex: number;
  locale: string;
  priceUnitLabel: string;
  sampleRequest?: ProductSampleRequest;
  onClose: () => void;
};

const KUNSTLEDER_ORIGINAL_IMAGES_BY_NAME: Record<string, string> = {
  "Anthracite Graphite": "/materials/kunstleder/Anthracite%20Graphite.jpeg",
  "Arctic Ivory": "/materials/kunstleder/Arctic%20Ivory.jpeg",
  "Asphalt Grey": "/materials/kunstleder/Asphalt%20Grey.jpeg",
  "Burnt Orange": "/materials/kunstleder/Burnt%20Orange.jpeg",
  "Camel Sand": "/materials/kunstleder/Camel%20Sand.jpeg",
  "Cashmere Taupe": "/materials/kunstleder/Cashmere%20Taupe.jpeg",
  "Cognac Saddle": "/materials/kunstleder/Cognac%20Saddle.jpeg",
  "Deep Sage Grey": "/materials/kunstleder/Deep%20Sage%20Grey.jpeg",
  "Graphit Blue": "/materials/kunstleder/Graphit%20Blue.jpeg",
  "Ivory Mist": "/materials/kunstleder/Ivory%20Mist.jpeg",
  "Midnight Blue": "/materials/kunstleder/Midnight%20Blue.jpeg",
  "Mocha Taupe": "/materials/kunstleder/Mocha%20Taupe.jpeg",
  "Neon Chartreuse": "/materials/kunstleder/Neon%20Chartreuse.jpeg",
  "Ocean Blue": "/materials/kunstleder/Ocean%20Blue.jpeg",
  "Plum Graphite": "/materials/kunstleder/Plum%20Graphite.jpeg",
  "Ruby Crimson": "/materials/kunstleder/Ruby%20Crimson.jpeg",
  "Satin Anthracite": "/materials/kunstleder/Satin%20Anthracite.jpeg",
  "Satin Black": "/materials/kunstleder/Satin%20Black.jpeg",
  "Smoke Grey": "/materials/kunstleder/Smoke%20Grey.jpeg",
  "Wine Red": "/materials/kunstleder/wine%20red.jpeg",
};

function getFocusImage(product: MaterialProduct) {
  const kunstlederOriginalImage = KUNSTLEDER_ORIGINAL_IMAGES_BY_NAME[product.name];

  return {
    image: kunstlederOriginalImage ?? product.image,
    usesOriginalKunstlederImage: Boolean(kunstlederOriginalImage),
  };
}

function ProductFocusOverlay({
  products,
  initialIndex,
  locale,
  priceUnitLabel,
  sampleRequest,
  onClose,
}: ProductFocusOverlayProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const activeProduct = products[activeIndex] ?? products[0];
  const activeFocusImage = getFocusImage(activeProduct);
  const activeUsesSvgPreview = activeFocusImage.image.endsWith(".svg");
  const activePriceLabel = getProductPriceLabel(activeProduct, locale, priceUnitLabel);
  const activeHasVideo = Boolean(activeProduct.focusVideoSrc);
  const activeDisplayLabel = activeProduct.previewLabel ?? activeProduct.badgeLabel;
  const activeStatus = activeProduct.previewLabel ? activeProduct.previewStatus : undefined;
  const activeSampleRequestHref = sampleRequest
    ? createSampleRequestWhatsappLink(
        sampleRequest.baseHref,
        `${sampleRequest.subject} - ${activeProduct.name}`,
        sampleRequest.lang,
      )
    : undefined;

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + products.length) % products.length);
  }, [products.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % products.length);
  }, [products.length]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      previousActiveElement?.focus({ preventScroll: true });
    };
  }, [goToNext, goToPrevious, onClose]);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (activeIndex >= products.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, products.length]);

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

    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
      return;
    }

    goToPrevious();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="material-focus-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto px-4 py-8 sm:px-8"
      onClick={onClose}
    >
      <div className="material-focus-backdrop absolute inset-0" aria-hidden="true" />

      <article
        className={`material-focus-product relative z-10 w-full text-center ${
          activeHasVideo ? "max-w-[78rem]" : "max-w-[46rem]"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Fokusansicht schliessen"
          className="material-focus-close absolute right-1 top-1 z-20 grid h-11 w-11 place-items-center rounded-full border border-gold/20 bg-black/35 text-sm font-semibold uppercase tracking-[0.16em] text-text-primary shadow-[0_16px_34px_rgba(0,0,0,0.48)] backdrop-blur-md transition hover:border-gold/45 hover:bg-black/55 sm:right-0 sm:top-0"
          onClick={onClose}
        >
          <span aria-hidden="true">x</span>
        </button>

        <div
          className={
            activeHasVideo
              ? "grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] md:items-center lg:gap-7"
              : undefined
          }
        >
          <div>
            <div
              className={`material-focus-image-stage relative mx-auto aspect-square w-full overflow-hidden rounded-[2rem] border border-gold/20 ${
                activeFocusImage.usesOriginalKunstlederImage ? "max-w-[34rem]" : "max-w-[38rem]"
              }`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "pan-y" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,248,229,0.14),transparent_34%),radial-gradient(circle_at_50%_82%,rgba(0,0,0,0.76),transparent_52%),linear-gradient(145deg,rgba(24,22,19,0.82),rgba(5,5,5,0.92))]" />
              <ProductBadge label={activeProduct.badgeLabel} />
              <Image
                src={activeFocusImage.image}
                alt={activeProduct.imageAlt}
                fill
                priority
                unoptimized={activeUsesSvgPreview || activeFocusImage.usesOriginalKunstlederImage}
                sizes={
                  activeFocusImage.usesOriginalKunstlederImage
                    ? "(min-width: 768px) 544px, 92vw"
                    : "(min-width: 768px) 608px, 92vw"
                }
                className="material-focus-image object-contain object-center p-5 sm:p-7"
              />

              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 sm:px-4">
                <button
                  type="button"
                  aria-label="Vorheriges Material"
                  className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-gold/25 bg-black/35 text-[#F8E8B8] shadow-[0_14px_36px_rgba(0,0,0,0.4)] backdrop-blur-md transition duration-300 hover:border-gold/45 hover:bg-black/55 hover:scale-105 active:scale-95 sm:h-12 sm:w-12"
                  onClick={goToPrevious}
                >
                  <ArrowLeft size={18} strokeWidth={2.3} />
                </button>

                <button
                  type="button"
                  aria-label="Nächstes Material"
                  className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-gold/25 bg-black/35 text-[#F8E8B8] shadow-[0_14px_36px_rgba(0,0,0,0.4)] backdrop-blur-md transition duration-300 hover:border-gold/45 hover:bg-black/55 hover:scale-105 active:scale-95 sm:h-12 sm:w-12"
                  onClick={goToNext}
                >
                  <ArrowRight size={18} strokeWidth={2.3} />
                </button>
              </div>
            </div>

            <div className="mx-auto mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <span className="rounded-full border border-divider bg-black/28 px-3.5 py-2 text-xs font-medium tracking-[0.14em] text-text-secondary">
                {activeIndex + 1} / {products.length}
              </span>
              {sampleRequest && activeSampleRequestHref ? (
                <a
                  href={activeSampleRequestHref}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-button luxury-button-primary inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-gold bg-gold px-4 py-2.5 text-xs font-semibold tracking-[0.08em] text-base transition"
                >
                  <MessageCircle size={14} strokeWidth={2.3} />
                  <span>{sampleRequest.label}</span>
                </a>
              ) : null}
            </div>

            <div className="material-focus-caption mx-auto mt-5 max-w-2xl px-2 sm:mt-6">
              <h2
                id={titleId}
                className="font-serif text-[2rem] font-semibold leading-tight tracking-tight text-text-primary sm:text-[2.7rem]"
              >
                {activeProduct.name}
              </h2>
              {activeDisplayLabel || activeStatus ? (
                <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.72rem] uppercase tracking-[0.22em] text-text-secondary sm:text-[0.8rem]">
                  {activeDisplayLabel ? (
                    <span className="rounded-full border border-divider bg-card-bg px-3 py-1 text-text-primary">
                      {activeDisplayLabel}
                    </span>
                  ) : null}
                  {activeStatus ? <span>{activeStatus}</span> : null}
                </p>
              ) : null}
              <div className="mx-auto mt-4 h-px w-20 bg-gold/70" />
              <p className="mt-3 text-[1.35rem] font-semibold tracking-[0.04em] text-text-primary sm:text-[1.65rem]">
                {activePriceLabel}
              </p>
            </div>
          </div>

          {activeProduct.focusVideoSrc ? (
            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-[1.45rem] border border-gold/20 bg-[#060504] shadow-[0_28px_70px_rgba(0,0,0,0.62),0_0_52px_rgba(208,180,111,0.08)] md:max-w-none"
              aria-label={`${activeProduct.name} Anwendungsvideo`}
            >
              <div className="pointer-events-none absolute inset-0 z-10 rounded-[1.45rem] shadow-[0_1px_0_rgba(255,248,229,0.12)_inset,0_0_0_1px_rgba(255,255,255,0.025)_inset]" />
              <video
                className="h-full w-full object-cover"
                src={activeProduct.focusVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}

export default function ProductGrid({
  products,
  locale,
  priceUnitLabel,
  cardVariant = "card",
  sampleRequest,
}: ProductGridProps) {
  const [focusedProductIndex, setFocusedProductIndex] = useState<number | null>(null);
  const gridClassName =
    cardVariant === "floating"
      ? "grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3"
      : cardVariant === "gallery"
        ? "grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3"
        : "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3";

  const focusedProduct =
    focusedProductIndex === null ? null : products[focusedProductIndex] ?? null;

  useEffect(() => {
    if (focusedProductIndex !== null && focusedProductIndex >= products.length) {
      setFocusedProductIndex(null);
    }
  }, [focusedProductIndex, products.length]);

  return (
    <div className={gridClassName}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          priceUnitLabel={priceUnitLabel}
          variant={cardVariant}
          priority={index === 0}
          onSelect={() => setFocusedProductIndex(index)}
        />
      ))}

      {focusedProduct
        ? createPortal(
            <ProductFocusOverlay
              products={products}
              initialIndex={focusedProductIndex ?? 0}
              locale={locale}
              priceUnitLabel={priceUnitLabel}
              sampleRequest={sampleRequest}
              onClose={() => setFocusedProductIndex(null)}
            />,
            document.body,
          )
        : null}
    </div>
  );
}

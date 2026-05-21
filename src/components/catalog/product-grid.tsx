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

const STOCK_HINT_LABEL: Record<SupportedLang, string> = {
  de: "Lagerware",
  en: "Stocked",
  ru: "Со склада",
};

const PRODUCT_GRID_UI_COPY: Record<
  SupportedLang,
  {
    closeLabel: string;
    previousLabel: string;
    nextLabel: string;
    focusLabel: (name: string) => string;
  }
> = {
  de: {
    closeLabel: "Fokusansicht schliessen",
    previousLabel: "Vorheriges Material",
    nextLabel: "Nächstes Material",
    focusLabel: (name) => `${name} im Fokus ansehen`,
  },
  en: {
    closeLabel: "Close focused view",
    previousLabel: "Previous material",
    nextLabel: "Next material",
    focusLabel: (name) => `View ${name} in focus`,
  },
  ru: {
    closeLabel: "Закрыть детальный просмотр",
    previousLabel: "Предыдущий материал",
    nextLabel: "Следующий материал",
    focusLabel: (name) => `Открыть ${name} крупно`,
  },
};

function getSupportedLangFromLocale(locale: string, fallback?: SupportedLang) {
  const normalizedLocale = locale.toLowerCase();

  if (normalizedLocale.startsWith("en")) {
    return "en";
  }

  if (normalizedLocale.startsWith("ru")) {
    return "ru";
  }

  return fallback ?? "de";
}

function isBusstoffProduct(product: MaterialProduct) {
  return product.id.startsWith("busstoff-");
}

function getFocusImage(product: MaterialProduct) {
  if (product.stageImage) {
    return {
      image: product.stageImage,
      usesOriginalKunstlederImage: false,
    };
  }

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
  const activeIsBusstoffStageMode = isBusstoffProduct(activeProduct);
  const resolvedLang = getSupportedLangFromLocale(locale, sampleRequest?.lang);
  const uiCopy = PRODUCT_GRID_UI_COPY[resolvedLang];
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
      className={`material-focus-overlay fixed inset-0 z-[100] flex justify-center overflow-y-auto ${
        activeIsBusstoffStageMode
          ? "items-start px-3 py-4 md:items-center md:px-8 md:py-8"
          : "items-center px-4 py-8 sm:px-8"
      }`}
      onClick={onClose}
    >
      <div className="material-focus-backdrop absolute inset-0" aria-hidden="true" />

      <button
        ref={closeButtonRef}
        type="button"
        aria-label={uiCopy.closeLabel}
        className={`material-focus-close fixed right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full border text-sm font-semibold uppercase tracking-[0.16em] shadow-[0_16px_34px_rgba(0,0,0,0.22)] backdrop-blur-md transition sm:right-4 sm:top-4 ${
          activeIsBusstoffStageMode
            ? "border-[rgba(201,163,82,0.45)] bg-[rgba(255,255,255,0.95)] text-[#1f1a14] shadow-[0_12px_28px_rgba(15,23,42,0.14)] hover:border-[rgba(201,163,82,0.7)] hover:bg-white"
            : "border-gold/20 bg-[rgba(16,16,16,0.46)] text-text-primary shadow-[0_16px_34px_rgba(0,0,0,0.48)] hover:border-gold/45 hover:bg-[rgba(24,24,24,0.62)]"
        }`}
        onClick={onClose}
      >
        <span aria-hidden="true">x</span>
      </button>

      <article
        className={`material-focus-product relative z-10 w-full text-center ${
          activeHasVideo
            ? "max-w-[78rem]"
            : activeIsBusstoffStageMode
              ? "max-w-[min(78vw,64rem)]"
              : "max-w-[46rem]"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={
            activeHasVideo
              ? "grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] md:items-center lg:gap-7"
              : undefined
          }
        >
          <div>
            <div
              className={`material-focus-image-stage relative mx-auto w-full overflow-hidden rounded-[2rem] border ${
                activeIsBusstoffStageMode
                  ? "h-[min(46vh,18rem)] max-h-[46vh] max-w-[78vw] rounded-[28px] border-[rgba(201,163,82,0.25)] bg-[linear-gradient(180deg,#f7f5f1,#ebe7df)] shadow-[0_20px_52px_rgba(15,23,42,0.12)] md:h-[min(62vh,30rem)] md:max-h-[62vh] md:max-w-[76vw] lg:h-[min(78vh,50rem)] lg:max-h-[78vh] lg:max-w-[70vw]"
                  : `aspect-square border-gold/20 ${
                      activeFocusImage.usesOriginalKunstlederImage ? "max-w-[34rem]" : "max-w-[38rem]"
                    }`
              }`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "pan-y" }}
            >
              <div
                className={`absolute inset-0 ${
                  activeIsBusstoffStageMode
                    ? "bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.72),rgba(255,255,255,0)_42%)]"
                    : "bg-[radial-gradient(circle_at_50%_18%,rgba(255,248,229,0.14),transparent_34%),radial-gradient(circle_at_50%_82%,rgba(0,0,0,0.76),transparent_52%),linear-gradient(145deg,rgba(24,22,19,0.82),rgba(5,5,5,0.92))]"
                }`}
              />
              <ProductBadge label={activeProduct.badgeLabel} />
              <Image
                src={activeFocusImage.image}
                alt={activeProduct.imageAlt}
                fill
                priority
                unoptimized={activeUsesSvgPreview || activeFocusImage.usesOriginalKunstlederImage}
                sizes={
                  activeIsBusstoffStageMode
                    ? "(min-width: 1024px) 70vw, 92vw"
                    : activeFocusImage.usesOriginalKunstlederImage
                      ? "(min-width: 768px) 544px, 92vw"
                      : "(min-width: 768px) 608px, 92vw"
                }
                className={`material-focus-image object-contain object-center ${
                  activeIsBusstoffStageMode
                    ? "p-1.5 drop-shadow-[0_10px_24px_rgba(15,23,42,0.12)] md:p-2.5"
                    : "p-5 sm:p-7"
                }`}
              />

              <div
                className={`pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between ${
                  activeIsBusstoffStageMode ? "px-2 sm:px-3" : "px-3 sm:px-4"
                }`}
              >
                <button
                  type="button"
                  aria-label={uiCopy.previousLabel}
                  className={`pointer-events-auto grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition duration-300 hover:scale-105 active:scale-95 sm:h-12 sm:w-12 ${
                    activeIsBusstoffStageMode
                      ? "border-[rgba(201,163,82,0.45)] bg-[rgba(255,255,255,0.94)] text-[#2a241d] shadow-[0_10px_24px_rgba(15,23,42,0.14)] hover:border-[rgba(201,163,82,0.7)] hover:bg-white"
                      : "border-gold/25 bg-[rgba(16,16,16,0.46)] text-[#F8E8B8] shadow-[0_14px_36px_rgba(0,0,0,0.4)] hover:border-gold/45 hover:bg-[rgba(24,24,24,0.62)]"
                  }`}
                  onClick={goToPrevious}
                >
                  <ArrowLeft size={18} strokeWidth={2.3} />
                </button>

                <button
                  type="button"
                  aria-label={uiCopy.nextLabel}
                  className={`pointer-events-auto grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition duration-300 hover:scale-105 active:scale-95 sm:h-12 sm:w-12 ${
                    activeIsBusstoffStageMode
                      ? "border-[rgba(201,163,82,0.45)] bg-[rgba(255,255,255,0.94)] text-[#2a241d] shadow-[0_10px_24px_rgba(15,23,42,0.14)] hover:border-[rgba(201,163,82,0.7)] hover:bg-white"
                      : "border-gold/25 bg-[rgba(16,16,16,0.46)] text-[#F8E8B8] shadow-[0_14px_36px_rgba(0,0,0,0.4)] hover:border-gold/45 hover:bg-[rgba(24,24,24,0.62)]"
                  }`}
                  onClick={goToNext}
                >
                  <ArrowRight size={18} strokeWidth={2.3} />
                </button>
              </div>
            </div>

            <div className="mx-auto mt-2.5 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3 md:mt-3">
              <span
                className={`rounded-full border px-3.5 py-2 text-xs font-medium tracking-[0.14em] ${
                  activeIsBusstoffStageMode
                    ? "border-[rgba(31,26,20,0.1)] bg-[rgba(255,255,255,0.92)] text-[#5b5349] shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                    : "border-divider bg-[rgba(16,16,16,0.4)] text-text-secondary"
                }`}
              >
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

            <div
              className={
                activeIsBusstoffStageMode
                  ? "material-focus-caption mx-auto mt-2.5 max-w-[26rem] rounded-[24px] border border-[rgba(201,163,82,0.35)] bg-[rgba(8,8,8,0.92)] px-3 py-3 shadow-[0_16px_38px_rgba(0,0,0,0.28)] md:mt-3 md:max-w-[28rem] md:px-5 md:py-4"
                  : "material-focus-caption mx-auto mt-5 max-w-2xl px-2 sm:mt-6"
              }
            >
              <h2
                id={titleId}
                className={
                  activeIsBusstoffStageMode
                    ? "font-serif text-[1.5rem] font-semibold leading-tight tracking-tight text-white md:text-[2.15rem]"
                    : "font-serif text-[2rem] font-semibold leading-tight tracking-tight text-text-primary sm:text-[2.7rem]"
                }
              >
                {activeProduct.name}
              </h2>
              {activeDisplayLabel || activeStatus ? (
                <p
                  className={`mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.72rem] uppercase tracking-[0.22em] sm:text-[0.8rem] ${
                    activeIsBusstoffStageMode ? "text-[rgba(255,255,255,0.7)]" : "text-text-secondary"
                  }`}
                >
                  {activeDisplayLabel ? (
                    <span
                      className={`rounded-full border px-3 py-1 ${
                        activeIsBusstoffStageMode
                          ? "border-[rgba(212,175,55,0.22)] bg-[rgba(255,255,255,0.08)] text-white"
                          : "border-divider bg-card-bg text-text-primary"
                      }`}
                    >
                      {activeDisplayLabel}
                    </span>
                  ) : null}
                  {activeStatus ? <span>{activeStatus}</span> : null}
                </p>
              ) : null}
              <div className="mx-auto mt-4 h-px w-20 bg-gold/70" />
              <p
                className={
                  activeIsBusstoffStageMode
                    ? "mt-2.5 text-[1.08rem] font-semibold tracking-[0.04em] text-white md:mt-3 md:text-[1.55rem]"
                    : "mt-3 text-[1.35rem] font-semibold tracking-[0.04em] text-text-primary sm:text-[1.65rem]"
                }
              >
                {activePriceLabel}
              </p>
            </div>
          </div>

          {activeProduct.focusVideoSrc ? (
            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-[1.45rem] border border-gold/20 bg-[rgba(16,16,16,0.58)] shadow-[0_28px_70px_rgba(0,0,0,0.62),0_0_52px_rgba(208,180,111,0.08)] md:max-w-none"
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
  const resolvedLang = getSupportedLangFromLocale(locale, sampleRequest?.lang);
  const uiCopy = PRODUCT_GRID_UI_COPY[resolvedLang];
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
        (() => {
          const actionHref = sampleRequest
            ? createSampleRequestWhatsappLink(
                sampleRequest.baseHref,
                `${sampleRequest.subject} - ${product.name}`,
                sampleRequest.lang,
              )
            : undefined;

          return (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              priceUnitLabel={priceUnitLabel}
              variant={cardVariant}
              priority={index === 0}
              onSelect={() => setFocusedProductIndex(index)}
              focusAriaLabel={uiCopy.focusLabel(product.name)}
              actionLabel={sampleRequest?.label}
              actionHref={actionHref}
              hintLabel={sampleRequest ? STOCK_HINT_LABEL[sampleRequest.lang] : undefined}
            />
          );
        })()
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

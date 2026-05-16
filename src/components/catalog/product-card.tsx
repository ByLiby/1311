import Image from "next/image";
import type { KeyboardEvent } from "react";
import type { MaterialProduct } from "@/lib/material-catalog";

function formatPricePerMeter(pricePerMeter: number, _locale: string, unitLabel: string) {
  const number = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pricePerMeter);

  return `${number} ${unitLabel}`;
}

const AUTOMOTIVE_PLACEHOLDER_PRICE = "29,99 €";
export type ProductCardVariant = "card" | "floating" | "gallery";

export function getProductPriceLabel(
  product: MaterialProduct,
  locale: string,
  priceUnitLabel: string,
) {
  const isPlaceholder = Boolean(product.isPlaceholder);

  return product.priceLabel ?? (isPlaceholder
    ? AUTOMOTIVE_PLACEHOLDER_PRICE
    : formatPricePerMeter(product.pricePerMeter, locale, priceUnitLabel));
}

export function ProductBadge({ label }: { label?: string }) {
  if (!label) {
    return null;
  }

  return (
    <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full border border-gold/45 bg-[linear-gradient(135deg,rgba(208,180,111,0.24),rgba(15,13,10,0.82))] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#F8E8B8] shadow-[0_10px_26px_rgba(0,0,0,0.35),0_0_18px_rgba(208,180,111,0.12)] backdrop-blur-md sm:left-4 sm:top-4">
      {label}
    </span>
  );
}

type ProductCardProps = {
  product: MaterialProduct;
  locale: string;
  priceUnitLabel: string;
  variant?: ProductCardVariant;
  priority?: boolean;
  onSelect?: () => void;
};

export default function ProductCard({
  product,
  locale,
  priceUnitLabel,
  variant = "card",
  priority = false,
  onSelect,
}: ProductCardProps) {
  const usesSvgPreview = product.image.endsWith(".svg");
  const priceLabel = getProductPriceLabel(product, locale, priceUnitLabel);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!onSelect) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  if (variant === "floating") {
    return (
      <article
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        aria-label={onSelect ? `${product.name} im Fokus ansehen` : undefined}
        onClick={onSelect}
        onKeyDown={onSelect ? handleKeyDown : undefined}
        className={`group text-center${onSelect ? " cursor-pointer" : ""}`}
      >
        <div
          className="relative mx-auto grid h-64 place-items-center sm:h-[19rem] lg:h-[21rem]"
          style={{ perspective: "900px" }}
        >
          <div className="relative h-44 w-44 sm:h-56 sm:w-56 lg:h-60 lg:w-60">
            <ProductBadge label={product.badgeLabel} />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[0.85rem] border border-white/10 bg-cover bg-center shadow-[0_28px_70px_rgba(0,0,0,0.72)] transition duration-700 group-hover:-translate-y-1"
              style={{
                backgroundImage: `linear-gradient(140deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 32%, rgba(0,0,0,0.18)), url("${product.image}")`,
                transform: "rotateX(58deg) rotateZ(-34deg)",
                transformStyle: "preserve-3d",
              }}
            />
          </div>
        </div>

        <h3 className="mt-4 text-base font-semibold tracking-tight text-text-primary sm:mt-5 sm:text-lg">
          {product.name}
        </h3>
        <p
          className="mt-2 text-[0.95rem] font-semibold drop-shadow-[0_0_12px_rgba(208,180,111,0.12)] sm:text-base"
          style={{ color: "var(--accent)" }}
        >
          {priceLabel}
        </p>
      </article>
    );
  }

  if (variant === "gallery") {
    return (
      <article
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        aria-label={onSelect ? `${product.name} im Fokus ansehen` : undefined}
        onClick={onSelect}
        onKeyDown={onSelect ? handleKeyDown : undefined}
        className={`group text-center${onSelect ? " cursor-pointer" : ""}`}
      >
        <div className="mx-auto grid place-items-center">
          <div className="relative aspect-square w-full max-w-[18rem] sm:max-w-[19.5rem] lg:max-w-[21rem]">
            <ProductBadge label={product.badgeLabel} />
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority={priority}
              unoptimized={usesSvgPreview}
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="material-sphere-image object-contain object-center drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>

        <h3 className="mt-5 text-[1.05rem] font-semibold tracking-tight text-text-primary sm:text-[1.15rem]">
          {product.name}
        </h3>
        <div className="mx-auto mt-3 h-px w-14 bg-gold/70" />
        <p className="mt-2 text-sm font-semibold tracking-[0.02em] text-text-primary sm:text-[0.95rem]">
          {priceLabel}
        </p>
      </article>
    );
  }

  return (
    <article
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={onSelect ? `${product.name} im Fokus ansehen` : undefined}
      onClick={onSelect}
      onKeyDown={onSelect ? handleKeyDown : undefined}
      className={`luxury-product-card group flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-divider bg-card-bg shadow-[0_24px_65px_rgba(0,0,0,0.6)] transition duration-500 hover:-translate-y-1 hover:bg-card-bg-hover${onSelect ? " cursor-pointer" : ""}`}
    >
      <div className="p-2.5">
        <div className="luxury-material-sphere-stage relative aspect-[4/4.1] overflow-hidden rounded-[1.3rem] border border-divider bg-surface">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(208,180,111,0.1),transparent_42%),linear-gradient(180deg,#16181d,#0f1115)]" />
          <ProductBadge label={product.badgeLabel} />
          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-3.5">
            <div className="relative aspect-square h-full max-h-[21rem] w-full max-w-[21rem]">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority={priority}
                unoptimized={usesSvgPreview}
                sizes="340px"
                className="material-sphere-image scale-[1.12] object-contain object-center drop-shadow-[0_10px_16px_rgba(0,0,0,0.10)] transition duration-700 group-hover:scale-[1.17]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
        <div>
          <h3 className="text-[1.2rem] font-semibold tracking-tight text-text-primary sm:text-[1.35rem]">
            {product.name}
          </h3>
        </div>

        <div className="mt-auto pt-6">
          <div className="h-px w-14 bg-gold/70" />
          <p className="mt-3 text-[1.35rem] font-semibold tracking-[0.02em] text-text-primary sm:text-[1.5rem]">
            {priceLabel}
          </p>
        </div>
      </div>
    </article>
  );
}

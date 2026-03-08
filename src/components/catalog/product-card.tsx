import NextLink from "next/link";

function formatPricePerMeter(pricePerMeter: number, locale: string, unitLabel: string) {
  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pricePerMeter);

  return `${number} ${unitLabel}`;
}

const placeholderGradients = [
  "linear-gradient(135deg, rgba(167, 160, 146, 0.34) 0%, rgba(90, 93, 99, 0.2) 56%, rgba(124, 129, 134, 0.3) 100%)",
  "linear-gradient(135deg, rgba(145, 154, 162, 0.32) 0%, rgba(74, 80, 89, 0.22) 54%, rgba(119, 126, 132, 0.31) 100%)",
  "linear-gradient(135deg, rgba(176, 165, 141, 0.28) 0%, rgba(96, 90, 81, 0.2) 52%, rgba(129, 125, 116, 0.3) 100%)",
  "linear-gradient(135deg, rgba(153, 160, 150, 0.3) 0%, rgba(83, 90, 83, 0.2) 55%, rgba(117, 124, 116, 0.28) 100%)",
];

const placeholderTextures = [
  "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.08) 0px, rgba(255, 255, 255, 0.08) 1px, transparent 1px, transparent 7px)",
  "repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.07) 0px, rgba(255, 255, 255, 0.07) 1px, transparent 1px, transparent 8px)",
  "repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.07) 0px, rgba(255, 255, 255, 0.07) 1px, transparent 1px, transparent 6px)",
  "radial-gradient(circle at 25% 30%, rgba(255, 255, 255, 0.2) 0px, transparent 38%), radial-gradient(circle at 72% 68%, rgba(255, 255, 255, 0.12) 0px, transparent 34%)",
];

type ProductCardProps = {
  name: string;
  pricePerMeter: number;
  href: string;
  locale: string;
  placeholderVariant: number;
  openLabel: string;
  priceUnitLabel: string;
};

export default function ProductCard({
  name,
  pricePerMeter,
  href,
  locale,
  placeholderVariant,
  openLabel,
  priceUnitLabel,
}: ProductCardProps) {
  const gradient = placeholderGradients[placeholderVariant % placeholderGradients.length];
  const texture = placeholderTextures[placeholderVariant % placeholderTextures.length];

  return (
    <NextLink
      href={href}
      className="group flex min-h-44 flex-col justify-between rounded-xl border border-divider bg-card-bg p-5 transition hover:border-gold/60 hover:bg-card-bg/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      aria-label={openLabel}
    >
      <div className="flex-1">
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-lg border border-divider/80 bg-surface md:h-28 md:w-28">
          <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: gradient }} />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-55"
            style={{ backgroundImage: texture }}
          />
        </div>
        <p className="text-lg font-semibold leading-snug text-text-primary md:text-xl">{name}</p>
      </div>
      <p className="mt-5 text-base font-medium text-gold md:text-lg">
        {formatPricePerMeter(pricePerMeter, locale, priceUnitLabel)}
      </p>
    </NextLink>
  );
}

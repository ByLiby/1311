import type { MaterialProduct } from "@/lib/material-catalog";
import ProductCard from "./product-card";

type ProductGridProps = {
  products: MaterialProduct[];
  locale: string;
  priceUnitLabel: string;
};

export default function ProductGrid({
  products,
  locale,
  priceUnitLabel,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          name={product.name}
          pricePerMeter={product.pricePerMeter}
          locale={locale}
          placeholderVariant={index}
          priceUnitLabel={priceUnitLabel}
        />
      ))}
    </div>
  );
}

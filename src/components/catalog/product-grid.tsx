import type { MaterialCategorySlug, MaterialProduct } from "@/lib/material-catalog";
import ProductCard from "./product-card";

type ProductGridProps = {
  category: MaterialCategorySlug;
  products: MaterialProduct[];
  langPathPrefix: string;
  locale: string;
  openMaterialAriaLabel: string;
  priceUnitLabel: string;
};

export default function ProductGrid({
  category,
  products,
  langPathPrefix,
  locale,
  openMaterialAriaLabel,
  priceUnitLabel,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          name={product.name}
          pricePerMeter={product.pricePerMeter}
          href={`${langPathPrefix}/material-viewer/${category}/${product.id}`}
          locale={locale}
          placeholderVariant={index}
          openLabel={openMaterialAriaLabel.replace("{name}", product.name)}
          priceUnitLabel={priceUnitLabel}
        />
      ))}
    </div>
  );
}

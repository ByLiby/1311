import type { SiteDictionary } from "@/lib/dictionary";

export type MaterialCategorySlug = "automobilkunstleder" | "other";

export type MaterialProduct =
  SiteDictionary["materialCatalog"]["categories"]["automobilkunstleder"]["products"][number];

const MATERIAL_CATEGORIES: MaterialCategorySlug[] = ["automobilkunstleder", "other"];

export type MaterialCategoryContent = {
  title: string;
  productCountLabel: string;
  products: MaterialProduct[];
};

export function isMaterialCategorySlug(value: string): value is MaterialCategorySlug {
  return MATERIAL_CATEGORIES.includes(value as MaterialCategorySlug);
}

export function getMaterialCategoryContent(
  category: MaterialCategorySlug,
  dictionary: SiteDictionary,
): MaterialCategoryContent {
  const categoryContent = dictionary.materialCatalog.categories[category];
  const products = categoryContent.products;
  const materialLabel =
    products.length === 1
      ? categoryContent.countLabel.singular
      : categoryContent.countLabel.plural;

  return {
    title: categoryContent.title,
    productCountLabel: `${products.length} ${materialLabel}`,
    products,
  };
}

export function findMaterialById(
  category: MaterialCategorySlug,
  productId: string,
  dictionary: SiteDictionary,
): MaterialProduct | undefined {
  const categoryContent = dictionary.materialCatalog.categories[category];
  return categoryContent.products.find((product) => product.id === productId);
}

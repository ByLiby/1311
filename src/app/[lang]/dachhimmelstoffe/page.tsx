import {
  generateMaterialCatalogMetadata,
  renderMaterialCatalogRoute,
  type LocalizedMaterialPageProps,
} from "@/app/_components/material-catalog-route";

export async function generateMetadata(props: LocalizedMaterialPageProps) {
  return generateMaterialCatalogMetadata(props, "dachhimmelstoffe");
}

export default async function DachhimmelstoffePage(props: LocalizedMaterialPageProps) {
  return renderMaterialCatalogRoute(props, "dachhimmelstoffe");
}

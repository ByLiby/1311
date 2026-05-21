import {
  generateMaterialCatalogMetadata,
  renderMaterialCatalogRoute,
  type LocalizedMaterialPageProps,
} from "@/app/_components/material-catalog-route";

export async function generateMetadata(props: LocalizedMaterialPageProps) {
  return generateMaterialCatalogMetadata(props, "bus-bahn-stoffe");
}

export default async function BusBahnStoffePage(props: LocalizedMaterialPageProps) {
  return renderMaterialCatalogRoute(props, "bus-bahn-stoffe");
}

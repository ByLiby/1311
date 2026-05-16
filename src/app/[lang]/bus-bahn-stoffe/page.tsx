import {
  renderMaterialCatalogRoute,
  type LocalizedMaterialPageProps,
} from "@/app/_components/material-catalog-route";

export default async function BusBahnStoffePage(props: LocalizedMaterialPageProps) {
  return renderMaterialCatalogRoute(props, "bus-bahn-stoffe");
}

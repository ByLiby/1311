import {
  renderMaterialCatalogRoute,
  type LocalizedMaterialPageProps,
} from "@/app/_components/material-catalog-route";

export default async function YachtMarinePage(props: LocalizedMaterialPageProps) {
  return renderMaterialCatalogRoute(props, "yacht-marine");
}

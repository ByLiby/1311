import {
  renderMaterialCatalogRoute,
  type LocalizedMaterialPageProps,
} from "@/app/_components/material-catalog-route";

export default async function DachhimmelstoffePage(props: LocalizedMaterialPageProps) {
  return renderMaterialCatalogRoute(props, "dachhimmelstoffe");
}

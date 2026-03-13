import { notFound } from "next/navigation";
import MaterialViewerExperience from "@/components/catalog/material-viewer-experience";
import { getDictionary } from "@/lib/dictionary";
import { isSupportedLang, type SupportedLang } from "@/lib/i18n";
import { findMaterialById, isMaterialCategorySlug } from "@/lib/material-catalog";

const copyByLang: Record<
  SupportedLang,
  {
    title: string;
    description: string;
  }
> = {
  de: {
    title: "3D Materialvorschau",
    description: "Interaktive Innenraumansicht fuer eine praezise Beurteilung der Sitzmaterialwirkung.",
  },
  en: {
    title: "3D Material Preview",
    description: "Interactive interior view for evaluating real seat-surface material appearance.",
  },
  ru: {
    title: "3D Material Preview",
    description: "Interactive interior view for evaluating real seat-surface material appearance.",
  },
};

type LocalizedViewerPageProps = {
  params: Promise<{
    lang: string;
    category: string;
    materialId: string;
  }>;
};

export default async function MaterialViewerPage({ params }: LocalizedViewerPageProps) {
  const { lang, category, materialId } = await params;

  if (!isSupportedLang(lang) || !isMaterialCategorySlug(category)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const material = findMaterialById(category, materialId, dictionary);

  if (!material) {
    notFound();
  }

  const copy = copyByLang[lang];

  return (
    <main className="min-h-screen bg-base text-text-primary">
      <section className="relative overflow-hidden border-b border-divider bg-surface py-12 md:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,107,0.2),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.07),transparent_58%)]"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-6">
          <p className="text-xs uppercase tracking-[0.16em] text-gold">{copy.title}</p>
          <h1 className="text-3xl font-semibold leading-tight font-serif md:text-5xl">
            {material.name}
          </h1>
          <p className="max-w-3xl text-base text-text-secondary md:text-lg">{copy.description}</p>
        </div>
      </section>

      <section className="py-8 pb-14 md:py-10 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <MaterialViewerExperience lang={lang} />
        </div>
      </section>
    </main>
  );
}

import NextLink from "next/link";
import ProductGrid from "@/components/catalog/product-grid";
import type { SiteDictionary } from "@/lib/dictionary";
import {
  getMaterialCategoryContent,
  type MaterialCategorySlug,
} from "@/lib/material-catalog";
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n";

const localeByLang: Record<SupportedLang, string> = {
  de: "de-DE",
  en: "en-US",
  ru: "ru-RU",
};

function isCategoryActive(current: MaterialCategorySlug, expected: MaterialCategorySlug) {
  return current === expected;
}

export default function MaterialCatalogPage({
  lang,
  category,
  dictionary,
}: {
  lang: SupportedLang;
  category: MaterialCategorySlug;
  dictionary: SiteDictionary;
}) {
  const autoCategory = getMaterialCategoryContent("automobilkunstleder", dictionary);
  const otherCategory = getMaterialCategoryContent("other", dictionary);
  const currentCategory = getMaterialCategoryContent(category, dictionary);
  const copy = dictionary.materialCatalog;
  const languageOptions = SUPPORTED_LANGS.map((code) => ({
    code,
    label: dictionary.languageSwitcher[code],
  }));

  return (
    <main className="min-h-screen bg-base text-text-primary">
      <header className="border-b border-divider bg-base/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <NextLink href={`/${lang}`} className="shrink-0">
            <p className="text-lg font-semibold tracking-tight text-text-primary">
              {dictionary.footer.company}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
              {dictionary.footer.tagline}
            </p>
          </NextLink>

          <nav className="hidden items-center gap-3 lg:flex">
            <NextLink
              href={`/${lang}/automobilkunstleder`}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                isCategoryActive(category, "automobilkunstleder")
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-divider text-text-secondary hover:border-gold/50 hover:text-text-primary"
              }`}
            >
              {autoCategory.title}
            </NextLink>
            <NextLink
              href={`/${lang}/other`}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                isCategoryActive(category, "other")
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-divider text-text-secondary hover:border-gold/50 hover:text-text-primary"
              }`}
            >
              {otherCategory.title}
            </NextLink>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <NextLink
              href={`/${lang}/contact`}
              className="inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-[13px] font-medium text-base transition hover:bg-gold-hover"
            >
              {dictionary.contactCta}
            </NextLink>

            <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
              {languageOptions.map((item, index) => (
                <span key={item.code} className="inline-flex items-center gap-1">
                  <NextLink
                    href={`/${item.code}/${category}`}
                    className={`px-1 py-0.5 transition ${
                      item.code === lang
                        ? "text-gold"
                        : "text-text-secondary/50 hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </NextLink>
                  {index < languageOptions.length - 1 && (
                    <span className="text-text-secondary/20">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-divider px-6 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <NextLink
                href={`/${lang}/automobilkunstleder`}
                className={`rounded-md border px-4 py-3 text-center text-sm font-medium transition ${
                  isCategoryActive(category, "automobilkunstleder")
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-divider text-text-secondary"
                }`}
              >
                {autoCategory.title}
              </NextLink>
              <NextLink
                href={`/${lang}/other`}
                className={`rounded-md border px-4 py-3 text-center text-sm font-medium transition ${
                  isCategoryActive(category, "other")
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-divider text-text-secondary"
                }`}
              >
                {otherCategory.title}
              </NextLink>
            </div>
            <div className="flex items-center justify-center gap-1 text-[11px] uppercase tracking-[0.15em]">
              {languageOptions.map((item, index) => (
                <span key={item.code} className="inline-flex items-center gap-1">
                  <NextLink
                    href={`/${item.code}/${category}`}
                    className={`px-1 py-0.5 transition ${
                      item.code === lang
                        ? "text-gold"
                        : "text-text-secondary/50 hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </NextLink>
                  {index < languageOptions.length - 1 && (
                    <span className="text-text-secondary/20">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-divider bg-surface py-14 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,168,107,0.2),transparent_48%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_55%)]"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-6">
          <NextLink
            href={`/${lang}`}
            className="w-fit text-xs uppercase tracking-[0.15em] text-gold transition hover:text-gold-hover"
          >
            {copy.backHomeLabel}
          </NextLink>

          <p className="text-xs uppercase tracking-[0.16em] text-text-secondary/85">
            {copy.overviewLabel}
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-text-primary md:text-5xl font-serif">
            {currentCategory.title}
          </h1>
          <p className="text-base font-medium text-text-secondary/95 md:text-lg">
            {currentCategory.productCountLabel} · {copy.pricePerMeterLabel}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <ProductGrid
            products={currentCategory.products}
            locale={localeByLang[lang]}
            priceUnitLabel={copy.priceUnitLabel}
          />
        </div>
      </section>

      <footer className="border-t border-divider bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-4 flex items-center justify-center gap-3 text-xs text-text-secondary/60">
            <NextLink href={`/${lang}/impressum`} className="transition hover:text-text-secondary">
              {dictionary.footer.legalNotice}
            </NextLink>
            <span className="text-text-secondary/30">|</span>
            <NextLink href={`/${lang}/datenschutz`} className="transition hover:text-text-secondary">
              {dictionary.footer.privacyPolicy}
            </NextLink>
          </div>
          <p className="text-center text-xs text-text-secondary/40">
            {"© "}
            {new Date().getFullYear()} {dictionary.footer.company}. {dictionary.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}

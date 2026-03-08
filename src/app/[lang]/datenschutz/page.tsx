import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import {
  DEFAULT_LANG,
  isSupportedLang,
  SUPPORTED_LANGS,
  type SupportedLang,
} from "@/lib/i18n";

type DatenschutzPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: DatenschutzPageProps): Promise<Metadata> {
  const { lang } = await params;
  const resolvedLang: SupportedLang = isSupportedLang(lang) ? lang : DEFAULT_LANG;
  const dictionary = await getDictionary(resolvedLang);

  return {
    title: dictionary.meta.privacyPolicy.title,
    description: dictionary.meta.privacyPolicy.description,
  };
}

function DatenschutzSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}

export default async function DatenschutzPage({ params }: DatenschutzPageProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const languageOptions = SUPPORTED_LANGS.map((code) => ({
    code,
    label: dictionary.languageSwitcher[code],
  }));
  const shared = dictionary.legalPages.shared;
  const content = dictionary.legalPages.privacyPolicy;

  return (
    <main className="min-h-screen bg-base text-text-primary">
      <section className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <NextLink
            href={`/${lang}`}
            className="inline-flex items-center text-sm text-gold transition hover:text-gold-hover"
          >
            {shared.backToHome}
          </NextLink>

          <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
            {languageOptions.map((item, index) => (
              <span key={item.code} className="inline-flex items-center gap-1">
                <NextLink
                  href={`/${item.code}/datenschutz`}
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

        <nav className="mt-6 flex flex-wrap gap-4 text-sm text-text-secondary">
          <NextLink href={`/${lang}/impressum`} className="transition hover:text-text-primary">
            {dictionary.footer.legalNotice}
          </NextLink>
          <NextLink href={`/${lang}/datenschutz`} className="transition hover:text-text-primary">
            {dictionary.footer.privacyPolicy}
          </NextLink>
          <NextLink href={`/${lang}/contact`} className="transition hover:text-text-primary">
            {shared.contactPage}
          </NextLink>
        </nav>

        <h1 className="mt-6 text-3xl font-bold text-text-primary font-serif md:text-4xl">
          {content.title}
        </h1>

        <div className="mt-10 space-y-8 rounded-md border border-divider bg-surface p-6 md:p-8">
          <DatenschutzSection title={content.sectionTitles.controller}>
            <p>{content.values.company}</p>
            <p>{content.values.representative}</p>
            {content.values.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-3">
              {shared.phoneLabel}:{" "}
              <a
                href={`tel:${dictionary.footer.phone.replace(/\s/g, "")}`}
                className="transition hover:text-text-primary"
              >
                {dictionary.footer.phone}
              </a>
            </p>
            <p>
              {shared.emailLabel}:{" "}
              <a
                href={`mailto:${dictionary.footer.email}`}
                className="transition hover:text-text-primary"
              >
                {dictionary.footer.email}
              </a>
            </p>
          </DatenschutzSection>

          <DatenschutzSection title={content.sectionTitles.generalInformation}>
            <p>{content.values.generalInformation}</p>
          </DatenschutzSection>

          <DatenschutzSection title={content.sectionTitles.emailContact}>
            <p>{content.values.emailContact}</p>
          </DatenschutzSection>

          <DatenschutzSection title={content.sectionTitles.serverLogs}>
            <p>{content.values.serverLogs}</p>
          </DatenschutzSection>

          <DatenschutzSection title={content.sectionTitles.socialMediaLinks}>
            <p>{content.values.socialMediaLinks}</p>
          </DatenschutzSection>

          <DatenschutzSection title={content.sectionTitles.rights}>
            <p>{content.values.rights}</p>
          </DatenschutzSection>
        </div>
      </section>
    </main>
  );
}

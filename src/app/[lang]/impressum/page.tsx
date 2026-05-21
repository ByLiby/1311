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

type ImpressumPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: ImpressumPageProps): Promise<Metadata> {
  const { lang } = await params;
  const resolvedLang: SupportedLang = isSupportedLang(lang) ? lang : DEFAULT_LANG;
  const dictionary = await getDictionary(resolvedLang);

  return {
    title: dictionary.meta.legalNotice.title,
    description: dictionary.meta.legalNotice.description,
    alternates: {
      languages: {
        "de-AT": "/de/impressum",
        en: "/en/impressum",
        ru: "/ru/impressum",
      },
    },
  };
}

function ImpressumSection({
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

export default async function ImpressumPage({ params }: ImpressumPageProps) {
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
  const content = dictionary.legalPages.impressum;

  return (
    <main className="luxury-home premiumPatternBackground min-h-screen bg-base text-text-primary">
      <section className="mx-auto w-full max-w-5xl px-6 py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <NextLink
            href={`/${lang}`}
            className="luxury-button luxury-button-secondary inline-flex min-h-[42px] items-center rounded-full border border-gold/24 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-text-primary transition hover:border-gold/48"
          >
            {shared.backToHome}
          </NextLink>

          <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
            {languageOptions.map((item, index) => (
              <span key={item.code} className="inline-flex items-center gap-1">
                <NextLink
                  href={`/${item.code}/impressum`}
                  className={`px-1 py-0.5 transition ${
                    item.code === lang
                      ? "text-text-primary underline decoration-gold underline-offset-4"
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
          <NextLink href={`/${lang}/kontakt`} className="transition hover:text-text-primary">
            {shared.contactPage}
          </NextLink>
        </nav>

        <h1 className="mt-8 font-serif text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-4 text-sm text-text-secondary">{content.subtitle}</p>

        <div className="luxury-glass-panel mt-10 space-y-8 rounded-[1.45rem] border border-divider bg-surface p-6 md:p-8">
          <ImpressumSection title={content.sectionTitles.company}>
            <p>{content.values.company}</p>
          </ImpressumSection>

          <ImpressumSection title={content.sectionTitles.address}>
            {content.values.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </ImpressumSection>

          <ImpressumSection title={content.sectionTitles.contact}>
            <p>
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
          </ImpressumSection>

          <ImpressumSection title={content.sectionTitles.authorizedRepresentative}>
            <p>{content.values.authorizedRepresentative}</p>
          </ImpressumSection>

          <ImpressumSection title={content.sectionTitles.businessPurpose}>
            <p>{content.values.businessPurpose}</p>
          </ImpressumSection>

          <ImpressumSection title={content.sectionTitles.registeredOffice}>
            <p>{content.values.registeredOffice}</p>
          </ImpressumSection>

          <ImpressumSection title={content.sectionTitles.jurisdiction}>
            <p>{content.values.jurisdiction}</p>
          </ImpressumSection>

          <ImpressumSection title={content.sectionTitles.liabilityForContent}>
            <p>{content.values.liabilityForContent}</p>
          </ImpressumSection>

          <ImpressumSection title={content.sectionTitles.liabilityForLinks}>
            <p>{content.values.liabilityForLinks}</p>
          </ImpressumSection>

          <ImpressumSection title={content.sectionTitles.copyright}>
            <p>{content.values.copyright}</p>
          </ImpressumSection>
        </div>
      </section>
    </main>
  );
}

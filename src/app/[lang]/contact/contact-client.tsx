"use client";

import NextLink from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteDictionary } from "@/lib/dictionary";
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n";

export default function ContactPageClient({
  lang,
  dictionary,
}: {
  lang: SupportedLang;
  dictionary: SiteDictionary;
}) {
  const languageOptions = SUPPORTED_LANGS.map((code) => ({
    code,
    label: dictionary.languageSwitcher[code],
  }));

  return (
    <main className="min-h-screen bg-base text-text-primary">
      <header className="border-b border-divider bg-base/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NextLink href={`/${lang}`} className="shrink-0">
            <p className="text-lg font-semibold tracking-tight text-text-primary">
              {dictionary.footer.company}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
              {dictionary.footer.tagline}
            </p>
          </NextLink>

          <nav className="hidden items-center gap-8 lg:flex">
            <NextLink
              href={`/${lang}`}
              className="text-[13px] text-text-secondary transition hover:text-text-primary"
            >
              {dictionary.nav.home}
            </NextLink>
            <NextLink
              href={`/${lang}#about`}
              className="text-[13px] text-text-secondary transition hover:text-text-primary"
            >
              {dictionary.nav.about}
            </NextLink>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <span className="inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-[13px] font-medium text-base">
              {dictionary.contactCta}
            </span>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
              {languageOptions.map((item, index) => (
                <span key={item.code} className="inline-flex items-center gap-1">
                  <NextLink
                    href={`/${item.code}/kontakt`}
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

      <div className="border-b border-divider bg-base lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-1 px-6 py-3 text-[11px] uppercase tracking-[0.15em]">
          {languageOptions.map((item, index) => (
            <span key={item.code} className="inline-flex items-center gap-1">
              <NextLink
                href={`/${item.code}/kontakt`}
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

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h1 className="text-3xl font-bold text-text-primary font-serif md:text-4xl">
            {dictionary.contactPage.headline}
          </h1>
          <div className="mt-10 flex flex-col gap-5 text-left text-base leading-relaxed text-text-secondary">
            <p>{dictionary.contactPage.p1}</p>
            <p>{dictionary.contactPage.p2}</p>
            <p>{dictionary.contactPage.p3}</p>
          </div>

          <div className="mt-14 rounded-md border border-divider bg-card-bg p-8">
            <p className="text-base font-semibold text-text-primary">
              {dictionary.footer.company}
            </p>
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex items-start justify-center gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold/60" />
                <div className="text-left text-sm leading-relaxed text-text-secondary">
                  {dictionary.footer.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone size={15} className="shrink-0 text-gold/60" />
                <a
                  href={`tel:${dictionary.footer.phone.replace(/\s/g, "")}`}
                  className="text-sm text-text-secondary transition hover:text-text-primary"
                >
                  {dictionary.footer.phone}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail size={15} className="shrink-0 text-gold/60" />
                <a
                  href={`mailto:${dictionary.footer.email}`}
                  className="text-sm text-text-secondary transition hover:text-text-primary"
                >
                  {dictionary.footer.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-divider bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-8">
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

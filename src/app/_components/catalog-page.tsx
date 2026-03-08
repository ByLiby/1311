"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import type { SiteDictionary } from "@/lib/dictionary";
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n";

function Navigation({
  lang,
  content,
}: {
  lang: SupportedLang;
  content: SiteDictionary;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const languageOptions = SUPPORTED_LANGS.map((code) => ({
    code,
    label: content.languageSwitcher[code],
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-base/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="shrink-0">
          <p className="text-lg font-semibold tracking-tight text-text-primary">
            {content.footer.company}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
            {content.footer.tagline}
          </p>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          <a href="#home" className="text-[13px] text-text-secondary transition hover:text-text-primary">
            {content.nav.home}
          </a>
          <a href="#about" className="text-[13px] text-text-secondary transition hover:text-text-primary">
            {content.nav.about}
          </a>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <NextLink
            href={`/${lang}/contact`}
            className="inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-[13px] font-medium text-base transition hover:bg-gold-hover"
          >
            {content.contactCta}
          </NextLink>

          <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
            {languageOptions.map((item, index) => (
              <span key={item.code} className="inline-flex items-center gap-1">
                <NextLink
                  href={`/${item.code}`}
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

        <button
          className="flex items-center justify-center text-text-primary lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={content.common.toggleMenuAriaLabel}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-divider bg-base px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4 text-[13px] text-text-secondary">
            <a href="#home" onClick={() => setMenuOpen(false)} className="transition hover:text-text-primary">
              {content.nav.home}
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="transition hover:text-text-primary">
              {content.nav.about}
            </a>
          </nav>
          <div className="mt-5">
            <NextLink
              href={`/${lang}/contact`}
              className="inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-[13px] font-medium text-base transition hover:bg-gold-hover"
              onClick={() => setMenuOpen(false)}
            >
              {content.contactCta}
            </NextLink>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
            {languageOptions.map((item, index) => (
              <span key={item.code} className="inline-flex items-center gap-1">
                <NextLink
                  href={`/${item.code}`}
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
      )}
    </header>
  );
}

function HeroSection({
  lang,
  content,
}: {
  lang: SupportedLang;
  content: SiteDictionary;
}) {
  return (
    <section id="home" className="relative overflow-hidden bg-base">
      <div
        className="relative min-h-[72vh] w-full bg-cover bg-center bg-no-repeat md:min-h-[80vh]"
        style={{
          backgroundImage: "url('/images/hero-automotive-interior.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/78 via-black/62 to-black/76"
          aria-hidden="true"
        />

        <div className="absolute inset-0">
          <div className="absolute bottom-[18%] left-[7%] w-[min(90%,42rem)] text-left md:bottom-[12%] md:left-[11%]">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold leading-tight text-balance text-text-primary font-serif md:text-6xl">
                {content.hero.headline}
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-white/85 md:mt-9 md:text-xl">
                {content.hero.subline}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4 md:mt-8 md:flex-nowrap">
                <NextLink
                  href={`/${lang}/contact`}
                  className="inline-flex items-center rounded-md bg-gold px-7 py-3.5 text-sm font-medium text-base transition hover:bg-gold-hover"
                >
                  {content.hero.ctaPrimary}
                </NextLink>
                <a
                  href="#materials"
                  className="inline-flex items-center rounded-md border border-gold/40 px-7 py-3.5 text-sm font-medium text-gold transition hover:border-gold hover:text-gold-hover"
                >
                  {content.hero.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar({ content }: { content: SiteDictionary }) {
  return (
    <section className="border-b border-divider bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {content.trustBar.map((item, index) => (
          <div
            key={item.title}
            className={`flex flex-col items-center px-6 py-8 text-center ${
              index < content.trustBar.length - 1
                ? "border-b border-divider sm:border-r sm:border-b-0"
                : ""
            }`}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-gold">
              {item.title}
            </p>
            <p className="mt-1.5 text-sm text-text-secondary">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MaterialsSection({
  lang,
  content,
}: {
  lang: SupportedLang;
  content: SiteDictionary;
}) {
  return (
    <section id="materials" className="bg-base py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {content.materialsHome.cards.map((card) => (
            <NextLink
              key={card.slug}
              href={`/${lang}/${card.slug}`}
              className="group block overflow-hidden rounded-xl border border-divider bg-card-bg"
              aria-label={content.common.openCategoryAriaLabel.replace("{name}", card.title)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 transition group-hover:from-black/72"
                  aria-hidden="true"
                />
                <div className="absolute bottom-0 left-0 p-6 md:p-7">
                  <h3 className="text-2xl font-semibold tracking-tight text-text-primary font-serif md:text-3xl">
                    {card.title}
                  </h3>
                </div>
              </div>
            </NextLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({
  lang,
  content,
}: {
  lang: SupportedLang;
  content: SiteDictionary;
}) {
  return (
    <section id="about" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold text-text-primary font-serif md:text-4xl">
          {content.about.headline}
        </h2>
        <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-text-secondary">
          <p>{content.about.p1}</p>
          <p>{content.about.p2}</p>
          <p>{content.about.p3}</p>
        </div>
        <div className="mt-10">
          <NextLink
            href={`/${lang}/contact`}
            className="inline-flex items-center rounded-md bg-gold px-7 py-3.5 text-sm font-medium text-base transition hover:bg-gold-hover"
          >
            {content.contactCta}
          </NextLink>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({
  lang,
  content,
}: {
  lang: SupportedLang;
  content: SiteDictionary;
}) {
  return (
    <footer id="footer" className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-semibold text-text-primary">
              {content.footer.company}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gold">
              {content.footer.tagline}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <MapPin size={15} className="mt-0.5 shrink-0 text-gold/60" />
            <div className="text-sm leading-relaxed text-text-secondary">
              {content.footer.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Mail size={15} className="shrink-0 text-gold/60" />
              <a
                href={`mailto:${content.footer.email}`}
                className="text-sm text-text-secondary transition hover:text-text-primary"
              >
                {content.footer.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={15} className="shrink-0 text-gold/60" />
              <a
                href={`tel:${content.footer.phone.replace(/\s/g, "")}`}
                className="text-sm text-text-secondary transition hover:text-text-primary"
              >
                {content.footer.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-text-secondary/60">
            <NextLink href={`/${lang}/impressum`} className="transition hover:text-text-secondary">
              {content.footer.legalNotice}
            </NextLink>
            <NextLink href={`/${lang}/datenschutz`} className="transition hover:text-text-secondary">
              {content.footer.privacyPolicy}
            </NextLink>
          </div>
        </div>

        <div className="mt-10 border-t border-divider pt-6">
          <p className="text-center text-xs text-text-secondary/40">
            {"© "}
            {new Date().getFullYear()} {content.footer.company}. {content.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function CatalogPage({
  lang,
  dictionary,
}: {
  lang: SupportedLang;
  dictionary: SiteDictionary;
}) {
  return (
    <main className="min-h-screen bg-base text-text-primary">
      <Navigation lang={lang} content={dictionary} />
      <HeroSection lang={lang} content={dictionary} />
      <TrustBar content={dictionary} />
      <MaterialsSection lang={lang} content={dictionary} />
      <AboutSection lang={lang} content={dictionary} />
      <SiteFooter lang={lang} content={dictionary} />
    </main>
  );
}

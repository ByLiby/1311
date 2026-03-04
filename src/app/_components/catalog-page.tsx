"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import { Mail, Phone, MapPin, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export type Lang = "de" | "en" | "ru";

type Collection = {
  series: string;
  title: string;
  description: string;
  specs: string[];
};

type Dictionary = {
  nav: {
    home: string;
    materials: string;
    about: string;
  };
  contactCta: string;
  hero: {
    headline: string;
    subline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroAlt: string;
  };
  trustBar: { title: string; text: string }[];
  portfolio: {
    label: string;
    headline: string;
    collections: Collection[];
  };
  about: {
    headline: string;
    p1: string;
    p2: string;
    p3: string;
  };
  strengths: {
    items: string[];
  };
  footer: {
    company: string;
    tagline: string;
    address: string[];
    email: string;
    phone: string;
    legalNotice: string;
    privacyPolicy: string;
    rights: string;
  };
};

const languages: { code: Lang; label: string }[] = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

const collectionImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&fit=crop",
  "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=85&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&fit=crop",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85&fit=crop",
];

const busKunstlederImages = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/68159a00-9b6c-49e5-84ea-3462298e7a08/C70956E7-BF75-4B94-9703-0F43746E3742-1772652552672.webp?width=1200&height=1200&resize=cover",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/68159a00-9b6c-49e5-84ea-3462298e7a08/245BCEF3-1601-44ED-BF62-A338F985C379-1772652557564.webp?width=1200&height=1200&resize=cover",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/68159a00-9b6c-49e5-84ea-3462298e7a08/1FC9CFA8-5BF7-4AFF-9B53-2BEC897D6132-1772652564827.webp?width=1200&height=1200&resize=cover",
];

/* ─────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────── */

function Navigation({ lang, content }: { lang: Lang; content: Dictionary }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a href="#portfolio" className="text-[13px] text-text-secondary transition hover:text-text-primary">
            {content.nav.materials}
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
            {languages.map((item, index) => (
              <span key={item.code} className="inline-flex items-center gap-1">
                <NextLink
                  href={`/${item.code}`}
                  className={`px-1 py-0.5 transition ${
                    item.code === lang ? "text-gold" : "text-text-secondary/50 hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </NextLink>
                {index < languages.length - 1 && <span className="text-text-secondary/20">|</span>}
              </span>
            ))}
          </div>
        </div>

        <button
          className="flex items-center justify-center lg:hidden text-text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
            <a href="#portfolio" onClick={() => setMenuOpen(false)} className="transition hover:text-text-primary">
              {content.nav.materials}
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
            {languages.map((item, index) => (
              <span key={item.code} className="inline-flex items-center gap-1">
                <NextLink
                  href={`/${item.code}`}
                  className={`px-1 py-0.5 transition ${
                    item.code === lang ? "text-gold" : "text-text-secondary/50 hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </NextLink>
                {index < languages.length - 1 && <span className="text-text-secondary/20">|</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection({ lang, content }: { lang: Lang; content: Dictionary }) {
  return (
    <section id="home" className="relative overflow-hidden bg-base">
      <div className="relative min-h-[70vh] w-full md:min-h-[80vh]">
        <Image
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=2400&q=80"
          alt={content.hero.heroAlt}
          fill
          className="object-cover animate-slow-zoom [filter:saturate(0.3)_brightness(0.18)_contrast(1.1)]"
          priority
        />
        <div className="absolute inset-0 bg-base/50" aria-hidden="true" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold leading-tight text-text-primary md:text-6xl text-balance font-serif">
                {content.hero.headline}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
                {content.hero.subline}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <NextLink
                  href={`/${lang}/contact`}
                  className="inline-flex items-center rounded-md bg-gold px-7 py-3.5 text-sm font-medium text-base transition hover:bg-gold-hover"
                >
                  {content.hero.ctaPrimary}
                </NextLink>
                <a
                  href="#portfolio"
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

function TrustBar({ content }: { content: Dictionary }) {
  return (
    <section className="border-b border-divider bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6">
        {content.trustBar.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center px-6 py-8 text-center ${
              index < content.trustBar.length - 1 ? "border-b sm:border-b-0 sm:border-r border-divider" : ""
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

function SquareSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative h-full w-full overflow-hidden" ref={emblaRef}>
      <div className="flex h-full touch-pan-y">
        {busKunstlederImages.map((src, index) => (
          <div key={index} className="relative h-full min-w-0 flex-[0_0_100%]">
            <Image
              src={src}
              alt={`Bus Kunstleder ${index + 1}`}
              fill
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
      
      {/* Minimal Arrows - Desktop Only */}
      <div className="absolute inset-x-4 top-1/2 hidden -translate-y-1/2 justify-between md:flex pointer-events-none">
        <button
          onClick={scrollPrev}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-base/20 text-white backdrop-blur-sm transition hover:bg-base/40"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={scrollNext}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-base/20 text-white backdrop-blur-sm transition hover:bg-base/40"
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function PortfolioSection({ content }: { content: Dictionary }) {
  return (
    <section id="portfolio" className="bg-base py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            {content.portfolio.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-text-primary md:text-4xl font-serif">
            {content.portfolio.headline}
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {content.portfolio.collections.map((col, index) => (
            <div
              key={index}
              className="group flex flex-col"
            >
              {/* Card Title - Above for Bus Kunstleder as per requested style */}
              {index === 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium uppercase tracking-[0.25em] text-white">
                    {col.series}
                  </h3>
                </div>
              )}

              <div className="relative aspect-square overflow-hidden rounded-md border border-[#232428] bg-card-bg transition-colors duration-300 group-hover:border-[#C6A86B]">
                {index === 0 ? (
                  <SquareSlider />
                ) : (
                  <>
                    <Image
                      src={collectionImages[index % collectionImages.length]}
                      alt={col.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03] [filter:saturate(0.4)_brightness(0.5)]"
                    />
                    <div className="absolute inset-0 bg-base/20" />
                  </>
                )}
              </div>

              <div className="py-6">
                {index === 0 ? (
                  null // Title already rendered above
                ) : (
                  <>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                      {col.series}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-text-primary">
                      {col.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {col.description}
                    </p>
                    <ul className="mt-4 flex flex-col gap-1.5">
                      {col.specs.map((spec, si) => (
                        <li key={si} className="flex items-center gap-2 text-[13px] text-text-secondary">
                          <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ lang, content }: { lang: Lang; content: Dictionary }) {
  return (
    <section id="about" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold text-text-primary md:text-4xl font-serif">
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

function SiteFooter({ content }: { content: Dictionary }) {
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
            <a href="#" className="transition hover:text-text-secondary">
              {content.footer.legalNotice}
            </a>
            <a href="#" className="transition hover:text-text-secondary">
              {content.footer.privacyPolicy}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-divider pt-6">
          <p className="text-center text-xs text-text-secondary/40">
            {"© "}
            {new Date().getFullYear()} {content.footer.company}.{" "}
            {content.footer.rights}
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
  lang: Lang;
  dictionary: Dictionary;
}) {
  return (
    <main className="min-h-screen bg-base text-text-primary">
      <Navigation lang={lang} content={dictionary} />
      <HeroSection lang={lang} content={dictionary} />
      <TrustBar content={dictionary} />
      <PortfolioSection content={dictionary} />
      <AboutSection lang={lang} content={dictionary} />
      <SiteFooter content={dictionary} />
    </main>
  );
}

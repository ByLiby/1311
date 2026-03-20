"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import type { SiteDictionary } from "@/lib/dictionary";
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n";

const HERO_VIEWER_BACKGROUND = "radial-gradient(circle at center, #0a0a0a 0%, #000000 70%)";
const SOCIAL_PLATFORM_LINKS = {
  tiktok: "https://www.tiktok.com/@kunstleder5700",
  instagram: "https://www.instagram.com/kunstleder5700/",
  whatsapp: "https://wa.me/436764725428",
} as const;
type SocialPlatform = keyof typeof SOCIAL_PLATFORM_LINKS;

function SocialBrandIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  if (platform === "tiktok") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="currentColor"
      >
        <path d="M15.58 3c.2 1.68 1.14 3.26 2.58 4.14 1.07.67 2.14.93 3.34.98v3.08c-1.72-.06-3.33-.55-4.8-1.44v5.92c0 2.42-1.16 4.47-3.12 5.7A6.82 6.82 0 0 1 10 22c-3.87 0-7-2.95-7-6.6 0-3.65 3.13-6.6 7-6.6.34 0 .69.03 1.02.1v3.17a3.55 3.55 0 0 0-1.02-.15c-1.95 0-3.52 1.53-3.52 3.4 0 1.88 1.57 3.4 3.52 3.4 2.1 0 3.56-1.59 3.56-3.84V3h2.02Z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.4" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.11 4.89A9.87 9.87 0 0 0 12.09 2C6.57 2 2.08 6.33 2.08 11.66c0 1.7.46 3.35 1.33 4.8L2 22l5.77-1.5a10.15 10.15 0 0 0 4.32.96h.01c5.52 0 10-4.33 10-9.66 0-2.58-1-5.02-2.99-6.91Zm-7.02 14.95c-1.37 0-2.72-.36-3.9-1.03l-.28-.16-3.42.89.92-3.3-.18-.29a7.55 7.55 0 0 1-1.17-4.03c0-4.2 3.6-7.62 8.03-7.62 2.14 0 4.15.81 5.66 2.29a7.4 7.4 0 0 1 2.36 5.33c0 4.2-3.6 7.62-8.02 7.62Zm4.4-5.7c-.24-.12-1.42-.68-1.64-.75-.22-.08-.38-.12-.54.12-.16.23-.62.75-.76.9-.14.16-.28.18-.52.06-.24-.12-1-.36-1.9-1.15-.71-.62-1.18-1.38-1.32-1.61-.14-.23-.01-.36.1-.48.1-.1.24-.26.36-.39.12-.14.16-.23.24-.39.08-.16.04-.29-.02-.41-.06-.12-.54-1.28-.74-1.75-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.29-.22.23-.84.8-.84 1.94 0 1.14.86 2.24.98 2.39.12.16 1.68 2.63 4.17 3.58.59.22 1.05.35 1.41.45.59.15 1.12.13 1.54.08.47-.06 1.42-.57 1.62-1.12.2-.55.2-1.02.14-1.12-.05-.1-.21-.16-.45-.27Z" />
    </svg>
  );
}

const HERO_COPY: Record<
  SupportedLang,
  {
    eyebrow: string;
    subline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }
> = {
  de: {
    eyebrow: "Materialien für anspruchsvolle Innenausstattungen",
    subline:
      "Kunstleder, Bus- und Zugstoffe, Teppiche sowie Materialien für Möbel, Flugzeug und Markisen – direkt ab Lager.",
    ctaPrimary: "Kollektion ansehen",
    ctaSecondary: "Projekt anfragen",
  },
  en: {
    eyebrow: "Materials for demanding interior craftsmanship",
    subline:
      "Synthetic leather, microfiber, and upholstery fabrics for saddlers, processors, and demanding B2B projects.",
    ctaPrimary: "View collection",
    ctaSecondary: "Request project",
  },
  ru: {
    eyebrow: "Материалы для требовательных интерьерных проектов",
    subline:
      "Искусственная кожа, микрофибра и обивочные материалы для ателье, переработчиков и требовательных B2B-проектов.",
    ctaPrimary: "Смотреть коллекцию",
    ctaSecondary: "Запросить проект",
  },
};

const SeatViewerClean = dynamic(() => import("@/components/SeatViewerClean"), {
  loading: () => {
    return (
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ background: HERO_VIEWER_BACKGROUND }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,rgba(0,0,0,0)_38%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid justify-items-center gap-3 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-md">
              <div className="h-[18px] w-[18px] rounded-full bg-white/85 shadow-[0_0_28px_rgba(255,255,255,0.2)]" />
            </div>
            <div className="text-[0.76rem] uppercase tracking-[0.26em] text-white/78">
              Loading 3D Seat
            </div>
            <div className="text-xs tracking-[0.06em] text-white/45">
              Preparing showroom scene.
            </div>
          </div>
        </div>
      </div>
    );
  },
});

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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[#050506]/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-8 lg:px-12 xl:px-16">
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
          <a href="#materialien" className="text-[13px] text-text-secondary transition hover:text-text-primary">
            {content.nav.materials}
          </a>
          <a href="#about" className="text-[13px] text-text-secondary transition hover:text-text-primary">
            {content.nav.about}
          </a>
          <a href={`/${lang}/kontakt`} className="text-[13px] text-text-secondary transition hover:text-text-primary">
            {content.nav.contact}
          </a>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
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
            <a href="#materialien" onClick={() => setMenuOpen(false)} className="transition hover:text-text-primary">
              {content.nav.materials}
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="transition hover:text-text-primary">
              {content.nav.about}
            </a>
            <NextLink
              href={`/${lang}/kontakt`}
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-text-primary"
            >
              {content.nav.contact}
            </NextLink>
          </nav>
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
  const heroContent = HERO_COPY[lang];

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#050506]">
      <div
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(198,168,107,0.16),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(72,88,120,0.18),transparent_24%),linear-gradient(135deg,#040405_0%,#090a0d_48%,#030304_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_22%,rgba(0,0,0,0.28)_62%,rgba(0,0,0,0.56)_100%)]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_34%)]" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1600px] items-center px-6 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 xl:px-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-10 xl:gap-[4.5rem]">
          <div className="relative z-10 max-w-[31rem] self-center animate-hero-copy lg:max-w-[28rem] xl:max-w-[30rem]">
            <div className="inline-flex max-w-[24rem] items-center gap-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#d7c39a]/86">
              <span className="h-px w-12 bg-gradient-to-r from-[#d7c39a] to-transparent" />
              <span>{heroContent.eyebrow}</span>
            </div>

            <p className="mt-8 max-w-[29rem] text-pretty text-[1.02rem] leading-7 text-white/72 md:text-[1.08rem] md:leading-8">
              {heroContent.subline}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
              {content.trustBar.map((item) => (
                <div
                  key={item.title}
                  className="h-full rounded-[1.15rem] border border-white/8 bg-white/[0.025] px-4 py-4 backdrop-blur-[2px] sm:px-5"
                >
                  <p className="text-[0.82rem] font-semibold tracking-[0.06em] text-white/92">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[0.74rem] leading-5 text-white/44">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-nowrap">
              <NextLink
                href={`/${lang}#materialien`}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#ecd3a0]/18 bg-[#d6bb86] px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-[#131313] transition duration-500 hover:-translate-y-0.5 hover:bg-[#e3cca3] hover:shadow-[0_20px_40px_rgba(198,168,107,0.22)]"
              >
                {heroContent.ctaPrimary}
              </NextLink>
              <NextLink
                href={`/${lang}/kontakt`}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-white/88 backdrop-blur-sm transition duration-500 hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/[0.07] hover:text-white"
              >
                {heroContent.ctaSecondary}
              </NextLink>
            </div>
          </div>

          <div className="relative animate-hero-stage lg:-mr-16 xl:-mr-24">
            <div className="pointer-events-none absolute left-[8%] top-[12%] h-32 w-32 rounded-full bg-[#d6bb86]/10 blur-3xl md:h-44 md:w-44" />
            <div className="pointer-events-none absolute right-[6%] top-[8%] h-48 w-48 rounded-full bg-[rgba(94,112,143,0.22)] blur-3xl md:h-64 md:w-64" />
            <div className="pointer-events-none absolute bottom-[10%] left-[20%] h-20 w-[42%] rounded-full bg-white/6 blur-3xl" />

            <div className="relative h-[clamp(25rem,62vh,38rem)] w-full sm:h-[clamp(30rem,70vh,48rem)] lg:h-[clamp(40rem,84vh,64rem)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(5,5,6,0.6),transparent_22%),radial-gradient(circle_at_90%_14%,rgba(5,5,6,0.52),transparent_20%),radial-gradient(circle_at_88%_86%,rgba(5,5,6,0.46),transparent_22%),radial-gradient(circle_at_16%_88%,rgba(5,5,6,0.42),transparent_24%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_82%_50%,rgba(135,153,180,0.12),transparent_24%),radial-gradient(circle_at_28%_48%,rgba(214,187,134,0.08),transparent_30%)]" />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 90% 84% at 62% 54%, #000 42%, rgba(0,0,0,0.98) 62%, rgba(0,0,0,0.82) 76%, rgba(0,0,0,0.28) 90%, transparent 100%)",
                  maskImage:
                    "radial-gradient(ellipse 90% 84% at 62% 54%, #000 42%, rgba(0,0,0,0.98) 62%, rgba(0,0,0,0.82) 76%, rgba(0,0,0,0.28) 90%, transparent 100%)",
                }}
              >
                <div className="absolute inset-[-4%_-6%_-8%_-8%] lg:inset-[-6%_-8%_-10%_-10%]">
                  <SeatViewerClean
                    className="h-full w-full scale-[1.04] translate-y-[1%] lg:scale-[1.12] lg:translate-y-[3%]"
                    height="100%"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,#050506_0%,rgba(5,5,6,0.94)_18%,rgba(5,5,6,0.62)_54%,rgba(5,5,6,0)_100%)] sm:h-28 lg:h-32" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(0deg,#050506_0%,rgba(5,5,6,0.94)_20%,rgba(5,5,6,0.62)_56%,rgba(5,5,6,0)_100%)] sm:h-28 lg:h-32" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,#050506_0%,rgba(5,5,6,0.84)_24%,rgba(5,5,6,0.38)_62%,rgba(5,5,6,0)_100%)] sm:w-20 lg:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(270deg,#050506_0%,rgba(5,5,6,0.78)_24%,rgba(5,5,6,0.3)_62%,rgba(5,5,6,0)_100%)] sm:w-20 lg:w-24" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_82%_at_50%_52%,transparent_58%,rgba(5,5,6,0.08)_74%,rgba(5,5,6,0.26)_88%,rgba(5,5,6,0.46)_100%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialSection({ content }: { content: SiteDictionary }) {
  const socialItems = [
    {
      id: "tiktok" as const,
      label: "TikTok",
      href: SOCIAL_PLATFORM_LINKS.tiktok,
      accent: "@kunstleder5700",
    },
    {
      id: "instagram" as const,
      label: "Instagram",
      href: SOCIAL_PLATFORM_LINKS.instagram,
      accent: "@kunstleder5700",
    },
    {
      id: "whatsapp" as const,
      label: "WhatsApp",
      href: SOCIAL_PLATFORM_LINKS.whatsapp,
      accent: "+43 676 4725428",
    },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-base py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.045),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.006)_46%,rgba(255,255,255,0)_100%)]"
      />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#d7c39a]/82">
            <span className="h-px w-10 bg-gradient-to-r from-[#d7c39a] to-transparent" />
            <span>{content.socialsHome.heading}</span>
            <span className="h-px w-10 bg-gradient-to-l from-[#d7c39a] to-transparent" />
          </div>

          <p className="mt-3 text-balance text-sm leading-6 text-white/58 sm:text-[0.98rem]">
            {content.socialsHome.subline}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socialItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="group block cursor-pointer rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.012)_100%)] px-6 py-6 shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition duration-500 hover:scale-[1.025] hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.018)_100%)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.28)]"
            >
              <div className="flex min-h-[148px] flex-col items-center justify-center pt-2 text-center">
                <div className="w-full">
                  <div className="flex items-center justify-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/72 transition duration-500 group-hover:-translate-y-0.5 group-hover:text-white/92">
                      <SocialBrandIcon platform={item.id} className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0 text-left">
                      <h3 className="text-[1.6rem] font-semibold tracking-tight text-white/92 font-serif sm:text-[1.8rem]">
                        {item.label}
                      </h3>
                      <p className="mt-1 truncate text-[0.78rem] uppercase tracking-[0.16em] text-white/40">
                        {item.accent}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 mx-auto h-px w-14 bg-white/14 transition duration-500 group-hover:w-20 group-hover:bg-[#d7c39a]/56" />
                </div>
              </div>
            </a>
          ))}
        </div>
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
    <section
      id="materialien"
      className="relative z-10 -mt-10 overflow-hidden bg-base pb-16 pt-6 sm:-mt-14 sm:pb-20 sm:pt-8 lg:-mt-20 lg:pb-24 lg:pt-10"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+4rem)] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.015)_38%,rgba(255,255,255,0)_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="rounded-[2rem] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.015)_100%)] px-4 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:px-6 sm:py-6 lg:px-8 lg:py-8 xl:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#d7c39a]/84">
              <span className="h-px w-10 bg-gradient-to-r from-[#d7c39a] to-transparent" />
              <span>{content.materialsHome.heading}</span>
              <span className="h-px w-10 bg-gradient-to-l from-[#d7c39a] to-transparent" />
            </div>

            <p className="mt-3 text-balance text-sm leading-6 text-white/62 sm:text-[0.98rem]">
              {content.materialsHome.subline}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:gap-6">
            {content.materialsHome.cards.map((card) => (
              <NextLink
                key={card.slug}
                href={`/${lang}/${card.slug}`}
                className="group block cursor-pointer overflow-hidden rounded-[1.6rem] border border-white/10 bg-card-bg shadow-[0_20px_55px_rgba(0,0,0,0.24),0_0_0_1px_rgba(255,255,255,0.03)] transition duration-500 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_30px_85px_rgba(0,0,0,0.34),0_0_0_1px_rgba(214,187,134,0.08)]"
                aria-label={content.common.openCategoryAriaLabel.replace("{name}", card.title)}
              >
                <div className="relative h-[19rem] overflow-hidden sm:h-[22rem] lg:h-[26rem] xl:h-[28rem]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/52 to-black/22 transition duration-500 group-hover:from-black/80 group-hover:via-black/42 group-hover:to-black/14"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/8"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7 lg:p-8">
                    <div>
                      <span className="inline-flex rounded-full border border-white/14 bg-black/28 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/78 backdrop-blur-md">
                        {card.label}
                      </span>
                    </div>

                    <div className="max-w-[18rem] transition duration-500 group-hover:-translate-y-1.5">
                      <h3 className="text-[1.85rem] font-semibold tracking-tight text-text-primary font-serif sm:text-[2.1rem] lg:text-[2.35rem]">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </NextLink>
            ))}
          </div>
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
            href={`/${lang}/kontakt`}
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
      <SocialSection content={dictionary} />
      <MaterialsSection lang={lang} content={dictionary} />
      <AboutSection lang={lang} content={dictionary} />
      <SiteFooter lang={lang} content={dictionary} />
    </main>
  );
}

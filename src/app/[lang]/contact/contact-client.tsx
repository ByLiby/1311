"use client";

import NextLink from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Lang } from "../../_components/catalog-page";

type ContactDictionary = {
  contactCta: string;
  about: {
    headline: string;
    p1: string;
    p2: string;
    p3: string;
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
  nav: {
    home: string;
    materials: string;
    about: string;
  };
};

const languages: { code: Lang; label: string }[] = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export default function ContactPageClient({
  lang,
  dictionary,
}: {
  lang: Lang;
  dictionary: ContactDictionary;
}) {
  const d = dictionary;

  return (
    <main className="min-h-screen bg-base text-text-primary">
      {/* Header */}
      <header className="border-b border-divider bg-base/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NextLink href={`/${lang}`} className="shrink-0">
            <p className="text-lg font-semibold tracking-tight text-text-primary">
              {d.footer.company}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
              {d.footer.tagline}
            </p>
          </NextLink>

          <nav className="hidden items-center gap-8 lg:flex">
            <NextLink href={`/${lang}`} className="text-[13px] text-text-secondary transition hover:text-text-primary">
              {d.nav.home}
            </NextLink>
            <NextLink href={`/${lang}#portfolio`} className="text-[13px] text-text-secondary transition hover:text-text-primary">
              {d.nav.materials}
            </NextLink>
            <NextLink href={`/${lang}#about`} className="text-[13px] text-text-secondary transition hover:text-text-primary">
              {d.nav.about}
            </NextLink>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <span className="inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-[13px] font-medium text-base">
              {d.contactCta}
            </span>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
              {languages.map((item, index) => (
                <span key={item.code} className="inline-flex items-center gap-1">
                  <NextLink
                    href={`/${item.code}/contact`}
                    className={`px-1 py-0.5 transition ${
                      item.code === lang
                        ? "text-gold"
                        : "text-text-secondary/50 hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </NextLink>
                  {index < languages.length - 1 && (
                    <span className="text-text-secondary/20">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl font-serif">
            {d.about.headline}
          </h1>
          <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-text-secondary text-left">
            <p>{d.about.p1}</p>
            <p>{d.about.p2}</p>
            <p>{d.about.p3}</p>
          </div>

          {/* Structured contact block */}
          <div className="mt-14 rounded-md border border-divider bg-card-bg p-8">
            <p className="text-base font-semibold text-text-primary">
              {d.footer.company}
            </p>
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex items-start justify-center gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold/60" />
                <div className="text-sm leading-relaxed text-text-secondary text-left">
                  {d.footer.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone size={15} className="shrink-0 text-gold/60" />
                <a
                  href={`tel:${d.footer.phone.replace(/\s/g, "")}`}
                  className="text-sm text-text-secondary transition hover:text-text-primary"
                >
                  {d.footer.phone}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail size={15} className="shrink-0 text-gold/60" />
                <a
                  href={`mailto:${d.footer.email}`}
                  className="text-sm text-text-secondary transition hover:text-text-primary"
                >
                  {d.footer.email}
                </a>
              </div>
            </div>
          </div>

          {/* Subtle CTA at bottom */}
          <div className="mt-12">
            <a
              href={`mailto:${d.footer.email}`}
              className="inline-flex items-center rounded-md bg-gold px-7 py-3.5 text-sm font-medium text-base transition hover:bg-gold-hover"
            >
              {d.contactCta}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-divider bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-center text-xs text-text-secondary/40">
            {"© "}
            {new Date().getFullYear()} {d.footer.company}.{" "}
            {d.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}

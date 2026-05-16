"use client";

import NextLink from "next/link";
import type { SiteDictionary } from "@/lib/dictionary";
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n";

function getContactHref(
  kind: "phone" | "whatsapp" | "email",
  dictionary: SiteDictionary,
  emailSubject: string,
) {
  const phone = dictionary.footer.phone;
  const email = dictionary.footer.email;

  if (kind === "phone") {
    return {
      href: `tel:${phone.replace(/\s/g, "")}`,
      external: false,
    };
  }

  if (kind === "whatsapp") {
    return {
      href: `https://wa.me/${phone.replace(/\D/g, "")}`,
      external: true,
    };
  }

  return {
    href: `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`,
    external: false,
  };
}

export default function ContactPage({
  lang,
  dictionary,
}: {
  lang: SupportedLang;
  dictionary: SiteDictionary;
}) {
  const copy = dictionary.contactPage;
  const languageOptions = SUPPORTED_LANGS.map((code) => ({
    code,
    label: dictionary.languageSwitcher[code],
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-base text-text-primary">
      <header className="relative z-10 border-b border-divider bg-base/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 xl:px-16">
          <NextLink href={`/${lang}`} className="shrink-0">
            <p className="text-lg font-semibold tracking-tight text-text-primary">
              {dictionary.footer.company}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              {dictionary.footer.tagline}
            </p>
          </NextLink>

          <div className="flex flex-col gap-4 lg:items-end">
            <nav className="flex flex-wrap items-center gap-5 text-[12px] uppercase tracking-[0.16em] text-text-secondary/70">
              <NextLink href={`/${lang}`} className="transition hover:text-text-primary">
                {dictionary.nav.home}
              </NextLink>
              <NextLink href={`/${lang}#about`} className="transition hover:text-text-primary">
                {dictionary.nav.about}
              </NextLink>
              <span className="text-text-primary underline decoration-gold underline-offset-4">
                {copy.headline}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
              {languageOptions.map((item, index) => (
                <span key={item.code} className="inline-flex items-center gap-1">
                  <NextLink
                    href={`/${item.code}/kontakt`}
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
        </div>
      </header>

      <section className="relative z-10">
        <div className="mx-auto max-w-[1500px] px-6 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-12 lg:pb-24 xl:px-16">
          <div className="max-w-3xl border-b border-divider pb-16 sm:pb-20">
            <NextLink
              href={`/${lang}`}
              className="group inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.18em] text-text-secondary transition duration-300 hover:text-text-primary"
              aria-label={copy.backAriaLabel}
            >
              <span className="transition duration-300 group-hover:-translate-x-1">&larr;</span>
              <span>{copy.backLabel}</span>
            </NextLink>

            <div className="ml-6 inline-flex items-center gap-4 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-text-secondary sm:ml-8">
              <span className="h-px w-12 bg-gold" />
              <span>{copy.eyebrow}</span>
            </div>

            <h1 className="mt-7 font-serif text-5xl tracking-tight text-text-primary sm:text-6xl md:text-7xl">
              {copy.headline}
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-text-secondary md:text-[1.15rem]">
              {copy.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {copy.options.map((option, index) => {
              const optionKind = option.kind as "phone" | "whatsapp" | "email";
              const contactLink = getContactHref(optionKind, dictionary, copy.emailSubject);
              const detail =
                optionKind === "email"
                  ? dictionary.footer.email
                  : optionKind === "phone"
                    ? dictionary.footer.phone
                    : undefined;

              return (
                <a
                  key={option.title}
                  href={contactLink.href}
                  target={contactLink.external ? "_blank" : undefined}
                  rel={contactLink.external ? "noreferrer" : undefined}
                  className="group flex min-h-[320px] flex-col justify-between rounded-[2rem] border border-divider bg-card-bg p-8 transition duration-500 hover:-translate-y-1 hover:bg-card-bg-hover hover:shadow-[0_24px_70px_rgba(0,0,0,0.6)] md:p-10"
                >
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.28em] text-text-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-12 font-serif text-[2rem] tracking-tight text-text-primary">
                      {option.title}
                    </h2>
                    <p className="mt-4 max-w-[18rem] text-base leading-7 text-text-secondary">
                      {option.text}
                    </p>
                    {detail ? (
                      <p className="mt-10 text-sm tracking-[0.08em] text-text-primary">
                        {detail}
                      </p>
                    ) : (
                      <div className="mt-10 h-[1.25rem]" aria-hidden="true" />
                    )}
                  </div>

                  <span className="mt-14 inline-flex items-center gap-4 text-sm uppercase tracking-[0.16em] text-text-primary">
                    <span>{option.cta}</span>
                    <span className="h-px w-10 bg-gold transition-all duration-300 group-hover:w-14" />
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-16 max-w-3xl border-t border-divider pt-8 text-sm leading-7 text-text-secondary">
            {copy.b2bNote}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-divider bg-base">
        <div className="mx-auto max-w-[1500px] px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-text-secondary/60">
            <NextLink href={`/${lang}/impressum`} className="transition hover:text-text-secondary">
              {dictionary.footer.legalNotice}
            </NextLink>
            <span className="text-text-secondary/30">|</span>
            <NextLink href={`/${lang}/datenschutz`} className="transition hover:text-text-secondary">
              {dictionary.footer.privacyPolicy}
            </NextLink>
          </div>
          <p className="mt-4 text-center text-xs text-text-secondary/40">
            {"© "}
            {new Date().getFullYear()} {dictionary.footer.company}. {dictionary.footer.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}

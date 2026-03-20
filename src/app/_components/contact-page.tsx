"use client";

import NextLink from "next/link";
import type { SiteDictionary } from "@/lib/dictionary";
import { SUPPORTED_LANGS, type SupportedLang } from "@/lib/i18n";

const CONTACT_EXPERIENCE_COPY: Record<
  SupportedLang,
  {
    eyebrow: string;
    headline: string;
    intro: string;
    options: Array<{
      title: string;
      text: string;
      detail?: string;
      cta: string;
      kind: "phone" | "whatsapp" | "email";
    }>;
    b2bNote: string;
  }
> = {
  de: {
    eyebrow: "Persoenliche Beratung",
    headline: "Kontakt",
    intro: "Wir beraten Sie persoenlich zu Materialien, Projekten und Verfuegbarkeiten.",
    options: [
      {
        title: "Telefon",
        text: "Sprechen Sie direkt mit uns",
        detail: "+43 676 4725428",
        cta: "Jetzt anrufen",
        kind: "phone",
      },
      {
        title: "WhatsApp",
        text: "Schnelle Anfrage mit Bildern moeglich",
        cta: "Nachricht senden",
        kind: "whatsapp",
      },
      {
        title: "E-Mail",
        text: "Fuer detaillierte Anfragen und Projekte",
        cta: "Anfrage senden",
        kind: "email",
      },
    ],
    b2bNote:
      "Fuer groessere Projekte oder regelmaessige Abnahmen bieten wir persoenliche Beratung und langfristige Zusammenarbeit.",
  },
  en: {
    eyebrow: "Personal Consultation",
    headline: "Contact",
    intro: "We advise you personally on materials, projects, and availability.",
    options: [
      {
        title: "Phone",
        text: "Speak with us directly",
        detail: "+43 676 4725428",
        cta: "Call now",
        kind: "phone",
      },
      {
        title: "WhatsApp",
        text: "Quick inquiries with photos possible",
        cta: "Send message",
        kind: "whatsapp",
      },
      {
        title: "Email",
        text: "For detailed inquiries and projects",
        cta: "Send inquiry",
        kind: "email",
      },
    ],
    b2bNote:
      "For larger projects or recurring orders, we offer personal consultation and long-term collaboration.",
  },
  ru: {
    eyebrow: "Personalnaya Konsultatsiya",
    headline: "Kontakty",
    intro: "My lichno konsultiruem po materialam, proektam i nalichiyu.",
    options: [
      {
        title: "Telefon",
        text: "Svjazhites s nami napryamuyu",
        detail: "+43 676 4725428",
        cta: "Pozvonit seichas",
        kind: "phone",
      },
      {
        title: "WhatsApp",
        text: "Bystryi zapros s fotografiyami",
        cta: "Otpravit soobshchenie",
        kind: "whatsapp",
      },
      {
        title: "E-Mail",
        text: "Dlya detalnykh zaprosov i proektov",
        cta: "Otpravit zapros",
        kind: "email",
      },
    ],
    b2bNote:
      "Dlya bolee krupnykh proektov ili regulyarnykh zakupok my predlagaem personalnuyu konsultatsiyu i dolgosrochnoe sotrudnichestvo.",
  },
};

function getContactHref(
  kind: "phone" | "whatsapp" | "email",
  dictionary: SiteDictionary,
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
    href: `mailto:${email}?subject=${encodeURIComponent("Anfrage zu Materialien")}`,
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
  const copy = CONTACT_EXPERIENCE_COPY[lang];
  const languageOptions = SUPPORTED_LANGS.map((code) => ({
    code,
    label: dictionary.languageSwitcher[code],
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050506] text-text-primary">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(198,168,107,0.14),transparent_26%),radial-gradient(circle_at_82%_14%,rgba(110,126,160,0.12),transparent_22%),linear-gradient(180deg,#040405_0%,#050506_38%,#08090b_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_18%,rgba(0,0,0,0.28)_62%,rgba(0,0,0,0.44)_100%)]"
      />

      <header className="relative z-10 border-b border-white/8 bg-[#050506]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 xl:px-16">
          <NextLink href={`/${lang}`} className="shrink-0">
            <p className="text-lg font-semibold tracking-tight text-text-primary">
              {dictionary.footer.company}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
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
              <span className="text-gold">{copy.headline}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-1 text-[11px] uppercase tracking-[0.15em]">
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

      <section className="relative z-10">
        <div className="mx-auto max-w-[1500px] px-6 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-12 lg:pb-24 xl:px-16">
          <div className="max-w-3xl border-b border-white/10 pb-16 sm:pb-20">
            <NextLink
              href="/"
              className="group inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.18em] text-white/54 transition duration-300 hover:text-white/74"
              aria-label="Zurück zur Startseite"
            >
              <span className="transition duration-300 group-hover:-translate-x-1">&larr;</span>
              <span>Zurück</span>
            </NextLink>

            <div className="inline-flex items-center gap-4 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-[#d7c39a]/82">
              <span className="h-px w-12 bg-gradient-to-r from-[#d7c39a] to-transparent" />
              <span>{copy.eyebrow}</span>
            </div>

            <h1 className="mt-7 font-serif text-5xl tracking-tight text-white sm:text-6xl md:text-7xl">
              {copy.headline}
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-white/68 md:text-[1.15rem]">
              {copy.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {copy.options.map((option, index) => {
              const contactLink = getContactHref(option.kind, dictionary);
              const detail =
                option.kind === "email" ? dictionary.footer.email : option.detail;

              return (
                <a
                  key={option.title}
                  href={contactLink.href}
                  target={contactLink.external ? "_blank" : undefined}
                  rel={contactLink.external ? "noreferrer" : undefined}
                  className="group flex min-h-[320px] flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition duration-500 hover:-translate-y-1 hover:border-[#d7c39a]/28 hover:bg-white/[0.05] hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:p-10"
                >
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.28em] text-white/34">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-12 font-serif text-[2rem] tracking-tight text-white">
                      {option.title}
                    </h2>
                    <p className="mt-4 max-w-[18rem] text-base leading-7 text-white/65">
                      {option.text}
                    </p>
                    {detail ? (
                      <p className="mt-10 text-sm tracking-[0.08em] text-white/82">
                        {detail}
                      </p>
                    ) : (
                      <div className="mt-10 h-[1.25rem]" aria-hidden="true" />
                    )}
                  </div>

                  <span className="mt-14 inline-flex items-center gap-4 text-sm uppercase tracking-[0.16em] text-[#d7c39a]">
                    <span>{option.cta}</span>
                    <span className="h-px w-10 bg-current transition-all duration-300 group-hover:w-14" />
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-16 max-w-3xl border-t border-white/10 pt-8 text-sm leading-7 text-white/52">
            {copy.b2bNote}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/8">
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

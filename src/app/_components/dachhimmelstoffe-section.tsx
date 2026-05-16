"use client";

import Image from "next/image";
import { Check, MessageCircle, PackageCheck, Ruler, Truck } from "lucide-react";
import DachhimmelstoffeGallery from "@/app/_components/dachhimmelstoffe-gallery";
import MaterialSupportSection from "@/app/_components/material-support-section";
import {
  HIMMELSTOFFE_COPY,
  HIMMELSTOFFE_WHATSAPP_LINK,
  himmelstoffImages,
} from "@/data/himmelstoffe";
import type { SupportedLang } from "@/lib/i18n";

const HERO_IMAGE_SRC = "/images/Himmelstoffe/1.png";

const badgeIcons = [Ruler, PackageCheck, Truck, Check] as const;

export default function DachhimmelstoffeSection({ lang }: { lang: SupportedLang }) {
  const copy = HIMMELSTOFFE_COPY[lang];

  return (
    <div className="space-y-12 md:space-y-14">
      <section className="luxury-glass-panel overflow-hidden rounded-[2rem] border border-divider shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
          <div className="flex flex-col justify-center px-5 py-8 sm:px-7 sm:py-10 lg:px-9">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-text-secondary">
              {copy.heroEyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-[2.25rem] font-semibold leading-[1.04] tracking-tight text-text-primary sm:text-[2.9rem] lg:text-[3.35rem]">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-text-primary/86 sm:text-[1.05rem]">
              {copy.subtitle}
            </p>
            {copy.intro ? (
              <p className="mt-4 max-w-2xl text-sm leading-6 text-text-secondary sm:text-[0.98rem]">
                {copy.intro}
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-2.5">
              {copy.heroBadges.map((badge, index) => {
                const Icon = badgeIcons[index] ?? Check;

                return (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/24 px-3.5 py-2 text-xs font-medium text-text-primary shadow-[0_10px_26px_rgba(0,0,0,0.28)]"
                  >
                    <Icon size={14} strokeWidth={2.3} className="text-gold" />
                    {badge}
                  </span>
                );
              })}
            </div>

            <a
              href={HIMMELSTOFFE_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="luxury-button luxury-button-primary mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full border border-gold bg-gold px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-base transition sm:w-fit"
            >
              <MessageCircle size={17} strokeWidth={2.2} />
              <span>{copy.ctaButton}</span>
            </a>
          </div>

          <div className="relative min-h-[24rem] overflow-hidden border-t border-divider bg-black/40 sm:min-h-[32rem] lg:min-h-full lg:border-l lg:border-t-0">
            <Image
              src={HERO_IMAGE_SRC}
              alt={copy.heroImageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.52),transparent_42%),linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.72))]" />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 max-w-3xl">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-text-secondary">
            {copy.galleryEyebrow}
          </p>
          <h2 className="mt-3 font-serif text-[2rem] font-semibold tracking-tight text-text-primary sm:text-[2.45rem]">
            {copy.galleryTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-[0.98rem]">
            {copy.galleryText}
          </p>
        </div>

        <DachhimmelstoffeGallery lang={lang} />
      </section>

      <MaterialSupportSection
        blocks={[
          {
            title: copy.suitableTitle,
            items: copy.suitableItems,
            columns: "two",
          },
          {
            title: copy.trustTitle,
            items: copy.trustItems,
          },
        ]}
        image={{
          src: "/images/Himmelstoffe/12.png",
          alt: himmelstoffImages[0].alt,
        }}
        cta={{
          title: copy.ctaTitle,
          text: copy.ctaText,
          buttonLabel: copy.ctaButton,
          buttonHref: HIMMELSTOFFE_WHATSAPP_LINK,
        }}
      />
    </div>
  );
}

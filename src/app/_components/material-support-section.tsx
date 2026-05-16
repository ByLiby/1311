"use client";

import Image from "next/image";
import { Check, MessageCircle, Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

type MaterialSupportBlock = {
  title: string;
  items: string[];
  columns?: "one" | "two";
};

type MaterialSupportSectionProps = {
  blocks: [MaterialSupportBlock, MaterialSupportBlock];
  image: {
    src: string;
    alt: string;
  };
  cta: {
    title: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
  };
};

function InfoAccordion({
  title,
  items,
  columns = "one",
}: MaterialSupportBlock) {
  const contentId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? Minus : Plus;
  const itemGridClass =
    columns === "two" ? "grid gap-3 sm:grid-cols-2" : "grid gap-3";

  return (
    <div className="luxury-glass-panel overflow-hidden rounded-[1.7rem] border border-divider shadow-[0_22px_62px_rgba(0,0,0,0.54)] transition duration-500 hover:border-gold/28">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={`${title} ${isOpen ? "schließen" : "öffnen"}`}
        onClick={() => setIsOpen((open) => !open)}
        className="group flex w-full items-center justify-between gap-4 px-5 py-6 text-left transition hover:bg-card-bg/35 sm:px-6 sm:py-7"
      >
        <h2 className="font-serif text-[1.85rem] font-semibold tracking-tight text-text-primary">
          {title}
        </h2>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/28 bg-black/30 text-gold shadow-[0_12px_32px_rgba(0,0,0,0.34)] transition duration-300 group-hover:border-gold/50 group-hover:bg-black/42">
          <Icon size={18} strokeWidth={2.4} />
        </span>
      </button>

      <div
        id={contentId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className={`${itemGridClass} px-5 pb-6 sm:px-6 sm:pb-7`}>
            {items.map((item) => (
              <div
                key={item}
                className="flex min-h-[3.35rem] items-center gap-3 rounded-[1rem] border border-divider bg-card-bg px-4 py-3 text-sm leading-5 text-text-secondary"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/42 text-gold">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MaterialSupportSection({
  blocks,
  image,
  cta,
}: MaterialSupportSectionProps) {
  return (
    <div className="space-y-5">
      <section className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        {blocks.map((block) => (
          <InfoAccordion key={block.title} {...block} />
        ))}
      </section>

      <section className="luxury-glass-panel overflow-hidden rounded-[2rem] border border-divider shadow-[0_24px_70px_rgba(0,0,0,0.62)]">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-stretch">
          <div className="relative min-h-[18rem] overflow-hidden border-b border-divider bg-black/40 lg:border-b-0 lg:border-r">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_34%,rgba(0,0,0,0.72))]" />
          </div>

          <div className="px-5 py-8 text-center sm:px-8 sm:py-11 lg:flex lg:flex-col lg:items-start lg:justify-center lg:text-left">
            <h2 className="font-serif text-[2rem] font-semibold leading-tight tracking-tight text-text-primary sm:text-[2.45rem]">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text-secondary lg:mx-0">
              {cta.text}
            </p>
            <a
              href={cta.buttonHref}
              target="_blank"
              rel="noreferrer"
              className="luxury-button luxury-button-primary mt-7 inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-gold bg-gold px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-base transition"
            >
              <MessageCircle size={17} strokeWidth={2.2} />
              <span>{cta.buttonLabel}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

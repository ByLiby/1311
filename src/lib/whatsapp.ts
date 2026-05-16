import type { SupportedLang } from "@/lib/i18n";

export const SAMPLE_REQUEST_LABELS: Record<SupportedLang, string> = {
  de: "Muster anfragen",
  en: "Request sample",
  ru: "Запросить образец",
};

const sampleRequestTextByLang: Record<SupportedLang, (subject: string) => string> = {
  de: (subject) =>
    `Hallo, ich interessiere mich für ein Muster von ${subject}. Können Sie mir bitte weitere Informationen und Fotos senden?`,
  en: (subject) =>
    `Hello, I am interested in a sample of ${subject}. Could you please send me more information and photos?`,
  ru: (subject) =>
    `Здравствуйте, меня интересует образец материала ${subject}. Можете, пожалуйста, отправить дополнительную информацию и фотографии?`,
};

export function createSampleRequestWhatsappLink(
  baseHref: string,
  subject: string,
  lang: SupportedLang,
) {
  const separator = baseHref.includes("?") ? "&" : "?";

  return `${baseHref}${separator}text=${encodeURIComponent(
    sampleRequestTextByLang[lang](subject),
  )}`;
}

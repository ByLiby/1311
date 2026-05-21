import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import deDictionary from "@/dictionaries/de.json";
import { DEFAULT_LANG, isSupportedLang, type SupportedLang } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: deDictionary.meta.siteTitle,
  description: deDictionary.meta.siteDescription,
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

const htmlLangBySiteLang: Record<SupportedLang, string> = {
  de: "de-AT",
  en: "en",
  ru: "ru",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const siteLangHeader = requestHeaders.get("x-site-lang");
  const siteLang = isSupportedLang(siteLangHeader) ? siteLangHeader : DEFAULT_LANG;

  return (
    <html lang={htmlLangBySiteLang[siteLang]} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen text-foreground antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

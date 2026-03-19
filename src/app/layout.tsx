import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import deDictionary from "@/dictionaries/de.json";
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
  themeColor: "#0B0B0C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-AT" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}

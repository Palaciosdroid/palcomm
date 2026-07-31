import type { Metadata } from "next";
import "./globals.css";
import { palacios } from "@/lib/palacios-content";
import { siteConfig, siteUrl, istVorschau } from "@/lib/site-config";
import { themeToCssText } from "@/lib/theme";
import { fontVariables } from "@/lib/fonts";

// Unsere eigene Seite steht statisch im Code (src/lib/palacios-content.ts) und
// hat weder Admin-Bereich noch Redis. Sie darf deshalb — anders als eine
// Kundenseite — beim Deploy eingefroren werden.

const { meta, firma } = palacios;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: meta.title,
    template: `%s | ${firma.name}`,
  },
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: firma.rechtsform }],
  creator: firma.name,
  publisher: firma.name,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: siteUrl,
    siteName: firma.name,
    locale: siteConfig.locale.replace("-", "_"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: istVorschau
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
};

// Strukturierte Daten. Bewusst nicht über @/components/seo/JsonLd — das
// beschreibt eine Praxis mit Behandlungsangeboten, wir sind eine Agentur.
const strukturierteDaten = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: firma.name,
      description: meta.description,
      publisher: { "@id": `${siteUrl}/#organisation` },
      inLanguage: siteConfig.locale,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organisation`,
      name: firma.rechtsform,
      alternateName: firma.name,
      description: meta.description,
      url: siteUrl,
      email: firma.email,
      telephone: firma.telefon,
      vatID: firma.uid,
      areaServed: ["CH", "DE", "AT"],
      address: {
        "@type": "PostalAddress",
        streetAddress: firma.strasse,
        postalCode: firma.ort.split(" ")[0],
        addressLocality: firma.ort.split(" ").slice(1).join(" "),
        addressCountry: "CH",
      },
      // Der Einstiegspreis gehört in die strukturierten Daten, damit Google
      // ihn zeigen darf — versteckte Preise lesen sich als teuer.
      offers: {
        "@type": "Offer",
        name: "Website für Therapeut/innen und Praxen",
        price: "980",
        priceCurrency: "CHF",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "980",
          priceCurrency: "CHF",
          valueAddedTaxIncluded: true,
        },
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale} className={`scroll-smooth ${fontVariables}`}>
      <head>
        {/*
          Palette und Schrift stehen fest. Die Schriftdateien selbst liefert
          next/font vom eigenen Server aus, siehe src/lib/fonts.ts.
        */}
        <style
          id="theme-vars"
          dangerouslySetInnerHTML={{
            __html: themeToCssText(siteConfig.defaultTheme),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

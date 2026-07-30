import type { Metadata } from "next";
import "./globals.css";
import JsonLdSchemas from "@/components/seo/JsonLd";
import { readContent } from "@/lib/content-store";
import { siteConfig, siteUrl } from "@/lib/site-config";
import { googleFontsUrl, themeToCssText } from "@/lib/theme";

// Theme und SEO-Texte kommen aus dem gespeicherten Content — das Layout darf
// deshalb nicht beim Deploy eingefroren werden.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, business } = await readContent();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${business.name}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: business.fullName }],
    creator: business.name,
    publisher: business.name,
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: siteUrl,
      siteName: business.name,
      locale: siteConfig.locale.replace("-", "_"),
      type: "website",
      images: [
        {
          url: "/images/og-image.svg",
          width: 1200,
          height: 630,
          alt: business.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/images/og-image.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await readContent();
  const { theme } = content;

  return (
    <html lang={siteConfig.locale} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/*
          Palette und Schrift kommen aus dem gespeicherten Theme und werden
          direkt mitgeliefert. So steht die richtige Farbgebung schon beim
          ersten Rendern — sonst würde die Seite kurz in der Vorgabe
          aufblitzen und dann umspringen.
        */}
        <link id="theme-font-link" href={googleFontsUrl(theme.fontId)} rel="stylesheet" />
        <style
          id="theme-vars"
          dangerouslySetInnerHTML={{ __html: themeToCssText(theme) }}
        />
        <JsonLdSchemas content={content} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

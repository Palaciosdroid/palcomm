import type { Metadata } from "next";
import "./globals.css";
import JsonLdSchemas from "@/components/seo/JsonLd";

const siteUrl = "https://www.hypnose-enza.ch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hypnose Enza | Hypnosetherapie in Bern & Ostermundigen",
    template: "%s | Hypnose Enza",
  },
  description:
    "Professionelle Hypnosetherapie in Bern, Ostermundigen & schweizweit (Hausbesuche). Enza Gasser-Fiorini begleitet Sie achtsam bei Ängsten, Phobien, Stress, Burnout, Raucherentwöhnung und mehr. Diplomierte Hypnosetherapeutin VSH.",
  keywords: [
    // Lokal Bern
    "Hypnosetherapie Bern",
    "Hypnose Bern",
    "Hypnosetherapeutin Bern",
    "Hypnose Ostermundigen",
    // Schweizweit
    "Hypnosetherapie Schweiz",
    "Hypnose Schweiz",
    "Hypnosetherapeutin Schweiz",
    "Hypnose Hausbesuch Schweiz",
    "Mobile Hypnosetherapie",
    // Brand
    "Enza Gasser",
    "Hypnose Enza",
    // Themen
    "Angsttherapie Hypnose",
    "Phobien behandeln Hypnose",
    "Raucherentwöhnung Hypnose",
    "Rauchstopp Hypnose Schweiz",
    "Burnout Therapie Hypnose",
    "Stressbewältigung Hypnose",
    "Gewichtsreduktion Hypnose",
    "Abnehmen mit Hypnose",
    "Schlafstörungen Hypnose",
    "Kinderhypnose",
    "Hypnose für Kinder Schweiz",
    "Panikattacken Hypnose",
    "Flugangst Hypnose",
    "Selbstbewusstsein stärken Hypnose",
    "Sporthypnose Schweiz",
    "Allergien Hypnose",
  ],
  authors: [{ name: "Enza Gasser-Fiorini" }],
  creator: "Hypnose Enza",
  publisher: "Hypnose Enza",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Hypnose Enza | Hypnosetherapie in Bern & Ostermundigen",
    description:
      "Professionelle Hypnosetherapie in Bern. Diplomierte Hypnosetherapeutin für Ängste, Phobien, Stress, Burnout und mehr. Kostenloses Erstgespräch.",
    url: siteUrl,
    siteName: "Hypnose Enza",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hypnose Enza - Hypnosetherapie in Bern",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hypnose Enza | Hypnosetherapie in Bern",
    description:
      "Professionelle Hypnosetherapie in Bern & Ostermundigen. Achtsame Begleitung bei Ängsten, Stress und mehr.",
    images: ["/images/og-image.jpg"],
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
  verification: {
    // Google Search Console verification (später einfügen)
    // google: "dein-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <JsonLdSchemas />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

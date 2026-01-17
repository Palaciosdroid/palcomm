import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hypnose Enza | Hypnosetherapie in Bern",
  description:
    "Professionelle Hypnosetherapie in Bern. Enza Gasser-Piscitelli begleitet Sie achtsam und empathisch auf Ihrem Weg zu mehr Wohlbefinden. Therapie für Erwachsene, Kinder, Eltern und Senioren.",
  keywords:
    "Hypnosetherapie, Hypnose, Bern, Schweiz, Enza Gasser, Therapie, Angst, Stress, Wohlbefinden",
  openGraph: {
    title: "Hypnose Enza | Hypnosetherapie in Bern",
    description:
      "Professionelle Hypnosetherapie in Bern. Achtsame und empathische Begleitung auf Ihrem Weg zu mehr Wohlbefinden.",
    type: "website",
    locale: "de_CH",
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Angstfrei-Tag 2026 | Dein Vorsprung durch mentale Gesundheit",
  description:
    "Erlebe den Angstfrei-Tag am 24. Oktober 2026 im Kursaal Bern. Weltklasse-Speaker, praktische Workshops und eine Community, die dich unterstützt. Dein Vorsprung durch mentale Gesundheit.",
  keywords:
    "Angstfrei, mentale Gesundheit, Angst überwinden, Bern, Kursaal, Gabriel Palacios, Event 2026",
  openGraph: {
    title: "Angstfrei-Tag 2026 | Dein Vorsprung durch mentale Gesundheit",
    description:
      "Erlebe den Angstfrei-Tag am 24. Oktober 2026 im Kursaal Bern. Weltklasse-Speaker, praktische Workshops und eine Community.",
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
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

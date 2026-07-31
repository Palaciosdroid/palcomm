import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Kopf from "@/components/palacios/Kopf";
import Fusszeile from "@/components/palacios/Fusszeile";
import AngebotAssistent from "@/components/palacios/AngebotAssistent";
import { GRUNDPREIS, formatiereChf } from "@/lib/angebot";

// Eigene Seite statt Abschnitt auf der Startseite: Auf dem Telefon sind die
// Bausteine mehrere Bildschirmhöhen lang. Mitten in einer Startseite ist das
// eine Wand; auf einer eigenen Seite ist es ein Werkzeug, zu dem man
// zurückkommt und dessen Adresse man weitergeben kann.

export const metadata: Metadata = {
  title: "Angebot zusammenstellen",
  description: `Stell dir zusammen, was du brauchst, wähl Farben und Schrift und bestell direkt. Ab CHF ${GRUNDPREIS} einmalig, danach ab CHF 29.90 im Monat.`,
};

export default function AngebotSeite() {
  return (
    <>
      <Kopf />

      <main className="bg-base-200 px-6 pb-24 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-brand transition-colors hover:text-brand-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Startseite
          </Link>

          <header className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-brand">
              In drei Schritten
            </p>
            <h1 className="text-4xl leading-tight text-text-dark md:text-5xl">
              Stell dir zusammen, was du brauchst
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-text-medium">
              Erst der Umfang, dann das Aussehen, dann die Bestellung. Nichts
              davon ist endgültig — ergänzen lässt sich alles später.
            </p>
          </header>

          <AngebotAssistent />

          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-text-light">
            Alle Preise inkl. MwSt. Was auf Anfrage steht, offerieren wir
            persönlich; es fliesst nicht in die Summe ein. Einzeln gewählt
            gelten die Einzelpreise — die drei Vorschläge sind günstiger als
            ihre Teile. CHF {formatiereChf(GRUNDPREIS)} ist der Grundpreis,
            unter den es nicht geht.
          </p>
        </div>
      </main>

      <Fusszeile />
    </>
  );
}

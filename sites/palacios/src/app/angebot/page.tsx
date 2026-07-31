import type { Metadata } from "next";
import { ArrowLeft, Phone } from "lucide-react";
import Link from "next/link";
import { palacios } from "@/lib/palacios-content";
import Kopf from "@/components/palacios/Kopf";
import Fusszeile from "@/components/palacios/Fusszeile";
import Konfigurator from "@/components/palacios/Konfigurator";
import { GRUNDPREIS, formatiereChf } from "@/lib/angebot";

// Eigene Seite statt Abschnitt auf der Startseite: Auf dem Telefon sind die
// Bausteine rund fünf Bildschirmhöhen lang. Mitten in einer Startseite ist
// das eine Wand; auf einer eigenen Seite ist es ein Werkzeug, zu dem man
// zurückkommt und dessen Adresse man weitergeben kann.

const { firma, beratung } = palacios;

export const metadata: Metadata = {
  title: "Angebot zusammenstellen",
  description: `Stell dir zusammen, was du brauchst. Ab CHF ${GRUNDPREIS} einmalig, danach CHF 29.90 im Monat — Internetadresse und Betrieb inbegriffen.`,
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

          <header className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-brand">
              Angebot
            </p>
            <h1 className="text-4xl leading-tight text-text-dark md:text-5xl">
              Stell dir zusammen, was du brauchst
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-text-medium">
              Ein Grundpreis, und du entscheidest, was dazukommt. Nichts davon
              ist endgültig — alles lässt sich später ergänzen.
            </p>
          </header>

          <Konfigurator />

          {/* Wer lieber redet, soll nicht klicken müssen, bis er nicht mehr mag */}
          <div className="mt-16 rounded-2xl bg-white p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="text-2xl text-text-dark">{beratung.title}</h2>
                <p className="mt-3 leading-relaxed text-text-medium">
                  {beratung.text}
                </p>
                <p className="mt-3 text-sm text-text-light">{beratung.hinweis}</p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={beratung.terminHref}
                  className="rounded-full bg-brand px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  {beratung.terminText}
                </a>
                <a
                  href={firma.telefonLink}
                  className="flex items-center justify-center gap-2 rounded-full border border-brand px-6 py-3.5 font-medium text-brand transition-colors hover:bg-brand hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {firma.telefon}
                </a>
                <p className="text-center text-xs text-text-light">
                  {firma.oeffnungszeiten}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-text-light">
            Alle Preise inkl. MwSt. Diese Übersicht ist unverbindlich und noch
            kein Angebot — verbindlich wird der Preis mit unserer schriftlichen
            Auftragsbestätigung. Was auf Anfrage steht, offerieren wir
            persönlich; es fliesst nicht in die Summe ein. Einzeln gewählt
            gelten die Einzelpreise, die drei Vorschläge sind günstiger als ihre
            Teile — die Ersparnis steht in der Summe.
            {" "}
            {formatiereChf(GRUNDPREIS)} ist der Grundpreis, unter den es nicht
            geht.
          </p>
        </div>
      </main>

      <Fusszeile />
    </>
  );
}

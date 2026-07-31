import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  GRUNDLEISTUNG,
  bausteine,
  findeBaustein,
  formatiereChf,
  voreinstellungen,
  HERVORHEBUNG,
} from "@/lib/angebot";

/**
 * Die drei Vorschläge als statische Karten für die Startseite.
 *
 * Der volle Konfigurator liegt auf /angebot. Auf dem Telefon sind seine
 * Bausteine rund fünf Bildschirmhöhen Ankreuzkästchen — mitten in einer
 * Startseite, die jemand liest, um die Firma kennenzulernen, ist das eine
 * Wand. Die Karten zeigen den Preis, der Knopf führt zum Zusammenstellen.
 */
export default function Pakete() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {voreinstellungen.map((v) => {
          // Nicht nach Preis filtern: «Selbst» enthält genau einen Baustein,
          // und der kostet nichts — die Karte stünde sonst leer da.
          const enthalten = v.bausteinIds
            .map(findeBaustein)
            .filter((b): b is NonNullable<typeof b> => Boolean(b))
            .map((b) => b.name);

          return (
            <div
              key={v.id}
              className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 ${
                v.empfohlen ? "border-brand shadow-md" : "border-base-300"
              }`}
            >
              {v.empfohlen && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
                  {HERVORHEBUNG}
                </span>
              )}

              <h3 className="text-xl text-text-dark">{v.name}</h3>
              <p className="mt-1 text-3xl text-brand">CHF {formatiereChf(v.preis)}</p>
              <p className="mt-3 leading-relaxed text-text-medium">{v.fuerWen}</p>

              <ul className="mt-5 space-y-2 border-t border-base-200 pt-5">
                <li className="flex gap-2.5 text-sm text-text-medium">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>Alles aus der Grundleistung</span>
                </li>
                {enthalten.map((name) => (
                  <li key={name} className="flex gap-2.5 text-sm text-text-medium">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Was im Grundpreis immer drin ist */}
      <div className="mt-8 rounded-2xl bg-accent-100 p-6 md:p-8">
        <h3 className="mb-4 text-lg text-text-dark">
          In jedem Fall dabei — für CHF {formatiereChf(voreinstellungen[0].preis)}
        </h3>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {GRUNDLEISTUNG.map((punkt) => (
            <li key={punkt} className="flex gap-2.5 text-text-medium">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
              <span className="leading-relaxed">{punkt}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Link
          href="/angebot"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-medium text-white transition-colors hover:bg-brand-dark"
        >
          Angebot zusammenstellen
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-sm text-text-light">
          {bausteine.length} Bausteine einzeln wählbar — der Preis rechnet mit.
        </p>
      </div>
    </>
  );
}

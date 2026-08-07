"use client";

import { Phone } from "lucide-react";
import { ABO_JAEHRLICH, formatiereChf, type Summe } from "@/lib/angebot";
import { palacios } from "@/lib/palacios-content";

/** Die mitlaufende Summe — rechts auf dem Bildschirm, unten auf dem Telefon. */
export default function SummenTafel({
  summe,
  aufAnfrage,
  weiterText,
  weiter,
  imBild,
}: {
  summe: Summe;
  /** Namen der Posten, die wir separat offerieren */
  aufAnfrage: string[];
  weiterText: string;
  weiter: () => void;
  /** Steuert nur den Balken auf dem Telefon */
  imBild: boolean;
}) {
  return (
    <>
      <aside className="lg:sticky lg:top-28">
        <div className="rounded-2xl bg-text-dark p-6 text-base-50">
          <p className="text-sm text-base-300">Einmalig für die Einrichtung</p>
          <p className="mt-1 text-4xl">CHF {formatiereChf(summe.einmalig)}</p>

          {/* Der Bonus ist der einzige verbliebene Nachlass — alles andere
              ist die schlichte Summe der angehakten Kästchen. */}
          {summe.absolventenBonus > 0 && (
            <p className="mt-2 text-sm text-brand-light">
              Als Absolvent/in: CHF {formatiereChf(summe.absolventenBonus)} für
              deine Textüberarbeitung geschenkt
            </p>
          )}

          <hr className="my-5 border-white/15" />

          <p className="text-sm text-base-300">Danach monatlich</p>
          <p className="mt-1 text-2xl">CHF {formatiereChf(summe.proMonat)}</p>
          <p className="mt-1 text-xs text-base-300">
            Betrieb, Internetadresse und Updates. Monatlich kündbar. Bei
            Jahreszahlung CHF {formatiereChf(ABO_JAEHRLICH)}.
          </p>

          {aufAnfrage.length > 0 && (
            <div className="mt-5 rounded-xl bg-white/5 p-4">
              <p className="text-xs text-base-300">Offerieren wir dir separat:</p>
              <ul className="mt-1.5 space-y-1 text-sm">
                {aufAnfrage.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-base-300">
                Nicht in der Summe — der Aufwand hängt davon ab, was du dir
                vorstellst.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={weiter}
            className="mt-6 w-full rounded-full bg-brand px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-brand-dark"
          >
            {weiterText}
          </button>

          {/* Zweiter Weg als Umriss: gleich sichtbar, aber klar
              nachgeordnet. Unsicher ist man beim ersten Baustein, nicht
              beim Absenden — bis dahin hat sie längst weggeklickt. */}
          <a
            href="#beratung"
            className="mt-3 block rounded-full border border-white/30 px-6 py-3 text-center text-sm font-medium text-base-50 transition-colors hover:border-white/60 hover:bg-white/5"
          >
            Unsicher? Gemeinsam anschauen
          </a>

          <a
            href={palacios.firma.telefonLink}
            className="mt-3 flex items-center justify-center gap-2 text-sm text-base-300 transition-colors hover:text-base-50"
          >
            <Phone className="h-4 w-4" />
            {palacios.firma.telefon}
          </a>

          <p className="mt-4 text-xs leading-relaxed text-base-300">
            Alle Preise inkl. MwSt. Diese Übersicht ist unverbindlich — verbindlich
            wird der Preis mit unserer schriftlichen Auftragsbestätigung.
          </p>
        </div>
      </aside>

      {/* Auf dem Telefon steht die Tafel weit unter der Auswahl. */}
      <div
        aria-hidden={!imBild}
        className={`fixed inset-x-0 bottom-0 z-40 bg-text-dark px-5 py-3 text-base-50 shadow-[0_-8px_24px_rgba(0,0,0,0.18)] transition-transform duration-300 lg:hidden ${
          imBild ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.7rem] text-base-300">
              Einrichtung einmalig · unverbindlich
            </p>
            <p className="text-xl leading-tight">
              CHF {formatiereChf(summe.einmalig)}
              <span className="ml-2 text-xs text-base-300">
                + {formatiereChf(summe.proMonat)}/Mt
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={weiter}
            tabIndex={imBild ? undefined : -1}
            className="shrink-0 rounded-full bg-brand px-5 py-3 text-sm font-medium text-white"
          >
            {weiterText}
          </button>
        </div>
      </div>
    </>
  );
}

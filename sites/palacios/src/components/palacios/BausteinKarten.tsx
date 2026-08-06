"use client";

import { Check, Info } from "lucide-react";
import {
  bausteine,
  findeBaustein,
  formatiereChf,
  type Baustein,
  type BausteinGruppe,
} from "@/lib/angebot";

/**
 * Die Baustein-Gruppen mit ihren Überschriften — an einer Stelle, weil der
 * Konfigurator sie seit dem Vier-Schritte-Umbau auf zwei Schritte verteilt:
 * Schritt 1 trägt Texte und Adresse (was jede Bestellung entscheiden muss),
 * Schritt 2 alles Freiwillige.
 */
export const GRUPPEN_INFO: Record<BausteinGruppe, { name: string; lead: string }> = {
  texte: { name: "Deine Texte", lead: "Wer schreibt — das macht den grössten Unterschied." },
  sichtbarkeit: { name: "Gefunden werden", lead: "Damit du nicht nur online bist, sondern auch auffindbar." },
  // Domain und E-Mail stehen beieinander, weil sie zusammengehören: Die
  // E-Mail-Adresse entsteht aus der Internetadresse.
  adresse: { name: "Deine Adresse im Netz", lead: "Internetadresse und E-Mail — beides läuft auf deinen Namen." },
  auftritt: { name: "Dein Auftritt", lead: "Was über die Website hinausgeht: Logo, Karten, Bilder." },
  funktionen: { name: "Funktionen", lead: "Wenn deine Startseite allein nicht reicht." },
};

/**
 * Preisetikett eines Bausteins. Einmalig und monatlich werden getrennt
 * aufgeführt; «inbegriffen» steht nur, wenn wirklich nichts anfällt.
 * Vorher zeigte die SEO-Betreuung «inbegriffen · + 30/Mt» — das las sich,
 * als wäre sie geschenkt, obwohl 30 Franken im Monat anfallen.
 */
function preisEtikett(b: Baustein): string {
  if (b.nurAufAnfrage) return "auf Anfrage";
  const teile = [
    b.preis > 0 ? `+ CHF ${formatiereChf(b.preis)}` : null,
    b.proMonat ? `+ ${formatiereChf(b.proMonat)}/Mt` : null,
  ].filter(Boolean);
  return teile.length ? teile.join(" · ") : "inbegriffen";
}

export default function BausteinKarten({
  gruppen,
  gewaehlt,
  setGewaehlt,
  vorGruppe,
}: {
  /** Welche Gruppen dieser Schritt zeigt, in dieser Reihenfolge. */
  gruppen: BausteinGruppe[];
  gewaehlt: string[];
  setGewaehlt: React.Dispatch<React.SetStateAction<string[]>>;
  /** Eigener Inhalt oberhalb der Karten einer Gruppe — die Adressgruppe trägt so die Domainwahl. */
  vorGruppe?: Partial<Record<BausteinGruppe, React.ReactNode>>;
}) {
  function umschalten(baustein: Baustein) {
    setGewaehlt((vorher) => {
      if (vorher.includes(baustein.id)) {
        // Aus einer Auswahlgruppe muss immer genau eines gewählt bleiben.
        if (baustein.auswahlgruppe === "texte") return vorher;
        return vorher.filter((id) => id !== baustein.id);
      }
      const ohneGeschwister = baustein.auswahlgruppe
        ? vorher.filter((id) => findeBaustein(id)?.auswahlgruppe !== baustein.auswahlgruppe)
        : vorher;
      return [...ohneGeschwister, baustein.id];
    });
  }

  return (
    <>
      {gruppen.map((gruppeId) => {
        const info = GRUPPEN_INFO[gruppeId];
        return (
          <div key={gruppeId} className="mb-10">
            <h3 className="font-sans font-semibold text-text-dark">{info.name}</h3>
            <p className="mb-4 text-sm text-text-light">{info.lead}</p>

            {vorGruppe?.[gruppeId]}

            <div className="space-y-2.5">
              {bausteine
                .filter((b) => b.gruppe === gruppeId)
                .map((b) => {
                  const aktiv = gewaehlt.includes(b.id);
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => umschalten(b)}
                      aria-pressed={aktiv}
                      className={`flex w-full gap-4 rounded-xl border-2 bg-white p-4 text-left transition-all ${
                        aktiv ? "border-brand" : "border-base-300 hover:border-brand-light"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                          aktiv ? "bg-brand text-white" : "border-2 border-base-400"
                        }`}
                      >
                        {aktiv && <Check size={13} strokeWidth={3} />}
                      </span>

                      <span className="flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="font-medium text-text-dark">{b.name}</span>
                          <span className="text-sm text-brand">{preisEtikett(b)}</span>
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-text-medium">
                          {b.beschreibung}
                        </span>
                        {b.hinweis && (
                          <span className="mt-2 flex gap-1.5 text-xs text-text-light">
                            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            {b.hinweis}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        );
      })}
    </>
  );
}

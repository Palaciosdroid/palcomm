"use client";

import { Check } from "lucide-react";
import {
  GRUNDLEISTUNG,
  GRUNDPREIS,
  HERVORHEBUNG,
  formatiereChf,
  voreinstellungPreis,
  voreinstellungen,
  type Summe,
} from "@/lib/angebot";
import { SUGGESTED_TLDS, type DomainErgebnis } from "@/lib/funnel/domain";
import BausteinKarten from "./BausteinKarten";

/** «.ch, .de, .at oder .com» — aus der Liste gebaut, damit nichts auseinanderläuft. */
const TLD_SATZ = SUGGESTED_TLDS.map((t) => `.${t}`)
  .join(", ")
  .replace(/, ([^,]+)$/, " oder $1");

/**
 * Schritt 1: was jede Bestellung entscheiden muss — Paket, Texte, Adresse.
 * Alles Freiwillige (Sichtbarkeit, Auftritt, Funktionen) liegt seit dem
 * Vier-Schritte-Umbau in Schritt 2: Eine Bildschirmwand aus zwölf
 * Ankreuzkästchen wirkte wie ein Kostenkatalog, bevor man überhaupt
 * verstanden hatte, was man kauft.
 */
export default function SchrittUmfang({
  gewaehlt,
  setGewaehlt,
  summe,
  domain,
  setDomain,
  domainVorhanden,
  setDomainVorhanden,
  domainErgebnis,
  setDomainErgebnis,
  pruefeLaeuft,
  domainPruefen,
}: {
  gewaehlt: string[];
  setGewaehlt: React.Dispatch<React.SetStateAction<string[]>>;
  summe: Summe;
  domain: string;
  setDomain: (wert: string) => void;
  domainVorhanden: boolean;
  setDomainVorhanden: (wert: boolean) => void;
  domainErgebnis: DomainErgebnis | null;
  setDomainErgebnis: (wert: DomainErgebnis | null) => void;
  pruefeLaeuft: boolean;
  domainPruefen: (tld: string) => void;
}) {
  const adresseKarte = (
    <div className="mb-2.5 rounded-xl border-2 border-base-300 bg-white p-4">
      {/* Zwei Wege: neue Adresse suchen oder die mitbringen, die schon
          existiert. Wer seit Jahren praxis-x.ch besitzt, stand vorher vor
          einem Formular, das so tat, als gäbe es nur Neuland. */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Neue oder bestehende Adresse">
        {[
          { wert: false, text: "Ich brauche eine neue Adresse" },
          { wert: true, text: "Ich habe schon eine" },
        ].map((wahl) => (
          <button
            key={String(wahl.wert)}
            type="button"
            aria-pressed={domainVorhanden === wahl.wert}
            onClick={() => {
              setDomainVorhanden(wahl.wert);
              setDomainErgebnis(null);
            }}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              domainVorhanden === wahl.wert
                ? "border-brand bg-brand text-white"
                : "border-base-400 text-text-medium hover:border-brand hover:text-brand"
            }`}
          >
            {wahl.text}
          </button>
        ))}
      </div>

      {!domainVorhanden ? (
        <>
          <p className="mb-4 mt-4 text-sm text-text-light">
            Eine Adresse auf {TLD_SATZ} ist inbegriffen. Tipp den Wunschnamen
            ein, wir schauen sofort nach, ob er noch frei ist.
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setDomainErgebnis(null);
              }}
              placeholder="praxis-sonnenberg"
              className="min-w-[12rem] flex-1 rounded-lg border border-base-400 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            {SUGGESTED_TLDS.map((tld) => (
              <button
                key={tld}
                type="button"
                onClick={() => domainPruefen(tld)}
                disabled={!domain.trim() || pruefeLaeuft}
                className="rounded-lg border border-base-400 px-4 py-2.5 text-sm text-text-medium transition-colors hover:border-brand hover:text-brand disabled:opacity-40"
              >
                .{tld}
              </button>
            ))}
          </div>

          {pruefeLaeuft && <p className="mt-3 text-sm text-text-light">Wird geprüft…</p>}
          {domainErgebnis && (
            <p
              className={`mt-3 text-sm ${
                domainErgebnis.status === "frei"
                  ? "text-green-700"
                  : domainErgebnis.status === "vergeben"
                    ? "text-red-700"
                    : "text-text-medium"
              }`}
            >
              {domainErgebnis.hinweis}
            </p>
          )}
          <p className="mt-3 text-xs text-text-light">
            Das ist noch keine Reservation — sicher ist es erst, wenn wir die
            Adresse für dich anmelden.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4 mt-4 text-sm text-text-light">
            Schön — dann bleibt sie. Trag sie hier ein, den Rest übernehmen wir.
          </p>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="praxis-sonnenberg.ch"
            className="w-full rounded-lg border border-base-400 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <p className="mt-3 text-xs text-text-light">
            Wir ziehen deine Adresse kostenlos zu uns um oder verbinden sie mit
            der neuen Seite — je nachdem, was dein jetziger Anbieter zulässt.
            Sie bleibt dabei auf deinen Namen eingetragen, und deine bisherige
            Seite bleibt erreichbar, bis die neue steht.
          </p>
        </>
      )}
    </div>
  );

  return (
    <div>
        {/* Voreinstellungen als Abkürzung */}
        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {voreinstellungen.map((v) => {
            const aktiv = summe.passendeVoreinstellung === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setGewaehlt(v.bausteinIds)}
                aria-pressed={aktiv}
                className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                  aktiv
                    ? "border-brand bg-white shadow-md"
                    : "border-base-300 bg-white/60 hover:border-brand-light"
                }`}
              >
                {v.empfohlen && (
                  <span className="absolute -top-2.5 left-5 rounded-full bg-brand px-2.5 py-0.5 text-[0.7rem] font-medium text-white">
                    {HERVORHEBUNG}
                  </span>
                )}
                <span className="block text-lg font-medium text-text-dark">{v.name}</span>
                <span className="mt-1 block text-2xl text-brand">
                  CHF {formatiereChf(voreinstellungPreis(v))}
                </span>
                <span className="mt-2 block text-sm leading-snug text-text-medium">
                  {v.fuerWen}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mb-8 text-sm text-text-light">
          Die drei Vorschläge sind Abkürzungen — sie setzen die Häkchen unten,
          mehr nicht. Alles lässt sich einzeln an- und abwählen, und der Preis
          ist immer der Grundpreis plus das, was angehakt ist.
        </p>

        {/* Immer enthalten */}
        <div className="mb-10 rounded-2xl bg-accent-100 p-6">
          <h3 className="mb-4 font-sans font-semibold text-text-dark">
            In jedem Fall dabei — für CHF {formatiereChf(GRUNDPREIS)}
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {GRUNDLEISTUNG.map((punkt) => (
              <li key={punkt} className="flex gap-2.5 text-sm text-text-medium">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{punkt}</span>
              </li>
            ))}
          </ul>
        </div>

        <BausteinKarten
          gruppen={["texte", "adresse"]}
          gewaehlt={gewaehlt}
          setGewaehlt={setGewaehlt}
          vorGruppe={{ adresse: adresseKarte }}
        />
    </div>
  );
}

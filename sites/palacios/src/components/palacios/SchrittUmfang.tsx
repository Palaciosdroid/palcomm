"use client";

import { Check, Info } from "lucide-react";
import {
  GRUNDLEISTUNG,
  GRUNDPREIS,
  HERVORHEBUNG,
  bausteine,
  findeBaustein,
  formatiereChf,
  voreinstellungen,
  type Baustein,
  type BausteinGruppe,
  type Summe,
} from "@/lib/angebot";
import { SUGGESTED_TLDS, type DomainErgebnis } from "@/lib/funnel/domain";

const GRUPPEN: { id: BausteinGruppe; name: string; lead: string }[] = [
  { id: "texte", name: "Deine Texte", lead: "Wer schreibt — das macht den grössten Unterschied." },
  { id: "sichtbarkeit", name: "Gefunden werden", lead: "Damit du nicht nur online bist, sondern auch auffindbar." },
  { id: "auftritt", name: "Dein Auftritt", lead: "Was über die Website hinausgeht: Logo, Karten, Bilder." },
  { id: "funktionen", name: "Funktionen", lead: "Wenn deine Startseite allein nicht reicht." },
];

export default function SchrittUmfang({
  gewaehlt,
  setGewaehlt,
  summe,
  domain,
  setDomain,
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
  domainErgebnis: DomainErgebnis | null;
  setDomainErgebnis: (wert: DomainErgebnis | null) => void;
  pruefeLaeuft: boolean;
  domainPruefen: (tld: string) => void;
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
                  CHF {formatiereChf(v.preis)}
                </span>
                <span className="mt-2 block text-sm leading-snug text-text-medium">
                  {v.fuerWen}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mb-8 text-sm text-text-light">
          Die drei Vorschläge sind Abkürzungen. Alles darunter kannst du einzeln
          an- und abwählen — der Preis rechnet mit.
        </p>

        {/* Immer enthalten */}
        <div className="mb-10 rounded-2xl bg-accent-100 p-6">
          <h3 className="mb-4 font-medium text-text-dark">
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

        {/* Bausteine */}
        {GRUPPEN.map((gruppe) => (
          <div key={gruppe.id} className="mb-10">
            <h3 className="font-medium text-text-dark">{gruppe.name}</h3>
            <p className="mb-4 text-sm text-text-light">{gruppe.lead}</p>

            <div className="space-y-2.5">
              {bausteine
                .filter((b) => b.gruppe === gruppe.id)
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
                          <span className="text-sm text-brand">
                            {b.nurAufAnfrage
                              ? "auf Anfrage"
                              : b.preis > 0
                                ? `+ CHF ${formatiereChf(b.preis)}`
                                : "inbegriffen"}
                            {b.proMonat ? ` · + ${formatiereChf(b.proMonat)}/Mt` : ""}
                          </span>
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
        ))}

        {/* Wunschdomain */}
        <div className="rounded-2xl border-2 border-base-300 bg-white p-6">
          <h3 className="font-medium text-text-dark">Deine Wunschadresse</h3>
          <p className="mb-4 text-sm text-text-light">
            Eine Adresse auf .ch, .de oder .com ist inbegriffen. Tipp den Wunschnamen
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

          {pruefeLaeuft && (
            <p className="mt-3 text-sm text-text-light">Wird geprüft…</p>
          )}
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
            Das ist noch keine Reservation — sicher ist es erst, wenn wir die Adresse
            für dich anmelden.
          </p>
        </div>
    </div>
  );
}

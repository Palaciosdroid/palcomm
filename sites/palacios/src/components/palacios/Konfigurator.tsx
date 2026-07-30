"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Info, Phone } from "lucide-react";
import {
  ABO_JAEHRLICH,
  GRUNDLEISTUNG,
  GRUNDPREIS,
  bausteine,
  berechne,
  findeBaustein,
  formatiereChf,
  voreinstellungen,
  type Baustein,
  type BausteinGruppe,
} from "@/lib/angebot";
import { palacios } from "@/lib/palacios-content";
import { SUGGESTED_TLDS, type DomainErgebnis } from "@/lib/funnel/domain";

const GRUPPEN: { id: BausteinGruppe; name: string; lead: string }[] = [
  { id: "texte", name: "Ihre Texte", lead: "Wer schreibt — das ist der grösste Unterschied." },
  { id: "sichtbarkeit", name: "Gefunden werden", lead: "Damit Sie nicht nur online sind, sondern auffindbar." },
  { id: "auftritt", name: "Auftritt", lead: "Was über die Website hinausgeht." },
  { id: "funktionen", name: "Funktionen", lead: "Wenn die Startseite allein nicht reicht." },
];

/** Startauswahl: die empfohlene Voreinstellung, nicht eine leere Liste. */
const START = voreinstellungen.find((v) => v.empfohlen)!.bausteinIds;

export default function Konfigurator() {
  const [gewaehlt, setGewaehlt] = useState<string[]>(START);
  const [domain, setDomain] = useState("");
  const [domainErgebnis, setDomainErgebnis] = useState<DomainErgebnis | null>(null);
  const [pruefeLaeuft, setPruefeLaeuft] = useState(false);

  const summe = useMemo(() => berechne(gewaehlt), [gewaehlt]);

  // Auf dem Telefon steht die Summe rund fünf Bildschirmhöhen unter der
  // Auswahl. Wer dort etwas anhakt, sieht den Preis nicht mitlaufen —
  // deshalb ein schmaler Balken, solange der Konfigurator im Bild ist.
  const bereich = useRef<HTMLDivElement>(null);
  const [imBild, setImBild] = useState(false);

  useEffect(() => {
    const element = bereich.current;
    if (!element) return;
    const beobachter = new IntersectionObserver(
      ([eintrag]) => setImBild(eintrag.isIntersecting),
      { rootMargin: "-96px 0px -160px 0px" }
    );
    beobachter.observe(element);
    return () => beobachter.disconnect();
  }, []);

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

  async function domainPruefen(tld: string) {
    const name = domain.trim();
    if (!name) return;
    const voll = name.includes(".") ? name : `${name}.${tld}`;
    setPruefeLaeuft(true);
    setDomainErgebnis(null);
    try {
      const antwort = await fetch(`/api/domain?name=${encodeURIComponent(voll)}`);
      if (!antwort.ok) throw new Error(String(antwort.status));
      setDomainErgebnis(await antwort.json());
    } catch {
      // Die Prüfung selbst läuft serverseitig — die Registries erlauben keine
      // Anfragen aus dem Browser. Fällt sie aus, darf das den Verkauf nicht
      // aufhalten: Wir sagen das offen und rechnen weiter.
      setDomainErgebnis({
        domain: voll,
        status: "unbekannt",
        preisChf: null,
        inbegriffen: false,
        hinweis:
          "Wir konnten das gerade nicht prüfen. Schreiben Sie uns den Wunschnamen einfach in die Anfrage — wir schauen es für Sie nach.",
      });
    } finally {
      setPruefeLaeuft(false);
    }
  }

  return (
    <div
      ref={bereich}
      className="grid gap-10 pb-20 lg:grid-cols-[1fr_20rem] lg:items-start lg:pb-0"
    >
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
                    Empfohlen
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
          Die drei Vorschläge sind Abkürzungen. Alles darunter können Sie einzeln
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
          <h3 className="font-medium text-text-dark">Ihre Wunschdomain</h3>
          <p className="mb-4 text-sm text-text-light">
            Eine Domain auf .ch, .de oder .com ist inbegriffen. Wir prüfen sofort,
            ob sie noch frei ist.
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
            Die Prüfung ist keine Reservation. Endgültig zeigt sich das erst bei
            der Registrierung.
          </p>
        </div>
      </div>

      {/* Summe — bleibt beim Scrollen stehen */}
      <aside className="lg:sticky lg:top-28">
        <div className="rounded-2xl bg-text-dark p-6 text-base-50">
          <p className="text-sm text-base-300">Einmalig für die Einrichtung</p>
          <p className="mt-1 text-4xl">CHF {formatiereChf(summe.einmalig)}</p>

          {summe.ersparnis > 0 && (
            <p className="mt-2 text-sm text-brand-light">
              Einzeln CHF {formatiereChf(summe.ohneRabatt)} — Sie sparen{" "}
              {formatiereChf(summe.ersparnis)}
            </p>
          )}

          <hr className="my-5 border-white/15" />

          <p className="text-sm text-base-300">Danach monatlich</p>
          <p className="mt-1 text-2xl">CHF {formatiereChf(summe.proMonat)}</p>
          <p className="mt-1 text-xs text-base-300">
            Hosting, Domain und Updates. Monatlich kündbar. Bei Jahreszahlung
            CHF {formatiereChf(ABO_JAEHRLICH)}.
          </p>

          <a
            href="#kontakt"
            className="mt-6 block rounded-full bg-brand px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Unverbindlich anfragen
          </a>

          <a
            href={palacios.firma.telefonLink}
            className="mt-3 flex items-center justify-center gap-2 text-sm text-base-300 transition-colors hover:text-base-50"
          >
            <Phone className="h-4 w-4" />
            {palacios.firma.telefon}
          </a>

          <p className="mt-4 text-xs leading-relaxed text-base-300">
            Alle Preise inkl. MwSt. Diese Übersicht ist unverbindlich und noch
            kein Angebot — verbindlich wird der Preis mit unserer schriftlichen
            Auftragsbestätigung.
          </p>
        </div>
      </aside>

      {/* Mitlaufende Summe auf kleinen Bildschirmen */}
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
          <a
            href="#kontakt"
            tabIndex={imBild ? undefined : -1}
            className="shrink-0 rounded-full bg-brand px-5 py-3 text-sm font-medium text-white"
          >
            Anfragen
          </a>
        </div>
      </div>
    </div>
  );
}

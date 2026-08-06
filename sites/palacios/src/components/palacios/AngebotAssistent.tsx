"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import {
  berechne,
  voreinstellungen,
  type Summe,
} from "@/lib/angebot";
import { defaultTheme } from "@/lib/theme";
import {
  pruefeBestellung,
  trenneAuswahl,
  type Bestellung,
  type PruefErgebnis,
} from "@/lib/bestellung";
import { palacios } from "@/lib/palacios-content";
import type { DomainErgebnis } from "@/lib/funnel/domain";
import SchrittUmfang from "./SchrittUmfang";
import SchrittAussehen from "./SchrittAussehen";
import SchrittBestellen from "./SchrittBestellen";
import SummenTafel from "./SummenTafel";
import Beratung from "./Beratung";
import Vorschau from "./Vorschau";

const SCHRITTE = [
  { id: 1, name: "Umfang", weiter: "Weiter zum Aussehen" },
  { id: 2, name: "Aussehen", weiter: "Weiter zur Bestellung" },
  { id: 3, name: "Bestellen", weiter: "Zur Bestellung" },
] as const;

/** Startauswahl: die hervorgehobene Voreinstellung, nicht eine leere Liste. */
const START = voreinstellungen.find((v) => v.empfohlen)!.bausteinIds;

const LEERE_BESTELLUNG: Bestellung = {
  bausteinIds: START,
  paletteId: defaultTheme.paletteId,
  fontId: defaultTheme.fontId,
  wunschdomain: "",
  domainVorhanden: false,
  vorname: "",
  nachname: "",
  email: "",
  telefon: "",
  land: "CH",
  praxisname: "",
  istAbsolventin: false,
  sofortBeginnen: false,
  bemerkungen: "",
};

export default function AngebotAssistent() {
  const [schritt, setSchritt] = useState(1);
  const [daten, setDatenRoh] = useState<Bestellung>(LEERE_BESTELLUNG);

  const [domainErgebnis, setDomainErgebnis] = useState<DomainErgebnis | null>(null);
  const [pruefeLaeuft, setPruefeLaeuft] = useState(false);

  const [fehler, setFehler] = useState<PruefErgebnis["fehler"]>({});
  const [laeuft, setLaeuft] = useState(false);
  const [versandFehler, setVersandFehler] = useState<string | null>(null);
  const [fertig, setFertig] = useState(false);

  const oben = useRef<HTMLDivElement>(null);

  function setDaten(teil: Partial<Bestellung>) {
    setDatenRoh((vorher) => ({ ...vorher, ...teil }));
    // Ein korrigiertes Feld soll seinen Fehler sofort loswerden, nicht erst
    // beim nächsten Absenden.
    const felder = Object.keys(teil) as (keyof Bestellung)[];
    setFehler((vorher) => {
      const naechster = { ...vorher };
      felder.forEach((f) => delete naechster[f]);
      return naechster;
    });
  }

  const summe: Summe = useMemo(
    () => berechne(daten.bausteinIds, daten.istAbsolventin),
    [daten.bausteinIds, daten.istAbsolventin]
  );

  const aufAnfrage = useMemo(
    () => trenneAuswahl(daten.bausteinIds).aufAnfrage.map((b) => b.name),
    [daten.bausteinIds]
  );

  // Der Balken auf dem Telefon erscheint nur, solange der Assistent im Bild ist.
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

  function wechsle(zu: number) {
    setSchritt(zu);
    // Ohne das steht die Kund/in nach dem Wechsel mitten im neuen Schritt.
    oben.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function domainPruefen(tld: string) {
    const name = daten.wunschdomain.trim();
    if (!name) return;
    const voll = name.includes(".") ? name : `${name}.${tld}`;
    setPruefeLaeuft(true);
    setDomainErgebnis(null);
    try {
      const antwort = await fetch(`/api/domain?name=${encodeURIComponent(voll)}`);
      if (!antwort.ok) throw new Error(String(antwort.status));
      setDomainErgebnis(await antwort.json());
    } catch {
      // Die Prüfung läuft serverseitig — die Registries erlauben keine
      // Anfragen aus dem Browser. Fällt sie aus, darf das den Verkauf nicht
      // aufhalten: Wir sagen es offen und rechnen weiter.
      setDomainErgebnis({
        domain: voll,
        status: "unbekannt",
        preisChf: null,
        inbegriffen: false,
        hinweis:
          "Wir konnten das gerade nicht nachschauen. Schreib uns den Wunschnamen einfach in die Bemerkungen — wir schauen für dich nach.",
      });
    } finally {
      setPruefeLaeuft(false);
    }
  }

  async function absenden() {
    const pruefung = pruefeBestellung(daten);
    if (!pruefung.ok) {
      setFehler(pruefung.fehler);
      // Zum ersten fehlerhaften Feld springen, statt oben eine Liste zu zeigen.
      const erstes = Object.keys(pruefung.fehler)[0];
      document.getElementById(erstes)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLaeuft(true);
    setVersandFehler(null);
    try {
      const antwort = await fetch("/api/bestellung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(daten),
      });
      const ergebnis = await antwort.json();

      if (!antwort.ok) {
        if (ergebnis.fehler && typeof ergebnis.fehler === "object") {
          setFehler(ergebnis.fehler);
        } else {
          setVersandFehler(
            typeof ergebnis.fehler === "string"
              ? ergebnis.fehler
              : "Da ist etwas schiefgegangen. Bitte ruf uns an:"
          );
        }
        return;
      }

      setFertig(true);
      oben.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setVersandFehler(
        "Wir konnten die Bestellung nicht zustellen — vielleicht ist die Verbindung weg. Bitte ruf uns an:"
      );
    } finally {
      setLaeuft(false);
    }
  }

  if (fertig) {
    const { bestaetigung } = palacios.bestellen;
    return (
      <div ref={oben} className="mx-auto max-w-2xl rounded-2xl bg-white p-8 md:p-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 text-2xl text-text-dark md:text-3xl">
          {bestaetigung.title}
        </h2>
        <p className="mt-4 leading-relaxed text-text-medium">{bestaetigung.text}</p>

        <div className="mt-8 rounded-xl bg-accent-100 p-5">
          <p className="text-sm text-text-light">So sieht deine Wahl aus:</p>
          <div className="mt-3">
            <Vorschau paletteId={daten.paletteId} fontId={daten.fontId} />
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-brand px-6 py-3 font-medium text-brand transition-colors hover:bg-brand hover:text-white"
        >
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <div ref={bereich}>
      <div ref={oben} className="scroll-mt-28" />

      {/* Schrittanzeige */}
      <ol className="mb-10 flex flex-wrap gap-2">
        {SCHRITTE.map((s) => {
          const erledigt = s.id < schritt;
          const aktiv = s.id === schritt;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => erledigt && wechsle(s.id)}
                disabled={!erledigt && !aktiv}
                aria-current={aktiv ? "step" : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                  aktiv
                    ? "bg-brand text-white"
                    : erledigt
                      ? "bg-white text-text-dark hover:bg-accent-100"
                      : "bg-white/50 text-text-light"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    aktiv ? "bg-white/20" : erledigt ? "bg-brand text-white" : "bg-base-300"
                  }`}
                >
                  {erledigt ? <Check size={12} strokeWidth={3} /> : s.id}
                </span>
                {s.name}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="grid gap-10 pb-20 lg:grid-cols-[1fr_20rem] lg:items-start lg:pb-0">
        <div>
          {schritt === 1 && (
            <SchrittUmfang
              gewaehlt={daten.bausteinIds}
              setGewaehlt={(wert) =>
                setDaten({
                  bausteinIds:
                    typeof wert === "function" ? wert(daten.bausteinIds) : wert,
                })
              }
              summe={summe}
              domain={daten.wunschdomain}
              setDomain={(wert) => setDaten({ wunschdomain: wert })}
              domainVorhanden={daten.domainVorhanden}
              setDomainVorhanden={(wert) => setDaten({ domainVorhanden: wert })}
              domainErgebnis={domainErgebnis}
              setDomainErgebnis={setDomainErgebnis}
              pruefeLaeuft={pruefeLaeuft}
              domainPruefen={domainPruefen}
            />
          )}

          {schritt === 2 && (
            <SchrittAussehen
              paletteId={daten.paletteId}
              setPaletteId={(id) => setDaten({ paletteId: id })}
              fontId={daten.fontId}
              setFontId={(id) => setDaten({ fontId: id })}
            />
          )}

          {schritt === 3 && (
            <SchrittBestellen
              daten={daten}
              setDaten={setDaten}
              summe={summe}
              aufAnfrage={aufAnfrage}
              fehler={fehler}
              laeuft={laeuft}
              absenden={absenden}
              versandFehler={versandFehler}
            />
          )}

          <div className="mt-10">
            <Beratung />
          </div>

          {schritt > 1 && (
            <button
              type="button"
              onClick={() => wechsle(schritt - 1)}
              className="mt-8 inline-flex items-center gap-2 text-sm text-text-medium transition-colors hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zu {SCHRITTE[schritt - 2].name}
            </button>
          )}
        </div>

        <SummenTafel
          summe={summe}
          aufAnfrage={aufAnfrage}
          weiterText={schritt === 3 ? "Nach oben zum Formular" : SCHRITTE[schritt - 1].weiter}
          weiter={() => (schritt === 3 ? wechsle(3) : wechsle(schritt + 1))}
          imBild={imBild && !fertig}
        />
      </div>
    </div>
  );
}

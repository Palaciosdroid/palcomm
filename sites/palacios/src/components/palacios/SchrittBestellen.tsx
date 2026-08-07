"use client";

import Link from "next/link";
import { Check, Info, Loader2 } from "lucide-react";
import {
  LAENDER,
  hatWiderrufsrecht,
  type Bestellung,
  type PruefErgebnis,
} from "@/lib/bestellung";
import { formatiereChf, type Summe } from "@/lib/angebot";
import { palacios } from "@/lib/palacios-content";

const FELD =
  "w-full rounded-lg border border-base-400 bg-white px-4 py-2.5 text-text-dark focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

function Feld({
  name,
  beschriftung,
  erklaerung,
  fehler,
  children,
}: {
  name: string;
  beschriftung: string;
  erklaerung: string;
  fehler?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-medium text-text-dark">
        {beschriftung}
      </label>
      <p className="mb-2 text-sm text-text-light">{erklaerung}</p>
      {children}
      {/* Der Fehler steht beim Feld, nicht in einer Liste zuoberst — sonst
          sucht die Kund/in, welches Feld gemeint ist. */}
      {fehler && (
        <p role="alert" className="mt-1.5 text-sm text-red-700">
          {fehler}
        </p>
      )}
    </div>
  );
}

export default function SchrittBestellen({
  daten,
  setDaten,
  summe,
  aufAnfrage,
  fehler,
  laeuft,
  absenden,
  versandFehler,
}: {
  daten: Bestellung;
  setDaten: (teil: Partial<Bestellung>) => void;
  summe: Summe;
  aufAnfrage: string[];
  fehler: PruefErgebnis["fehler"];
  laeuft: boolean;
  absenden: () => void;
  versandFehler: string | null;
}) {
  const { bestellen, firma } = palacios;

  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <h2 className="text-2xl text-text-dark md:text-3xl">{bestellen.title}</h2>
        <p className="mt-3 leading-relaxed text-text-medium">{bestellen.lead}</p>
      </header>

      <form
        className="space-y-6 rounded-2xl bg-white p-6 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          absenden();
        }}
        noValidate
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Feld
            name="vorname"
            beschriftung="Vorname"
            erklaerung={bestellen.felder.name}
            fehler={fehler.vorname}
          >
            <input
              id="vorname"
              className={FELD}
              value={daten.vorname}
              autoComplete="given-name"
              onChange={(e) => setDaten({ vorname: e.target.value })}
            />
          </Feld>

          <Feld
            name="nachname"
            beschriftung="Nachname"
            erklaerung="&nbsp;"
            fehler={fehler.nachname}
          >
            <input
              id="nachname"
              className={FELD}
              value={daten.nachname}
              autoComplete="family-name"
              onChange={(e) => setDaten({ nachname: e.target.value })}
            />
          </Feld>
        </div>

        <Feld
          name="email"
          beschriftung="E-Mail"
          erklaerung={bestellen.felder.email}
          fehler={fehler.email}
        >
          <input
            id="email"
            type="email"
            inputMode="email"
            className={FELD}
            value={daten.email}
            autoComplete="email"
            onChange={(e) => setDaten({ email: e.target.value })}
          />
        </Feld>

        <Feld
          name="telefon"
          beschriftung="Telefon"
          erklaerung={bestellen.felder.telefon}
          fehler={fehler.telefon}
        >
          <input
            id="telefon"
            type="tel"
            inputMode="tel"
            className={FELD}
            value={daten.telefon}
            autoComplete="tel"
            onChange={(e) => setDaten({ telefon: e.target.value })}
          />
        </Feld>

        <Feld
          name="land"
          beschriftung="Land"
          erklaerung={bestellen.felder.land}
          fehler={fehler.land}
        >
          <div className="flex flex-wrap gap-2">
            {LAENDER.map((land) => (
              <button
                key={land.id}
                type="button"
                onClick={() => setDaten({ land: land.id })}
                aria-pressed={daten.land === land.id}
                className={`rounded-full border-2 px-5 py-2.5 transition-colors ${
                  daten.land === land.id
                    ? "border-brand bg-brand text-white"
                    : "border-base-300 text-text-medium hover:border-brand-light"
                }`}
              >
                {land.name}
              </button>
            ))}
          </div>
        </Feld>

        <Feld
          name="praxisname"
          beschriftung="Praxisname, falls schon vorhanden"
          erklaerung={bestellen.felder.praxisname}
        >
          <input
            id="praxisname"
            className={FELD}
            value={daten.praxisname}
            onChange={(e) => setDaten({ praxisname: e.target.value })}
          />
        </Feld>

        {/* Der Bonus rechnet sofort mit — deshalb steht er hier und nicht in
            einer Fussnote. */}
        <label className="flex cursor-pointer gap-3 rounded-xl bg-accent-100 p-4">
          <input
            type="checkbox"
            checked={daten.istAbsolventin}
            onChange={(e) => setDaten({ istAbsolventin: e.target.checked })}
            className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--brand)]"
          />
          <span>
            <span className="block font-medium text-text-dark">
              Ich habe eine Ausbildung beim Palacios Institut abgeschlossen
            </span>
            <span className="mt-1 block text-sm leading-snug text-text-medium">
              {bestellen.felder.absolventin}
            </span>
            {daten.istAbsolventin && summe.absolventenBonus > 0 && (
              <span className="mt-2 block text-sm font-medium text-brand">
                CHF {formatiereChf(summe.absolventenBonus)} abgezogen.
              </span>
            )}
          </span>
        </label>

        {/* Ausdrückliches Verlangen nach § 356 Abs. 4 BGB.
            Ohne dieses Häkchen dürfen wir bei Verbraucherinnen aus der EU erst
            nach vierzehn Tagen anfangen — und ohne den Satz zum Erlöschen des
            Widerrufsrechts schuldet die Kundin bei Widerruf keinen Wertersatz
            (§ 357 Abs. 8 BGB). Der Wortlaut folgt dem Gesetz und ist bewusst
            nicht schöner formuliert.

            Vorbelegen wäre unzulässig: Die Zustimmung muss aktiv gesetzt
            werden.

            Nur für DE und AT. Bei einer Schweizer Bestellung über dieses
            Formular gibt es kein gesetzliches Widerrufsrecht, das Kästchen
            wäre also folgenlos — und ein folgenloses Kästchen mit vier Zeilen
            Paragrafendeutsch lässt die Bestellung schwerer aussehen, als sie
            ist. Die Erklärung dazu steht in hatWiderrufsrecht(). */}
        {hatWiderrufsrecht(daten.land) && (
          <label className="flex cursor-pointer gap-3 rounded-xl border border-base-300 p-4">
            <input
              type="checkbox"
              checked={daten.sofortBeginnen}
              onChange={(e) => setDaten({ sofortBeginnen: e.target.checked })}
              className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--brand)]"
            />
            <span>
              <span className="block font-medium text-text-dark">
                Ihr dürft sofort anfangen
              </span>
              <span className="mt-1 block text-sm leading-snug text-text-medium">
                Ich verlange ausdrücklich, dass ihr vor Ablauf der
                Widerrufsfrist mit der Arbeit beginnt. Mir ist bekannt, dass
                ich mein Widerrufsrecht verliere, sobald ihr die Leistung
                vollständig erbracht habt, und dass ich bei einem Widerruf
                davor den Wert der bis dahin erbrachten Arbeit zu ersetzen
                habe. Einzelheiten in der{" "}
                <Link href="/widerruf" className="text-brand underline">
                  Widerrufsbelehrung
                </Link>
                .
              </span>
              <span className="mt-2 block text-sm leading-snug text-text-light">
                Ohne dieses Häkchen fangen wir erst in vierzehn Tagen an.
              </span>
            </span>
          </label>
        )}

        <Feld
          name="bemerkungen"
          beschriftung="Bemerkungen"
          erklaerung={bestellen.felder.bemerkungen}
        >
          <textarea
            id="bemerkungen"
            rows={4}
            className={FELD}
            value={daten.bemerkungen}
            onChange={(e) => setDaten({ bemerkungen: e.target.value })}
          />
        </Feld>

        {/* Was auf Anfrage geht, darf hier nicht untergehen */}
        {aufAnfrage.length > 0 && (
          <p className="flex gap-2.5 rounded-xl bg-base-200 p-4 text-sm leading-relaxed text-text-medium">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>{bestellen.aufAnfrageHinweis}</span>
          </p>
        )}

        <div className="rounded-xl border border-base-300 p-5">
          <p className="font-medium text-text-dark">{bestellen.beruhigung.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-text-medium">
            {bestellen.beruhigung.text}
          </p>
        </div>

        {/* Zustimmung zu den Bedingungen. Steht bewusst unmittelbar vor dem
            Knopf und nicht bei den anderen Kästchen weiter oben: An dieser
            Stelle ist die Bestellung fertig, und was hier zugestimmt wird,
            gilt für alles darüber.

            Die Formulierung nennt beim Namen, wofür die Kund/in einsteht —
            Inhalte, Bildrechte, eigene Tätigkeit. Ein blosses «Ich akzeptiere
            die AGB» erfüllt zwar § 305 Abs. 2 BGB, aber niemand liest die
            AGB; diese drei Zeilen liest sie. */}
        <label
          id="bedingungenAkzeptiert"
          className={`flex cursor-pointer gap-3 rounded-xl border p-4 ${
            fehler.bedingungenAkzeptiert ? "border-red-400 bg-red-50" : "border-base-300"
          }`}
        >
          <input
            type="checkbox"
            checked={daten.bedingungenAkzeptiert}
            onChange={(e) => setDaten({ bedingungenAkzeptiert: e.target.checked })}
            className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--brand)]"
            aria-invalid={Boolean(fehler.bedingungenAkzeptiert)}
          />
          <span>
            <span className="block font-medium text-text-dark">
              Bedingungen und Verantwortung für die Inhalte
            </span>
            <span className="mt-1 block text-sm leading-snug text-text-medium">
              Ich bin mit den{" "}
              <Link href="/agb-website" className="text-brand underline">
                AGB
              </Link>{" "}
              und der{" "}
              <Link href="/datenschutz" className="text-brand underline">
                Datenschutzerklärung
              </Link>{" "}
              einverstanden. Mir ist klar: Für die Inhalte meiner Website bin
              ich selbst verantwortlich — für die Richtigkeit meiner Angaben zu
              Titel, Ausbildung und Methode, für die Rechte an Bildern und
              Texten, die ich schicke, und für mein eigenes Angebot. Palacios
              baut und betreibt die Website; für meine Arbeit mit meinen
              Klient/innen hafte ich allein. Hinweise zu Formulierungen sind
              Erfahrung aus der Praxis, keine Rechtsberatung.
            </span>
          </span>
        </label>

        <div className="border-t border-base-200 pt-6">
          {fehler.bedingungenAkzeptiert && (
            <p role="alert" className="mb-4 text-sm text-red-700">
              {fehler.bedingungenAkzeptiert}
            </p>
          )}

          <p className="mb-4 text-sm leading-relaxed text-text-medium">
            {bestellen.vorDemKnopf}
          </p>

          {versandFehler && (
            <p role="alert" className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-800">
              {versandFehler}{" "}
              <a href={firma.telefonLink} className="underline">
                {firma.telefon}
              </a>
            </p>
          )}

          <button
            type="submit"
            disabled={laeuft}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-60 sm:w-auto"
          >
            {laeuft && <Loader2 className="h-5 w-5 animate-spin" />}
            {/* Diese Beschriftung ist in Deutschland vorgeschrieben
                (§ 312j Abs. 3 BGB) — nicht umformulieren. */}
            {bestellen.knopf}
          </button>

          <p className="mt-3 text-sm text-text-light">
            Einmalig CHF {formatiereChf(summe.einmalig)}, danach CHF{" "}
            {formatiereChf(summe.proMonat)} im Monat. Inkl. MwSt.
          </p>
        </div>
      </form>

      {/* Was danach passiert — nimmt die Unsicherheit vor dem Klick */}
      <div className="mt-8 rounded-2xl bg-accent-100 p-6 md:p-8">
        <h3 className="font-sans text-lg font-semibold text-text-dark">{bestellen.danachTitle}</h3>
        <ol className="mt-4 space-y-3">
          {bestellen.danach.map((zeile) => (
            <li key={zeile} className="flex gap-3 leading-relaxed text-text-medium">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
              <span>{zeile}</span>
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
}

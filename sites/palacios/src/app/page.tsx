import {
  Check,
  Phone,
  Mail,
  GraduationCap,
  CalendarCheck,
  PhoneCall,
} from "lucide-react";
import { palacios } from "@/lib/palacios-content";
import { Abschnitt, Ueberschrift, Knopf } from "@/components/palacios/Basis";
import Kopf from "@/components/palacios/Kopf";
import Pakete from "@/components/palacios/Pakete";
import Fragen from "@/components/palacios/Fragen";
import Fusszeile from "@/components/palacios/Fusszeile";
import Image from "next/image";
import BrowserRahmen from "@/components/palacios/BrowserRahmen";
import Bildplatz from "@/components/palacios/Bildplatz";
import Bildstapel from "@/components/palacios/Bildstapel";
import Medienleiste from "@/components/palacios/Medienleiste";
import FliessHintergrund from "@/components/palacios/FliessHintergrund";
import { ABO_JAEHRLICH, ABO_MONATLICH, formatiereChf } from "@/lib/angebot";
import { getPalette } from "@/lib/theme";

// Die Beispielkacheln zeigen echte Paletten aus dem Template — was hier steht,
// kann die Kund/in im Admin tatsächlich auswählen.
const BEISPIELE = [
  { paletteId: "salbei", titel: "Praxis für Hypnosetherapie", hinweis: "Palette Salbei · Schrift Klassisch" },
  { paletteId: "rose", titel: "Gesprächstherapie und Begleitung", hinweis: "Palette Rose · Schrift Fein" },
  { paletteId: "ozean", titel: "Coaching und Mentaltraining", hinweis: "Palette Ozean · Schrift Warm" },
];

// Die Inhalte dieser Seite stehen statisch im Code (src/lib/palacios-content.ts).
// Das ist unsere eigene Seite — der visuelle Editor ist für Kundenseiten da.
export default function Startseite() {
  const {
    hero,
    vertrauensleiste,
    problem,
    angebot,
    abo,
    ablauf,
    ueberUns,
    abschluss,
    firma,
  } = palacios;

  return (
    <>
      <Kopf />

      <main>
        {/* Startbild */}
        {/* isolate: eigener Stapelkontext, damit der -z-10-Hintergrund über
            dem Verlauf der section liegt, aber hinter allem Inhalt. */}
        <section className="gradient-hero relative isolate overflow-hidden px-6 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
          <FliessHintergrund />
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-brand">
              {hero.kicker}
            </p>
            <h1 className="text-4xl leading-tight text-text-dark md:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-medium">
              {hero.lead}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Knopf href={hero.ctaPrimary.href}>{hero.ctaPrimary.text}</Knopf>
              <Knopf href={hero.ctaSecondary.href} variante="rand">
                {hero.ctaSecondary.text}
              </Knopf>
            </div>
            {/*
              Der Preis steht bewusst unter den Knöpfen und klein: Versteckte
              Preise lesen sich als teuer und undurchsichtig, aber als fette
              Zeile über den Knöpfen empfängt ein Preisschild die Besucherin,
              bevor sie weiss, was drin ist.
            */}
            <p className="mt-5 text-sm text-text-medium">{hero.preisNote}</p>
          </div>

          {/*
            Das Bildschirmfoto steckt in einem angedeuteten Browserfenster:
            Ein nacktes Rechteck liest sich als beliebiges Bild, erst die
            Adresszeile macht daraus unmissverständlich eine fertige Website.
            16:9 statt 16:7 — Bildschirmfotos sind höher, und zugeschnitten
            wird von oben, damit die Kopfzeile der gezeigten Seite bleibt.
          */}
          <div className="mx-auto mt-14 max-w-4xl">
            <BrowserRahmen>
              {/* Das Bild ist dreimal so hoch wie der Ausschnitt und läuft
                  langsam durch — man sieht die ganze Seite, nicht nur den
                  Kopf. Reines CSS, damit es auf jedem Telefon läuft. */}
              <div className="rahmen-fenster">
                <Image
                  src="/bilder/startbild-website.jpg"
                  alt="Beispielseite einer Praxis in der Farbwelt Salbei, gebaut mit unserer Vorlage"
                  width={1920}
                  height={3240}
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="rahmen-lauf"
                />
              </div>
            </BrowserRahmen>
          </div>
        </section>

        {/* Vertrauensleiste */}
        <div className="border-y border-base-300 bg-base-100 px-6 py-8 md:px-8">
          <ul className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 sm:gap-4 sm:divide-x sm:divide-base-300">
            {vertrauensleiste.map((punkt, i) => {
              const Symbol = { institut: GraduationCap, zeit: CalendarCheck, telefon: PhoneCall }[
                punkt.symbol as "institut" | "zeit" | "telefon"
              ];
              return (
                <li
                  key={punkt.zeile}
                  className={`flex gap-3 ${i > 0 ? "sm:pl-6" : ""}`}
                >
                  <Symbol className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.5} />
                  <span>
                    <span className="block font-sans text-sm font-semibold text-text-dark">
                      {punkt.zeile}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-text-medium">
                      {punkt.text}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Erkennen */}
        <Abschnitt>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
            <div>
              <h2 className="text-3xl leading-tight text-text-dark md:text-4xl">
                {problem.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-text-medium">
                {problem.bruecke}
              </p>
            </div>

            {/* Zwei versetzte Bilder — sie erzählen nebenbei die Reihenfolge:
                erst das Diplom, dann die Praxis. */}
            <Bildstapel
              hinten={{
                datei: "diplom.jpg",
                titel: "Das Diplom in der Hand",
                hinweis: "4:3, z. B. 1200×900",
              }}
              vorne={{
                datei: "praxisraum.jpg",
                titel: "Der eigene Praxisraum",
                hinweis: "4:3, z. B. 1200×900",
              }}
            />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problem.kacheln.map((kachel) => (
              <div key={kachel.zeile} className="rounded-2xl bg-base-100 p-5">
                <p className="font-sans font-semibold leading-snug text-text-dark">
                  {kachel.zeile}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-medium">
                  {kachel.text}
                </p>
              </div>
            ))}
          </div>
        </Abschnitt>

        {/* Was immer dabei ist */}
        <Abschnitt id="angebot" flaeche="getoent">
          <Ueberschrift lead={angebot.lead}>{angebot.title}</Ueberschrift>

          {/*
            Karten statt einer zweispaltigen Liste: Sechs gleich aussehende
            Textblöcke verschwimmen beim Überfliegen. Und die Titel stehen
            serifenlos (font-sans) — DM Serif Display ist eine Schrift für
            grosse Zeilen, bei 16 Pixel wird sie matschig.
          */}
          <div className="grid gap-4 sm:grid-cols-2">
            {angebot.punkte.map((punkt) => (
              <div
                key={punkt.title}
                className="rounded-2xl bg-base-50 p-5 md:p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10">
                  <Check className="h-4.5 w-4.5 text-brand" strokeWidth={2.5} />
                </span>
                <h3 className="mt-4 font-sans text-base font-semibold text-text-dark">
                  {punkt.title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-text-medium">{punkt.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-base-400 bg-base-50 p-6">
            <h3 className="font-sans font-semibold text-text-dark">{angebot.nichtEnthaltenTitle}</h3>
            <ul className="mt-3 space-y-2">
              {angebot.nichtEnthalten.map((punkt) => (
                <li key={punkt} className="text-text-medium">
                  {punkt}
                </li>
              ))}
            </ul>
          </div>
        </Abschnitt>

        {/* Wie das aussehen kann */}
        <Abschnitt id="beispiele" flaeche="dunkel">
          <Ueberschrift
            hell
            kicker="Beispiele"
            lead="Dieselbe Vorlage, drei Handschriften. Farben, Schrift und Texte machen den Unterschied — der Aufbau bleibt derselbe, weil er sich bewährt hat."
          >
            Wie deine Seite aussehen kann
          </Ueberschrift>

          <div className="grid gap-5 md:grid-cols-3">
            {BEISPIELE.map((beispiel) => {
              const { colors } = getPalette(beispiel.paletteId);
              return (
                <Bildplatz
                  key={beispiel.paletteId}
                  titel={beispiel.titel}
                  hinweis={beispiel.hinweis}
                  hoehe="hoch"
                  farben={[colors.brandDark, colors.brand, colors.accent200]}
                />
              );
            })}
          </div>

          <p className="mt-6 text-sm text-base-300">
            Beispiele. Sobald die ersten Seiten live sind, stehen hier echte
            Adressen statt Bilder.
          </p>
        </Abschnitt>

        {/* Ablauf */}
        <Abschnitt id="ablauf">
          <Ueberschrift>{ablauf.title}</Ueberschrift>

          {/* Zwei ungleich lange Spalten — das Mengenverhältnis sieht man,
              bevor man ein Wort liest. */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-brand bg-white p-6 md:p-8">
              <h3 className="font-sans text-lg font-semibold text-text-dark">
                {ablauf.deins.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {ablauf.deins.punkte.map((punkt) => (
                  <li key={punkt} className="flex gap-3 leading-relaxed text-text-medium">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                    <span>{punkt}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-base-200 pt-4 font-medium text-brand">
                {ablauf.deins.schluss}
              </p>
            </div>

            <div className="rounded-2xl bg-base-200 p-6 md:p-8">
              <h3 className="font-sans text-lg font-semibold text-text-dark">
                {ablauf.unseres.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {ablauf.unseres.punkte.map((punkt) => (
                  <li key={punkt} className="flex gap-3 leading-relaxed text-text-medium">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                    <span>{punkt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-text-dark">
            {ablauf.fazit}
          </p>
        </Abschnitt>

        {/* Preise */}
        <Abschnitt id="preise" flaeche="getoent">
          <Ueberschrift
            kicker="Preise"
            lead="Drei Vorschläge als Abkürzung. Wenn keiner passt, stellst du dir dein Angebot selbst zusammen — dann rechnet der Preis mit."
          >
            Was es kostet
          </Ueberschrift>

          <Pakete />

          {/* Das Abo ist keine Nebenbemerkung — es trägt den Betrieb. */}
          <div className="mt-16 grid gap-10 rounded-2xl bg-white p-8 md:grid-cols-[1fr_1.1fr] md:items-center md:p-10">
            <div>
              <h3 className="font-sans text-2xl font-semibold text-text-dark">{abo.title}</h3>
              <p className="mt-3 leading-relaxed text-text-medium">{abo.lead}</p>

              {/* Die Zahl gehört hervorgehoben, nicht in einen Absatz */}
              <div className="mt-6 inline-flex items-baseline gap-2 rounded-2xl bg-text-dark px-6 py-4 text-base-50">
                <span className="text-sm text-base-300">ab CHF</span>
                <span className="text-4xl leading-none">
                  {formatiereChf(ABO_MONATLICH)}
                </span>
                <span className="text-sm text-base-300">im Monat</span>
              </div>

              {/* Zweizeilige Box statt einer runden Pille: Der Satz war zu
                  lang, brach in der Pille um und sah abgeschnitten aus. */}
              <div className="mt-4 inline-block rounded-xl bg-accent-200 px-5 py-3">
                <p className="font-medium text-text-dark">
                  Jahrespreis CHF {formatiereChf(ABO_JAEHRLICH)}
                </p>
                <p className="text-sm text-text-medium">
                  Zwei Monate geschenkt
                </p>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-text-light">
                {abo.vergleich}
              </p>
            </div>

            <ul className="space-y-2.5">
              {abo.punkte.map((punkt) => (
                <li key={punkt} className="flex gap-3 text-text-medium">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                  <span className="leading-relaxed">{punkt}</span>
                </li>
              ))}
            </ul>
          </div>
        </Abschnitt>

        {/* Häufige Fragen */}
        <Abschnitt>
          <Ueberschrift>{palacios.faq.title}</Ueberschrift>
          <Fragen fragen={palacios.faq.fragen} />
        </Abschnitt>

        {/* Über uns */}
        <Abschnitt id="ueber-uns" flaeche="getoent">
          <Ueberschrift lead={ueberUns.untertitel}>{ueberUns.title}</Ueberschrift>

          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:items-start">
            <div>
              {ueberUns.absaetze.map((absatz) => (
                <p key={absatz} className="mb-5 leading-relaxed text-text-medium">
                  {absatz}
                </p>
              ))}
              <blockquote className="mt-8 border-l-2 border-brand pl-5">
                <p className="font-serif text-xl leading-relaxed text-text-dark">
                  «{ueberUns.zitat.text}»
                </p>
                <footer className="mt-2 text-sm text-text-light">
                  {ueberUns.zitat.quelle}
                </footer>
              </blockquote>

              {/* Füllt die Lücke unter dem Zitat und beantwortet die Frage,
                  die hier von selbst kommt: Wer steckt dahinter? */}
              <div className="mt-10 border-t border-base-300 pt-8">
                <Medienleiste />
              </div>
            </div>

            <div>
              <Bildplatz
                titel="Gabriel Palacios"
                hinweis="Hochformat, ruhiger Hintergrund. Alternativ ein Teambild."
                hoehe="hoch"
                ton="warm"
              />

              <dl className="mt-8 space-y-6">
                {ueberUns.fakten.map((faktum) => (
                  <div key={faktum.text}>
                    <dt className="text-2xl text-brand">{faktum.zahl}</dt>
                    <dd className="mt-1 text-sm text-text-medium">{faktum.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Abschnitt>

        {/* Abschluss */}
        {/* Helle Fläche: Zwei getönte Abschnitte hintereinander laufen
            ineinander und der Übergang verschwindet. */}
        <Abschnitt id="kontakt">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight text-text-dark md:text-4xl">
              {abschluss.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-medium">
              {abschluss.lead}
            </p>

            {/* Zwei gleichwertige Wege — viele wollen zuerst mit einem
                Menschen sprechen, bevor sie irgendwo klicken. */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Knopf href={abschluss.ctaHref}>{abschluss.ctaText}</Knopf>
              <Knopf href={palacios.beratung.terminHref} variante="rand">
                {palacios.beratung.terminText}
              </Knopf>
            </div>

            <p className="mt-4 text-sm text-text-light">{abschluss.telefonNote}</p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-text-medium">
              <a
                href={`mailto:${firma.email}`}
                className="flex items-center gap-2 transition-colors hover:text-brand"
              >
                <Mail className="h-4 w-4" />
                {firma.email}
              </a>
              <a
                href={firma.telefonLink}
                className="flex items-center gap-2 transition-colors hover:text-brand"
              >
                <Phone className="h-4 w-4" />
                {firma.telefon}
              </a>
            </div>
          </div>
        </Abschnitt>
      </main>

      <Fusszeile />
    </>
  );
}

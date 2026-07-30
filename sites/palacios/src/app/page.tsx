import { Check, Clock, Phone, Mail } from "lucide-react";
import { palacios } from "@/lib/palacios-content";
import { Abschnitt, Ueberschrift, Knopf } from "@/components/palacios/Basis";
import Kopf from "@/components/palacios/Kopf";
import Konfigurator from "@/components/palacios/Konfigurator";
import Fragen from "@/components/palacios/Fragen";
import Fusszeile from "@/components/palacios/Fusszeile";

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
        <section className="gradient-hero px-6 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
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
            <p className="mt-6 text-lg font-medium text-text-dark">{hero.preisNote}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Knopf href={hero.ctaPrimary.href}>{hero.ctaPrimary.text}</Knopf>
              <Knopf href={hero.ctaSecondary.href} variante="rand">
                {hero.ctaSecondary.text}
              </Knopf>
            </div>
          </div>
        </section>

        {/* Vertrauensleiste */}
        <div className="border-y border-base-300 bg-base-100 px-6 py-5 md:px-8">
          <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm text-text-medium">
            {vertrauensleiste.map((punkt) => (
              <li key={punkt} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
                {punkt}
              </li>
            ))}
          </ul>
        </div>

        {/* Erkennen */}
        <Abschnitt>
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight text-text-dark md:text-4xl">
              {problem.title}
            </h2>
            {problem.absaetze.map((absatz) => (
              <p key={absatz} className="mt-5 text-lg leading-relaxed text-text-medium">
                {absatz}
              </p>
            ))}
          </div>
        </Abschnitt>

        {/* Was immer dabei ist */}
        <Abschnitt id="angebot" flaeche="getoent">
          <Ueberschrift lead={angebot.lead}>{angebot.title}</Ueberschrift>

          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {angebot.punkte.map((punkt) => (
              <div key={punkt.title} className="flex gap-4">
                <Check className="mt-1 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-medium text-text-dark">{punkt.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-text-medium">{punkt.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-base-400 bg-base-50 p-6">
            <h3 className="font-medium text-text-dark">{angebot.nichtEnthaltenTitle}</h3>
            <ul className="mt-3 space-y-2">
              {angebot.nichtEnthalten.map((punkt) => (
                <li key={punkt} className="text-text-medium">
                  {punkt}
                </li>
              ))}
            </ul>
          </div>
        </Abschnitt>

        {/* Ablauf */}
        <Abschnitt id="ablauf">
          <Ueberschrift>{ablauf.title}</Ueberschrift>

          <ol className="grid gap-8 md:grid-cols-3">
            {ablauf.schritte.map((schritt) => (
              <li key={schritt.nummer}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-lg font-medium text-white">
                  {schritt.nummer}
                </span>
                <h3 className="mt-4 text-lg font-medium text-text-dark">{schritt.title}</h3>
                <p className="mt-2 leading-relaxed text-text-medium">{schritt.text}</p>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-brand">
                  <Clock className="h-3.5 w-3.5" />
                  {schritt.dauer}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-12 rounded-2xl bg-accent-100 p-6 text-lg leading-relaxed text-text-dark">
            {ablauf.fazit}
          </p>
        </Abschnitt>

        {/* Konfigurator */}
        <Abschnitt id="preise" flaeche="getoent">
          <Ueberschrift
            kicker="Preise"
            lead="Ein Grundpreis, und Sie entscheiden, was dazukommt. Alles lässt sich später ergänzen."
          >
            Stellen Sie sich zusammen, was Sie brauchen
          </Ueberschrift>
          <Konfigurator />

          {/* Das Abo ist keine Nebenbemerkung — es trägt den Betrieb. */}
          <div className="mt-16 grid gap-8 rounded-2xl bg-white p-8 md:grid-cols-[1fr_1fr] md:p-10">
            <div>
              <h3 className="text-2xl text-text-dark">{abo.title}</h3>
              <p className="mt-3 leading-relaxed text-text-medium">{abo.lead}</p>
              <p className="mt-5 font-medium text-text-dark">{abo.jahr}</p>
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

        {/* Über uns */}
        <Abschnitt id="ueber-uns" flaeche="dunkel">
          <Ueberschrift hell lead={ueberUns.untertitel}>
            {ueberUns.title}
          </Ueberschrift>

          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
            <div>
              {ueberUns.absaetze.map((absatz) => (
                <p key={absatz} className="mb-5 leading-relaxed text-base-300">
                  {absatz}
                </p>
              ))}
              <blockquote className="mt-8 border-l-2 border-brand-light pl-5">
                <p className="font-serif text-xl leading-relaxed text-base-50">
                  «{ueberUns.zitat.text}»
                </p>
                <footer className="mt-2 text-sm text-base-300">
                  {ueberUns.zitat.quelle}
                </footer>
              </blockquote>
            </div>

            <dl className="space-y-6">
              {ueberUns.fakten.map((faktum) => (
                <div key={faktum.text}>
                  <dt className="text-2xl text-brand-light">{faktum.zahl}</dt>
                  <dd className="mt-1 text-sm text-base-300">{faktum.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Abschnitt>

        {/* Häufige Fragen */}
        <Abschnitt>
          <Ueberschrift>{palacios.faq.title}</Ueberschrift>
          <Fragen fragen={palacios.faq.fragen} />
        </Abschnitt>

        {/* Abschluss */}
        <Abschnitt id="kontakt" flaeche="getoent">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight text-text-dark md:text-4xl">
              {abschluss.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-medium">
              {abschluss.lead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Knopf href={abschluss.ctaHref}>{abschluss.ctaText}</Knopf>
              <Knopf href={firma.telefonLink} variante="rand">
                {firma.telefon}
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

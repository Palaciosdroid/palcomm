import type { Metadata } from "next";
import { palacios } from "@/lib/palacios-content";
import Rechtsseite, { Rechtsabschnitt } from "@/components/palacios/Rechtsseite";
import { siteUrl } from "@/lib/site-config";

const { firma } = palacios;

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und rechtliche Angaben der ${firma.rechtsform}, Bern.`,
};

export default function ImpressumSeite() {
  return (
    <Rechtsseite titel="Impressum" stand="Juli 2026">
      <Rechtsabschnitt titel="Angaben gemäss Art. 3 Abs. 1 lit. s UWG">
        <address className="not-italic leading-relaxed">
          <strong className="font-medium text-text-dark">{firma.rechtsform}</strong>
          <br />
          {firma.strasse}
          <br />
          {firma.ort}
          <br />
          Schweiz
        </address>
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[11rem_1fr]">
          <dt className="text-text-dark">Telefon</dt>
          <dd>
            <a href={firma.telefonLink} className="text-brand hover:underline">
              {firma.telefon}
            </a>
          </dd>
          <dt className="text-text-dark">E-Mail</dt>
          <dd>
            <a href={`mailto:${firma.email}`} className="text-brand hover:underline">
              {firma.email}
            </a>
          </dd>
          <dt className="text-text-dark">UID / MWST-Nummer</dt>
          <dd>{firma.uid} MWST</dd>
          <dt className="text-text-dark">Handelsregister</dt>
          <dd>Handelsregisteramt des Kantons Bern</dd>
          <dt className="text-text-dark">Rechtsform</dt>
          <dd>Gesellschaft mit beschränkter Haftung (GmbH)</dd>
        </dl>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Firmenname und Domain">
        <p>
          Diese Website wird unter <strong className="text-text-dark">{siteUrl}</strong>{" "}
          betrieben. Betreiberin ist die {firma.rechtsform}. Die Domain trägt
          historisch den Namen einer Schwestergesellschaft. Verantwortlich für
          Inhalt und Angebot dieser Seite ist ausschliesslich die oben genannte
          Firma.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Haftung für Inhalte">
        <p>
          Wir erstellen die Inhalte dieser Seite mit Sorgfalt, können aber keine
          Gewähr für Richtigkeit, Vollständigkeit und Aktualität übernehmen.
          Preisangaben auf dieser Seite — auch die im Konfigurator berechneten —
          sind unverbindlich und stellen kein Angebot im Rechtssinn dar.
          Verbindlich wird ein Preis erst mit unserer schriftlichen
          Auftragsbestätigung.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Haftung für Links">
        <p>
          Diese Seite verweist auf Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Für diese Inhalte ist ausschliesslich die jeweilige
          Anbieterin verantwortlich. Werden uns Rechtsverletzungen bekannt,
          entfernen wir den Verweis.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Urheberrecht">
        <p>
          Texte, Bilder, Gestaltung und Quellcode dieser Seite sind
          urheberrechtlich geschützt. Jede Verwendung ausserhalb der Schranken
          des Urheberrechts bedarf unserer vorgängigen schriftlichen Zustimmung.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Streitbeilegung">
        <p>
          Wir sind weder bereit noch verpflichtet, an Verfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen. Für Kund/innen aus der
          Europäischen Union: Die Europäische Kommission stellt unter{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noreferrer noopener"
            className="text-brand hover:underline"
          >
            ec.europa.eu/consumers/odr
          </a>{" "}
          eine Plattform zur Online-Streitbeilegung bereit.
        </p>
      </Rechtsabschnitt>
    </Rechtsseite>
  );
}

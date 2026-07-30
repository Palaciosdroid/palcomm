import type { Metadata } from "next";
import { palacios } from "@/lib/palacios-content";
import Rechtsseite, { Rechtsabschnitt } from "@/components/palacios/Rechtsseite";

const { firma } = palacios;

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Wie die ${firma.rechtsform} mit Personendaten umgeht — Hosting, Kontaktaufnahme, Domainprüfung, Ihre Rechte.`,
};

export default function DatenschutzSeite() {
  return (
    <Rechtsseite titel="Datenschutzerklärung" stand="Juli 2026">
      <p className="text-lg leading-relaxed text-text-dark">
        Kurz vorweg: Diese Seite setzt keine Analyse-Werkzeuge ein, bindet keine
        fremden Schriften oder Karten ein und verfolgt Sie nicht über andere
        Websites hinweg. Was trotzdem an Daten anfällt, steht hier.
      </p>

      <Rechtsabschnitt titel="Verantwortliche Stelle">
        <address className="not-italic leading-relaxed">
          {firma.rechtsform}
          <br />
          {firma.strasse}, {firma.ort}, Schweiz
          <br />
          <a href={`mailto:${firma.email}`} className="text-brand hover:underline">
            {firma.email}
          </a>
          {" · "}
          <a href={firma.telefonLink} className="text-brand hover:underline">
            {firma.telefon}
          </a>
        </address>
        <p>
          Wir bearbeiten Personendaten nach dem Schweizer Datenschutzgesetz
          (revDSG) und, soweit die Datenschutz-Grundverordnung anwendbar ist,
          nach der DSGVO. Eine Datenschutzbeauftragte müssen wir nicht bestellen;
          Anfragen richten Sie an die oben genannte Adresse.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Wenn Sie diese Seite aufrufen">
        <p>
          Beim Abruf werden technisch notwendige Daten in Serverprotokollen
          festgehalten: IP-Adresse, Zeitpunkt, aufgerufene Adresse, übermittelte
          Datenmenge, Browsertyp und Betriebssystem. Diese Daten brauchen wir für
          den Betrieb und die Sicherheit der Seite. Rechtsgrundlage ist unser
          berechtigtes Interesse an einem störungsfreien Betrieb (Art. 31 Abs. 1
          revDSG, Art. 6 Abs. 1 lit. f DSGVO). Wir führen die Protokolle nicht
          mit anderen Daten zusammen und werten sie nicht zu Werbezwecken aus.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Hosting">
        <p>
          Diese Website wird bei der{" "}
          <strong className="text-text-dark">Railway Corporation</strong>, 80 Wall
          Street, New York, USA, betrieben. Die Übermittlung in die USA stützt
          sich auf die Standardvertragsklauseln der Europäischen Kommission und
          einen Auftragsverarbeitungsvertrag. Die USA gelten nach schweizerischem
          Recht als Staat ohne generell angemessenen Datenschutz; wir haben
          deshalb vertragliche Garantien vereinbart.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Schriften">
        <p>
          Alle Schriften liegen auf unserem eigenen Server. Es entsteht keine
          Verbindung zu Google Fonts oder einem anderen fremden Anbieter, und Ihre
          IP-Adresse wird dabei an niemanden übermittelt. Das gilt auch für die
          Websites, die wir für unsere Kund/innen bauen.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Cookies">
        <p>
          Diese Seite setzt keine Cookies zu Analyse- oder Werbezwecken. Ein
          einziges technisches Cookie entsteht, wenn Sie sich in einem
          geschützten Bereich anmelden — es speichert nur, dass die Anmeldung
          gültig ist, und verfällt nach dem Abmelden beziehungsweise nach Ablauf
          der Sitzung. Dafür braucht es keine Einwilligung.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Prüfung Ihrer Wunschdomain">
        <p>
          Wenn Sie im Konfigurator einen Domainnamen eingeben und prüfen lassen,
          wird dieser Name an unseren Server und von dort an den öffentlichen
          Auskunftsdienst der zuständigen Registrierungsstelle übermittelt
          (RDAP — für <em>.ch</em> etwa SWITCH, für <em>.de</em> die DENIC eG,
          für <em>.com</em> VeriSign). Übermittelt wird ausschliesslich der
          Domainname, keine Angaben zu Ihrer Person. Wir speichern die Abfragen
          nicht dauerhaft. Grundlage ist Ihr Wunsch nach dieser Auskunft (Art. 6
          Abs. 1 lit. b DSGVO).
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Wenn Sie uns schreiben oder anrufen">
        <p>
          Nehmen Sie per E-Mail oder Telefon Kontakt auf, bearbeiten wir Ihre
          Angaben, um Ihre Anfrage zu beantworten und ein allfälliges
          Vertragsverhältnis abzuwickeln (Art. 31 Abs. 2 lit. a revDSG, Art. 6
          Abs. 1 lit. b DSGVO). Kommt kein Auftrag zustande, löschen wir die
          Korrespondenz, sobald sie nicht mehr gebraucht wird. Kommt ein Auftrag
          zustande, gelten die gesetzlichen Aufbewahrungsfristen — für
          Geschäftsunterlagen zehn Jahre nach Art. 958f OR.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Dienstleister">
        <p>
          Wir arbeiten mit sorgfältig ausgewählten Anbietern zusammen und haben
          mit ihnen die erforderlichen Verträge zur Auftragsbearbeitung
          abgeschlossen. Personendaten können dabei in folgende Staaten gelangen:
        </p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Hosting und Serverbetrieb: Railway Corporation, USA</li>
          <li>E-Mail-Versand: Resend, USA</li>
          <li>
            Zahlungsabwicklung bei Abonnements: Stripe Payments Europe Ltd.,
            Irland, mit Stripe Inc., USA
          </li>
          <li>Rechnungsstellung: bexio AG, Schweiz</li>
        </ul>
        <p>
          Bei Übermittlungen in die USA stützen wir uns auf die
          Standardvertragsklauseln der Europäischen Kommission und, wo
          vorhanden, auf die Zertifizierung nach dem EU-U.S. Data Privacy
          Framework.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Daten unserer Kund/innen und deren Klient/innen">
        <p>
          Betreiben wir für Sie eine Website, sind Sie für die dort bearbeiteten
          Personendaten die verantwortliche Stelle; wir handeln in Ihrem Auftrag.
          Das regeln wir in einem eigenen Vertrag zur Auftragsbearbeitung, der
          Bestandteil unseres Auftrags ist. Für Anfragen, die über das
          Kontaktformular Ihrer Website eingehen, ist Ihre Datenschutzerklärung
          massgebend, nicht diese hier.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Ihre Rechte">
        <p>
          Sie können jederzeit Auskunft darüber verlangen, ob und welche Daten
          wir über Sie bearbeiten. Ausserdem können Sie die Berichtigung
          unrichtiger Daten, die Löschung, die Einschränkung der Bearbeitung und
          die Herausgabe in einem gängigen Format verlangen sowie einer
          Bearbeitung widersprechen. Eine Mitteilung an{" "}
          <a href={`mailto:${firma.email}`} className="text-brand hover:underline">
            {firma.email}
          </a>{" "}
          genügt.
        </p>
        <p>
          Sind Sie mit unserer Antwort nicht einverstanden, können Sie sich an
          den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten
          (EDÖB) wenden. Innerhalb der EU steht Ihnen zusätzlich das
          Beschwerderecht bei der Datenschutzaufsichtsbehörde Ihres Wohnsitzes
          zu.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Änderungen">
        <p>
          Wir passen diese Erklärung an, wenn sich unsere Dienste oder die
          Rechtslage ändern. Massgebend ist die Fassung, die beim Besuch der
          Seite abrufbar ist.
        </p>
      </Rechtsabschnitt>
    </Rechtsseite>
  );
}

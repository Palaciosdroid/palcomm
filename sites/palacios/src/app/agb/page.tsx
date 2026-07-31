import type { Metadata } from "next";
import { palacios } from "@/lib/palacios-content";
import Rechtsseite, { Rechtsabschnitt } from "@/components/palacios/Rechtsseite";

// Das ist der bestehende Text vom Stand 23. August 2017, inhaltlich
// unverändert übernommen. Er regelt Kurse, Ausbildungen, Seminare und den
// Versand von Büchern — nicht das Website-Abo.
//
// Deshalb steht die Seite noch nicht in der Fusszeile und ist auf noindex:
// Wer bei Google nach unseren Bedingungen sucht, soll nicht auf Versandkosten
// für Hörbuch-CDs stossen. Sobald die AGB fürs Abo geprüft sind, kommen sie
// hier dazu und der Link in die Fusszeile.

const { firma } = palacios;

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: `Allgemeine Geschäftsbedingungen der ${firma.rechtsform}.`,
  robots: { index: false, follow: false },
};

export default function AgbSeite() {
  return (
    <Rechtsseite
      titel="Allgemeine Geschäftsbedingungen"
      stand="23. August 2017"
    >
      <p className="rounded-2xl bg-accent-100 p-5 text-text-dark">
        Diese Bedingungen gelten für Kurse, Ausbildungen, Seminare und den
        Versand von Büchern und Hörbüchern. Für die Einrichtung und den Betrieb
        einer Website gelten eigene Bedingungen, die wir Ihnen mit der
        Auftragsbestätigung zustellen.
      </p>

      <Rechtsabschnitt titel="1. Allgemeines">
        <p>
          Der Vertrag wird zwischen der Palacios Communications GmbH, Rosenweg
          25b, CH-3007 Bern — nachfolgend Palacios Communications GmbH genannt —
          und Ihnen geschlossen.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="2. Vertragsabschluss">
        <p>
          Sobald Sie sich für einen Kurs, eine Ausbildung oder ein Seminar
          eingeschrieben haben, gilt dies als verbindliche Anmeldung. Die
          verbindliche Teilnahme bezieht sich vollumfänglich und ausschliesslich
          auf die pflichtgemässen und wahrheitsgetreuen angegebenen Personalien
          im Formular oder auf das entsprechende Dokument. Ihre E-Mail-Adresse
          wird automatisch in den Newsletter-Verteiler eingetragen.
        </p>
        <p>
          Die Palacios Communications GmbH behält sich bei unstimmigen
          Voraussetzungen für eine diplomierte Ausbildung vor, Teilnehmerinnen
          und Teilnehmer abzulehnen. Das gilt im selben Mass auch für Anträge
          auf Ratenzahlung. In diesem Fall bestehen keine verbindlichen Kosten.
          Teilnehmerinnen und Teilnehmer welche sich online für den
          Hypnosetherapie-Diplomlehrgang eingeschrieben haben, dürfen seitens
          der Palacios Communications GmbH abgewiesen werden, sofern es Gründe
          dafür gibt.
        </p>
        <p>
          Durch Ihre Zusage und die Bestätigung der AGB ist die Teilnahme am
          entsprechenden Kurs oder die Lieferung einer bestellten Ware
          verbindlich und somit kostenpflichtig. Es steht der Palacios
          Communications GmbH jederzeit frei, Anmeldungen ohne Angabe von
          speziellen Gründen abzulehnen. Sollten Sie eine fehlerhafte Lieferung
          Ihrer Bestellung erhalten, bitten wir Sie freundlich, uns dies
          umgehend mitzuteilen.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="3. Lieferung">
        <p>
          Die Lieferung von gedruckten Büchern und Hörbuch-CDs erfolgt an die
          von Ihnen angegebene Lieferadresse. Ist ein Werk zum Zeitpunkt der
          Bestellung nicht oder nur mit Verzögerung lieferbar, führen wir dies
          bei entsprechender Kenntnisnahme auf unserer Website auf. Ist ein Werk
          nach Erscheinung vorübergehend nicht verfügbar, teilen wir Ihnen dies
          umgehend per E-Mail mit. In diesem Fall können Sie jederzeit von Ihrem
          Kauf zurücktreten. Bei noch nicht erschienenen Titeln räumen Sie der
          Palacios Communications GmbH das Recht zur Vormerkung des Werks ein.
          Angekündigte Neuerscheinungen, die bei uns bestellt wurden, stellt
          Ihnen die Palacios Communications GmbH sofort nach dem
          Erscheinungsdatum zu.
        </p>
        <p>
          Für die Schweiz berechnet Ihnen die Palacios Communications GmbH eine
          Versandpauschale in der Höhe von CHF 7.00. Für alle anderen EU-Länder
          fällt eine Versandpauschale von CHF 12.00 an. Die Palacios
          Communications GmbH ist zu einer Teillieferung berechtigt, bei denen
          für Sie keine zusätzlichen Porto- oder Verpackungskosten anfallen.
        </p>
        <p>
          Bei der Lieferung in ein EU-Land übernehmen Sie eventuell anfallende
          Steuern und Zölle selber.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="4. Annullierung">
        <p>
          Möchten Sie Ihre Anmeldung für einen Kurs nachträglich annullieren, so
          muss ein schriftliches Gesuch mit triftigen Gründen bis spätestens 60
          Tage vor Kursbeginn der Palacios Communications GmbH vorliegen.
          Gesuche in Form von E-Mails werden von uns abgelehnt. Nach
          eingereichtem Bewerbungsbogen ist die Palacios Communications GmbH
          berechtigt, die Ausbildungs- oder Seminarkosten in Rechnung zu
          stellen. Annullierungen werden bis zu 90 Tage vor Ausbildungs- oder
          Seminarstart kostenlos akzeptiert. Bezüglich Annullierungen, die im
          Zeitfenster von 90 Tagen vor Ausbildungs- oder Seminarstart
          vorgenommen werden, fallen 50 % der Ausbildungs- oder Seminarkosten
          an. Bei Annullierungen, die während laufender Ausbildungs- oder
          Seminarzeit vorgenommen werden, fallen die gesamten Ausbildungs- oder
          Seminarkosten an und müssen somit zu 100 % von der Kursteilnehmerin
          oder dem Kursteilnehmer bezahlt werden.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="5. Zahlungsbedingungen">
        <p>
          Nach einer Kursanmeldung oder Bestellung einer Ware erhalten Sie auf
          dem Postweg eine Rechnung mit einem entsprechenden Einzahlungsschein
          zur Überweisung des offenstehenden Betrages. Der Rechnungsbetrag sowie
          die ausgewiesenen Versandkosten sind gemäss festgelegtem Datum und
          ohne Abzüge mit der Bestellung fällig, auch wenn es sich um eine
          Teillieferung handelt. Zahlung auf Rechnung ist nur für Verbraucher ab
          18 Jahren möglich. Die Mehrwertsteuer ist, sofern ausdrücklich nichts
          anderes vermerkt ist, in allen Preisen enthalten.
        </p>
        <p>
          Sollten Sie in Zahlungsverzug kommen, ist die Palacios Communications
          GmbH berechtigt, Verzugszinsen einzufordern. Wir behalten uns vor,
          überfällige Forderungen an ein externes Inkassounternehmen zu
          übertragen. Die daraus entstehenden Kosten sind vom Gläubiger zu
          tragen.
        </p>
        <p>
          Die gelieferte Ware bleibt bis zu ihrer vollständigen Bezahlung im
          Eigentum der Palacios Communications GmbH.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="6. Gewährleistung und Haftung">
        <p>
          Sollten Sie der Palacios Communications GmbH einen Mangel der
          gelieferten Ware nachweisen, wird unser Unternehmen eine
          Ersatzlieferung oder die Beseitigung des Mangels veranlassen. Gelingt
          dies der Palacios Communications GmbH binnen acht Wochen nicht, so
          haben Sie das Recht, den Kauf rückgängig zu machen oder eine Reduktion
          des Kaufpreises zu verlangen.
        </p>
        <p>
          Die Palacios Communications GmbH haftet für selbstverschuldete Schäden
          bei der Verletzung der vertraglichen Hauptpflichten und beim Fehlen
          einer zugesicherten Eigenschaft der Ware. Darüber hinaus haftet die
          Palacios Communications GmbH lediglich nach den festgesetzten
          Richtlinien des Produkthaftungsgesetzes. Die Haftung für die
          Verletzung vertraglicher Nebenpflichten ist ausgeschlossen, es sei
          denn, dass der Schaden durch uns grob fahrlässig oder vorsätzlich
          verursacht wurde. Im Falle einer leicht fahrlässigen Verletzung einer
          vertraglichen Hauptpflicht haftet die Palacios Communications GmbH für
          den typischerweise vorhersehbaren Schaden bis zur Höhe des Kaufpreises
          der bestellten Ware.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="7. Datenschutz">
        <p>
          Wir wissen Ihr Vertrauen sehr zu schätzen und wenden äusserste
          Sorgfalt an, um Ihre persönlichen Daten vor unbefugten Zugriffen zu
          schützen. Gleiches gilt für die Aktualisierung Ihrer gespeicherten
          Datensätze.
        </p>
        <p>
          Die für die Geschäftsabwicklung notwendigen Daten werden gespeichert
          und im Rahmen der Bestellabwicklung an verbundene Unternehmen
          weitergegeben. Wie wir mit Personendaten umgehen, steht in unserer{" "}
          <a href="/datenschutz" className="text-brand hover:underline">
            Datenschutzerklärung
          </a>
          .
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="8. Gerichtsstand">
        <p>
          Bern ist ausschliesslicher Gerichtsstand für alle sich aus dem
          Vertragsverhältnis unmittelbar oder mittelbar ergebenden
          Streitigkeiten. Das Rechtsverhältnis untersteht dem Schweizerischen
          Recht.
        </p>
      </Rechtsabschnitt>
    </Rechtsseite>
  );
}

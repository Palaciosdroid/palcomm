import type { Metadata } from "next";
import Link from "next/link";
import { palacios } from "@/lib/palacios-content";
import { ABO_JAEHRLICH, ABO_MONATLICH, GRUNDPREIS, formatiereChf } from "@/lib/angebot";
import Rechtsseite, { Rechtsabschnitt } from "@/components/palacios/Rechtsseite";

/**
 * AGB für Einrichtung und Betrieb einer Website.
 *
 * ENTWURF. Vor dem ersten Verkauf anwaltlich prüfen lassen — besonders die
 * drei mit «Zu prüfen» markierten Stellen. Die bestehenden AGB unter /agb
 * regeln Kurse und Buchversand und passen hier nicht.
 *
 * Diese Seite steht bewusst auf noindex und noch nicht in der Fusszeile,
 * bis die Prüfung durch ist. Sie ist aber schon erreichbar, damit man sie
 * dem Anwalt schicken kann.
 *
 * Die Preise kommen aus src/lib/angebot.ts, damit AGB und Konfigurator nicht
 * auseinanderlaufen. Ein Preis, der in den AGB anders steht als im
 * Bestellformular, ist genau die Art Fehler, die teuer wird.
 */

const { firma } = palacios;

export const metadata: Metadata = {
  title: "AGB für Einrichtung und Betrieb einer Website",
  description: `Bedingungen für Einrichtung und Betrieb einer Website durch die ${firma.rechtsform}.`,
  robots: { index: false, follow: false },
};

/** Hinweiskasten für die Stellen, an denen ein Anwalt entscheiden muss. */
function ZuPruefen({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border-2 border-dashed border-brand/40 bg-accent-100 p-4 text-sm leading-relaxed text-text-medium">
      <strong className="text-text-dark">Zu prüfen:</strong> {children}
    </p>
  );
}

export default function AgbWebsiteSeite() {
  return (
    <Rechtsseite
      titel="AGB für Einrichtung und Betrieb einer Website"
      stand="Entwurf, noch nicht in Kraft"
    >
      <p className="rounded-2xl border-2 border-dashed border-brand/40 bg-accent-100 p-5 leading-relaxed text-text-dark">
        <strong>Dieser Text ist ein Entwurf und noch nicht in Kraft.</strong> Er
        ist noch nicht anwaltlich geprüft. Bis dahin gilt, was in der
        Auftragsbestätigung steht. Die gestrichelt umrandeten Kästen markieren
        Stellen, die vor dem Inkrafttreten juristisch entschieden werden müssen.
      </p>

      <Rechtsabschnitt titel="1. Wer diesen Vertrag schliesst">
        <p>
          Vertragspartnerin ist die {firma.rechtsform}, {firma.strasse},{" "}
          {firma.ort}, Schweiz (nachfolgend «wir»). Diese Bedingungen gelten für
          die Einrichtung und den anschliessenden Betrieb einer Website. Für
          Kurse, Ausbildungen und den Versand von Büchern gelten die{" "}
          <Link href="/agb" className="text-brand underline">
            gesonderten Bedingungen
          </Link>
          .
        </p>
        <p>
          Wir richten uns an Selbständige und Unternehmen, nehmen aber auch
          Aufträge von Privatpersonen an. Wo dieser Text zwischen beidem
          unterscheidet, ist das ausdrücklich gesagt.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="2. Was der Vertrag umfasst">
        <p>
          Der Vertrag besteht aus zwei Teilen, die rechtlich unterschiedlich zu
          behandeln sind:
        </p>
        <p>
          <strong>Die Einrichtung</strong> ist die einmalige Herstellung deiner
          Website auf unserer Vorlage. Sie ist ein Werk mit einem
          abnahmefähigen Ergebnis: eine erreichbare Website mit deinen Inhalten.
        </p>
        <p>
          <strong>Der Betrieb</strong> ist die laufende Leistung danach:
          Internetadresse, Bereitstellung, Verschlüsselung, Sicherungskopien,
          Sicherheitsaktualisierungen, Zugang zur Selbstverwaltung und Behebung
          von Störungen, die wir zu verantworten haben.
        </p>
        <p>
          Welche einzelnen Leistungen konkret vereinbart sind, ergibt sich aus
          deiner Bestellung und unserer Auftragsbestätigung. Diese gehen den
          allgemeinen Beschreibungen hier vor.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="3. Wie der Vertrag zustande kommt">
        <p>
          Die Darstellung auf unserer Website ist kein bindendes Angebot,
          sondern eine Einladung zur Bestellung. Mit dem Absenden des
          Bestellformulars gibst du ein Angebot ab. Der Vertrag kommt zustande,
          wenn wir ihn in Textform bestätigen — nicht schon mit der
          automatischen Eingangsbestätigung.
        </p>
        <p>
          Wir dürfen einen Auftrag ohne Begründung ablehnen. Das ist kein
          formaler Vorbehalt: Wir sehen uns vorher an, was auf der Seite stehen
          soll, und lehnen ab, was wir nicht verantworten wollen (siehe
          Abschnitt 6).
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="4. Preise und Zahlung">
        <p>
          Die Einrichtung kostet ab CHF {formatiereChf(GRUNDPREIS)}, der Betrieb
          ab CHF {formatiereChf(ABO_MONATLICH)} im Monat oder CHF{" "}
          {formatiereChf(ABO_JAEHRLICH)} im Jahr. Massgebend ist der Preis, der
          bei der Bestellung angezeigt und in der Auftragsbestätigung wiederholt
          wird. Alle Preise verstehen sich inklusive der schweizerischen
          Mehrwertsteuer.
        </p>
        <p>
          Die Einrichtung wird bei Auftragsbestätigung fällig, der Betrieb
          jeweils im Voraus für die gewählte Periode. Zahlung auf Rechnung
          innert 30 Tagen. Bei Ratenzahlung gilt der in der
          Auftragsbestätigung festgehaltene Plan.
        </p>
        <p>
          Gerätst du mit einer Zahlung mehr als 30 Tage in Verzug, mahnen wir
          zweimal in Textform mit einer Frist von je 14 Tagen. Bleibt die
          Zahlung danach aus, dürfen wir die Website vom Netz nehmen. Deine
          Inhalte bewahren wir noch 90 Tage auf und geben sie dir auf Verlangen
          heraus; erst danach dürfen wir sie löschen.
        </p>
        <ZuPruefen>
          Umsatzsteuer bei Kundinnen in Deutschland und Österreich. Mit
          USt-IdNr. greift das Reverse-Charge-Verfahren. Ohne — also bei
          Privatpersonen und Kleinunternehmerinnen — fällt die Steuer des
          Empfängerlands an und muss über das OSS-Verfahren abgeführt werden.
          Ob eine betreute Website als elektronisch erbrachte Dienstleistung
          gilt und ob der Einrichtungsteil mit Handarbeit anders zu behandeln
          ist, gehört zum Treuhänder, nicht in diesen Text.
        </ZuPruefen>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="5. Was wir von dir brauchen">
        <p>
          Wir bauen deine Seite aus deinen Inhalten. Du lieferst Texte, Bilder,
          Logo und die Angaben fürs Impressum. Solange etwas davon fehlt, können
          wir nicht weiterarbeiten, und die vereinbarte Frist verschiebt sich um
          die Wartezeit.
        </p>
        <p>
          Du sicherst zu, dass du an allem, was du uns lieferst, die nötigen
          Rechte hast — besonders an Fotos. Das gilt auch für Bilder von
          Menschen: Wer erkennbar zu sehen ist, muss zugestimmt haben. Werden
          wir wegen deiner Inhalte von Dritten belangt, stellst du uns frei und
          trägst die Kosten einer angemessenen Verteidigung.
        </p>
        <p>
          In der Einrichtung ist <strong>eine Korrekturrunde</strong> enthalten.
          Weitere Runden verrechnen wir nach Aufwand zum jeweils gültigen
          Stundensatz, den wir vorher nennen.
        </p>
        <p>
          Melden wir dir einen Entwurf zur Abnahme und hörst du 14 Tage nichts,
          gilt er als abgenommen. Wir weisen dich in der Meldung ausdrücklich
          auf diese Folge hin.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="6. Inhalte, die wir nicht veröffentlichen">
        <p>
          Du bist für die Inhalte deiner Website verantwortlich. Wir prüfen sie
          nicht auf Richtigkeit. Wir behalten uns aber vor, Inhalte abzulehnen
          oder nach Ankündigung zu entfernen, wenn sie rechtswidrig sind oder
          uns einem erkennbaren Risiko aussetzen.
        </p>
        <p>
          Das betrifft in unserem Umfeld vor allem drei Dinge:{" "}
          <strong>Heilversprechen</strong> — Aussagen, die einen Behandlungs­
          erfolg zusichern; <strong>geschützte Berufsbezeichnungen</strong> —
          «Psychotherapeut/in» und «Psycholog/in» sind in der Schweiz nach PsyG
          geschützt und dürfen nur mit entsprechendem Titel geführt werden; und{" "}
          <strong>Erfahrungsberichte</strong>, für die im Gesundheitsbereich
          besondere Schranken gelten, in Deutschland namentlich das
          Heilmittelwerbegesetz.
        </p>
        <p>
          Wir weisen dich auf solche Stellen hin, bevor die Seite online geht.
          Bestehst du darauf, dürfen wir den Auftrag ablehnen oder den Vertrag
          kündigen; bereits erbrachte Leistungen sind dann zu vergüten.
        </p>
        {/* Die Lücke, die vorher offen war: Die AGB regelten die INHALTE der
            Website, aber nicht die Tätigkeit, für die sie wirbt. Genau dort
            liegt bei einer Therapiepraxis das grössere Risiko — nicht im
            Text, sondern in der Sitzung. Ohne diesen Absatz stünde bei einer
            Klage gegen die Therapeutin die Frage im Raum, ob die Agentur,
            die ihre Versprechen ins Netz gestellt hat, mitverantwortlich
            ist. */}
        <p>
          Ausserdem gilt: <strong>Deine Arbeit mit deinen Klient/innen ist
          nicht Gegenstand dieses Vertrags.</strong> Wir bauen und betreiben
          deine Website — wir prüfen weder deine Qualifikation noch deine
          Methoden, beraten dich nicht fachlich und sind an deiner
          Behandlungsbeziehung nicht beteiligt. Für dein Angebot, seine
          Zulässigkeit und seine Ausübung haftest du allein.
        </p>
        <p>
          Unsere Hinweise zu Formulierungen sind ein Beitrag aus der Praxis,{" "}
          <strong>keine Rechtsberatung</strong>. Wir dürfen sie nicht erbringen
          und tun es nicht. Ob deine Angaben zu Titel, Verband, Bewilligung
          und Methode zutreffen und zulässig sind, musst du selbst
          verantworten — im Zweifel mit deinem Verband oder einer Anwältin.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="7. Betrieb, Verfügbarkeit und Sicherungskopien">
        <p>
          Wir bemühen uns um eine hohe Verfügbarkeit deiner Website, sichern
          aber keine bestimmte Prozentzahl zu. Wartungsarbeiten kündigen wir
          nach Möglichkeit vorher an und legen sie in verkehrsarme Zeiten.
        </p>
        <p>
          Wir erstellen regelmässig Sicherungskopien deiner Inhalte. Eine
          Wiederherstellung ist im Betrieb enthalten, wenn die Ursache bei uns
          liegt. Hast du selbst etwas gelöscht oder überschrieben, stellen wir
          nach Aufwand wieder her.
        </p>
        <p>
          Für die Ausführung setzen wir Dienstleister ein. Welche das sind und
          in welchen Ländern sie Daten bearbeiten, steht in unserer{" "}
          <Link href="/datenschutz" className="text-brand underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="8. Deine Internetadresse gehört dir">
        <p>
          Die Internetadresse wird auf dich als Inhaberin registriert. Wir
          verwalten sie für dich, solange der Vertrag läuft.
        </p>
        <p>
          Endet der Vertrag, übertragen wir sie dir oder einem von dir
          benannten Anbieter kostenlos. Wir geben dir ausserdem deine Inhalte
          in einem gängigen Format heraus. Der Aufbau der Website selbst — die
          Vorlage, der Programmcode und das Gestaltungssystem — bleibt bei uns;
          du erhältst daran ein einfaches Nutzungsrecht für die Laufzeit.
        </p>
        {/* Ohne diesen Absatz wäre die E-Mail-Option ein Haftungsrisiko: Im
            Postfach einer Therapeutin liegt Korrespondenz mit Klient/innen,
            für die sie dokumentationspflichtig sein kann. Ein Postfach nach
            Vertragsende einfach zu löschen, hiesse, ihr Unterlagen zu
            vernichten, die sie aufbewahren muss. */}
        <p>
          Hast du bei uns ein E-Mail-Postfach gebucht, gilt dasselbe: Die
          Adresse hängt an deiner Internetadresse und geht mit ihr auf dich
          über. Vor der Abschaltung geben wir dir mindestens 30 Tage Zeit, um
          deine Nachrichten herunterzuladen oder das Postfach zu einem anderen
          Anbieter mitzunehmen; auf Wunsch stellen wir dir eine vollständige
          Kopie in einem gängigen Format zur Verfügung. Gelöscht wird erst
          danach.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="9. Laufzeit und Kündigung">
        <p>
          Der Betrieb läuft ab Aufschaltung der Website. Er kann von beiden
          Seiten mit einer Frist von 30 Tagen auf das Ende der bezahlten
          Periode gekündigt werden. Die Kündigung braucht Textform; eine E-Mail
          genügt.
        </p>
        <p>
          Nach der Kündigung bleibt die Seite bis zum Ende der bezahlten
          Periode online. Danach nehmen wir sie vom Netz und übertragen dir die
          Internetadresse.
        </p>
        <ZuPruefen>
          <strong>Die wichtigste offene Frage.</strong> Ist der laufende Betrieb
          ein Auftrag nach OR 394 ff., gilt das jederzeitige Kündigungsrecht
          nach OR 404 — und das ist zwingend, lässt sich also nicht wegbedingen.
          Dann wäre jede Mindestlaufzeit unwirksam und die Jahreszahlung müsste
          bei unterjähriger Kündigung anteilig zurückerstattet werden. Vorschlag
          zur Prüfung: Einrichtung als Werkvertrag (OR 363 ff.), Betrieb als
          Dauerschuldverhältnis eigener Art. Bevor irgendwo eine Mindestlaufzeit
          kommuniziert wird, muss das entschieden sein.
        </ZuPruefen>
        <ZuPruefen>
          Für Kundinnen in Deutschland verlangt § 312k BGB bei online
          geschlossenen Dauerverträgen einen Kündigungsknopf auf der Website —
          nicht nur eine E-Mail-Adresse. Fehlt er, kann die Kundin jederzeit
          fristlos kündigen. Der Knopf ist noch nicht gebaut.
        </ZuPruefen>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="10. Wenn etwas nicht stimmt">
        <p>
          Zeigt die Website nach der Abnahme einen Mangel, den wir zu
          verantworten haben, beheben wir ihn. Gelingt das auch nach
          angemessener Frist zweimal nicht, kannst du den Preis mindern oder vom
          Vertrag zurücktreten.
        </p>
        <p>
          Wir haften für Vorsatz und grobe Fahrlässigkeit unbeschränkt, ebenso
          bei Verletzung von Leben, Körper und Gesundheit. Bei leichter
          Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Pflichten und
          begrenzt auf den bei Vertragsschluss vorhersehbaren, typischen
          Schaden. Für entgangenen Gewinn und Datenverlust haften wir nur, soweit
          zwingendes Recht das vorsieht — für Datenverlust höchstens in dem
          Umfang, der bei ordnungsgemässer Sicherung angefallen wäre.
        </p>
        <ZuPruefen>
          Diese Haftungsbegrenzung ist am deutschen AGB-Recht ausgerichtet, weil
          es strenger ist. In Verträgen mit deutschen Verbraucherinnen ist die
          Klauselkontrolle nach §§ 305 ff. BGB anzuwenden — ein Anwalt muss
          bestätigen, dass die Formulierung dort standhält.
        </ZuPruefen>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="11. Datenschutz">
        <p>
          Über das Kontaktformular deiner Website erreichen dich Nachrichten,
          die besonders schützenswerte Personendaten enthalten können. Für
          diese Daten bist du die Verantwortliche; wir bearbeiten sie in deinem
          Auftrag. Dafür schliessen wir mit dir einen Vertrag zur
          Auftragsbearbeitung ab, der Bestandteil dieses Vertrags ist.
        </p>
        {/* Das Postfach ist der heikelste Punkt der ganzen Seite: Dort liegen
            Gesundheitsdaten dauerhaft, nicht nur auf dem Transportweg. Der
            Standort muss deshalb benannt sein — «ein externer Anbieter»
            genügt dem revDSG nicht. Wechselt der Anbieter, muss dieser Satz
            mitwandern; derselbe Hinweis steht in src/lib/angebot.ts. */}
        <p>
          Betreiben wir für dich ein E-Mail-Postfach, liegen die Nachrichten
          darin bei unserem Anbieter Infomaniak Network SA in Genf, auf
          Servern in der Schweiz. Wir lesen sie nicht; wir greifen nur darauf
          zu, wenn du uns bei einer Störung ausdrücklich darum bittest. Für
          die Inhalte deines Postfachs bist du verantwortlich — auch dafür,
          wie lange du Korrespondenz mit Klient/innen aufbewahren musst.
        </p>
        <p>
          Wie wir mit deinen eigenen Daten umgehen, steht in der{" "}
          <Link href="/datenschutz" className="text-brand underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="12. Änderungen dieser Bedingungen">
        <p>
          Wir dürfen diese Bedingungen ändern, wenn ein sachlicher Grund
          vorliegt — etwa geänderte Gesetze oder ein Wechsel eines
          Dienstleisters. Wir kündigen die Änderung mindestens sechs Wochen
          vorher in Textform an. Widersprichst du nicht bis zum Wirksamwerden,
          gilt sie als angenommen; darauf weisen wir in der Ankündigung hin.
          Widersprichst du, kannst du auf denselben Zeitpunkt kündigen.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="13. Anwendbares Recht und Gerichtsstand">
        <p>
          Es gilt schweizerisches Recht unter Ausschluss des
          UN-Kaufrechts. Gerichtsstand ist Bern.
        </p>
        <p>
          Bist du Verbraucherin mit Wohnsitz in der Europäischen Union, bleiben
          die zwingenden Schutzvorschriften deines Wohnsitzstaates unberührt und
          du kannst auch dort klagen. Insbesondere bleibt dein Widerrufsrecht
          bestehen; die Einzelheiten stehen in der{" "}
          <Link href="/widerruf" className="text-brand underline">
            Widerrufsbelehrung
          </Link>
          .
        </p>
      </Rechtsabschnitt>
    </Rechtsseite>
  );
}

import type { Metadata } from "next";
import { palacios } from "@/lib/palacios-content";
import Rechtsseite, { Rechtsabschnitt } from "@/components/palacios/Rechtsseite";

/**
 * Widerrufsbelehrung für Verbraucherinnen in Deutschland und Österreich.
 *
 * ENTWURF. Vor dem ersten Verkauf in die EU anwaltlich prüfen lassen.
 *
 * WARUM DAS NICHT WARTEN KANN, SOBALD DIE ERSTE DEUTSCHE KUNDIN BESTELLT
 *
 * Ohne ordnungsgemässe Belehrung beginnt die Widerrufsfrist gar nicht erst zu
 * laufen; sie erlischt erst zwölf Monate und vierzehn Tage nach
 * Vertragsschluss (§ 356 Abs. 3 BGB). Widerruft die Kundin ein halbes Jahr
 * später, ist die Website längst gebaut.
 *
 * Und ohne den Wertersatzhinweis samt ausdrücklichem Verlangen schuldet sie
 * bei Widerruf gar nichts (§ 357 Abs. 8 BGB) — dann wurde umsonst
 * gearbeitet. Das ist der teuerste Einzelfehler in diesem ganzen Bereich,
 * und er kostet genau eine Kontrollkästchen-Zeile im Bestellformular.
 *
 * Der Text folgt bewusst eng dem gesetzlichen Muster (Anlage 1 zu Art. 246a
 * § 1 Abs. 2 Satz 2 EGBGB). Wer daran «schöner formuliert», verliert die
 * Schutzwirkung des Musters. Die Erklärungen daneben sind als solche
 * gekennzeichnet und nicht Teil der Belehrung.
 */

const { firma } = palacios;

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  description:
    "Widerrufsrecht für Verbraucherinnen und Verbraucher in Deutschland und Österreich.",
  robots: { index: false, follow: false },
};

/** Der gesetzliche Mustertext. Bewusst nicht umformuliert. */
function Musterblock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-white p-5 leading-relaxed md:p-6">
      {children}
    </div>
  );
}

export default function WiderrufSeite() {
  const anschrift = `${firma.rechtsform}, ${firma.strasse}, ${firma.ort}, Schweiz`;

  return (
    <Rechtsseite titel="Widerrufsbelehrung" stand="Entwurf, noch nicht in Kraft">
      <p className="rounded-2xl border-2 border-dashed border-brand/40 bg-accent-100 p-5 leading-relaxed text-text-dark">
        <strong>Dieser Text ist ein Entwurf und noch nicht in Kraft.</strong> Er
        ist noch nicht anwaltlich geprüft. Solange das so ist, sollten keine
        Bestellungen von Verbraucherinnen aus Deutschland oder Österreich
        angenommen werden.
      </p>

      <p>
        Dieses Widerrufsrecht gilt für <strong>Verbraucherinnen und
        Verbraucher</strong> mit Wohnsitz in der Europäischen Union, also für
        Personen, die den Vertrag nicht für ihre selbständige berufliche
        Tätigkeit schliessen. Wer die Website für die eigene Praxis oder das
        eigene Unternehmen bestellt, ist Unternehmerin und hat kein
        gesetzliches Widerrufsrecht — die Belehrung gilt dann nicht.
      </p>

      <Rechtsabschnitt titel="Widerrufsrecht">
        <Musterblock>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
            diesen Vertrag zu widerrufen.
          </p>
          <p className="mt-3">
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
            Vertragsabschlusses.
          </p>
          <p className="mt-3">
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({anschrift}, E-Mail{" "}
            {firma.email}, Telefon {firma.telefon}) mittels einer eindeutigen
            Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail)
            über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
            Sie können dafür das beigefügte Muster-Widerrufsformular verwenden,
            das jedoch nicht vorgeschrieben ist.
          </p>
          <p className="mt-3">
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
            Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
            Widerrufsfrist absenden.
          </p>
        </Musterblock>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Folgen des Widerrufs">
        <Musterblock>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen,
            die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen
            vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
            Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
            Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
            ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen
            wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden
            Ihnen wegen dieser Rückzahlung Entgelte berechnet.
          </p>
          <p className="mt-3">
            Haben Sie verlangt, dass die Dienstleistungen während der
            Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen
            Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem
            Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses
            Vertrags unterrichten, bereits erbrachten Dienstleistungen im
            Vergleich zum Gesamtumfang der im Vertrag vorgesehenen
            Dienstleistungen entspricht.
          </p>
        </Musterblock>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Vorzeitiges Erlöschen des Widerrufsrechts">
        <Musterblock>
          <p>
            Ihr Widerrufsrecht erlischt bei einem Vertrag über die Erbringung
            von Dienstleistungen vorzeitig, wenn wir die Dienstleistung
            vollständig erbracht haben und mit der Ausführung erst begonnen
            haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben und
            gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr
            Widerrufsrecht bei vollständiger Vertragserfüllung durch uns
            verlieren.
          </p>
        </Musterblock>
        <p className="text-sm text-text-medium">
          <strong className="text-text-dark">Was das praktisch heisst.</strong>{" "}
          Damit wir sofort mit dem Bau deiner Website beginnen können, holen wir
          diese Zustimmung im Bestellformular ein — mit einem Kontrollkästchen,
          das du selbst setzen musst. Ohne diese Zustimmung dürfen wir erst nach
          Ablauf der vierzehn Tage anfangen. Das ist keine Formalie: Setzt du
          das Häkchen nicht, verzögert sich der Start um zwei Wochen.
        </p>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Muster-Widerrufsformular">
        <p className="text-sm text-text-medium">
          Wenn du den Vertrag widerrufen willst, kannst du dieses Formular
          ausfüllen und uns zurücksenden. Vorgeschrieben ist es nicht — eine
          formlose E-Mail genügt.
        </p>
        <Musterblock>
          <p className="text-sm text-text-light">
            An {anschrift}, E-Mail {firma.email}:
          </p>
          <p className="mt-4">
            Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
            Vertrag über den Kauf der folgenden Waren (*) / die Erbringung der
            folgenden Dienstleistung (*)
          </p>
          <div className="mt-4 space-y-4 text-text-light">
            <p>— Bestellt am (*) / erhalten am (*)</p>
            <p>— Name des/der Verbraucher(s)</p>
            <p>— Anschrift des/der Verbraucher(s)</p>
            <p>
              — Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf
              Papier)
            </p>
            <p>— Datum</p>
          </div>
          <p className="mt-4 text-sm text-text-light">
            (*) Unzutreffendes streichen.
          </p>
        </Musterblock>
      </Rechtsabschnitt>

      <Rechtsabschnitt titel="Hinweis für Österreich">
        <p>
          In Österreich richtet sich das Widerrufsrecht nach dem
          Fern- und Auswärtsgeschäfte-Gesetz (FAGG). Frist und Folgen
          entsprechen der Belehrung oben; das Rücktrittsrecht beträgt ebenfalls
          vierzehn Tage.
        </p>
      </Rechtsabschnitt>
    </Rechtsseite>
  );
}

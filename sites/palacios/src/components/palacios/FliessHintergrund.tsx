/**
 * Hintergrund des Startbilds — «Passepartout».
 *
 * Vier Deko-Versuche sind gescheitert (Flecken, Federn, Horrorhimmel,
 * unsichtbar), der fünfte war absichtlich still und wirkte langweilig.
 * Dieser hier folgt dem eigenen Vorschlag des Auftraggebers — «ein paar
 * klare Linien» — aber als Struktur, nicht als Zierat.
 *
 * WARUM LINIEN UND NICHT WIEDER EINE FLÄCHE
 *
 * Das Auge ist bei etwa 3 bis 6 Hell-Dunkel-Wechseln pro Sehwinkelgrad am
 * empfindlichsten. Die weichen Farbflächen lagen bei 0,06 — deshalb sah man
 * sie nicht, und mehr Deckkraft hätte sie nur schmutzig gemacht. Ein
 * Linienraster mit 10 Punkten Abstand liegt auf einem Telefon bei rund 4
 * Wechseln pro Grad, also im Maximum. Es ist sichtbar, ohne kräftig zu sein.
 *
 * WARUM ES NICHT WIE EINE DER VIER FALLEN AUSSIEHT
 *
 * Es gibt keine einzige freie Kontur. Alles ist entweder eine Gerade
 * parallel zur Bildschirmkante oder deren Wiederholung. Etwas, das nur aus
 * Geraden besteht, kann nicht wie ein Fleck, eine Feder oder Rauch aussehen.
 * Und periodisch kann nicht rauchen: Schwaden brauchen viele Frequenzen an
 * zufälligen Orten, hier gibt es genau eine Frequenz und eine Richtung.
 *
 * WAS WO LIEGT — UND WARUM NICHTS HINTER DER SCHLAGZEILE
 *
 * Ton (der Verlauf) ist niederfrequent und darf hinter Text stehen; er macht
 * die Fläche unweiss, ohne als Gegenstand gelesen zu werden. Struktur (die
 * Linien) ist hochfrequent und konkurriert mit den Buchstabenformen — die
 * liegt deshalb nur im unteren Band, wo zwischen Preiszeile und
 * Browserfenster ohnehin nichts steht. Merksatz: oben Licht, unten Struktur.
 *
 * Der Rahmen beginnt unterhalb der Kopfzeile. Damit bekommt die
 * durchsichtige Kopfzeile ein eigenes Feld mit einer Grundlinie darunter —
 * sie schwebt nicht mehr, sie steht auf etwas.
 *
 * DIE BEWEGUNG
 *
 * Genau eine: ein Lichtpunkt wandert über die obere Rahmenlinie. Auf einer
 * scharfen Kante ist das auch schwach unübersehbar — anders als in einer
 * Wolke. Nur Deckkraft, keine Farbe, kein Schein. Wird es kräftiger oder
 * schneller, kippt es sofort ins Billige.
 *
 * MASSE IN PUNKTEN, NICHT IN PROZENT
 *
 * Sonst landen die Linien auf halben Gerätepunkten und werden ungleich dick.
 * Der Abstand bleibt konstant in CSS-Punkten, das Muster wird nirgends
 * skaliert — damit entsteht auch beim Zoomen kein Störmuster.
 */
export default function FliessHintergrund() {
  return (
    <div className="fliess pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <span className="fliess-ton" />
      <span className="fliess-feld" />
      <span className="fliess-rahmen" />
      <span className="fliess-licht" />
      <span className="fliess-korn" />
    </div>
  );
}

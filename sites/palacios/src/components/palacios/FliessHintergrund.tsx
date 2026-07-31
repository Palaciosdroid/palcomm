/**
 * Hintergrund des Startbilds.
 *
 * Fünf Anläufe, dann eine Untersuchung mit drei unabhängigen Gutachten.
 * Was dabei herauskam, steht hier, damit niemand Anlauf sechs bis neun
 * wiederholt.
 *
 * DIE FEHLSCHLÄGE UND WARUM
 *
 * 1. weiche SVG-Flächen        -> «sieht aus wie Flecken»
 * 2. gemalte Pinselstriche     -> «Federn und Blätter»
 * 3. WebGL, Rauschen mit
 *    Domain Warping            -> «bewölkter Himmel im Horrorfilm»
 * 4. weiche Farbflächen,
 *    langsam driftend           -> «ich erkenn nix»
 *
 * Drei Mal wurde ein Gegenstand erkannt, der nicht gemeint war, ein Mal gar
 * keiner. Dazwischen liegt kein Zielfenster: Abstrakte Deko wird vom Auge
 * zwangsläufig als Gegenstand gelesen, und welcher das ist, lässt sich nicht
 * steuern. Es gibt genau zwei Auswege — entweder es IST absichtlich ein
 * Gegenstand (Foto, Bildschirmfoto, Produkt), oder absichtlich keiner
 * (Fläche, Material). Die Mitte erzeugt beliebig viele weitere Runden.
 *
 * WARUM VERSUCH 4 UNSICHTBAR WAR — nachgerechnet, nicht geraten
 *
 * Das Auge ist bei etwa 3 bis 6 Hell-Dunkel-Wechseln pro Sehwinkelgrad am
 * empfindlichsten. Die weichen Flächen waren rund 600 Pixel breit, also
 * 0,06 Wechsel pro Grad — dort ist die Empfindlichkeit zwanzig- bis
 * dreissigmal geringer. Mehr Deckkraft hätte sie nicht sichtbar gemacht,
 * sondern nur schmutzig. Dasselbe gilt für ein Partikelnetz (Punktabstand
 * 80 bis 150 Pixel) — auch das wäre wieder in derselben blinden Zone
 * gelandet.
 *
 * WAS VERGLEICHBARE SEITEN TUN
 *
 * Eine Auswertung von rund 60 Seiten im selben Register — warm, creme,
 * Serifen, ruhig — ergab: hinter der Schlagzeile steht dort fast nie etwas.
 * Und die Therapiebranche arbeitet durchweg mit Fotografie statt Mustern.
 * Wo Muster vorkommen, stammen sie aus dem Werkzeug- und SaaS-Umfeld, und
 * das Punktraster ist dort zur Voreinstellung geworden — für eine Agentur,
 * die Gestaltung verkauft, ein stilles Eingeständnis.
 *
 * WAS HIER STEHT
 *
 * Zwei Schichten, beide ohne Form.
 *
 * 1. Ein sehr flacher Verlauf, oben fast weiss. Das ist die Korrektur des
 *    eigentlichen Fehlers: Bisher lag ausgerechnet der dunkelste Ton ganz
 *    oben, direkt hinter der goldenen Wortmarke. Jetzt liegt der Schwerpunkt
 *    der Tönung bei etwa 60 Prozent der Höhe — in dem leeren Band zwischen
 *    Preiszeile und Browserfenster, nicht hinter der Schlagzeile.
 *
 * 2. Warmes Korn. Feines Rauschen, das über Multiplikation aufgetragen wird
 *    und dem Cremeweiss die digitale Flachheit nimmt. Es hat keine Kanten
 *    und keine Wiederholperiode im sichtbaren Bereich, kann also weder als
 *    Gegenstand gelesen werden noch beim Skalieren Störmuster erzeugen. Es
 *    wirkt als Material, nicht als Muster — dieselbe Machart benutzen
 *    mercury.com und craft.do.
 *
 * Keine Animation. Bewegung hinter Text heisst zeitlich veränderlicher
 * Kontrast; man kann nur den schlechtesten Einzelbild prüfen, und wenn der
 * allein besteht, war die Bewegung überflüssig. Der sichtbare Blickfang der
 * Sektion ist nicht der Grund, sondern das Browserfenster darunter — eine
 * echte, mit dem eigenen Werkzeug gebaute Therapieseite. Das ist kein
 * Schmuck, das ist der Beweis.
 */
export default function FliessHintergrund() {
  return (
    <div className="fliess pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <span className="fliess-ton" />
      <span className="fliess-korn" />
    </div>
  );
}

/**
 * Ruhiger Farbhintergrund für das Startbild.
 *
 * Vorgeschichte, damit niemand einen der Irrwege noch einmal geht:
 *
 * Drei Versuche mit SVG-Pfaden (weiche Flächen, Pinselstriche, gemalte
 * Striche) sahen aus wie Flecken, Federn und Blätter — von Hand gesetzte
 * Pfade brauchen eine Illustratorin, kein Programm.
 *
 * Der vierte Versuch war ein WebGL-Shader mit Domain Warping: Rauschen,
 * dessen Koordinaten selbst von Rauschen verschoben werden. Die Bewegung war
 * endlich richtig — langsam, organisch, nie hektisch. Das Bild aber nicht:
 * fünf Oktaven Rauschen erzeugen feine Schwaden, und weil ein dunkler Ton
 * mitgemischt war, sah das Ergebnis aus wie ein bewölkter Himmel im
 * Horrorfilm. Für eine Seite, die Ruhe verkaufen soll, ist das das Gegenteil
 * des Ziels.
 *
 * Deshalb hier: grosse, sehr weiche Farbflächen statt Turbulenz. Genau das
 * ist der Unterschied zwischen "Aurora" und Rauch — Schwaden entstehen durch
 * feine Details, und die gibt es hier gar nicht. Vier radiale Verläufe,
 * jeder ohne harte Kante, die langsam gegeneinander driften.
 *
 * Kein WebGL, kein JavaScript, kein filter: blur(). Der Verlauf selbst ist
 * die Weichzeichnung, und Verschiebung und Skalierung laufen im Compositor.
 * Damit läuft es auch auf einem alten Telefon flüssig — und auf Geräten ohne
 * WebGL überhaupt, was beim Shader nicht der Fall war.
 *
 * Zwei Regeln halten es ruhig:
 * 1. Nur helle, warme Töne. Der dunkle Markenton kommt nicht vor — er war
 *    es, der die Gewitterstimmung erzeugt hat.
 * 2. Die Flächen sitzen an den Rändern. In der Mitte stehen Schlagzeile und
 *    Knöpfe, dort bleibt es fast unbunt.
 *
 * Die Farben kommen aus den Theme-Variablen, der Grund wechselt also mit,
 * wenn jemand die Farbwelt umstellt.
 */
export default function FliessHintergrund() {
  return (
    <div className="fliess pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <span className="fliess-flaeche fliess-a" />
      <span className="fliess-flaeche fliess-b" />
      <span className="fliess-flaeche fliess-c" />
      <span className="fliess-flaeche fliess-d" />
    </div>
  );
}

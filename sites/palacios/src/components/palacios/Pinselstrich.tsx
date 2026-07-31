import type { ReactNode } from "react";

/**
 * Ein Pinselstrich, der sich unter den eingeschlossenen Wörtern selbst zieht.
 *
 * Warum das statt weicher Farbflächen: Eine weichgezeichnete Fläche hat keine
 * Form — auf hellem Grund wird sie zum Fleck. Ein Pinselstrich hat Richtung,
 * Anfang und Ende, und er zeigt beiläufig, was diese Firma verkauft:
 * Handwerk an der Gestaltung. Er läuft einmal und hört auf; eine Schleife
 * würde beim Lesen stören, gerade bei einer Seite, die Ruhe verspricht.
 *
 * Vier Dinge entscheiden, ob das nach Pinsel aussieht oder nach Textmarker:
 *
 * 1. Ein gefülltes Band, keine Linie mit Strichstärke — nur so wird er dünn,
 *    dick und wieder dünn.
 * 2. Die Dicke verläuft UNGLEICH: dünn am Anfang, Bauch bei etwa 40 Prozent,
 *    mittel am Ende. Gleichmässige Wellen sehen aus wie eine Schwunglinie aus
 *    einem Textprogramm.
 * 3. Aufgedeckt wird über eine Maske, in der ein Strich mit runder Kappe dem
 *    Band entlangläuft — die Kante ist dann rund wie eine Pinselspitze. Ein
 *    clip-path schöbe eine senkrechte Kante vor sich her wie ein Rollladen.
 * 4. Nur wenige Wörter einschliessen. Bricht der eingeschlossene Text auf dem
 *    Telefon um, unterstreicht der Strich einen Block statt einer Zeile.
 */
export default function Pinselstrich({
  children,
  id = "pinselzug",
}: {
  children: ReactNode;
  /** Eigene Kennung, falls der Strich mehrfach auf einer Seite vorkommt */
  id?: string;
}) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>

      <svg
        aria-hidden
        viewBox="0 0 300 26"
        preserveAspectRatio="none"
        className="pinsel absolute inset-x-0 -bottom-1 h-[0.4em] w-full"
      >
        <defs>
          <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="26">
            <path
              className="pinsel-zug"
              d="M2,14 C60,11 120,16 190,12 C240,9 275,13 299,11"
              stroke="#fff"
              strokeWidth="44"
              strokeLinecap="round"
              fill="none"
              pathLength="1"
            />
          </mask>
        </defs>

        <g mask={`url(#${id})`}>
          {/* Der Zug selbst: dünn, Bauch, mittel — und leicht ansteigend */}
          <path
            fill="currentColor"
            d="M4,16.5 C50,12.5 95,10.5 150,9.5 C205,8.5 255,10 296,11 L296,15 C255,16.5 205,17 150,18.5 C95,20 50,19.5 4,19 Z"
          />
          {/* Zweiter, kürzerer Auftrag: die Deckung wird ungleich, wie bei
              echter Farbe. Beginnt und endet innerhalb des ersten Bandes. */}
          <path
            className="pinsel-hell"
            fill="currentColor"
            d="M32,13.6 C80,11 130,9.6 185,9.2 C225,8.9 258,9.9 284,10.7 L284,12.5 C258,13.7 225,12.7 185,12.3 C130,12.7 80,14.3 32,16.3 Z"
          />
          {/* Das Absetzen am Ende — ein kurzer, dünner Nachzug */}
          <path
            className="pinsel-hell"
            fill="currentColor"
            d="M270,12 C280,11.6 290,11.8 298,11.4 L298,13 C290,13.4 280,13.2 270,13.6 Z"
          />
        </g>
      </svg>
    </span>
  );
}

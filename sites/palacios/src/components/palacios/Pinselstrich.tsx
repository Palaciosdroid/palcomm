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
 * Der Strich ist ein gefülltes Band, keine Linie mit Strichstärke: Nur so
 * kann er in der Mitte dick und an den Enden dünn auslaufen, wie ein echter
 * Pinsel. Gezeichnet wird er, indem eine Maske von links nach rechts aufgeht
 * — das entspricht der Bewegung einer Hand.
 *
 * Ohne JavaScript: Verzögerung und Ablauf stehen als animation-delay im CSS.
 * Damit bleibt das hier eine Server-Komponente, und bei reduzierter Bewegung
 * steht der fertige Strich einfach da.
 */
export default function Pinselstrich({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>

      <svg
        aria-hidden
        viewBox="0 0 300 26"
        preserveAspectRatio="none"
        className="pinsel absolute inset-x-0 -bottom-1 h-[0.38em] w-full"
      >
        {/*
          Zwei Bänder übereinander: das untere breit und kräftig, das obere
          schmaler und heller. Zusammen ergibt das die ungleichmässige
          Deckung eines echten Pinselstrichs statt eines glatten Balkens.
        */}
        <path
          fill="currentColor"
          d="M3,15 C48,7 96,19 150,11 C204,3 252,17 297,9 L297,17 C252,25 204,11 150,19 C96,27 48,15 3,23 Z"
        />
        <path
          className="pinsel-hell"
          fill="currentColor"
          d="M10,13 C55,8 100,16 152,10 C206,4 248,14 292,8 L292,11 C248,17 206,7 152,13 C100,19 55,11 10,16 Z"
        />
      </svg>
    </span>
  );
}

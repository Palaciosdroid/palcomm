"use client";

import { useEffect, useRef } from "react";

/**
 * Ruhiger Farbschimmer hinter dem Startbild.
 *
 * Warum atmen und nicht Wellen oder Pinselstriche: Die Seite verspricht «ruhig
 * bleiben, wo andere laut werden» — eine auffällige Animation würde genau das
 * widerlegen. Ein langsam atmender Verlauf tut das Gegenteil: Er ist die
 * Bewegung, die unsere Kund/innen ihren Klient/innen beibringen. Rund zwanzig
 * Sekunden pro Zyklus, etwa vier Atemzüge — schnell genug, dass man sie
 * bemerkt, langsam genug, dass sie niemanden hetzt.
 *
 * Der Zeiger zieht die Lichter sanft mit sich. Die Dämpfung ist absichtlich
 * stark (0.045): Die Flächen folgen nach, statt zu springen — es soll sich
 * anfühlen wie Wasser, nicht wie ein Mauszeiger.
 *
 * Kein Canvas, keine Bibliothek, keine externe Anfrage: zwei
 * CSS-Eigenschaften, die im Bildwiederholtakt nachgeführt werden. Wer
 * reduzierte Bewegung eingestellt hat, bekommt dasselbe Bild ohne jede
 * Bewegung — in dieser Zielgruppe gibt es Menschen, denen Bewegung auf dem
 * Bildschirm zusetzt.
 */
export default function Atem() {
  const flaeche = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = flaeche.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ziel = { x: 0, y: 0 };
    const ist = { x: 0, y: 0 };
    let laeuft = true;

    function beiZeiger(e: PointerEvent) {
      const kasten = element!.getBoundingClientRect();
      // −1 bis 1, gemessen von der Mitte der Fläche
      ziel = {
        x: ((e.clientX - kasten.left) / kasten.width - 0.5) * 2,
        y: ((e.clientY - kasten.top) / kasten.height - 0.5) * 2,
      };
    }

    function takt() {
      if (!laeuft) return;
      ist.x += (ziel.x - ist.x) * 0.045;
      ist.y += (ziel.y - ist.y) * 0.045;
      element!.style.setProperty("--zeiger-x", ist.x.toFixed(4));
      element!.style.setProperty("--zeiger-y", ist.y.toFixed(4));
      requestAnimationFrame(takt);
    }

    window.addEventListener("pointermove", beiZeiger, { passive: true });
    requestAnimationFrame(takt);

    return () => {
      laeuft = false;
      window.removeEventListener("pointermove", beiZeiger);
    };
  }, []);

  return (
    <div
      ref={flaeche}
      aria-hidden
      className="atem pointer-events-none absolute inset-0 overflow-hidden"
    >
      <span className="atem-huelle atem-eins">
        <span className="atem-kern" />
      </span>
      <span className="atem-huelle atem-zwei">
        <span className="atem-kern" />
      </span>
      <span className="atem-huelle atem-drei">
        <span className="atem-kern" />
      </span>
    </div>
  );
}

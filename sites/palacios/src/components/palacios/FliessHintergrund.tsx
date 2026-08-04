"use client";

import { useEffect, useRef } from "react";

/**
 * Hintergrund des Startbilds — räumliches Polygonnetz in Gold.
 *
 * WAS DAS IST UND WAS ES NICHT IST
 *
 * Nicht das flache Punkt-Linien-Netz (particles.js, 2015): Dort liegen alle
 * Knoten in einer Ebene, gleich scharf und gleich gross, und jede Linie
 * behauptet eine Verbindung. Das ist die Bildsprache von Krypto und
 * IT-Sicherheit — für eine Zielgruppe mit Technikangst genau falsch.
 *
 * Hier liegt das Netz im Raum, und die Tiefenunschärfe zerstört seine
 * Lesbarkeit. Genau das rettet es: Was man nicht mehr entziffern kann,
 * liest man als Material statt als Datenbild. Kein Schaubild, sondern ein
 * Foto von etwas Zerbrechlichem, das ein Stück weit weg liegt.
 *
 * DIE DREI STELLEN, AN DENEN ES KIPPT
 *
 * 1. Zu viele Zellen. Über etwa 50 Dreiecke bei 1440 Punkten Breite ist es
 *    kein Gegenstand mehr, sondern ein Muster — und das Muster IST das
 *    Partikelnetz. Wer die Zellen nicht in drei Sekunden zählen kann, hat
 *    zu viele.
 * 2. Gleichmässigkeit. Es muss sichtbar schief sein: eine dichte Ecke, viel
 *    Nichts, der Rest läuft aus dem Bild. Eine gleichmässig verteilte
 *    Punktwolke ergibt ein Drahtmodell.
 * 3. Bewegung, die auf den Zeiger zeigt. Kein aufleuchtender Knoten, keine
 *    Linie, die zur Maus wächst. Nur Parallaxe nach Tiefe — das ist die
 *    einzige Bewegung, die die behauptete Tiefe beweist.
 *
 * WARUM ES AUCH BEI 40 PROZENT DECKKRAFT SICHTBAR IST
 *
 * Die fünf Vorgängerversuche waren nicht zu leise — sie hatten keine
 * einzige scharfe Kante. Deshalb hat mehr Deckkraft sie nur schmutzig
 * gemacht statt sichtbar. Hier gibt es fünf haarscharfe Linien unten
 * links, und scharfe Kanten sieht das Auge auch schwach.
 *
 * WIE ES BILLIG BLEIBT
 *
 * Vier Ebenen, jede ein eigenes Canvas mit fester CSS-Weichzeichnung
 * (0, 3, 16, 40 Punkte). Die Geometrie steht fest und wird genau EINMAL
 * gezeichnet. Pro Bild passiert nur noch ein transform auf den vier
 * Elementen — das läuft im Compositor, ohne Neuzeichnen, ohne
 * Weichzeichnung neu zu rechnen. Damit kostet die Bewegung praktisch
 * nichts, auch auf einem alten Telefon.
 *
 * Auf dem Telefon wird das Feld BESCHNITTEN, nicht verkleinert. Skaliert
 * man es herunter, vervielfachen sich die Zellen pro Bildschirm — und
 * genau so entsteht wieder das Partikelnetz.
 */

/** Ebenen von hinten nach vorn. Verhältnis der Unschärfe rund 40:1. */
const EBENEN = [
  // unschaerfe, knoten, farbe,        deckkraft, linie, flaechen, punkte
  { unschaerfe: 26, knoten: 26, ton: "--accent-400", deckung: 0.4, linie: 7, flaechen: true, punkte: false },
  { unschaerfe: 9, knoten: 30, ton: "--accent-500", deckung: 0.3, linie: 3, flaechen: true, punkte: false },
  { unschaerfe: 2, knoten: 38, ton: "--accent-600", deckung: 0.32, linie: 1.2, flaechen: false, punkte: true },
  { unschaerfe: 0, knoten: 34, ton: "--brand", deckung: 0.45, linie: 1, flaechen: false, punkte: true },
];

/** Wie weit sich jede Ebene mit dem Zeiger bewegt, in Punkten. Vorn am meisten. */
const PARALLAXE = [2, 5, 9, 14];

/** Fester Zufall — sonst sieht die Seite bei jedem Aufruf anders aus. */
function zufall(saat: number) {
  let z = saat;
  return () => {
    z = (z * 1664525 + 1013904223) % 4294967296;
    return z / 4294967296;
  };
}

function nachRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  const v = h.length === 3 ? h.split("").map((z) => z + z).join("") : h;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function FliessHintergrund() {
  const huelle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wurzel = huelle.current;
    if (!wurzel) return;

    const leinwaende = Array.from(
      wurzel.querySelectorAll<HTMLCanvasElement>("canvas")
    );
    if (leinwaende.length !== EBENEN.length) return;

    const stil = getComputedStyle(document.documentElement);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function zeichne() {
      const kasten = wurzel!.getBoundingClientRect();
      const B = Math.max(1, Math.round(kasten.width));
      const H = Math.max(1, Math.round(kasten.height));
      // Beschnitten statt skaliert: Das Feld hat auf jedem Gerät dieselbe
      // Kantenlänge in Punkten, auf dem Telefon sieht man einfach weniger.
      const schmal = B < 720;

      leinwaende.forEach((c, i) => {
        const e = EBENEN[i];
        c.width = B * dpr;
        c.height = H * dpr;
        c.style.width = `${B}px`;
        c.style.height = `${H}px`;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, B, H);

        const [r, g, b] = nachRgb(stil.getPropertyValue(e.ton) || "#c9a870");
        const w = zufall(1207 + i * 613);

        // Wie in der Vorlage: Das Netz füllt die linke Hälfte über die ganze
        // Höhe und läuft nach rechts aus, bevor die Textspalte beginnt.
        const feldB = schmal ? 400 : B * 0.62;
        const kern = schmal ? 150 : B * 0.28;

        // Leicht gestörtes Raster statt reinem Zufall — sonst entstehen
        // Klumpen und kahle Stellen, und die Dreiecke werden ungleich gross.
        const punkte: { x: number; y: number }[] = [];
        const spalten = Math.max(3, Math.round(Math.sqrt(e.knoten * (feldB / H) * 1.5)));
        const zeilen = Math.ceil(e.knoten / spalten);
        for (let sy = 0; sy < zeilen; sy++) {
          for (let sx = 0; sx < spalten; sx++) {
            if (punkte.length >= e.knoten) break;
            punkte.push({
              x: -90 + ((sx + 0.5 + (w() - 0.5) * 0.85) / spalten) * (feldB + 90),
              y: -70 + ((sy + 0.5 + (w() - 0.5) * 0.85) / zeilen) * (H + 140),
            });
          }
        }

        const deckungBei = (x: number) => {
          if (x <= kern) return 1;
          const t = (x - kern) / Math.max(1, feldB - kern);
          return Math.max(0, 1 - t) ** 1.6;
        };

        // Jeder Knoten wird mit seinen zwei bis drei nächsten Nachbarn
        // verbunden — das ergibt das Netz, ohne dass jede Ecke mit jeder
        // verbunden wäre.
        const kanten: [number, number][] = [];
        punkte.forEach((p, a) => {
          const nah = punkte
            .map((q, bIdx) => ({ bIdx, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 }))
            .filter((n) => n.bIdx !== a)
            .sort((x, y) => x.d - y.d)
            .slice(0, a % 3 === 0 ? 3 : 2);
          for (const n of nah) if (a < n.bIdx) kanten.push([a, n.bIdx]);
        });

        // Flächen nur auf den hinteren Ebenen und nur bei jedem dritten
        // Dreieck. Auf der scharfen Ebene ergäben gefüllte Dreiecke die
        // Low-Poly-Kristallgrafik.
        if (e.flaechen) {
          for (let k = 0; k < kanten.length - 1; k += 3) {
            const [a1, b1] = kanten[k];
            const [, c1] = kanten[k + 1];
            const p1 = punkte[a1], p2 = punkte[b1], p3 = punkte[c1];
            const sx = (p1.x + p2.x + p3.x) / 3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fillStyle = `rgba(${r},${g},${b},${0.1 * deckungBei(sx)})`;
            ctx.fill();
          }
        }

        ctx.lineCap = "round";
        for (const [a, bIdx] of kanten) {
          const p = punkte[a], q = punkte[bIdx];
          const d = deckungBei((p.x + q.x) / 2);
          if (d <= 0.02) continue;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.lineWidth = e.linie;
          ctx.strokeStyle = `rgba(${r},${g},${b},${e.deckung * d})`;
          ctx.stroke();
        }

        // Knoten nur auf der scharfen Ebene — ohne sie sind es Kratzer, auf
        // jeder Ecke wären es Partikel.
        if (e.punkte) {
          const [kr, kg, kb] = nachRgb(stil.getPropertyValue("--brand-dark") || "#6a542d");
          const wieViele = schmal ? 6 : e.knoten;
          punkte.slice(0, wieViele).forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, e.unschaerfe ? 3.2 : 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${kr},${kg},${kb},${0.55 * deckungBei(p.x)})`;
            ctx.fill();
          });
        }
      });
    }

    zeichne();
    const beobachter = new ResizeObserver(() => zeichne());
    beobachter.observe(wurzel);

    // --- Parallaxe -------------------------------------------------------
    // Die einzige Bewegung. Träge nachgeführt, damit das Bild etwa eine
    // Sekunde nach dem Zeiger zur Ruhe kommt — schnelles Mitziehen macht
    // daraus ein Mausspielzeug.
    const wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)");
    let zielX = 0, zielY = 0, istX = 0, istY = 0;
    let laeuft = true, imBild = true, bild = 0;

    function beiZeiger(ev: PointerEvent) {
      const k = wurzel!.getBoundingClientRect();
      zielX = (ev.clientX - k.left) / k.width - 0.5;
      zielY = (ev.clientY - k.top) / k.height - 0.5;
    }

    // Ohne Maus hängt dieselbe Mechanik am Scrollen — kein Ersatz-Gimmick.
    function beiScroll() {
      const k = wurzel!.getBoundingClientRect();
      zielY = Math.max(-0.5, Math.min(0.5, -k.top / Math.max(1, k.height)));
    }

    function schritt() {
      if (!laeuft) return;
      bild = requestAnimationFrame(schritt);
      if (!imBild || document.hidden) return;
      istX += (zielX - istX) * 0.045;
      istY += (zielY - istY) * 0.045;
      leinwaende.forEach((c, i) => {
        const s = PARALLAXE[i];
        c.style.transform = `translate3d(${(-istX * s).toFixed(2)}px, ${(-istY * s * 0.6).toFixed(2)}px, 0)`;
      });
    }

    if (!wenigerBewegung.matches) {
      bild = requestAnimationFrame(schritt);
      window.addEventListener("pointermove", beiZeiger, { passive: true });
      window.addEventListener("scroll", beiScroll, { passive: true });
    }

    // Ausserhalb des Bildes wird nichts nachgeführt.
    const sichtbarkeit = new IntersectionObserver(
      ([e]) => { imBild = e.isIntersecting; },
      { threshold: 0 }
    );
    sichtbarkeit.observe(wurzel);

    return () => {
      laeuft = false;
      cancelAnimationFrame(bild);
      window.removeEventListener("pointermove", beiZeiger);
      window.removeEventListener("scroll", beiScroll);
      beobachter.disconnect();
      sichtbarkeit.disconnect();
    };
  }, []);

  return (
    <div ref={huelle} className="fliess pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <span className="fliess-ton" />
      {EBENEN.map((e, i) => (
        <canvas
          key={i}
          className="fliess-netz"
          style={{ filter: e.unschaerfe ? `blur(${e.unschaerfe}px)` : undefined }}
        />
      ))}
      <span className="fliess-korn" />
    </div>
  );
}

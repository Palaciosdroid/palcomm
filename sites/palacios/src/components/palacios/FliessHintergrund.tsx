"use client";

import { useEffect, useRef } from "react";

/**
 * Hintergrund des Startbilds — bewegtes Netz, wie VANTA.NET, aber nativ.
 *
 * WARUM NICHT VANTA SELBST
 *
 * Vanta.NET zieht three.js nach (rund 600 KB) plus die eigene Datei. Die
 * Zielgruppe liest überwiegend auf dem Telefon, oft auf älteren Geräten.
 * Dasselbe Verhalten kostet hier rund 4 KB in Canvas 2D.
 *
 * Dazu kommt der Punkt, den der Auftraggeber selbst gefunden hat: Auf einem
 * weissen Grund sieht man bei Vanta nur die Punkte, die Linien verschwinden.
 * Das liegt nicht an der Farbe, sondern an der Deckkraft — Vanta zeichnet
 * die Verbindungen sehr schwach, weil es für dunkle Hintergründe gebaut ist.
 * Hier ist die Deckkraft an die Tiefe gekoppelt und für Creme ausgelegt:
 * vorne 0.45, hinten 0.10.
 *
 * WAS SICH BEWEGT
 *
 * Die Punkte selbst, nicht nur die Ebenen. Jeder Punkt driftet langsam um
 * seinen Ruheort; Verbindungen entstehen und lösen sich, wenn zwei Punkte
 * nah genug kommen. Genau das macht den Reiz von Vanta aus, und genau das
 * hat der Vorgängerfassung gefehlt — dort war die Geometrie starr und nur
 * die Ebenen verschoben sich.
 *
 * Der Zeiger zieht die Punkte in seiner Nähe leicht an. Träge, damit es
 * nicht zuckt.
 *
 * TIEFE OHNE WEICHZEICHNUNG
 *
 * Jeder Punkt hat eine Tiefe zwischen 0 und 1. Sie bestimmt Grösse,
 * Linienstärke und Deckkraft. `filter: blur()` auf einem Canvas, das sich
 * jedes Bild ändert, müsste die Weichzeichnung jedes Bild neu rechnen —
 * das ist die teuerste Eigenschaft im Browser. Über Grösse und Deckkraft
 * kostet dieselbe Wirkung nichts.
 *
 * WAS DEN TEXT SCHÜTZT
 *
 * Eine weiche Aussparung um die Bildmitte, wo Schlagzeile und Knöpfe
 * stehen. Ohne sie liegt das Netz über den Buchstaben, und bei bewegtem
 * Netz heisst das: der Kontrast schwankt, während jemand liest.
 */

/** Bilder pro Sekunde. Bei dieser Langsamkeit reicht das und halbiert die Last. */
const BILDRATE = 30;

/** Ungefährer Abstand der Ruheorte in Punkten. Kleiner = dichter. */
const ABSTAND = 155;

/** Ab welcher Entfernung zwei Punkte verbunden werden. */
const REICHWEITE = 218;

function nachRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  const v = h.length === 3 ? h.split("").map((z) => z + z).join("") : h;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type Punkt = {
  ruheX: number; ruheY: number;   // Ruheort im Raster
  x: number; y: number;           // aktuelle Lage
  phase: number; tempo: number; weite: number;
  tiefe: number;                  // 0 = weit weg, 1 = vorne
};

export default function FliessHintergrund() {
  const flaeche = useRef<HTMLCanvasElement>(null);
  const huelle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leinwand = flaeche.current;
    const rahmen = huelle.current;
    if (!leinwand || !rahmen) return;
    const ctx = leinwand.getContext("2d");
    if (!ctx) return;

    const stil = getComputedStyle(document.documentElement);
    const linie = nachRgb(stil.getPropertyValue("--brand") || "#8c6e3b");
    const knoten = nachRgb(stil.getPropertyValue("--brand-dark") || "#6a542d");

    // Fester Zufall: Die Seite soll bei jedem Aufruf gleich aussehen.
    let saat = 20260804;
    const w = () => {
      saat = (saat * 1664525 + 1013904223) % 4294967296;
      return saat / 4294967296;
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let B = 0, H = 0;
    let punkte: Punkt[] = [];

    function baueAuf() {
      // Gemessen wird die HÜLLE, nie das Canvas selbst: Die Attributbreite
      // eines Canvas ist zugleich seine CSS-Breite. Misst man das Canvas und
      // schreibt das Ergebnis zurück in die Attribute, verdoppelt es sich bei
      // jeder Runde — eine Rückkopplung, die den Reiter aufhängt.
      const kasten = rahmen!.getBoundingClientRect();
      B = Math.max(1, Math.round(kasten.width));
      H = Math.max(1, Math.round(kasten.height));
      // NUR den Zeichenspeicher setzen, nicht style.width/height. Eine
      // explizite Breite schlägt das inset: 0 aus dem CSS — die allererste
      // Messung läuft vor dem Layout und ist winzig, und danach rastet das
      // Element auf diesem Wert ein und wächst nie mehr mit. Genau deshalb
      // war das Netz nur in einer kleinen Ecke oben links zu sehen.
      leinwand!.width = B * dpr;
      leinwand!.height = H * dpr;
      leinwand!.style.width = `${B}px`;
      leinwand!.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Raster mit Überstand, damit an den Rändern nichts abreisst.
      const spalten = Math.ceil(B / ABSTAND) + 2;
      const zeilen = Math.ceil(H / ABSTAND) + 2;
      punkte = [];
      for (let sy = 0; sy < zeilen; sy++) {
        for (let sx = 0; sx < spalten; sx++) {
          const rx = (sx - 0.5) * ABSTAND + (w() - 0.5) * ABSTAND * 0.7;
          const ry = (sy - 0.5) * ABSTAND + (w() - 0.5) * ABSTAND * 0.7;
          punkte.push({
            ruheX: rx, ruheY: ry, x: rx, y: ry,
            phase: w() * Math.PI * 2,
            tempo: 0.13 + w() * 0.2,
            weite: 14 + w() * 26,
            tiefe: w() ** 0.8,
          });
        }
      }
    }
    baueAuf();

    // Aussparung um die Textspalte. Wert 0 = frei, 1 = volle Stärke.
    function frei(x: number, y: number) {
      const schmal = B < 720;
      // Nur der Textblock selbst, nicht das halbe Bild. Vorher war die
      // Aussparung so gross, dass vom Netz fast nichts übrig blieb — der
      // untere Teil ist ohnehin vom Browserfenster verdeckt.
      const mx = B * 0.5;
      const my = H * (schmal ? 0.24 : 0.22);
      const rx = schmal ? B * 0.55 : B * 0.25;
      const ry = schmal ? H * 0.2 : H * 0.14;
      const d = Math.sqrt(((x - mx) / rx) ** 2 + ((y - my) / ry) ** 2);
      // Nie ganz auf null: Ein völlig leeres Feld hinter dem Text fällt
      // stärker auf als das Netz selbst. 0.25 reicht, um die Schlagzeile
      // frei stehen zu lassen.
      return 0.25 + 0.75 * Math.min(1, Math.max(0, (d - 0.75) / 0.55));
    }

    const wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)");
    let zeigerX = -9999, zeigerY = -9999;
    let laeuft = true, imBild = true, bild = 0, zuletzt = 0;
    const start = performance.now();

    function beiZeiger(ev: PointerEvent) {
      const k = rahmen!.getBoundingClientRect();
      zeigerX = ev.clientX - k.left;
      zeigerY = ev.clientY - k.top;
    }
    function beiVerlassen() { zeigerX = -9999; zeigerY = -9999; }

    function zeichne(jetzt: number) {
      if (!laeuft) return;
      bild = requestAnimationFrame(zeichne);
      if (!imBild || document.hidden) return;
      if (jetzt - zuletzt < 1000 / BILDRATE) return;
      zuletzt = jetzt;

      // Grösse pro Bild prüfen: Der erste Aufbau lief vor dem Layout, und
      // dann steht das Raster für eine viel kleinere Fläche als die, die
      // am Ende gezeichnet wird.
      const k = rahmen!.getBoundingClientRect();
      if (Math.abs(Math.round(k.width) - B) > 1 || Math.abs(Math.round(k.height) - H) > 1) {
        baueAuf();
      }

      const t = wenigerBewegung.matches ? 0 : (jetzt - start) / 1000;
      ctx!.clearRect(0, 0, B, H);

      // Lagen fortschreiben
      for (const p of punkte) {
        const dx = Math.cos(t * p.tempo + p.phase) * p.weite;
        const dy = Math.sin(t * p.tempo * 0.83 + p.phase * 1.7) * p.weite;
        let zx = p.ruheX + dx;
        let zy = p.ruheY + dy;

        // Der Zeiger zieht an, was nah genug ist.
        const ax = zeigerX - zx, ay = zeigerY - zy;
        const ab = Math.sqrt(ax * ax + ay * ay);
        if (ab < 260) {
          const kraft = (1 - ab / 260) ** 2 * 34 * (0.4 + p.tiefe);
          zx += (ax / (ab || 1)) * kraft;
          zy += (ay / (ab || 1)) * kraft;
        }
        // Träge nachgeführt — ohne das zuckt es bei jeder Mausbewegung.
        p.x += (zx - p.x) * 0.08;
        p.y += (zy - p.y) * 0.08;
      }

      // Verbindungen. Nur nach vorne vergleichen, sonst doppelt gezeichnet.
      ctx!.lineCap = "round";
      for (let i = 0; i < punkte.length; i++) {
        const a = punkte[i];
        for (let j = i + 1; j < punkte.length; j++) {
          const b = punkte[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          if (Math.abs(dx) > REICHWEITE || Math.abs(dy) > REICHWEITE) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > REICHWEITE) continue;

          const nah = 1 - d / REICHWEITE;
          const tiefe = (a.tiefe + b.tiefe) / 2;
          const raum = Math.min(frei(a.x, a.y), frei(b.x, b.y));
          const deckung = nah * (0.16 + tiefe * 0.4) * raum;
          if (deckung < 0.012) continue;

          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.lineWidth = 0.6 + tiefe * 0.8;
          ctx!.strokeStyle = `rgba(${linie[0]},${linie[1]},${linie[2]},${deckung})`;
          ctx!.stroke();
        }
      }

      // Knoten
      for (const p of punkte) {
        const raum = frei(p.x, p.y);
        const deckung = (0.22 + p.tiefe * 0.38) * raum;
        if (deckung < 0.015) continue;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 0.9 + p.tiefe * 1.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${knoten[0]},${knoten[1]},${knoten[2]},${deckung})`;
        ctx!.fill();
      }
    }

    bild = requestAnimationFrame(zeichne);
    window.addEventListener("pointermove", beiZeiger, { passive: true });
    window.addEventListener("pointerleave", beiVerlassen, { passive: true });

    const beobachter = new ResizeObserver(() => baueAuf());
    beobachter.observe(rahmen);
    // Ausserhalb des Bildes wird nicht gerechnet.
    const sichtbar = new IntersectionObserver(([e]) => { imBild = e.isIntersecting; }, { threshold: 0 });
    sichtbar.observe(rahmen);

    return () => {
      laeuft = false;
      cancelAnimationFrame(bild);
      window.removeEventListener("pointermove", beiZeiger);
      window.removeEventListener("pointerleave", beiVerlassen);
      beobachter.disconnect();
      sichtbar.disconnect();
    };
  }, []);

  return (
    <div ref={huelle} className="fliess pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <canvas ref={flaeche} className="fliess-netz" />
      <span className="fliess-korn" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Fliessender Farbhintergrund für das Startbild.
 *
 * Vorgeschichte: Drei Versuche mit SVG-Pfaden (weiche Flächen, Pinselstriche,
 * gemalte Striche) sind gescheitert. Der Grund war jedes Mal derselbe — von
 * Hand gesetzte Pfade brauchen eine Illustratorin, kein Programm. Was dabei
 * herauskam, sah aus wie Flecken, Federn und Blätter.
 *
 * Dieser Ansatz ist ein anderer: ein Shader, der Farbe fliessen lässt.
 * Verwendet wird Domain Warping — Rauschen, dessen Koordinaten selbst von
 * Rauschen verschoben werden. Genau das erzeugt die Maserung von Marmor und
 * ineinanderlaufender Ölfarbe, und zwar von selbst, ohne dass irgendwo eine
 * Form gezeichnet werden müsste.
 *
 * Warum nicht die vorgeschlagene Fluid-Simulation mit Three.js: Sie löst
 * Navier-Stokes mit 32 Druckiterationen pro Bild und zieht rund 600 KB
 * Bibliothek nach. Für eine Zielgruppe, die überwiegend auf dem Telefon
 * liest, ist das viel für einen Hintergrund. Dieselbe Optik gibt es hier mit
 * einem Fragment-Shader und ohne jede Abhängigkeit.
 *
 * Drei Dinge halten es ruhig statt kitschig:
 * 1. Die Mitte bleibt frei. Eine Maske blendet die Farbe dort aus, wo
 *    Schlagzeile und Knöpfe stehen — Text steht nie auf Muster.
 * 2. Langsam. Eine Bewegung ist über etwa zehn Sekunden zu sehen, nicht über
 *    eine. Noch langsamer wirkt es wie ein Standbild — der erste Anlauf war
 *    dreimal so träge, und niemand hat gesehen, dass sich etwas bewegt.
 * 3. Zurückhaltende Deckung. Es soll auffallen, dass der Grund nicht weiss
 *    ist — nicht, dass da eine Animation läuft.
 */

/** Bilder pro Sekunde. Mehr braucht es bei dieser Langsamkeit nicht. */
const BILDRATE = 30;

/** Auflösung der Berechnung. Weich genug, dass die Hochskalierung niemand sieht. */
const MASSSTAB = 0.5;

const ECKPUNKT_SHADER = `#version 300 es
in vec2 lage;
void main() { gl_Position = vec4(lage, 0.0, 1.0); }`;

const FARB_SHADER = `#version 300 es
precision highp float;

uniform vec2  uFlaeche;
uniform float uZeit;
uniform vec2  uZeiger;
uniform vec3  uHell;
uniform vec3  uMittel;
uniform vec3  uDunkel;

out vec4 farbe;

// --- Wertrauschen -----------------------------------------------------
float streu(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float rauschen(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);          // weich überblenden
  return mix(mix(streu(i + vec2(0, 0)), streu(i + vec2(1, 0)), u.x),
             mix(streu(i + vec2(0, 1)), streu(i + vec2(1, 1)), u.x), u.y);
}

// Mehrere Oktaven übereinander: grobe Form plus feine Maserung.
float fbm(vec2 p) {
  float summe = 0.0;
  float gewicht = 0.5;
  for (int i = 0; i < 5; i++) {
    summe += gewicht * rauschen(p);
    p *= 2.02;
    gewicht *= 0.5;
  }
  return summe;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uFlaeche;
  float seitenverhaeltnis = uFlaeche.x / uFlaeche.y;
  vec2 p = vec2(uv.x * seitenverhaeltnis, uv.y) * 1.6;

  // Der Zeiger schiebt das Feld leicht — spürbar, aber nie hektisch.
  p += uZeiger * 0.18;

  float t = uZeit * 0.05;

  // --- Domain Warping: Rauschen im Rauschen -----------------------------
  // Die Zeit läuft in jeder Ebene in eine andere Richtung. Liefe sie überall
  // gleich, würde die Maserung bloss über den Schirm schieben wie eine
  // Tapete; so knetet sie sich statt zu wandern.
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.55)),
                fbm(p + vec2(5.2, 1.3) + vec2(-t * 0.4, 0.0)));

  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t),
                fbm(p + 3.5 * q + vec2(8.3, 2.8) - t * 0.7));

  float f = fbm(p + 3.5 * r);

  // --- Farbe: drei Goldtöne, ineinandergelaufen -------------------------
  // Der helle Ton liegt nahe am Seitengrund. Zieht man die Mischung zu stark
  // dorthin zurück, verschwindet die ganze Maserung im Cremeweiss — genau das
  // war beim ersten Versuch der Fehler.
  vec3 ton = mix(uHell, uMittel, clamp(f * f * 3.4, 0.0, 1.0));
  ton = mix(ton, uDunkel, clamp(length(q) * 0.95 - 0.12, 0.0, 1.0));
  ton = mix(ton, uHell, clamp(r.x * 0.35, 0.0, 1.0));

  // --- Deckung ----------------------------------------------------------
  // Kräftiger, wo die Maserung dicht ist.
  float dichte = smoothstep(0.15, 0.95, f * 1.35 + length(r) * 0.25);

  // Die Mitte wird gedämpft, nicht abgeschaltet: Dort stehen Schlagzeile,
  // Lead und Knöpfe. Ganz auf null gesetzt entsteht ein toter weisser Fleck
  // mitten im Bild, und der fällt mehr auf als das Muster selbst.
  vec2 vonMitte = (uv - 0.5) * vec2(seitenverhaeltnis, 1.35);
  float rand = mix(0.22, 1.0, smoothstep(0.16, 0.82, length(vonMitte)));

  // Oben etwas mehr als unten — dort schliesst das Bildschirmfoto an.
  float oben = mix(0.7, 1.2, uv.y);

  float deckung = dichte * rand * oben * 0.72;

  farbe = vec4(ton, clamp(deckung, 0.0, 1.0));
}`;

/** "#9c7b42" → [0.61, 0.48, 0.26] */
function nachRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  const voll = h.length === 3 ? h.split("").map((z) => z + z).join("") : h;
  const zahl = parseInt(voll, 16);
  return [((zahl >> 16) & 255) / 255, ((zahl >> 8) & 255) / 255, (zahl & 255) / 255];
}

function baueProgramm(gl: WebGL2RenderingContext): WebGLProgram | null {
  const uebersetze = (art: number, quelle: string) => {
    const s = gl.createShader(art);
    if (!s) return null;
    gl.shaderSource(s, quelle);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error("[FliessHintergrund]", gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  };

  const ecken = uebersetze(gl.VERTEX_SHADER, ECKPUNKT_SHADER);
  const flaechen = uebersetze(gl.FRAGMENT_SHADER, FARB_SHADER);
  if (!ecken || !flaechen) return null;

  const programm = gl.createProgram();
  if (!programm) return null;
  gl.attachShader(programm, ecken);
  gl.attachShader(programm, flaechen);
  gl.linkProgram(programm);
  gl.deleteShader(ecken);
  gl.deleteShader(flaechen);

  if (!gl.getProgramParameter(programm, gl.LINK_STATUS)) {
    console.error("[FliessHintergrund]", gl.getProgramInfoLog(programm));
    return null;
  }
  return programm;
}

export default function FliessHintergrund() {
  const flaeche = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const leinwand = flaeche.current;
    if (!leinwand) return;

    const gl = leinwand.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    // Ohne WebGL2 bleibt schlicht der Verlauf der Sektion stehen — die Seite
    // funktioniert vollständig ohne diesen Hintergrund.
    if (!gl) return;

    const programm = baueProgramm(gl);
    if (!programm) return;

    // Ein Dreieck, das die ganze Fläche überdeckt — billiger als zwei.
    const puffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, puffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const lage = gl.getAttribLocation(programm, "lage");
    gl.enableVertexAttribArray(lage);
    gl.vertexAttribPointer(lage, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(programm);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const ort = {
      flaeche: gl.getUniformLocation(programm, "uFlaeche"),
      zeit: gl.getUniformLocation(programm, "uZeit"),
      zeiger: gl.getUniformLocation(programm, "uZeiger"),
      hell: gl.getUniformLocation(programm, "uHell"),
      mittel: gl.getUniformLocation(programm, "uMittel"),
      dunkel: gl.getUniformLocation(programm, "uDunkel"),
    };

    // Farben aus dem Theme, damit der Hintergrund mitwechselt, wenn jemand
    // die Farbwelt umstellt.
    const stil = getComputedStyle(document.documentElement);
    const lies = (name: string, ersatz: string) =>
      nachRgb(stil.getPropertyValue(name) || ersatz);
    gl.uniform3fv(ort.hell, lies("--accent-300", "#ded4bf"));
    gl.uniform3fv(ort.mittel, lies("--brand-light", "#c9a870"));
    gl.uniform3fv(ort.dunkel, lies("--brand", "#9c7b42"));

    let breite = 0;
    let hoehe = 0;

    function passeAn() {
      if (!leinwand || !gl) return;
      const kasten = leinwand.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const b = Math.max(1, Math.round(kasten.width * dpr * MASSSTAB));
      const h = Math.max(1, Math.round(kasten.height * dpr * MASSSTAB));
      if (b === breite && h === hoehe) return;
      breite = b;
      hoehe = h;
      leinwand.width = b;
      leinwand.height = h;
      gl.viewport(0, 0, b, h);
      gl.uniform2f(ort.flaeche, b, h);
    }
    passeAn();

    const wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)");

    let zeigerZielX = 0;
    let zeigerZielY = 0;
    let zeigerX = 0;
    let zeigerY = 0;

    function beiZeiger(e: PointerEvent) {
      zeigerZielX = (e.clientX / window.innerWidth) * 2 - 1;
      zeigerZielY = (e.clientY / window.innerHeight) * 2 - 1;
    }

    let laeuft = true;
    let imBild = true;
    let bild = 0;
    let zuletzt = 0;
    const start = performance.now();

    function zeichne(jetzt: number) {
      if (!laeuft || !gl) return;
      bild = requestAnimationFrame(zeichne);

      if (!imBild || document.hidden) return;
      if (jetzt - zuletzt < 1000 / BILDRATE) return;
      zuletzt = jetzt;

      passeAn();

      // Träge nachgeführt: Die Farbe folgt dem Zeiger wie zähe Flüssigkeit.
      zeigerX += (zeigerZielX - zeigerX) * 0.04;
      zeigerY += (zeigerZielY - zeigerY) * 0.04;
      gl.uniform2f(ort.zeiger, zeigerX, -zeigerY);

      // Bei reduzierter Bewegung steht die Zeit still — das Bild bleibt,
      // aber es bewegt sich nichts.
      gl.uniform1f(ort.zeit, wenigerBewegung.matches ? 0 : (jetzt - start) / 1000);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    bild = requestAnimationFrame(zeichne);
    window.addEventListener("pointermove", beiZeiger, { passive: true });

    // Ausserhalb des Bildes wird nicht gerechnet.
    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        imBild = eintrag.isIntersecting;
      },
      { threshold: 0 }
    );
    beobachter.observe(leinwand);

    return () => {
      laeuft = false;
      cancelAnimationFrame(bild);
      window.removeEventListener("pointermove", beiZeiger);
      beobachter.disconnect();
      gl.deleteBuffer(puffer);
      gl.deleteProgram(programm);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={flaeche}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}

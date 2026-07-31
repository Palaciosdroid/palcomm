"use client";

import { useEffect, useRef } from "react";

/**
 * Gemalter Hintergrund für das Startbild: fünf von Hand komponierte Öl-Striche
 * in Goldtönen, die sich beim Laden nacheinander ziehen und danach ruhig auf
 * einer sanften Zeiger-Parallaxe liegen.
 *
 * Warum Striche und keine Farbflächen: Weichgezeichnetes hat keine Form — auf
 * hellem Grund wird es zum braunen Schleier (so ist der erste Versuch
 * gestorben). Ein Strich hat Kante, Richtung, Anfang und Ende.
 *
 * Was einen Pfad hier zum Pinselstrich macht (gleiche Schule wie
 * Pinselstrich.tsx, eine Stufe weiter):
 *
 * 1. Gefüllte Bänder mit ungleicher Dicke — stumpfer Ansatz (Aufsetzen),
 *    Bauch bei etwa 40 Prozent, leichte Taille, einseitig auslaufendes Ende.
 *    Beidseitig spitze Formen lesen sich als Blatt, nicht als Strich.
 * 2. Das Ende franst in zwei, drei Finger aus, und Trockenlücken sind Keile,
 *    die sich zum Ende hin öffnen (fill-rule="evenodd" stanzt sie aus dem
 *    Band). Geschlossene Schlitze in der Mitte sähen aus wie Blattadern.
 * 3. Ein zweiter, kürzerer Auftrag in dunklerem Ton liegt im Band und läuft
 *    an beiden Enden spitz zu — ein starrer Balken wirkt aufgeklebt.
 * 4. feTurbulence + feDisplacementMap (kleiner scale) raut nur die Striche
 *    an, nie die Fläche — die Basisfrequenz ist je Strich anisotrop, damit
 *    die Kante längs der Zugrichtung streift wie trockene Borsten.
 *
 * Aufgedeckt wird jeder Strich über eine Maske, in der ein breiter Zug mit
 * runder Kappe dem Band entlangläuft (stroke-dasharray, siehe globals.css,
 * Block "Gemalter Hintergrund"). Die Staffelung ergibt zusammen rund zwei
 * Sekunden Malerei, danach steht das Bild still.
 *
 * Die Parallaxe verschiebt drei Tiefenebenen um höchstens 7/12/18 Pixel,
 * stark gedämpft über Lerp in requestAnimationFrame. Bei
 * prefers-reduced-motion passiert gar nichts: fertiges, stilles Bild.
 *
 * Farben ausschliesslich über die Themenvariablen (--brand, --brand-dark,
 * --brand-light), Deckkraft 0.4 bis 0.75 — kräftig genug, um auf dem hellen
 * Verlauf als Malerei lesbar zu sein; an der Blässe sind beide Vorgänger
 * gestorben.
 */

/** Verschiebung der Ebenen in Pixeln bei voll ausgelenktem Zeiger */
const TIEFEN = [7, 12, 18] as const;

/** Dämpfung: pro Bild nur 6 Prozent des Restwegs — träge wie nasse Farbe */
const LERP = 0.06;

export default function MalHintergrund() {
  const ebene1 = useRef<HTMLDivElement>(null);
  const ebene2 = useRef<HTMLDivElement>(null);
  const ebene3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wer weniger Bewegung wünscht, bekommt auch keine Parallaxe.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ebenen = [ebene1.current, ebene2.current, ebene3.current];
    let zielX = 0,
      zielY = 0; // wohin der Zeiger zeigt, normiert auf −1..1
    let istX = 0,
      istY = 0; // wo die Ebenen gerade stehen
    let bild = 0;

    const schritt = () => {
      istX += (zielX - istX) * LERP;
      istY += (zielY - istY) * LERP;
      ebenen.forEach((el, i) => {
        if (el) {
          el.style.transform = `translate3d(${(istX * TIEFEN[i]).toFixed(2)}px, ${(istY * TIEFEN[i]).toFixed(2)}px, 0)`;
        }
      });
      // Angekommen? Dann Schleife beenden statt ewig weiterzurechnen.
      if (Math.abs(zielX - istX) + Math.abs(zielY - istY) > 0.002) {
        bild = requestAnimationFrame(schritt);
      } else {
        bild = 0;
      }
    };

    const zeiger = (e: PointerEvent) => {
      zielX = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1));
      zielY = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1));
      if (!bild) bild = requestAnimationFrame(schritt);
    };

    window.addEventListener("pointermove", zeiger, { passive: true });
    return () => {
      window.removeEventListener("pointermove", zeiger);
      if (bild) cancelAnimationFrame(bild);
    };
  }, []);

  return (
    /*
     * -z-10 verlangt einen eigenen Stapelkontext der section (isolate),
     * sonst rutscht die Ebene hinter deren Verlauf. pointer-events-none,
     * damit die Malerei nie zwischen Besucher/in und Knöpfen steht.
     */
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* ================= Ebene 1 — tief, wandert kaum ================= */}
      <div ref={ebene1} className="mal-ebene absolute inset-0">
        {/*
         * Grosser Bogen: umarmt die obere linke Ecke, Zugrichtung von oben
         * nach unten links. Er bleibt bei Texthöhe klar links der Spalte.
         */}
        <svg
          viewBox="0 0 560 460"
          className="absolute -left-12 -top-10 w-[clamp(300px,46vw,660px)] md:-left-20 md:-top-14"
        >
          <defs>
            <filter id="mal-f-bogen" x="-12%" y="-12%" width="124%" height="124%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.045" numOctaves="2" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
            </filter>
            <mask id="mal-m-bogen" maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="460">
              <path
                className="mal-zug"
                style={{ "--zug-warten": "100ms", "--zug-dauer": "800ms" } as React.CSSProperties}
                d="M374,-16 C 360,14 348,38 336,58 C 314,98 292,118 272,136 C 252,154 234,170 216,188 C 195,208 172,220 152,238 C 132,256 114,272 100,292 C 86,312 72,328 64,348 C 57,366 51,384 46,406"
                stroke="#fff"
                strokeWidth="92"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
              />
            </mask>
          </defs>
          <g filter="url(#mal-f-bogen)">
            <g mask="url(#mal-m-bogen)">
              {/* Hauptband: stumpf oben, Bauch, Taille, ausgefranste Finger unten */}
              <path
                fill="var(--brand)"
                opacity="0.72"
                fillRule="evenodd"
                d="M383,-11
                C 371,16 361,42 351,68
                C 331,124 311,138 291,154
                C 271,172 252,188 232,206
                C 213,224 194,245 175,263
                C 155,281 134,293 120,308
                C 103,325 84,338 76,354
                C 68,371 61,383 57,395
                C 55,403 51,410 47,417
                C 47,410 48,403 48,397
                C 45,402 42,406 38,409
                C 39,403 41,396 43,390
                C 45,375 48,358 52,342
                C 60,317 68,296 80,276
                C 94,252 108,231 129,213
                C 150,193 175,183 200,170
                C 220,152 234,137 253,118
                C 274,95 305,74 321,48
                C 332,29 351,-2 365,-21
                Z
                M94,318 C 84,340 72,362 60,386 C 62,387 64,388 66,388 C 74,366 84,342 92,320 Z
                M78,300 C 72,314 66,330 62,346 C 63,347 65,347 66,347 C 70,331 75,315 80,301 Z
                M186,232 C 172,244 158,256 146,270 C 160,254 174,242 188,234 Z"
              />
              {/* Zweiter Auftrag: dunkler, beidseitig gespitzt, leicht versetzt */}
              <path
                className="mal-nass"
                style={{ "--nass-warten": "750ms", "--deckkraft": "0.45" } as React.CSSProperties}
                fill="var(--brand-dark)"
                d="M269,129
                C 253,147 237,167 221,186
                C 204,201 185,215 168,230
                C 150,245 132,259 114,274
                C 113,273 111,271 110,270
                C 124,251 138,233 152,214
                C 171,200 190,190 209,174
                C 228,158 248,143 267,127
                C 268,128 268,128 269,129
                Z"
              />
              {/* Lichtkante am Ansatz — als hätte die Farbe dort weniger gedeckt */}
              <path
                className="mal-nass"
                style={{ "--nass-warten": "900ms", "--deckkraft": "0.5" } as React.CSSProperties}
                fill="var(--brand-light)"
                d="M352,72 C 337,102 320,124 300,146 C 296,142 293,139 290,136 C 310,115 326,95 342,66 Z"
              />
            </g>
          </g>
        </svg>

        {/*
         * Sockelzug: breiter, ruhiger Querstrich unten rechts. Er läuft
         * hinter dem Bildplatz hervor und über den Rand hinaus — das bindet
         * das Bild in die Malerei ein. Erst ab lg, darunter läge er nur
         * unsichtbar hinter dem Bild.
         */}
        <svg
          viewBox="0 0 640 220"
          className="absolute -right-12 bottom-[8%] hidden w-[clamp(360px,38vw,560px)] lg:block"
        >
          <defs>
            <filter id="mal-f-sockel" x="-8%" y="-18%" width="116%" height="136%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.05" numOctaves="2" seed="9" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
            </filter>
            <mask id="mal-m-sockel" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="220">
              <path
                className="mal-zug"
                style={{ "--zug-warten": "480ms", "--zug-dauer": "750ms" } as React.CSSProperties}
                d="M24,96 C 62,100 101,103 140,106 C 180,110 220,114 260,118 C 314,121 367,119 420,116 C 460,113 500,108 540,104 C 570,101 599,97 626,94"
                stroke="#fff"
                strokeWidth="84"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
              />
            </mask>
          </defs>
          <g filter="url(#mal-f-sockel)">
            <g mask="url(#mal-m-sockel)">
              <path
                fill="var(--brand-light)"
                opacity="0.6"
                fillRule="evenodd"
                d="M22,82
                C 60,78 98,76 136,76
                C 176,76 216,78 256,82
                C 310,86 364,90 418,92
                C 458,93 499,92 539,91
                C 569,90 598,89 628,89
                C 631,92 631,96 628,99
                C 598,104 569,110 541,117
                C 501,127 462,136 422,140
                C 368,146 316,152 264,154
                C 224,150 184,143 144,136
                C 105,128 65,118 26,110
                C 18,107 16,85 22,82
                Z
                M110,100 C 190,104 270,110 350,118 C 270,114 190,110 111,105 Z
                M300,138 C 370,140 440,134 510,124 C 441,138 371,144 301,142 Z"
              />
              <path
                className="mal-nass"
                style={{ "--nass-warten": "1150ms", "--deckkraft": "0.4" } as React.CSSProperties}
                fill="var(--brand)"
                d="M184,99
                C 215,99 246,100 277,101
                C 314,104 351,108 388,111
                C 402,114 415,117 429,120
                C 430,121 430,123 431,124
                C 418,124 405,125 392,125
                C 356,123 320,121 283,119
                C 251,114 218,110 186,105
                C 185,103 184,101 184,99
                Z"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* ================= Ebene 2 — mittlere Tiefe ================= */}
      <div ref={ebene2} className="mal-ebene absolute inset-0">
        {/*
         * Vertikaler Zug am rechten Rand: von oben nach unten gezogen,
         * unten trocken auslaufend. Erst ab lg — auf schmalen Bildschirmen
         * käme er der Textspalte zu nahe.
         */}
        <svg
          viewBox="0 0 200 560"
          className="absolute -right-7 top-[22%] hidden w-[clamp(120px,12vw,170px)] lg:block"
        >
          <defs>
            <filter id="mal-f-vertikal" x="-15%" y="-8%" width="130%" height="116%">
              <feTurbulence type="fractalNoise" baseFrequency="0.055 0.012" numOctaves="2" seed="4" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="8" />
            </filter>
            <mask id="mal-m-vertikal" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="560">
              <path
                className="mal-zug"
                style={{ "--zug-warten": "850ms", "--zug-dauer": "700ms" } as React.CSSProperties}
                d="M118,20 C 112,50 106,80 102,110 C 96,148 93,186 92,225 C 92,257 94,288 96,320 C 98,352 101,384 104,415 C 107,446 110,476 114,505 C 116,517 118,530 119,540"
                stroke="#fff"
                strokeWidth="78"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
              />
            </mask>
          </defs>
          <g filter="url(#mal-f-vertikal)">
            <g mask="url(#mal-m-vertikal)">
              <path
                fill="var(--brand)"
                opacity="0.68"
                fillRule="evenodd"
                d="M129,22
                C 126,52 123,82 122,112
                C 123,150 125,188 125,226
                C 124,257 120,288 118,319
                C 117,350 119,382 120,413
                C 120,444 121,474 121,504
                C 122,517 123,529 124,541
                C 122,534 121,526 120,518
                C 118,527 115,534 112,540
                C 112,531 111,522 110,513
                C 102,484 94,455 90,425
                C 84,392 76,357 74,323
                C 72,290 63,257 62,224
                C 62,185 75,147 83,108
                C 89,78 97,48 107,18
                C 114,16 122,18 129,22
                Z
                M113,432 C 111,456 112,479 114,500 C 116,501 118,501 119,500 C 117,478 116,455 116,433 Z
                M86,350 C 86,372 88,394 92,415 C 93,416 95,416 96,415 C 92,394 90,372 90,351 Z
                M86,180 C 84,205 83,230 83,255 C 81,230 82,204 84,179 Z"
              />
              <path
                className="mal-nass"
                style={{ "--nass-warten": "1500ms", "--deckkraft": "0.45" } as React.CSSProperties}
                fill="var(--brand-dark)"
                d="M111,116
                C 111,140 111,165 111,190
                C 110,215 109,240 108,265
                C 107,287 107,309 106,330
                C 105,330 103,330 102,331
                C 98,309 95,287 93,265
                C 92,240 92,215 94,190
                C 97,165 101,140 105,116
                C 107,115 109,115 111,116
                Z"
              />
              <path
                className="mal-nass"
                style={{ "--nass-warten": "1600ms", "--deckkraft": "0.5" } as React.CSSProperties}
                fill="var(--brand-light)"
                d="M125,88 C 124,120 123,152 123,184 C 121,184 120,183 118,182 C 119,150 120,118 122,86 C 123,86 124,87 125,88 Z"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* ================= Ebene 3 — vorn, wandert am stärksten ================= */}
      <div ref={ebene3} className="mal-ebene absolute inset-0">
        {/*
         * Kurzer Schrägstrich oben rechts: das Gegengewicht zum grossen
         * Bogen, wie mit lockerem Handgelenk abgeschlagen.
         */}
        <svg
          viewBox="0 0 200 170"
          className="absolute right-[6%] top-10 w-[clamp(96px,10vw,150px)] md:right-[8%] md:top-[9%]"
        >
          <defs>
            <filter id="mal-f-komma" x="-12%" y="-12%" width="124%" height="124%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03 0.03" numOctaves="2" seed="5" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
            </filter>
            <mask id="mal-m-komma" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="170">
              <path
                className="mal-zug"
                style={{ "--zug-warten": "1300ms", "--zug-dauer": "420ms" } as React.CSSProperties}
                d="M28,38 C 48,40 70,46 90,54 C 112,63 132,74 150,88 C 162,97 174,106 184,116"
                stroke="#fff"
                strokeWidth="48"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
              />
            </mask>
          </defs>
          <g filter="url(#mal-f-komma)">
            <g mask="url(#mal-m-komma)">
              <path
                fill="var(--brand)"
                opacity="0.65"
                d="M33,30
                C 50,31 67,34 83,38
                C 100,45 116,55 131,64
                C 144,74 156,86 168,96
                C 174,102 180,108 185,114
                C 186,116 185,117 183,118
                C 176,113 169,109 162,104
                C 148,97 133,90 119,84
                C 101,77 84,71 67,66
                C 52,60 37,52 23,46
                C 20,41 26,32 33,30
                Z"
              />
              <path
                className="mal-nass"
                style={{ "--nass-warten": "1650ms", "--deckkraft": "0.4" } as React.CSSProperties}
                fill="var(--brand-dark)"
                d="M61,48
                C 77,50 93,53 108,58
                C 123,66 137,76 151,85
                C 150,87 150,89 149,91
                C 134,83 118,76 102,70
                C 88,64 73,57 59,52
                C 59,51 60,49 61,48
                Z"
              />
            </g>
          </g>
        </svg>

        {/*
         * Tupfer unten links: kurzer, satter Abschlag mit Fransen und zwei,
         * drei Farbspritzern — der Punkt am Ende des Satzes. Sitzt im
         * Fussstreifen unter dem Bildplatz.
         */}
        <svg
          viewBox="0 0 250 130"
          className="absolute bottom-2 left-3 w-[clamp(150px,17vw,240px)] md:bottom-[6%] md:left-[3%]"
        >
          <defs>
            <filter id="mal-f-tupfer" x="-10%" y="-20%" width="120%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="11" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="8" />
            </filter>
            <mask id="mal-m-tupfer" maskUnits="userSpaceOnUse" x="0" y="0" width="250" height="130">
              <path
                className="mal-zug"
                style={{ "--zug-warten": "1520ms", "--zug-dauer": "400ms" } as React.CSSProperties}
                d="M20,68 C 36,62 52,56 70,52 C 86,48 102,46 118,45 C 136,44 154,44 172,45 C 190,46 208,45 226,44 C 231,44 236,43 240,43"
                stroke="#fff"
                strokeWidth="64"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
              />
            </mask>
          </defs>
          <g filter="url(#mal-f-tupfer)">
            <g mask="url(#mal-m-tupfer)">
              <path
                fill="var(--brand)"
                opacity="0.75"
                fillRule="evenodd"
                d="M20,53
                C 35,45 50,38 66,35
                C 81,31 96,29 111,28
                C 127,29 142,31 157,34
                C 171,36 184,38 198,40
                C 210,41 222,41 233,41
                C 224,44 216,45 208,46
                C 216,49 224,51 231,53
                C 221,55 212,55 204,56
                C 210,59 216,61 221,64
                C 213,64 206,63 199,61
                C 187,67 175,71 163,74
                C 148,79 134,83 119,84
                C 104,85 89,85 74,85
                C 57,85 40,84 24,83
                C 16,80 14,58 20,53
                Z
                M150,66 C 168,62 186,58 204,53 C 205,54 205,55 206,56 C 188,61 171,66 153,69 Z"
              />
              <path
                className="mal-nass"
                style={{ "--nass-warten": "1800ms", "--deckkraft": "0.55" } as React.CSSProperties}
                fill="var(--brand-dark)"
                d="M47,63
                C 64,57 81,51 98,49
                C 113,46 128,45 143,45
                C 154,45 164,46 174,47
                C 175,48 175,50 176,51
                C 165,54 155,57 145,60
                C 130,64 116,66 101,67
                C 83,68 66,69 49,69
                C 48,67 47,65 47,63
                Z"
              />
            </g>
            {/* Spritzer ausserhalb der Maske: sie erscheinen zuletzt von selbst */}
            <g
              className="mal-nass"
              style={{ "--nass-warten": "1850ms", "--nass-dauer": "400ms", "--deckkraft": "0.6" } as React.CSSProperties}
              fill="var(--brand-dark)"
            >
              <circle cx="196" cy="88" r="4.5" />
              <circle cx="218" cy="78" r="2.5" />
              <circle cx="206" cy="97" r="1.8" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

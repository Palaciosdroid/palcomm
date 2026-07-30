#!/usr/bin/env node
//
// Prüft, ob Dateien, die zwischen Template und Seiten identisch sein müssen,
// auseinandergelaufen sind.
//
// Der Builder erzeugt Konfigurationen mit Paletten- und Schrift-IDs aus
// seinem eigenen theme.ts. Weicht das vom Template ab, entstehen Seiten mit
// IDs, die es dort gar nicht gibt — sie fallen dann still auf die erste
// Palette zurück. Das fällt sonst niemandem auf.
//
// Aufruf: node scripts/check-sync.mjs

import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const TEMPLATE = "templates/serene";

/** Dateien, die in jeder Seite mit dem Template übereinstimmen müssen. */
const SHARED = ["src/lib/theme.ts", "src/types/content.ts"];

/** Seiten, die aus dem Template stammen und mitgeprüft werden. */
const SITES = ["sites/palacios"];

function digest(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 12);
}

let problems = 0;

for (const site of SITES) {
  for (const file of SHARED) {
    const a = `${TEMPLATE}/${file}`;
    const b = `${site}/${file}`;

    if (!existsSync(b)) {
      console.error(`FEHLT   ${b}`);
      problems++;
      continue;
    }

    if (digest(a) !== digest(b)) {
      console.error(`ABWEICHUNG  ${file}`);
      console.error(`            ${a}`);
      console.error(`            ${b}`);
      console.error(`            Abgleichen mit: cp ${a} ${b}`);
      problems++;
    }
  }
}

if (problems > 0) {
  console.error(`\n${problems} Abweichung(en) gefunden.`);
  process.exit(1);
}

console.log(`Alles synchron (${SHARED.length} Datei(en) × ${SITES.length} Seite(n)).`);

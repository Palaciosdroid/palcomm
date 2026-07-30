import {
  berechne, voreinstellungen, bausteine, GRUNDPREIS, formatiereChf, findeBaustein,
} from "../src/lib/angebot.js";

let fehler = 0;
const pruefe = (name: string, ok: boolean, info = "") => {
  console.log(`${ok ? "OK  " : "FEHL"} ${name}${info ? "  — " + info : ""}`);
  if (!ok) fehler++;
};

console.log("Die drei Voreinstellungen:\n");
for (const v of voreinstellungen) {
  const s = berechne(v.bausteinIds);
  const teile = v.bausteinIds.map(findeBaustein).filter(Boolean);
  const aufAnfrage = teile.filter((b) => b!.nurAufAnfrage).length;
  console.log(
    `  ${v.name.padEnd(11)} CHF ${formatiereChf(s.einmalig).padStart(6)} + ${formatiereChf(s.proMonat)}/Mt` +
    (s.ersparnis > 0 ? `   (einzeln ${formatiereChf(s.ohneRabatt)}, gespart ${formatiereChf(s.ersparnis)})` : "") +
    (aufAnfrage ? `   [${aufAnfrage} auf Anfrage]` : "")
  );
}
console.log();

// Der Kernmechanismus: das Paket MUSS billiger sein als seine Teile.
for (const v of voreinstellungen.filter((v) => v.id !== "selbst")) {
  const s = berechne(v.bausteinIds);
  pruefe(
    `${v.name}: Paket billiger als Einzelkauf`,
    s.einmalig < s.ohneRabatt,
    `${formatiereChf(s.einmalig)} < ${formatiereChf(s.ohneRabatt)}`
  );
}

// Wer selbst zusammenstellt, zahlt Einzelpreise — kein versteckter Rabatt.
const eigeneAuswahl = ["texte-lektorat", "seo"];
const eigen = berechne(eigeneAuswahl);
pruefe("Eigene Auswahl ohne Rabatt", eigen.einmalig === eigen.ohneRabatt,
  `${formatiereChf(eigen.einmalig)}`);

// Leere Auswahl = Grundpreis
const leer = berechne([]);
pruefe("Ohne Bausteine gilt der Grundpreis", leer.einmalig === GRUNDPREIS,
  `CHF ${formatiereChf(leer.einmalig)}`);

// Auf Anfrage darf die Summe nicht erhöhen
const mitAnfrage = berechne(["texte-selbst", "logo-bildmarke"]);
pruefe("Posten auf Anfrage zählen nicht mit", mitAnfrage.einmalig === GRUNDPREIS,
  `CHF ${formatiereChf(mitAnfrage.einmalig)}`);

// Monatliche Zuschläge addieren sich aufs Abo
const mitBlog = berechne(["texte-selbst", "blog"]);
pruefe("Monatliche Zuschläge kommen aufs Abo", mitBlog.proMonat === 44.9,
  `CHF ${formatiereChf(mitBlog.proMonat)}/Monat`);

// Jede Auswahlgruppe muss mehr als eine Option haben, sonst ist sie sinnlos
const gruppen = new Map<string, number>();
for (const b of bausteine) if (b.auswahlgruppe)
  gruppen.set(b.auswahlgruppe, (gruppen.get(b.auswahlgruppe) ?? 0) + 1);
for (const [g, n] of gruppen)
  pruefe(`Auswahlgruppe "${g}" hat mehrere Optionen`, n > 1, `${n} Stück`);

// Die Formatierung muss auf Server und Client Zeichen für Zeichen gleich
// ausfallen. toLocaleString("de-CH") tut das nicht — Node schrieb 1'590,
// Chromium 1’590, und React verwarf deshalb den halben Konfigurator.
const formate: [number, string][] = [
  [980, "980"],
  [1590, "1’590"],
  [2990, "2’990"],
  [29.9, "29.90"],
  [44.9, "44.90"],
  [299, "299"],
  [1000000, "1’000’000"],
  [0, "0"],
];
for (const [zahl, erwartet] of formate)
  pruefe(`formatiereChf(${zahl})`, formatiereChf(zahl) === erwartet,
    `"${formatiereChf(zahl)}" erwartet "${erwartet}"`);

console.log(`\n${fehler === 0 ? "Alles bestanden" : fehler + " Fehler"}`);
process.exit(fehler ? 1 : 0);

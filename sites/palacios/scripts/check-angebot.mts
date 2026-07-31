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

// Absolventen-Bonus: nur auf die gewählte Textüberarbeitung, nie darüber hinaus
const gemeinsam = voreinstellungen.find((v) => v.id === "gemeinsam")!.bausteinIds;
const mitBonus = berechne(gemeinsam, true);
const ohneBonus = berechne(gemeinsam, false);
pruefe("Absolvent/in spart die Textüberarbeitung",
  ohneBonus.einmalig - mitBonus.einmalig === 190,
  `${formatiereChf(ohneBonus.einmalig)} → ${formatiereChf(mitBonus.einmalig)}`);

const selbstBonus = berechne(["texte-selbst"], true);
pruefe("Ohne gewählte Überarbeitung kein Bonus",
  selbstBonus.einmalig === GRUNDPREIS && selbstBonus.absolventenBonus === 0,
  `CHF ${formatiereChf(selbstBonus.einmalig)}`);

const komplettBonus = berechne(["texte-komplett"], true);
pruefe("Bonus gilt auch bei der vollen Textübernahme",
  komplettBonus.absolventenBonus === 190,
  `CHF ${formatiereChf(komplettBonus.einmalig)} statt ${formatiereChf(berechne(["texte-komplett"]).einmalig)}`);

// Wer mehr wählt, darf nie weniger Bonus bekommen.
for (const stufe of ["texte-selbst", "texte-lektorat", "texte-komplett"]) {
  const b = berechne([stufe], true);
  const ohne = berechne([stufe]);
  pruefe(`Bonus bei "${findeBaustein(stufe)!.name}" nie grösser als der Posten`,
    b.absolventenBonus <= findeBaustein(stufe)!.preis && b.einmalig <= ohne.einmalig,
    `CHF ${formatiereChf(b.absolventenBonus)} Bonus`);
}

// Ein Posten auf Anfrage darf den Paketpreis nicht kippen.
const rundum = voreinstellungen.find((v) => v.id === "rundum")!;
const rundumNormal = berechne(rundum.bausteinIds);
const rundumMitVideo = berechne([...rundum.bausteinIds, "video"]);
pruefe("Posten auf Anfrage lässt den Paketpreis stehen",
  rundumMitVideo.einmalig === rundumNormal.einmalig &&
    rundumMitVideo.passendeVoreinstellung === "rundum",
  `${formatiereChf(rundumNormal.einmalig)} → ${formatiereChf(rundumMitVideo.einmalig)}`);

const gemeinsamMitLogo = berechne([...gemeinsam, "logo-bildmarke"]);
pruefe("Gilt auch für die Bildmarke im Paket Gemeinsam",
  gemeinsamMitLogo.einmalig === berechne(gemeinsam).einmalig,
  `CHF ${formatiereChf(gemeinsamMitLogo.einmalig)}`);

console.log(`\n${fehler === 0 ? "Alles bestanden" : fehler + " Fehler"}`);
process.exit(fehler ? 1 : 0);

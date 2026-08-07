import {
  berechne, voreinstellungen, voreinstellungPreis, bausteine, GRUNDPREIS,
  formatiereChf, findeBaustein,
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
  const posten = teile
    .filter((b) => !b!.nurAufAnfrage && b!.preis > 0)
    .map((b) => formatiereChf(b!.preis));
  console.log(
    `  ${v.name.padEnd(11)} CHF ${formatiereChf(s.einmalig).padStart(6)} + ${formatiereChf(s.proMonat)}/Mt` +
    `   = ${[formatiereChf(GRUNDPREIS), ...posten].join(" + ")}` +
    (aufAnfrage ? `   [${aufAnfrage} auf Anfrage]` : "")
  );
}
console.log();

// --- DIE zentrale Regel seit dem 6.8.2026 ---
//
// Kein Paketrabatt. Der Preis ist immer Grundpreis plus die Summe der
// angehakten Kästchen — nachrechenbar mit den Etiketten, die daneben
// stehen. Vorher trug jede Voreinstellung einen eigenen, tieferen
// Festpreis; das führte zweimal zu gemeldeten Sprüngen, zuletzt: ein
// Häkchen bei einem Posten mit Etikett «+ 0» hob den Preis um 170.
//
// Diese Schleife prüft das erschöpfend über ALLE Teilmengen der buchbaren
// Bausteine — nicht an Beispielen. Damit kann kein künftiger Sonderfall
// die Nachrechenbarkeit unbemerkt brechen.
const buchbareIds = bausteine.filter((b) => !b.nurAufAnfrage).map((b) => b.id);
let abweichungen = 0;
let geprueft = 0;
for (let maske = 0; maske < 1 << buchbareIds.length; maske++) {
  const auswahl = buchbareIds.filter((_, i) => maske & (1 << i));
  const erwartet =
    GRUNDPREIS + auswahl.reduce((s, id) => s + findeBaustein(id)!.preis, 0);
  geprueft++;
  if (berechne(auswahl).einmalig !== erwartet) abweichungen++;
}
pruefe("Preis = Grundpreis + angehakte Kästchen, ausnahmslos",
  abweichungen === 0,
  `${geprueft.toLocaleString("de-CH")} Kombinationen geprüft, ${abweichungen} Abweichungen`);

// Der Preis auf der Kachel muss derselbe sein, den das Anklicken ihrer
// Kästchen ergibt — sonst wäre die Kachel eine zweite Wahrheit.
for (const v of voreinstellungen) {
  pruefe(`${v.name}: Kachelpreis = Summe ihrer Bausteine`,
    voreinstellungPreis(v) === berechne(v.bausteinIds).einmalig,
    `CHF ${formatiereChf(voreinstellungPreis(v))}`);
}

// Der gemeldete Fall, jetzt als fester Regressionstest: «Gemeinsam» plus
// SEO-Betreuung. Einmalig darf sich NICHTS ändern, nur das Monatliche.
const gemeinsamIds = voreinstellungen.find((v) => v.id === "gemeinsam")!.bausteinIds;
const gemeinsamPreis = berechne(gemeinsamIds).einmalig;

pruefe("Gemeinsam ist Grundpreis + 190 + 290",
  gemeinsamPreis === GRUNDPREIS + 190 + 290,
  `CHF ${formatiereChf(gemeinsamPreis)}`);

const mitSeoAbo = berechne([...gemeinsamIds, "seo-betreuung"]);
pruefe("Posten mit Etikett «+ 30/Mt» ändert den Einmalpreis nicht",
  mitSeoAbo.einmalig === gemeinsamPreis && mitSeoAbo.proMonat === 59.9,
  `CHF ${formatiereChf(mitSeoAbo.einmalig)} + ${formatiereChf(mitSeoAbo.proMonat)}/Mt`);

const mitKarten = berechne([...gemeinsamIds, "visitenkarten"]);
pruefe("Posten mit Etikett «+ CHF 240» kostet genau 240",
  mitKarten.einmalig === gemeinsamPreis + 240,
  `CHF ${formatiereChf(mitKarten.einmalig)}`);

// Textstufe wechseln kostet genau die Differenz der beiden Etiketten.
const hochgestuft = berechne(["texte-komplett", "google-business"]);
pruefe("Grössere Textstufe kostet die Differenz der Etiketten",
  hochgestuft.einmalig === gemeinsamPreis + (490 - 190),
  `CHF ${formatiereChf(hochgestuft.einmalig)}`);

const runtergestuft = berechne(["texte-selbst", "google-business"]);
pruefe("Kleinere Textstufe senkt den Preis",
  runtergestuft.einmalig === gemeinsamPreis - 190,
  `CHF ${formatiereChf(runtergestuft.einmalig)}`);

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

// --- E-Mail: der einzige Baustein, den wir zukaufen ---
//
// Alle anderen Posten kosten uns Arbeitszeit; dieser kostet jeden Monat bares
// Geld an einen Dritten. Deshalb steht der Einkaufspreis hier und wird gegen
// den Verkaufspreis geprüft: Wer die 9.90 später senkt, soll es merken,
// bevor die Kund/in es tut.
//
// Einkauf: Infomaniak Mail-Service, CHF 2.29 pro Adresse und Monat, exkl.
// MwSt., geprüft am 6.8.2026 auf infomaniak.com/de/ksuite/service-mail/preise.
// Bei einem Anbieterwechsel diese Zahl anpassen, nicht die Prüfung löschen.
const MWST_SATZ = 0.081;
const EINKAUF_MAIL_PRO_MONAT = 2.29;

const mail = findeBaustein("email-postfach")!;
const mailNetto = Math.round((mail.proMonat! / (1 + MWST_SATZ)) * 100) / 100;
const mailMarge = Math.round((mailNetto - EINKAUF_MAIL_PRO_MONAT) * 100) / 100;

pruefe("E-Mail: Verkauf deckt den Einkauf",
  mailNetto > EINKAUF_MAIL_PRO_MONAT,
  `netto ${formatiereChf(mailNetto)} gegen Einkauf ${formatiereChf(EINKAUF_MAIL_PRO_MONAT)}`);

// Untergrenze, nicht Zielwert: Darunter trägt der Posten nicht einmal einen
// einzigen kurzen Supportfall im Jahr (zwanzig Minuten ≈ 65 Franken).
pruefe("E-Mail: mindestens CHF 5.50 Marge im Monat",
  mailMarge >= 5.5,
  `CHF ${formatiereChf(mailMarge)}/Monat, CHF ${formatiereChf(Math.round(mailMarge * 12 * 100) / 100)}/Jahr`);

// 29.90 + 9.90 ergibt in Fliesskomma nicht exakt 39.8. Ohne die Rundung in
// berechne() stünde der Bruch im Konfigurator.
const mitMail = berechne(["texte-selbst", "email-postfach"]);
pruefe("Abo mit E-Mail geht auf den Rappen auf", mitMail.proMonat === 39.8,
  `CHF ${formatiereChf(mitMail.proMonat)}/Monat`);

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
  [39.8, "39.80"],
  [44.9, "44.90"],
  [9.9, "9.90"],
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

// Ein Posten auf Anfrage darf die Summe nicht kippen.
const rundum = voreinstellungen.find((v) => v.id === "rundum")!;
const rundumNormal = berechne(rundum.bausteinIds);
const rundumMitVideo = berechne([...rundum.bausteinIds, "video"]);
pruefe("Posten auf Anfrage lässt die Summe stehen",
  rundumMitVideo.einmalig === rundumNormal.einmalig &&
    rundumMitVideo.passendeVoreinstellung === "rundum",
  `${formatiereChf(rundumNormal.einmalig)} → ${formatiereChf(rundumMitVideo.einmalig)}`);

const gemeinsamMitLogo = berechne([...gemeinsam, "logo-bildmarke"]);
pruefe("Gilt auch für die Bildmarke neben Gemeinsam",
  gemeinsamMitLogo.einmalig === berechne(gemeinsam).einmalig,
  `CHF ${formatiereChf(gemeinsamMitLogo.einmalig)}`);

console.log(`\n${fehler === 0 ? "Alles bestanden" : fehler + " Fehler"}`);
process.exit(fehler ? 1 : 0);

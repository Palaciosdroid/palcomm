// Die Bestellung: was der Assistent sammelt und was der Server prüft.
//
// Der Preis wird auf dem Server neu gerechnet, nicht aus dem Formular
// übernommen. Sonst könnte jemand die Summe im Browser überschreiben und wir
// bestätigen einen Auftrag über CHF 1.

import { berechne, findeBaustein, type Summe } from "./angebot";
import { getPalette, getFontPairing } from "./theme";

export const LAENDER = [
  { id: "CH", name: "Schweiz" },
  { id: "DE", name: "Deutschland" },
  { id: "AT", name: "Österreich" },
] as const;

export type LandId = (typeof LAENDER)[number]["id"];

export interface Bestellung {
  bausteinIds: string[];
  paletteId: string;
  fontId: string;
  wunschdomain: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  land: LandId;
  praxisname: string;
  istAbsolventin: boolean;
  bemerkungen: string;
}

export interface PruefErgebnis {
  ok: boolean;
  /** Feldname → Meldung, damit der Fehler beim Feld steht und nicht oben */
  fehler: Partial<Record<keyof Bestellung, string>>;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Dieselbe Prüfung läuft im Browser und auf dem Server. */
export function pruefeBestellung(b: Partial<Bestellung>): PruefErgebnis {
  const fehler: PruefErgebnis["fehler"] = {};

  if (!b.vorname?.trim()) fehler.vorname = "Bitte trag deinen Vornamen ein.";
  if (!b.nachname?.trim()) fehler.nachname = "Bitte trag deinen Nachnamen ein.";

  if (!b.email?.trim()) fehler.email = "Ohne E-Mail können wir dir nichts schicken.";
  else if (!EMAIL.test(b.email.trim())) fehler.email = "Diese Adresse sieht nicht vollständig aus.";

  // Telefon absichtlich locker geprüft: internationale Schreibweisen sind
  // vielfältig, und eine abgelehnte Nummer kostet mehr als eine krumme.
  if (!b.telefon?.trim()) fehler.telefon = "Wir rufen dich für die Rückfragen an.";
  else if (b.telefon.replace(/\D/g, "").length < 9)
    fehler.telefon = "Diese Nummer scheint zu kurz zu sein.";

  if (!b.land || !LAENDER.some((l) => l.id === b.land))
    fehler.land = "Bitte wähl dein Land.";

  if (!Array.isArray(b.bausteinIds) || b.bausteinIds.length === 0)
    fehler.bausteinIds = "Es ist keine Auswahl angekommen.";
  else if (b.bausteinIds.some((id) => !findeBaustein(id)))
    fehler.bausteinIds = "Die Auswahl enthält etwas, das wir nicht kennen.";

  return { ok: Object.keys(fehler).length === 0, fehler };
}

/** Was auf Anfrage geht, steht nicht in der Summe — aber in der Bestätigung. */
export function trenneAuswahl(bausteinIds: string[]) {
  const gewaehlt = bausteinIds.map(findeBaustein).filter((b) => b !== undefined);
  return {
    berechnet: gewaehlt.filter((b) => !b.nurAufAnfrage),
    aufAnfrage: gewaehlt.filter((b) => b.nurAufAnfrage),
  };
}

/**
 * Lesbare Zusammenfassung für die Bestätigungsmail — an uns und an die
 * Kund/in. Bewusst Klartext: Wer sie in sechs Monaten aus dem Postfach
 * kramt, soll sie ohne unser System verstehen.
 */
export function fasseZusammen(b: Bestellung): { summe: Summe; text: string } {
  const summe = berechne(b.bausteinIds);
  const { berechnet, aufAnfrage } = trenneAuswahl(b.bausteinIds);
  const land = LAENDER.find((l) => l.id === b.land)?.name ?? b.land;

  const zeilen = [
    `Bestellung von ${b.vorname} ${b.nachname}`,
    b.praxisname ? `Praxis: ${b.praxisname}` : null,
    `${b.email} · ${b.telefon} · ${land}`,
    b.istAbsolventin ? "Absolvent/in einer Palacios-Ausbildung" : null,
    "",
    `Einmalig: CHF ${summe.einmalig}`,
    `Monatlich: CHF ${summe.proMonat}`,
    summe.ersparnis > 0
      ? `(einzeln CHF ${summe.ohneRabatt}, gespart CHF ${summe.ersparnis})`
      : null,
    "",
    "Gewählt:",
    ...berechnet.map((x) => `  - ${x.name}${x.preis > 0 ? ` (CHF ${x.preis})` : ""}`),
    aufAnfrage.length ? "" : null,
    aufAnfrage.length ? "Separat zu offerieren:" : null,
    ...aufAnfrage.map((x) => `  - ${x.name}`),
    "",
    `Aussehen: Palette ${getPalette(b.paletteId).name}, Schrift ${getFontPairing(b.fontId).name}`,
    b.wunschdomain ? `Wunschadresse: ${b.wunschdomain}` : "Wunschadresse: noch offen",
    b.bemerkungen ? `\nBemerkungen:\n${b.bemerkungen}` : null,
  ].filter((z) => z !== null);

  return { summe, text: zeilen.join("\n") };
}

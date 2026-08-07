// Die Bestellung: was der Assistent sammelt und was der Server prüft.
//
// Der Preis wird auf dem Server neu gerechnet, nicht aus dem Formular
// übernommen. Sonst könnte jemand die Summe im Browser überschreiben und wir
// bestätigen einen Auftrag über CHF 1.

import { GRUNDPREIS, berechne, findeBaustein, type Summe } from "./angebot";
import { getPalette, getFontPairing } from "./theme";

export const LAENDER = [
  { id: "CH", name: "Schweiz" },
  { id: "DE", name: "Deutschland" },
  { id: "AT", name: "Österreich" },
] as const;

export type LandId = (typeof LAENDER)[number]["id"];

/**
 * Gilt in diesem Land ein gesetzliches Widerrufsrecht für Fernabsatz?
 *
 * In der EU ja (§§ 355 ff. BGB, in Österreich das FAGG). In der Schweiz
 * nein: OR 40a ff. erfassen Haustür- und Telefongeschäfte, nicht aber
 * Verträge, die jemand selbst auf einer Website abschliesst. Für Schweizer
 * Bestellungen ist die Einwilligung zum sofortigen Beginn deshalb
 * gegenstandslos — und ein Kontrollkästchen, das nichts bewirkt, verwirrt
 * nur und lässt die Bestellung schwerer aussehen, als sie ist.
 *
 * ACHTUNG, falls der Verkauf je über abgehende Anrufe läuft: Bei einem am
 * Telefon geschlossenen Vertrag kann OR 40a doch greifen. Diese Funktion
 * beschreibt den Weg über das Formular, nicht jeden möglichen Vertragsweg.
 */
export function hatWiderrufsrecht(land: LandId | undefined): boolean {
  return land === "DE" || land === "AT";
}

export interface Bestellung {
  bausteinIds: string[];
  paletteId: string;
  fontId: string;
  wunschdomain: string;
  /**
   * Die Kund/in bringt ihre bestehende Adresse mit — dann steht in
   * wunschdomain keine Wunschadresse, sondern die Adresse, die umzuziehen
   * oder zu verbinden ist. Für die Abwicklung ist das ein anderer Auftrag
   * als eine Neuanmeldung, darum das eigene Feld.
   */
  domainVorhanden: boolean;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  land: LandId;
  praxisname: string;
  istAbsolventin: boolean;
  /**
   * Ausdrückliches Verlangen nach § 356 Abs. 4 BGB, vor Ablauf der
   * Widerrufsfrist zu beginnen — samt Kenntnisnahme, dass das Widerrufsrecht
   * bei vollständiger Erfüllung erlischt.
   *
   * Ohne dieses Häkchen dürfen wir bei Verbraucherinnen aus der EU erst nach
   * vierzehn Tagen anfangen. Und ohne den Hinweis, der daran hängt, schuldet
   * die Kundin bei Widerruf gar keinen Wertersatz (§ 357 Abs. 8 BGB) — dann
   * wurde umsonst gearbeitet.
   */
  sofortBeginnen: boolean;
  /**
   * Zustimmung zu AGB und Datenschutzerklärung, verbunden mit der
   * Kenntnisnahme, dass die Kund/in für Inhalte, Rechte und ihre eigene
   * Tätigkeit einsteht.
   *
   * Pflichtfeld. AGB werden nur Vertragsbestandteil, wenn die Kund/in vor
   * Vertragsschluss zumutbar von ihnen Kenntnis nehmen konnte (§ 305 Abs. 2
   * BGB) — ohne diesen Schritt gälten die Haftungsgrenzen aus Abschnitt 10
   * schlicht nicht, und es bliebe bei der gesetzlichen Haftung.
   *
   * Nicht vorbelegt: Eine vorangekreuzte Zustimmung ist keine.
   */
  bedingungenAkzeptiert: boolean;
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

  if (!b.bedingungenAkzeptiert)
    fehler.bedingungenAkzeptiert =
      "Ohne dein Einverständnis zu den Bedingungen können wir die Bestellung nicht annehmen.";

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
    // Für die Schweiz gibt es die Frage gar nicht — dort stand das
    // Kontrollkästchen nie im Formular. Stünde hier trotzdem «KEIN
    // sofortiger Beginn verlangt», würde die Auftragsabwicklung zwei
    // Wochen warten, ohne dass es einen Grund dafür gäbe.
    !hatWiderrufsrecht(b.land)
      ? "Schweiz: kein Widerrufsrecht bei Fernabsatz — sofort starten"
      : b.sofortBeginnen
        ? "Sofortiger Beginn ausdrücklich verlangt (§ 356 Abs. 4 BGB)"
        : "KEIN sofortiger Beginn verlangt — ERST NACH 14 TAGEN anfangen",
    // Muss im Auftragsbeleg stehen: Ohne diesen Nachweis lässt sich später
    // nicht zeigen, dass die AGB überhaupt Vertragsbestandteil wurden.
    b.bedingungenAkzeptiert
      ? "AGB, Datenschutz und Eigenverantwortung für Inhalte akzeptiert"
      : "ACHTUNG: Bedingungen NICHT akzeptiert — nicht ausliefern",
    "",
    `Einmalig: CHF ${summe.einmalig}`,
    `Monatlich: CHF ${summe.proMonat}`,
    summe.absolventenBonus > 0
      ? `(Absolventen-Bonus CHF ${summe.absolventenBonus} bereits abgezogen)`
      : null,
    "",
    `Gewählt (Grundpreis CHF ${GRUNDPREIS} plus):`,
    ...berechnet.map((x) => `  - ${x.name}${x.preis > 0 ? ` (CHF ${x.preis})` : ""}`),
    aufAnfrage.length ? "" : null,
    aufAnfrage.length ? "Separat zu offerieren:" : null,
    ...aufAnfrage.map((x) => `  - ${x.name}`),
    "",
    `Aussehen: Palette ${getPalette(b.paletteId).name}, Schrift ${getFontPairing(b.fontId).name}`,
    b.wunschdomain
      ? b.domainVorhanden
        ? `Bestehende Adresse: ${b.wunschdomain} — umziehen oder verbinden, NICHT neu anmelden`
        : `Wunschadresse: ${b.wunschdomain}`
      : "Wunschadresse: noch offen",
    b.bemerkungen ? `\nBemerkungen:\n${b.bemerkungen}` : null,
  ].filter((z) => z !== null);

  return { summe, text: zeilen.join("\n") };
}

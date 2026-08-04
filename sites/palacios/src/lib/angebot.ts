// Das Angebot als Bausteine.
//
// Grundgedanke: Es gibt EINEN Grundpreis und eine Liste von Bausteinen. Die
// drei "Pakete" sind nichts anderes als vorausgewählte Kombinationen — sie
// existieren, damit niemand vor einer leeren Liste sitzt, nicht damit jemand
// etwas kaufen muss, das er nicht braucht.
//
// Deshalb öffnet der Konfigurator mit "Gemeinsam" angehakt: Wer nichts
// entscheiden will, sieht eine Empfehlung. Wer etwas nicht braucht, hakt es ab
// und sieht den Preis sinken. Das ist der Grund, warum die Einzelpreise
// sichtbar bleiben — ein Bündel wirkt nur dann wie ein Angebot, wenn man
// sieht, was die Teile kosten.

export type BausteinGruppe = "texte" | "sichtbarkeit" | "auftritt" | "funktionen";

export interface Baustein {
  id: string;
  gruppe: BausteinGruppe;
  name: string;
  beschreibung: string;
  /** Einmalig, in CHF inkl. MwSt */
  preis: number;
  /** Zusätzlich pro Monat, in CHF inkl. MwSt */
  proMonat?: number;
  /**
   * Bausteine derselben Auswahlgruppe schliessen sich aus — z. B. die drei
   * Stufen beim Texten. Ohne Angabe ist der Baustein frei kombinierbar.
   */
  auswahlgruppe?: string;
  /** Nicht online buchbar, wir offerieren persönlich */
  nurAufAnfrage?: boolean;
  hinweis?: string;
}

export const GRUNDPREIS = 980;

/**
 * Absolvent/innen bekommen die Textüberarbeitung geschenkt statt eines
 * Prozentrabatts. Kostet uns rund 45 Minuten, ist 190 wert — und hebt jede
 * Absolventenseite von "selbst getippt" auf "redigiert". Ein Prozentrabatt
 * würde bei überwiegend Absolvent/innen schlicht zum Normalpreis.
 */
export const ABSOLVENTEN_GRATIS = "texte-lektorat";

/**
 * Beschriftung der hervorgehobenen Voreinstellung — an einer Stelle, weil sie
 * an mehreren Orten steht.
 *
 * ACHTUNG: "Am häufigsten gewählt" ist eine Tatsachenbehauptung. Solange es
 * keine Bestellungen gibt, ist sie nicht belegbar und damit nach UWG Art. 3
 * Abs. 1 lit. b angreifbar. Belegbar ab etwa dreissig Bestellungen — bis
 * dahin ist "Unsere Empfehlung" die sichere Variante.
 */
export const HERVORHEBUNG = "Am häufigsten gewählt";
export const ABO_MONATLICH = 29.9;
export const ABO_JAEHRLICH = 299;

export const GRUNDLEISTUNG = [
  "Website nach unserer Vorlage, mit deiner Farbpalette und Schrift",
  "Deine Wunschadresse im Netz: geprüft, angemeldet und eingerichtet",
  "Wir halten die Seite am Laufen, mit täglichen Sicherungskopien",
  "Das Schloss im Browser: deine Seite ist verschlüsselt",
  "Impressum und Datenschutzerklärung, auf deine Praxis zugeschnitten",
  "Die Pflichthinweise für Gesundheitsberufe, fertig formuliert",
  "Dein Zugang, um Texte, Farben und Schrift selbst zu ändern",
  "Eine Korrekturrunde, bevor die Seite online geht",
];

export const bausteine: Baustein[] = [
  // --- Texte: drei Stufen, eine davon ist immer gewählt ---
  {
    id: "texte-selbst",
    gruppe: "texte",
    auswahlgruppe: "texte",
    name: "Du schreibst selbst",
    beschreibung:
      "Du beantwortest unsere Fragen. Wir übernehmen deine Texte so, wie sie sind.",
    preis: 0,
  },
  {
    id: "texte-lektorat",
    gruppe: "texte",
    auswahlgruppe: "texte",
    name: "Du schreibst, wir überarbeiten",
    beschreibung:
      "Du lieferst den Inhalt, wir bringen ihn in Form: Rechtschreibung, Rhythmus, Wirkung. Und wir sagen dir, wo eine Formulierung im Gesundheitsbereich heikel ist.",
    preis: 190,
  },
  {
    id: "texte-komplett",
    gruppe: "texte",
    auswahlgruppe: "texte",
    name: "Wir schreiben für dich",
    beschreibung:
      "Du schickst uns Stichworte, deinen Lebenslauf und ein paar Sätze zu deiner Haltung. Den Rest schreiben wir — in deinem Ton, nicht in unserem.",
    preis: 490,
  },

  // --- Sichtbarkeit ---
  {
    id: "seo",
    gruppe: "sichtbarkeit",
    name: "Bei Google gefunden werden",
    beschreibung:
      "Wir schauen nach, wonach Menschen in deiner Region tatsächlich suchen, und richten deine Seite darauf aus — Aufbau, Überschriften und die Texte, die Google anzeigt.",
    preis: 390,
    hinweis: "Fachleute nennen das SEO. Für dich ändert sich nichts ausser der Sichtbarkeit.",
  },
  {
    id: "google-business",
    gruppe: "sichtbarkeit",
    // Hiess vorher «Dein Eintrag auf Google Maps». Das war zu eng: Der
    // Eintrag erscheint nicht nur auf der Karte, sondern auch rechts neben
    // den Suchergebnissen, und genau dort stehen Öffnungszeiten, Telefon
    // und Bewertungen. Wer nur «Maps» liest, unterschätzt, was er kauft.
    name: "Dein Praxiseintrag bei Google",
    beschreibung:
      "Der Kasten mit Adresse, Öffnungszeiten, Telefon und Bewertungen — er erscheint neben den Suchergebnissen und auf der Karte. Wir richten ihn ein, lassen ihn bestätigen und füllen ihn. Für eine lokale Praxis oft wirksamer als die Website selbst.",
    preis: 290,
    hinweis: "Google nennt das Unternehmensprofil, früher Google My Business.",
  },
  {
    id: "seo-betreuung",
    gruppe: "sichtbarkeit",
    name: "Laufend nachhelfen",
    beschreibung:
      "Wir schauen jedes Quartal, wonach Menschen suchen, und passen deine Texte an. Sichtbarkeit ist nichts, was man einmal einstellt.",
    preis: 0,
    proMonat: 30,
  },

  // --- Auftritt ---
  {
    id: "logo-schriftzug",
    gruppe: "auftritt",
    auswahlgruppe: "logo",
    name: "Logo als Schriftzug",
    beschreibung:
      "Dein Name als gesetzter Schriftzug, abgestimmt auf die Farben deiner Website. Als Datei für Web, Druck und Social Media.",
    preis: 690,
  },
  {
    id: "logo-bildmarke",
    gruppe: "auftritt",
    auswahlgruppe: "logo",
    name: "Logo mit eigenem Zeichen",
    beschreibung:
      "Ein eigenes Bildzeichen zu deinem Schriftzug, entwickelt in mehreren Entwurfsrunden.",
    preis: 1490,
    nurAufAnfrage: true,
    hinweis: "Das offerieren wir dir persönlich, weil der Aufwand je nach Idee stark schwankt.",
  },
  {
    id: "visitenkarten",
    gruppe: "auftritt",
    name: "200 Visitenkarten",
    beschreibung: "Gesetzt in deinen Farben, gedruckt und zu dir geliefert.",
    preis: 390,
  },
  {
    id: "fotoshooting",
    gruppe: "auftritt",
    name: "Fotoshooting bei uns im Institut",
    beschreibung:
      "Portraits an einem unserer Fototage in Bern. Fehlende Bilder sind der häufigste Grund, warum eine Seite unfertig wirkt.",
    preis: 590,
  },
  {
    id: "video",
    gruppe: "auftritt",
    name: "Vorstellungsvideo",
    beschreibung:
      "Gedreht bei uns im Institut oder bei dir vor Ort. Kann als bewegtes Startbild deiner Website dienen.",
    preis: 890,
    nurAufAnfrage: true,
    hinweis: "Dafür reservieren wir einen Drehtag — deshalb besprechen wir das persönlich mit dir.",
  },

  // --- Funktionen ---
  {
    id: "unterseite",
    gruppe: "funktionen",
    name: "Eine weitere Seite",
    beschreibung:
      "Zum Beispiel für ein einzelnes Angebot, eine Methode oder dein Team — zusätzlich zur Startseite.",
    preis: 390,
    proMonat: 5,
  },
  {
    id: "terminbuchung",
    gruppe: "funktionen",
    name: "Termine online buchen",
    beschreibung:
      "Deine Klient/innen wählen selbst einen freien Termin. Verbunden mit deinem Kalender, damit nichts doppelt gebucht wird.",
    preis: 290,
    proMonat: 10,
  },
  {
    id: "blog",
    gruppe: "funktionen",
    name: "Ein Bereich für eigene Beiträge",
    beschreibung:
      "Wenn du gerne schreibst: ein Blog, den du selbst pflegst. Hilft auch dabei, gefunden zu werden.",
    preis: 490,
    proMonat: 15,
  },
  {
    id: "zweite-sprache",
    gruppe: "funktionen",
    name: "Zweite Sprache",
    beschreibung: "Deine Seite zusätzlich auf Französisch, Italienisch oder Englisch.",
    preis: 1490,
    proMonat: 20,
    nurAufAnfrage: true,
    hinweis: "Der Preis hängt von der Textmenge ab — wir schauen es uns gemeinsam an.",
  },
];

export interface Voreinstellung {
  id: string;
  name: string;
  fuerWen: string;
  bausteinIds: string[];
  /**
   * Fester Paketpreis statt gerechnetem Prozentsatz. Bewusst so: Ein Rabatt
   * auf die Bausteine ergibt bei einem hohen Grundpreis nur kleine, unrunde
   * Ersparnisse — sichtbar wird ein Angebot erst bei runden Zahlen.
   */
  preis: number;
  empfohlen?: boolean;
}

/**
 * Die drei Voreinstellungen. Sie sind Abkürzungen, keine Produkte — deshalb
 * heissen sie nach dem, was den Unterschied ausmacht: wer die Arbeit macht.
 */
export const voreinstellungen: Voreinstellung[] = [
  {
    id: "selbst",
    name: "Selbst",
    fuerWen: "Du schreibst deine Texte selbst und willst schnell online sein.",
    preis: 980,
    bausteinIds: ["texte-selbst"],
  },
  {
    id: "gemeinsam",
    name: "Gemeinsam",
    fuerWen:
      "Du schreibst, wir bringen es in Form — und sorgen dafür, dass man dich findet.",
    empfohlen: true,
    preis: 1590,
    bausteinIds: ["texte-lektorat", "seo", "google-business"],
  },
  {
    id: "rundum",
    name: "Rundum",
    fuerWen: "Der ganze Auftritt soll stimmen, nicht nur die Website.",
    preis: 2990,
    bausteinIds: [
      "texte-komplett",
      "seo",
      "google-business",
      "logo-schriftzug",
      "visitenkarten",
      "fotoshooting",
    ],
  },
];

export interface Summe {
  einmalig: number;
  /** Was Absolvent/innen geschenkt bekommen, in CHF */
  absolventenBonus: number;
  proMonat: number;
  /** Was dieselbe Auswahl ohne Paketrabatt kosten würde */
  ohneRabatt: number;
  ersparnis: number;
  /** Auf welche Voreinstellung die Auswahl genau passt, falls überhaupt */
  passendeVoreinstellung: string | null;
}

export function findeBaustein(id: string): Baustein | undefined {
  return bausteine.find((b) => b.id === id);
}

/**
 * Auf welche Voreinstellung passt diese Auswahl?
 *
 * Verglichen wird nur, was in die Summe einfliesst. Ein Posten auf Anfrage
 * kostet hier nichts — er darf deshalb auch den Paketpreis nicht kippen.
 * Ohne diese Filterung sprang "Rundum" beim Anhaken des Vorstellungsvideos
 * von 2'990 auf 3'820, also um 830 Franken für etwas, das laut Anzeige gar
 * nicht mitgerechnet wird.
 */
export function erkenneVoreinstellung(ausgewaehlt: string[]): string | null {
  const buchbar = (ids: string[]) =>
    ids
      .map(findeBaustein)
      .filter((b): b is Baustein => Boolean(b) && !b!.nurAufAnfrage)
      .map((b) => b.id)
      .sort()
      .join("|");

  const gewaehlt = buchbar(ausgewaehlt);
  const treffer = voreinstellungen.find((v) => buchbar(v.bausteinIds) === gewaehlt);
  return treffer?.id ?? null;
}

export function berechne(ausgewaehlt: string[], istAbsolventin = false): Summe {
  const gewaehlteBausteine = ausgewaehlt
    .map(findeBaustein)
    .filter((b): b is Baustein => Boolean(b));

  // Was nur auf Anfrage geht, fliesst nicht in die Summe — sonst stünde ein
  // Preis da, den wir nicht zusagen können.
  const buchbar = gewaehlteBausteine.filter((b) => !b.nurAufAnfrage);

  const bausteineEinmalig = buchbar.reduce((s, b) => s + b.preis, 0);
  const proMonat =
    ABO_MONATLICH + buchbar.reduce((s, b) => s + (b.proMonat ?? 0), 0);

  const ohneRabatt = GRUNDPREIS + bausteineEinmalig;

  // Passt die Auswahl genau auf eine Voreinstellung, gilt deren Paketpreis.
  // Wer selbst zusammenstellt, zahlt die Einzelpreise — eine ungewöhnliche
  // Kombination kostet uns mehr Zeit als eine eingespielte.
  const passendeVoreinstellung = erkenneVoreinstellung(ausgewaehlt);
  const paket = passendeVoreinstellung
    ? voreinstellungen.find((v) => v.id === passendeVoreinstellung)
    : undefined;
  const vorBonus = paket ? paket.preis : ohneRabatt;

  // Absolvent/innen bekommen die Textüberarbeitung geschenkt. Der Wert gilt
  // auch, wenn jemand die grössere Stufe wählt — sonst bekäme ausgerechnet
  // die Kund/in, die mehr bezahlt, weniger Bonus.
  const bonusWert = findeBaustein(ABSOLVENTEN_GRATIS)?.preis ?? 0;
  const gewaehlteTextstufe = gewaehlteBausteine.find((b) => b.auswahlgruppe === "texte");
  const absolventenBonus =
    istAbsolventin && gewaehlteTextstufe
      ? Math.min(bonusWert, gewaehlteTextstufe.preis)
      : 0;

  const einmalig = vorBonus - absolventenBonus;

  return {
    einmalig,
    absolventenBonus,
    proMonat: Math.round(proMonat * 100) / 100,
    ohneRabatt,
    ersparnis: ohneRabatt - einmalig,
    passendeVoreinstellung,
  };
}

export function formatiereChf(betrag: number): string {
  const gerundet = Math.round(betrag * 100) / 100;
  const vorzeichen = gerundet < 0 ? "-" : "";
  const absolut = Math.abs(gerundet);

  const ganzteil = Math.trunc(absolut)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "’");
  const rappen = Number.isInteger(absolut) ? "" : absolut.toFixed(2).slice(-3);

  return `${vorzeichen}${ganzteil}${rappen}`;
}

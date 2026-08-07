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

export type BausteinGruppe =
  | "texte"
  | "sichtbarkeit"
  | "adresse"
  | "auftritt"
  | "funktionen";

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
  // Stand bis August 2026 als eigener Posten «Bei Google gefunden werden»
  // für CHF 390 im Konfigurator. Gestrichen, weil das technische Fundament
  // (saubere Struktur, Anmeldung, Suchmaschinen-Angaben) die Vorlage ohnehin
  // für jede Seite erzeugt — das einzeln zu verkaufen, wäre die Sorte
  // Posten, die beim zweiten Hinsehen Vertrauen kostet. Die FAQ «Findet man
  // mich danach auf Google?» sagt dasselbe seit jeher. Die Regional-
  // Recherche, die im alten Posten steckte, lebt in der Abo-Betreuung
  // weiter — dort gehört sie hin, weil sich Suchverhalten ändert.
  "Bei Google angemeldet, technisch für Suchmaschinen eingerichtet",
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
    // «Laufend nachhelfen» allein sagte nicht, WOBEI — das Wort
    // Suchmaschinen muss in den Namen, sonst weiss niemand, was er kauft.
    name: "Suchmaschinen: laufend nachhelfen",
    beschreibung:
      "Wir schauen jedes Quartal, wonach Menschen in deiner Region suchen, und passen Texte und Überschriften darauf an. Sichtbarkeit ist nichts, was man einmal einstellt.",
    preis: 0,
    proMonat: 30,
    hinweis:
      "Fachleute nennen das SEO. Das technische Fundament dafür ist bei jeder Seite von uns inbegriffen.",
  },

  // --- Adresse: Internetadresse und E-Mail, beides auf ihren Namen ---
  /**
   * E-MAIL: WIE DER PREIS ZUSTANDE KOMMT (Stand 6.8.2026)
   *
   * Einkauf: Infomaniak Mail-Service, CHF 2.29 pro Adresse und Monat exkl.
   * MwSt. (geprüft auf infomaniak.com/de/ksuite/service-mail/preise) —
   * unbegrenzter Speicher, eigene Domain. Die Vorsteuer holen wir zurück.
   *
   * Verkauf CHF 9.90 inkl. 8.1 % MwSt. Netto 9.16, abzüglich Einkauf
   * bleiben CHF 6.87 im Monat, rund 82 Franken je Kund/in und Jahr.
   *
   * Der Anker ist Google Workspace, nicht unser Einkauf: Business Starter
   * kostet die Kund/in direkt bei Google rund CHF 7 exkl. MwSt. im Monat —
   * selbst eingerichtet, Daten in den USA. Wir liegen bewusst KNAPP
   * DARÜBER, nicht darunter: Billiger als Google sähe nach einem Haken
   * aus, und verkauft wird hier nicht Speicherplatz, sondern «jemand
   * richtet es ein und ist zuständig». Und bewusst nicht weiter oben — bei
   * 12.90 kostete ein Postfach 43 % des ganzen Website-Abos; die
   * Proportion macht entweder die Mail teuer oder die 29.90 billig.
   *
   * Einrichtung CHF 90 einmalig — bewusst UNTER dem Aufwand im schlechten
   * Fall. Der Aufwand schwankt stark: Die DNS-Einträge (MX, SPF, DKIM,
   * DMARC) sind schnell gesetzt, weil wir die Domain ohnehin verwalten,
   * und moderne Mail-Programme richten sich über die Autoconfig des
   * Anbieters selbst ein — dann sind es zwanzig Minuten. Braucht die
   * Kund/in Begleitung durch Outlook und iPhone, wird es eine Stunde.
   *
   * Deshalb nicht die 190, die eine Stunde ergäbe: Eine Einrichtungsgebühr
   * von 190 neben einer Website für 980 liest sich absurd — 19 % des
   * Website-Preises für eine E-Mail-Adresse — und verhindert genau die
   * Abschlüsse, an denen wir verdienen wollen. Denn der Ertrag liegt hier
   * im Abo, nicht in der Einrichtung: 6.87 im Monat sind über fünf Jahre
   * rund 410 Franken, und niemand wechselt seine E-Mail-Adresse. Der
   * schlechte Einrichtungsfall ist nach gut einem Jahr Abo eingespielt.
   *
   * DIE STELLE, DIE WEHTUN KANN: 6.87 decken wenig Support. Ein Anruf
   * «ich komme nicht an meine Mails» von zwanzig Minuten (~65 Franken)
   * frisst zehn Monate Marge. Der Riegel ist die Supportregel, nicht der
   * Preis — genau deshalb steht im Hinweis, dass das Postfach auch im
   * Browser läuft: Das ist der Weg, der nie kaputtgeht.
   *
   * ABHÄNGIGKEIT: «Schweizer Server» unten gilt für Infomaniak. Wird der
   * Anbieter gewechselt, muss der Satz mitwandern — er steht auch in den
   * AGB (Abschnitt 11). Die kostenlose Weiterleitung ist bei Infomaniak
   * in der Domain enthalten.
   */
  {
    id: "email-postfach",
    gruppe: "adresse",
    name: "E-Mail-Adresse mit deinem Praxisnamen",
    beschreibung:
      "info@deine-praxis.ch statt einer Adresse bei GMX, Bluewin oder Gmail — zum Empfangen und zum Antworten. Wir richten sie ein und stellen sie dir auf Telefon und Computer bereit, damit du deine Mails dort liest, wo du sie heute schon liest.",
    preis: 90,
    proMonat: 9.9,
    hinweis:
      "Eine Adresse, unbegrenzter Speicher, auf Schweizer Servern — abrufbar in deinem gewohnten Mail-Programm oder einfach im Browser. Wenn du deine Mails lieber weiterhin bei Gmail liest, richten wir dir stattdessen kostenlos eine Weiterleitung ein; antworten würdest du dann aber weiterhin von deiner alten Adresse aus.",
  },

  // --- Auftritt ---
  /**
   * ZWEI LOGO-STUFEN, UND DIE GRENZE LIEGT BEI DEN ENTWURFSRUNDEN
   *
   * «Einfaches Logo» ist produktisierbar: Der Name wird in einer Schrift der
   * Vorlage gesetzt, zugerichtet, auf Wunsch mit einem Symbol aus einer
   * fertigen Auswahl kombiniert und als Dateien für Web und Druck
   * exportiert. Eine Variante, eine Korrektur, rund eine Stunde — 190 im
   * selben Stundensatz wie der Grundpreis.
   *
   * «Individuelles Logo» bleibt Offerte, und das ist keine Bequemlichkeit,
   * sondern die Lehre aus der alten Preisliste: Dort stand ein Logo für CHF
   * 490 bei drei bis vier Stunden Aufwand — eine Nullsumme, die mit jeder
   * zusätzlichen Entwurfsrunde ins Minus kippte. Genau daran ist das alte
   * Angebot erstickt. Ein Festpreis funktioniert nur, wenn die Zahl der
   * Runden feststeht; bei einer eigenen Bildmarke tut sie das nie. Die
   * Zahl unten ist deshalb Richtwert für das Gespräch, nicht Preis.
   */
  {
    id: "logo-schriftzug",
    gruppe: "auftritt",
    auswahlgruppe: "logo",
    name: "Einfaches Logo",
    beschreibung:
      "Dein Name als gesetzter Schriftzug — allein oder mit einem schlichten Symbol aus unserer Auswahl, abgestimmt auf die Farben deiner Website. Als Datei für Web, Druck und Social Media.",
    preis: 190,
    hinweis: "Eine Variante, eine Korrekturrunde. Reicht für die meisten Praxen.",
  },
  {
    id: "logo-bildmarke",
    gruppe: "auftritt",
    auswahlgruppe: "logo",
    name: "Individuelles Logo",
    beschreibung:
      "Ein eigenes Bildzeichen, für dich entworfen — mit Skizzen, mehreren Vorschlägen und Überarbeitungsrunden, bis es sitzt.",
    preis: 1490,
    nurAufAnfrage: true,
    hinweis:
      "Ab etwa CHF 690, je nach Idee und Zahl der Runden. Weil das stark schwankt, offerieren wir es dir persönlich statt zum Festpreis.",
  },
  {
    id: "visitenkarten",
    gruppe: "auftritt",
    name: "200 Visitenkarten",
    beschreibung: "Gesetzt in deinen Farben, gedruckt und zu dir geliefert.",
    // Druck und Versand kosten uns 30–40 Franken, der Satz aus dem
    // bestehenden Design eine knappe Stunde. 390 war dafür zu viel.
    preis: 240,
  },
  {
    id: "fotoshooting",
    gruppe: "auftritt",
    name: "Fotoshooting bei uns im Institut",
    beschreibung:
      "Portraits an einem unserer Fototage in Bern. Fehlende Bilder sind der häufigste Grund, warum eine Seite unfertig wirkt.",
    // Die alte Preisliste kannte genau diese Zahl («Fotoshooting bei uns
    // in Bern, CHF 390») — die Zielgruppe kennt sie. Rechnet sich über
    // den Fototag: fünf bis sechs Personen ergeben 1'950–2'340 pro Tag.
    preis: 390,
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
    // «Eine Stunde von uns»-Logik wie überall, wo 190 steht: Vorlagenseite
    // mit den Inhalten der Kund/in, Einbau in die Navigation, Prüfung.
    // Der Fünfliber im Monat deckt, dass jede weitere Seite bei jedem
    // Update mitgeprüft wird.
    preis: 190,
    proMonat: 5,
  },
  /**
   * Bewusst KEIN eigenes Buchungssystem — das wäre ein zweites Produkt
   * mit eigener Plattformpflege. Wir richten der Kund/in einen bewährten
   * Dienst ein: cal.com in der kostenlosen Grundausführung (Calendly kann
   * in der Gratisstufe nur eine Terminart). Der Name steht mit Absicht
   * nicht auf der Verkaufsseite — Entscheid des Inhabers vom 6.8.2026 —,
   * das Buchungsfenster zeigt ihn dann ohnehin.
   *
   * Kein Monatszuschlag von uns: Das Konto läuft auf den Namen der
   * Kund/in; Bezahlstufen (mehrere Kalender, ohne Fremdlogo) bucht sie
   * selbst direkt beim Dienst. Spätere Änderungen an Terminarten sind
   * ihr Konto, nicht unser Abo — Supportregel.
   *
   * Datenschutz-Flag für die Rechtsprüfung: Wer einen Hypnosetermin
   * bucht, gibt etwas über sich preis. Der Dienst gehört ins
   * Verarbeitungsverzeichnis der Kund/in, nicht in unseres — auch
   * deshalb ihr Konto, nicht unseres.
   */
  {
    id: "terminbuchung",
    gruppe: "funktionen",
    name: "Termine online buchen",
    beschreibung:
      "Deine Klient/innen wählen selbst einen freien Termin — verbunden mit deinem Kalender, damit nichts doppelt gebucht wird. Wir richten alles ein und bauen es in deine Seite ein.",
    preis: 190,
    hinweis:
      "Wir richten dir dafür einen bewährten Buchungsdienst ein. Das Konto läuft auf deinen Namen, die Grundausführung ist dauerhaft kostenlos — sie zeigt im Buchungsfenster das Logo des Dienstes. Mehr Funktionen kannst du später direkt dort dazubuchen.",
  },
  {
    id: "blog",
    gruppe: "funktionen",
    name: "Ein Bereich für eigene Beiträge",
    beschreibung:
      "Wenn du gerne schreibst: ein Blog, den du selbst pflegst. Hilft auch dabei, gefunden zu werden.",
    preis: 290,
    proMonat: 15,
  },
  /**
   * Der Wunsch des Inhabers war 190 («ist ja easy mit AI»). Die Maschine
   * übersetzt tatsächlich in Minuten — aber auf einer Therapieseite
   * entscheidet die Nuance: Aus «ich begleite Menschen mit Ängsten» darf
   * in keiner Sprache «ich behandle Angststörungen» werden, sonst steht
   * dort ein Heilversprechen. Bezahlt wird die menschliche Durchsicht
   * plus Einbau und Sprachumschaltung — zwei bis drei Stunden, daher 490.
   * Wer die Durchsicht streicht, kann auf 190 gehen; empfehlen würden
   * wir es nicht.
   */
  {
    id: "zweite-sprache",
    gruppe: "funktionen",
    name: "Zweite Sprache",
    beschreibung:
      "Deine Seite zusätzlich auf Französisch, Italienisch oder Englisch — maschinell vorübersetzt, von Menschen geprüft, mit Sprachumschaltung.",
    preis: 490,
    proMonat: 20,
    hinweis:
      "Gilt pro Sprache. Der Monatsbeitrag deckt, dass jede spätere Textänderung in beiden Sprachen nachgeführt wird.",
  },
];

export interface Voreinstellung {
  id: string;
  name: string;
  fuerWen: string;
  bausteinIds: string[];
  empfohlen?: boolean;
}

/**
 * Die drei Voreinstellungen. Sie sind Abkürzungen, keine Produkte — deshalb
 * heissen sie nach dem, was den Unterschied ausmacht: wer die Arbeit macht.
 *
 * KEIN PAKETRABATT, und das ist Absicht. Bis August 2026 trug jede
 * Voreinstellung einen eigenen, tieferen Festpreis. Das erzeugte genau eine
 * Sorte Fehler, zweimal gemeldet: Die Summe folgte nicht mehr den Etiketten
 * auf den Kästchen. Ein Häkchen bei einem Posten, der «+ 0» anzeigte, hob
 * den Preis um 170 Franken, weil der Rabatt verfiel.
 *
 * Ein Bündelrabatt lohnt sich, wenn die Teile einzeln unsichtbar sind. Hier
 * stehen sie mit Preis daneben und lassen sich anklicken — die Kund/in
 * RECHNET MIT. Deshalb gilt jetzt ausnahmslos: Der Preis ist der Grundpreis
 * plus die Summe der angehakten Kästchen. Wer nachrechnet, kommt auf
 * denselben Betrag; das ist bei dieser Zielgruppe mehr wert als ein Rabatt.
 *
 * Der einzige Nachlass bleibt der Absolventen-Bonus — gezielt, begründet
 * und an eine Person geknüpft statt an eine Kombination.
 */
export const voreinstellungen: Voreinstellung[] = [
  {
    id: "selbst",
    name: "Selbst",
    fuerWen: "Du schreibst deine Texte selbst und willst schnell online sein.",
    bausteinIds: ["texte-selbst"],
  },
  {
    id: "gemeinsam",
    name: "Gemeinsam",
    fuerWen:
      "Du schreibst, wir bringen es in Form — und sorgen dafür, dass man dich findet.",
    empfohlen: true,
    bausteinIds: ["texte-lektorat", "google-business"],
  },
  {
    id: "rundum",
    name: "Rundum",
    fuerWen: "Der ganze Auftritt soll stimmen, nicht nur die Website.",
    bausteinIds: [
      "texte-komplett",
      "google-business",
      "logo-schriftzug",
      "visitenkarten",
      "fotoshooting",
    ],
  },
];

/**
 * Was eine Voreinstellung kostet — gerechnet, nie gepflegt. Damit kann der
 * Preis auf der Kachel gar nicht mehr von dem abweichen, was das Anklicken
 * derselben Kästchen ergibt.
 */
export function voreinstellungPreis(v: Voreinstellung): number {
  return berechne(v.bausteinIds).einmalig;
}

export interface Summe {
  einmalig: number;
  /** Was Absolvent/innen geschenkt bekommen, in CHF */
  absolventenBonus: number;
  proMonat: number;
  /** Auf welche Voreinstellung die Auswahl genau passt, falls überhaupt */
  passendeVoreinstellung: string | null;
}

export function findeBaustein(id: string): Baustein | undefined {
  return bausteine.find((b) => b.id === id);
}

/**
 * Auf welche Voreinstellung passt diese Auswahl genau? Steuert nur, welche
 * Kachel als aktiv leuchtet — auf den Preis hat sie keinen Einfluss mehr.
 *
 * Verglichen wird, was in die Summe einfliesst: Ein Posten auf Anfrage
 * kostet nichts und darf die Kachel deshalb auch nicht ausschalten.
 */
export function erkenneVoreinstellung(ausgewaehlt: string[]): string | null {
  const buchbar = (ids: string[]) =>
    ids
      .map(findeBaustein)
      .filter((b): b is Baustein => b !== undefined && !b.nurAufAnfrage)
      .map((b) => b.id)
      .sort()
      .join("|");

  const gewaehlt = buchbar(ausgewaehlt);
  return voreinstellungen.find((v) => buchbar(v.bausteinIds) === gewaehlt)?.id ?? null;
}

/**
 * Grundpreis plus angehakte Kästchen. Mehr Preislogik gibt es nicht — siehe
 * die Begründung bei den Voreinstellungen.
 */
export function berechne(ausgewaehlt: string[], istAbsolventin = false): Summe {
  const gewaehlteBausteine = ausgewaehlt
    .map(findeBaustein)
    .filter((b): b is Baustein => b !== undefined);

  // Was nur auf Anfrage geht, fliesst nicht in die Summe — sonst stünde ein
  // Preis da, den wir nicht zusagen können.
  const buchbar = gewaehlteBausteine.filter((b) => !b.nurAufAnfrage);

  const vorBonus = GRUNDPREIS + buchbar.reduce((s, b) => s + b.preis, 0);
  const proMonat =
    ABO_MONATLICH + buchbar.reduce((s, b) => s + (b.proMonat ?? 0), 0);

  // Absolvent/innen bekommen die Textüberarbeitung geschenkt. Der Wert gilt
  // auch, wenn jemand die grössere Stufe wählt — sonst bekäme ausgerechnet
  // die Kund/in, die mehr bezahlt, weniger Bonus.
  const bonusWert = findeBaustein(ABSOLVENTEN_GRATIS)?.preis ?? 0;
  const gewaehlteTextstufe = gewaehlteBausteine.find((b) => b.auswahlgruppe === "texte");
  const absolventenBonus =
    istAbsolventin && gewaehlteTextstufe
      ? Math.min(bonusWert, gewaehlteTextstufe.preis)
      : 0;

  return {
    einmalig: vorBonus - absolventenBonus,
    absolventenBonus,
    proMonat: Math.round(proMonat * 100) / 100,
    passendeVoreinstellung: erkenneVoreinstellung(ausgewaehlt),
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

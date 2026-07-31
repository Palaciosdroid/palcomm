// Führung durch den Design-Schritt.
//
// Die Kund/in wählt keine Farben, sondern fertige Kombinationen — niemand aus
// dieser Zielgruppe will Farbharmonie beurteilen, und niemand sollte es
// müssen. Zu jeder Palette steht deshalb nicht nur, wie sie wirkt, sondern
// für wen sie passt. Die Kund/in soll sich in genau einer Beschreibung
// wiedererkennen und dann aufhören zu vergleichen.
//
// Die Kurzbeschreibungen in theme.ts zielen auf Kanzleien, Handwerk und
// Agenturen — das Template ist allgemein gehalten. Hier stehen die Fassungen
// für Therapeut/innen und Coaches.
//
// Die IDs entsprechen denen in theme.ts. Fehlt hier eine, fällt die Anzeige
// auf die Kurzbeschreibung aus theme.ts zurück.

export interface DesignHinweis {
  /** Ein Satz zur Wirkung */
  wirkung: string;
  /** Für wen sie passt — der Satz, der die Entscheidung trägt */
  passtWenn: string;
}

export const paletteHinweise: Record<string, DesignHinweis> = {
  salbei: {
    wirkung:
      "Gedämpftes Grün auf warmem, hellem Grund — wie ein Praxisraum mit Pflanzen und Tageslicht.",
    passtWenn:
      "Passt, wenn Menschen angespannt oder erschöpft zu dir kommen — bei Ängsten, Stress oder in Krisen — und deine Seite als Erstes sagen soll: Hier kannst du durchatmen.",
  },
  terrakotta: {
    wirkung:
      "Warme Erdtöne, die an Ton, Sonne und Spätsommer erinnern — herzlich und geerdet.",
    passtWenn:
      "Passt, wenn deine Arbeit von Nähe und Wärme lebt — etwa Körperarbeit oder die Begleitung von Paaren — und niemand befürchten soll, bei dir in einer kühlen Praxis zu landen.",
  },
  ozean: {
    wirkung: "Ein klares, aufgeräumtes Blau — verlässlich und angenehm unaufgeregt.",
    passtWenn:
      "Passt, wenn viele deiner Klient/innen aus dem Berufsleben kommen oder erst einmal prüfen, wem sie sich anvertrauen. Ozean wirkt geordnet, noch bevor sie die erste Zeile gelesen haben.",
  },
  rose: {
    wirkung: "Ein leises, erwachsenes Rosa — sanft, ohne süsslich zu werden.",
    passtWenn:
      "Passt, wenn du Menschen durch verletzliche Zeiten begleitest — Kinderwunsch, Geburt, Trauer, Selbstwert — und die Seite so behutsam auftreten soll, wie du es in diesen Gesprächen tust.",
  },
  anthrazit: {
    wirkung:
      "Ruhiges, dunkles Grau, das sich ganz zurücknimmt — deine Worte und deine Bilder stehen im Vordergrund.",
    passtWenn:
      "Passt, wenn du Führungskräfte oder Teams begleitest — oder den typisch sanften Praxis-Auftritt ganz bewusst nicht willst.",
  },
  gold: {
    wirkung: "Gedecktes Gold auf warmem Grund — wirkt hochwertig, ohne aufzutrumpfen.",
    passtWenn:
      "Passt, wenn du wenige Klient/innen intensiv und über längere Zeit begleitest — und deine Seite still mittragen darf, dass diese Arbeit ihren Preis hat.",
  },
};

export const schriftHinweise: Record<string, DesignHinweis> = {
  klassisch: {
    wirkung:
      "Elegant geschwungene Überschriften über ruhigem, gut lesbarem Text — wie ein schön gemachtes Buch.",
    passtWenn:
      "Passt, wenn deine Seite nach Erfahrung und Bestand aussehen soll — gerade dann, wenn deine Praxis noch ganz am Anfang steht.",
  },
  fein: {
    wirkung: "Zarte, schlanke Überschriften mit viel Luft darum — leise, fast poetisch.",
    passtWenn:
      "Passt, wenn du mit stillen Themen arbeitest — Trauer, Erschöpfung, innere Prozesse — und jedes laute Wort auf deiner Seite fehl am Platz wäre.",
  },
  modern: {
    wirkung: "Eine einzige, klare Schrift für alles — geradeaus und aufgeräumt.",
    passtWenn:
      "Passt, wenn du sachlich und lösungsorientiert arbeitest — mit Klient/innen, die rasch wissen wollen, woran sie sind.",
  },
  warm: {
    wirkung:
      "Runde, freundliche Formen, und die Überschriften stehen kräftig da — herzlich, mit Energie.",
    passtWenn:
      "Passt, wenn es bei dir lebendig zugeht — etwa mit Familien, Kindern oder Gruppen — und du lieber nahbar wirkst als feierlich.",
  },
};

export const designSchritt = {
  title: "Wie soll sich deine Seite anfühlen?",
  lead: "Wähl eine Farbwelt und eine Schrift — in der Vorschau siehst du sofort, wie beides zusammenspielt. Triff die Wahl ruhig mit leichter Hand: Hier ist nichts endgültig. Farben und Schrift stellst du später jederzeit selbst um.",
  unentschlossen:
    "Kannst du dich nicht entscheiden, lass einfach die Voreinstellung stehen — Salbei mit Klassisch steht fast jeder Praxis gut. Wir schauen uns deine Wahl vor der Aufschaltung ohnehin noch an und sagen dir, wenn uns etwas nicht stimmig scheint.",
  falle:
    "Falls dir eine Farbe sofort gefällt, weil es schlicht deine Lieblingsfarbe ist: Schau sie noch einmal mit den Augen deiner Klient/innen an — deine Seite ist vor allem für sie da.",
};

// Inhalte der Palacios-Website.
//
// Bewusst statisch im Code, ohne Admin-Bereich und ohne Redis: Das ist unsere
// eigene Seite, wir bearbeiten sie hier. Der visuelle Editor ist für
// Kundenseiten gedacht, wo niemand im Code arbeiten will.
//
// Ton: durchgehend du. Die Firma duzt auf ihren eigenen Seiten schon heute,
// und die Zielgruppe kennt Gabriel aus der Ausbildung. Ein Sie wäre hier der
// Fremdkörper, nicht das Du.
//
// Keine Fachwörter. Die Leserinnen sind überwiegend über vierzig und
// technikfern: kein SEO, kein Hosting, kein SSL. Google statt Suchmaschine,
// Internetadresse statt Domain, Sicherungskopie statt Backup.

// Preise stehen NICHT hier, sondern in src/lib/angebot.ts. Eine zweite
// Preisliste im Text driftet nach der ersten Änderung auseinander — und die
// falsche steht dann auf der Seite.

export const palacios = {
  meta: {
    title: "Palacios Communications | Websites für Therapeut/innen und Praxen",
    description:
      "Du erzählst uns von deiner Arbeit, wir machen daraus eine Website — und betreiben sie. Ab CHF 980 einmalig, danach CHF 29.90 im Monat, Internetadresse inbegriffen. Für Therapeut/innen, Coaches und kleine Praxen in der Schweiz, in Deutschland und in Österreich.",
    keywords: [
      "Website Therapeuten",
      "Website Praxis Schweiz",
      "Homepage Hypnosetherapie",
      "Webdesign Bern",
      "Palacios Communications",
    ],
  },

  firma: {
    name: "Palacios Communications",
    rechtsform: "Palacios Communications GmbH",
    strasse: "Rosenweg 25 B",
    ort: "3007 Bern",
    email: "info@palacios-relations.ch",
    telefon: "+41 31 371 54 02",
    telefonLink: "tel:+41313715402",
    oeffnungszeiten: "Sekretariat Di.–Sa., 09:00–18:00",
    uid: "CHE-318.947.254",
  },

  navigation: [
    { name: "Was du bekommst", href: "/#angebot" },
    { name: "Ablauf", href: "/#ablauf" },
    { name: "Preise", href: "/#preise" },
    { name: "Beispiele", href: "/#beispiele" },
    { name: "Über uns", href: "/#ueber-uns" },
  ],

  hero: {
    kicker: "Für Menschen, die Menschen begleiten",
    title: "Sichtbar werden, ohne laut zu werden.",
    lead: "Wer dich sucht, soll dich finden — und gleich spüren, wie du arbeitest. Wir bauen dir diese Website und betreiben sie danach weiter. Für Therapeut/innen, Coaches und kleine Praxen in der Schweiz, in Deutschland und in Österreich.",
    preisNote:
      "Ab CHF 980 einmalig, danach CHF 29.90 im Monat — Internetadresse und Betrieb inbegriffen.",
    ctaPrimary: { text: "Angebot zusammenstellen", href: "/angebot" },
    ctaSecondary: { text: "Zuerst den Ablauf ansehen", href: "#ablauf" },
  },

  // Belegt auf palacios-relations.ch. Die Zahlen gehören dem Institut, nicht
  // dieser GmbH — deshalb steht «aus dem Institut» davor und nicht «wir haben».
  vertrauensleiste: [
    "Aus dem Institut, das über 3'500 Therapeut/innen ausgebildet hat",
    "Gabriel Palacios: 12-facher Bestsellerautor in 8 Ländern",
    "Bekannt aus SRF, Blick und Blue News",
  ],

  problem: {
    title: "Kennst du diesen Moment?",
    absaetze: [
      "Jemand fragt nach deiner Website. Du nennst die Adresse — und schiebst gleich hinterher: «Die ist nicht mehr ganz aktuell.» Vielleicht stimmt das Foto nicht mehr, vielleicht das Angebot, vielleicht beides. Du weisst es seit Monaten.",
      "Dabei läuft deine Praxis gut. Deine Klient/innen kommen wieder und empfehlen dich weiter. Nur im Netz sieht man davon nichts: Wer dich sucht, findet einen Eintrag mit alten Angaben — oder die Seite, die du lieber erklärst, als sie zu zeigen.",
      "Das ist kein Versäumnis. Eine Website zu bauen und aktuell zu halten ist ein eigener Beruf — deiner ist es nicht. Und die Baukästen, die das Gegenteil behaupten, kosten am Ende mehr Abende, als sie sparen.",
    ],
  },

  angebot: {
    title: "Was du in jedem Fall bekommst",
    lead: "Ein Abo, keine Positionsliste. Was hier steht, ist drin — und bleibt drin, solange du dabei bist.",
    punkte: [
      {
        title: "Eine vollständige Website",
        text: "Eine Startseite mit allen Abschnitten, die eine Praxis braucht: wer du bist, was du anbietest, wie du arbeitest, Stimmen deiner Klient/innen, Kontaktformular.",
      },
      {
        title: "Deine eigene Internetadresse",
        text: "Wir prüfen sie, melden sie an, verlängern sie jedes Jahr und richten alles Nötige ein. Sie gehört dir — auch wenn du später gehst.",
      },
      {
        title: "Wir halten deine Seite am Laufen",
        text: "Updates, Sicherheit, Erreichbarkeit. Du merkst davon nichts — und genau das ist der Punkt.",
      },
      {
        title: "Impressum und Datenschutzerklärung",
        text: "Vorbereitet und auf deine Praxis zugeschnitten, mit den Angaben, die in der Schweiz, in Deutschland und in Österreich verlangt sind.",
      },
      {
        title: "Die Hinweise für dein Fachgebiet",
        text: "Ergänzende Begleitung, laufende Behandlung, kein Heilversprechen, Notfallnummern — formuliert, bevor du danach fragen musst.",
      },
      {
        title: "Selbst ändern, ohne etwas kaputtzumachen",
        text: "Texte, Farben und Schrift änderst du in einem geschützten Bereich. Der Aufbau deiner Seite bleibt fest — darum kann dabei nichts schiefgehen.",
      },
    ],
    nichtEnthaltenTitle: "Nicht enthalten — damit du es vorher weisst",
    nichtEnthalten: [
      "Im Grundpreis schreibst du deine Texte selbst. Wir können sie überarbeiten oder ganz übernehmen — das wählst du aus.",
      "Fotos und Videos machen wir auf Wunsch bei uns im Institut, gegen eine feste Pauschale.",
      "Online-Shop und Newsletter sind nicht Teil des Abos. Sprich uns an, wenn du das brauchst.",
      "Eine Korrekturrunde ist inbegriffen. Was darüber hinausgeht, verrechnen wir nach Aufwand.",
    ],
  },

  abo: {
    title: "Und danach?",
    lead: "Damit ist alles Laufende bezahlt: deine Internetadresse, der Betrieb, die Updates und die Behebung von Störungen. Monatlich kündbar.",
    punkte: [
      "Deine Internetadresse inbegriffen (.ch, .de, .com)",
      "Wir halten die Seite am Laufen, mit täglichen Sicherungskopien",
      "Das Schloss im Browser: deine Seite ist verschlüsselt",
      "Sicherheitsupdates, ohne dass du etwas tun musst",
      "Geht etwas nicht, ist das unser Problem — so oft es vorkommt",
      "Dein Zugang, um Texte, Farben und Schrift selbst zu ändern",
    ],
    vergleich:
      "Zum Vergleich: Ein Baukasten zum Selberbauen kostet im Monat etwa gleich viel, die Internetadresse ab dem zweiten Jahr extra — und bauen, pflegen und reparieren musst du dort alles selbst.",
  },

  ablauf: {
    title: "Du erzählst, wir bauen",
    schritte: [
      {
        nummer: "1",
        title: "Du erzählst uns von deiner Arbeit",
        text: "Du beantwortest Fragen, die du ohnehin beantworten kannst: Wen begleitest du? Was bietest du an? Wie arbeitest du? Dazu wählst du Farben und Schrift aus fertigen Kombinationen und siehst sofort, wie das zusammenwirkt.",
        dauer: "etwa 30 Minuten",
      },
      {
        nummer: "2",
        title: "Wir bauen deine Seite",
        text: "Aus deinen Antworten entsteht die Website. Wir setzen deine Bilder ein, lesen jeden Text auf Rechtschreibung und Wirkung gegen und legen Impressum und Datenschutzerklärung an. Du bekommst einen Link zur Vorschau und sagst uns, was noch anders soll.",
        dauer: "5 bis 10 Arbeitstage",
      },
      {
        nummer: "3",
        title: "Deine Seite geht online",
        text: "Wir schalten deine Internetadresse auf, melden die Seite bei Google an und zeigen dir in einem kurzen Gespräch, wie du selbst Texte änderst. Ab dann läuft sie — und wir sorgen dafür, dass das so bleibt.",
        dauer: "an einem Tag",
      },
    ],
    fazit:
      "Alles, was du dafür tust: einmal etwa 30 Minuten Zeit, ein paar Fotos und eine Rückmeldung zur Vorschau. Den Rest machen wir.",
  },

  ueberUns: {
    title: "Wer deine Website baut",
    untertitel:
      "Websites sind unser Handwerk. Deine Arbeitswelt kennen wir aus nächster Nähe.",
    absaetze: [
      "Palacios Communications gehört zur Gruppe von Gabriel Palacios — Hypnosetherapeut, Ausbildner und Buchautor. Das Ausbildungsinstitut derselben Gruppe hat international über 3'500 Therapeut/innen ausgebildet; viele der Menschen, für die wir Websites bauen, kennen wir aus diesen Lehrgängen. Uns musst du nicht erklären, wie eine Sitzung abläuft, wie man über Angst schreibt, ohne Angst zu machen, oder wo im Gesundheitsbereich die Grenze zwischen Beschreiben und Versprechen verläuft.",
      "Nur ist diese Nähe nicht das, was du bei uns kaufst. Du kaufst einen Auftritt, der zu deiner Arbeit passt: eine Seite, die ruhig bleibt, wo andere laut werden. Texte, die beschreiben statt versprechen. Und die Details, die kaum jemand bewusst bemerkt und die trotzdem mitschwingen — der Abstand zwischen zwei Zeilen, die Ruhe einer Farbe, der Satz, der freundlich statt fordernd klingt.",
      "Eine Website spricht immer auf zwei Ebenen: was sie sagt, und was sie ausstrahlt. Die erste Ebene kommt von dir — es ist deine Arbeit. Die zweite ist unser Beruf.",
    ],
    zitat: {
      text: "Was dich ausmacht, soll bei den Menschen ankommen, die dich suchen — so unverfälscht wie möglich.",
      quelle: "Unser Anspruch, seit dem ersten Tag",
    },
    fakten: [
      { zahl: "3'500+", text: "Absolvent/innen am Institut unserer Gruppe" },
      { zahl: "10'000+", text: "therapeutische Erfahrungsstunden in der Gruppe" },
      { zahl: "12", text: "Bestseller von Gabriel Palacios, in 8 Ländern" },
    ],
  },

  faq: {
    title: "Häufige Fragen",
    fragen: [
      {
        frage: "Muss ich technisch etwas können?",
        antwort:
          "Nein. Du baust nichts. Du beantwortest Fragen, die du einer Klient/in im Erstgespräch genauso beantworten würdest — die Website daraus bauen wir. Wenn du später einen Text ändern willst, meldest du dich mit einem Passwort in einem geschützten Bereich an und änderst ihn. Der Aufbau der Seite bleibt dabei fest, deshalb kannst du nichts kaputtmachen.",
      },
      {
        frage: "Was, wenn ich kündige — gehört mir die Seite dann?",
        antwort:
          "Deine Internetadresse gehört dir — von Anfang an und über das Abo hinaus. Wenn du kündigst, übertragen wir sie kostenlos zu dem Anbieter, den du wählst. Deine Inhalte, also Texte und Bilder, nimmst du mit. Was bei uns bleibt, ist die technische Umsetzung: Vorlage, Code und Gestaltung. Daran hast du ein Nutzungsrecht, solange das Abo läuft. Wenn du die Seite darüber hinaus behalten möchtest, sprich mit uns — dafür gibt es eine Lösung.",
      },
      {
        frage: "Warum zahle ich monatlich statt einmal?",
        antwort:
          "Weil eine Website kein Gegenstand ist, den du einmal kaufst und dann besitzt. Sie läuft jeden Tag. Der Server muss laufen, die Internetadresse wird jährlich verlängert, Sicherheitsupdates müssen eingespielt werden — und wenn etwas nicht geht, muss jemand erreichbar sein. Eine Einmalzahlung würde diese Kosten nur verstecken. Wir zeigen sie: ein Betrag am Anfang, ein fester Betrag im Monat, alles Laufende inbegriffen. Und du kannst jederzeit gehen.",
      },
      {
        frage: "Ich habe keine guten Fotos von mir.",
        antwort:
          "Das hören wir oft. Auf Wunsch fotografieren wir dich bei uns im Institut in Bern, gegen eine feste Pauschale — im Vorschlag Rundum ist das Shooting enthalten. Bis dahin arbeiten wir mit dem, was du hast: Eine Seite ohne Portrait ist besser als keine Seite.",
      },
      {
        frage: "Und wenn mir das Ergebnis nicht gefällt?",
        antwort:
          "Du siehst die Seite vor der Aufschaltung. Eine Korrekturrunde ist immer inbegriffen; was darüber hinausgeht, verrechnen wir nach Aufwand. Farben und Schrift stellst du ausserdem jederzeit selbst um.",
      },
      {
        frage: "Findet man mich danach auf Google?",
        antwort:
          "Deine Seite ist technisch sauber aufgebaut, wird bei Google angemeldet und enthält die Angaben, die Google und andere Suchmaschinen erwarten. Eine bestimmte Position kann dir niemand seriös versprechen — wir versprechen sie dir auch nicht. Wenn du laufend an deiner Sichtbarkeit arbeiten willst, kannst du das für CHF 30 im Monat dazunehmen.",
      },
      {
        frage: "Darf ich als Therapeut/in schreiben, dass ich etwas behandle?",
        antwort:
          "Nicht alles. Aussagen, die Heilung oder einen bestimmten Erfolg versprechen, sind nicht zulässig — auch nicht abgeschwächt. Beschreiben darfst du, was du anbietest und wie du arbeitest. Wir weisen dich auf Formulierungen hin, die uns auffallen, und liefern die üblichen Hinweise für dein Fachgebiet gleich mit. Die Verantwortung für deine Aussagen bleibt bei dir — aber du stehst damit nicht allein da.",
      },
      {
        frage: "Bin ich an eine Laufzeit gebunden?",
        antwort:
          "Bei Einmalzahlung der Einrichtung nicht — du kündigst monatlich. Bei Ratenzahlung läuft das Abo mindestens so lange, bis die Raten bezahlt sind.",
      },
    ],
  },

  // Viele in dieser Zielgruppe wollen zuerst mit einem Menschen sprechen,
  // bevor sie irgendwo klicken. Der Termin läuft später über cal.com; bis
  // dahin führt der Knopf ans Telefon.
  beratung: {
    title: "Lieber zuerst reden?",
    text: "Verständlich. In einem kurzen Gespräch schauen wir zusammen an, was du brauchst und was es kostet — ohne dass du dich vorher durch eine Liste klicken musst.",
    hinweis: "Kostenlos und unverbindlich, etwa 20 Minuten.",
    terminText: "Mit einem Menschen sprechen",
    // TODO: auf den cal.com-Link umstellen, sobald der Kalender steht.
    terminHref: "#kontakt",
  },

  abschluss: {
    title: "Wie möchtest du anfangen?",
    lead: "Wenn du weisst, was du brauchst, stell dir dein Angebot selbst zusammen. Wenn du zuerst mit einem Menschen sprechen möchtest, vereinbare ein kostenloses Gespräch. Keiner der beiden Wege ist der Umweg — nimm den, der dir entspricht.",
    ctaText: "Angebot zusammenstellen",
    ctaHref: "/angebot",
    telefonNote:
      "Das Gespräch ist unverbindlich. Wenn du lieber direkt anrufst: Sekretariat Di.–Sa., 09:00–18:00.",
  },

  footer: {
    // AGB fehlen hier bewusst: Die bestehenden regeln Kurse und Buchversand,
    // nicht das Website-Abo. Der Link kommt zurück, sobald die neuen AGB
    // geprüft sind — ein Link ins Leere ist schlimmer als kein Link.
    links: [
      { name: "Impressum", href: "/impressum" },
      { name: "Datenschutz", href: "/datenschutz" },
    ],
    social: [
      { name: "Instagram", href: "https://instagram.com/gabriel.palacios" },
      { name: "Facebook", href: "https://facebook.com/autorgabrielpalacios" },
      { name: "YouTube", href: "https://youtube.com/channel/UCgDaxp3dyuuyxqiSSs9AszQ" },
    ],
  },
};

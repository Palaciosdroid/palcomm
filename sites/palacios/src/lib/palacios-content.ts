// Inhalte der Palacios-Website.
//
// Bewusst statisch im Code, ohne Admin-Bereich und ohne Redis: Das ist unsere
// eigene Seite, wir bearbeiten sie hier. Der visuelle Editor ist für
// Kundenseiten gedacht, wo niemand im Code arbeiten will.
//
// Ton: Die Firma siezt, Gabriel duzt (Video, Newsletter, Social Media). Die
// Seite ist ein Vertragsangebot, kein Seminar.

export interface Paket {
  id: string;
  name: string;
  preis: number;
  raten: string;
  fuerWen: string;
  enthalten: string[];
  empfohlen?: boolean;
}

export interface Zusatz {
  name: string;
  preis: string;
  hinweis?: string;
}

export const palacios = {
  meta: {
    title: "Palacios Communications | Websites für Therapeut/innen und Praxen",
    description:
      "Wir richten Ihre Website ein, betreiben sie und kümmern uns um die Domain. Ab CHF 980 einmalig, danach CHF 29.90 im Monat. Für Therapeut/innen, Coaches und kleine Praxen in der Schweiz.",
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
    { name: "Angebot", href: "#angebot" },
    { name: "Preise", href: "#preise" },
    { name: "Ablauf", href: "#ablauf" },
    { name: "Über uns", href: "#ueber-uns" },
    { name: "Kontakt", href: "#kontakt" },
  ],

  hero: {
    kicker: "Kommunikation mit und für die Authentizität",
    title: "Ihre Website. So sorgfältig wie Ihre Arbeit.",
    lead: "Für Therapeut/innen, Coaches und kleine Praxen in der Schweiz, in Deutschland und in Österreich. Wir richten Ihre Website ein, betreiben sie und kümmern uns um die Domain. Sie müssen sich in kein System einarbeiten.",
    preisNote: "Ab CHF 980 einmalig, danach CHF 29.90 im Monat. Domain und Hosting inbegriffen.",
    ctaPrimary: { text: "Angebot zusammenstellen", href: "#preise" },
    ctaSecondary: { text: "Zuerst den Ablauf ansehen", href: "#ablauf" },
  },

  vertrauensleiste: [
    "Aus der Therapieszene heraus entstanden",
    "Sekretariat Di.–Sa. erreichbar",
    "Eigenes Studio in Bern",
  ],

  problem: {
    title: "Kommt Ihnen das bekannt vor?",
    absaetze: [
      "Sie arbeiten seit Jahren gut. Ihre Klient/innen kommen wieder und empfehlen Sie weiter. Nur: Wer Sie noch nicht kennt, findet entweder nichts — oder eine Seite, die Sie selbst nicht mehr gerne zeigen.",
      "Das ist kein Versäumnis. Eine Website zu bauen ist ein eigener Beruf, und die Baukästen, die das Gegenteil behaupten, kosten am Ende mehr Abende, als sie sparen.",
    ],
  },

  angebot: {
    title: "Was immer dabei ist",
    lead: "Ein Abo, keine Positionsliste. Was hier steht, ist drin — und bleibt drin, solange Sie dabei sind.",
    punkte: [
      {
        title: "Eine vollständige Website",
        text: "Startseite mit allen Abschnitten, die eine Praxis braucht: Vorstellung, Angebot, Arbeitsweise, Stimmen von Klient/innen, Kontaktformular.",
      },
      {
        title: "Ihre Wunschdomain",
        text: "Wir prüfen sie, registrieren sie, verlängern sie und richten alles Nötige ein. Die Domain gehört Ihnen — auch wenn Sie später gehen.",
      },
      {
        title: "Hosting und technische Pflege",
        text: "Updates, Sicherheit, Erreichbarkeit. Sie merken davon nichts, und genau das ist der Punkt.",
      },
      {
        title: "Impressum und Datenschutzerklärung",
        text: "Vorbereitet und auf Ihre Praxis zugeschnitten, mit den Angaben, die in der Schweiz und im DACH-Raum verlangt sind.",
      },
      {
        title: "Die Hinweise für Ihr Fachgebiet",
        text: "Ergänzende Begleitung, laufende Behandlung, kein Heilversprechen, Notfallnummern — formuliert, bevor Sie danach fragen müssen.",
      },
      {
        title: "Selbst ändern, ohne etwas kaputtzumachen",
        text: "Texte, Farben und Schrift ändern Sie in einem geschützten Bereich. Der Aufbau der Seite bleibt fest — deshalb kann dabei nichts schiefgehen.",
      },
    ],
    nichtEnthaltenTitle: "Nicht enthalten — damit Sie es vorher wissen",
    nichtEnthalten: [
      "Im Basispaket schreiben Sie die Texte selbst. Wir stellen die Fragen und lesen gegen; schreiben lassen können Sie ab dem Paket Komfort.",
      "Fotos und Videos machen wir auf Wunsch im Studio in Bern, gegen eine feste Pauschale.",
      "Online-Shop und Newsletter sind nicht Teil des Abos. Sprechen Sie uns an, wenn Sie das brauchen.",
    ],
  },

  pakete: [
    {
      id: "basis",
      name: "Basis",
      preis: 980,
      raten: "oder 3 × CHF 340",
      fuerWen: "Wenn Sie Ihre Texte selbst schreiben und schnell online sein wollen.",
      enthalten: [
        "Website nach unserer Vorlage",
        "Eigene Farbpalette und Schrift",
        "Domain, Hosting, Impressum und Datenschutz",
        "Zugang zum Selberbearbeiten",
        "Eine Korrekturrunde",
      ],
    },
    {
      id: "komfort",
      name: "Komfort",
      preis: 1690,
      raten: "oder 4 × CHF 440",
      fuerWen: "Wenn Ihnen das Schreiben über sich selbst schwerfällt — der häufigste Fall.",
      empfohlen: true,
      enthalten: [
        "Alles aus Basis",
        "Wir schreiben Ihre Texte",
        "SEO-Grundausbau",
        "Google-Business-Profil eingerichtet",
        "3 Änderungen pro Jahr inbegriffen",
      ],
    },
    {
      id: "rundum",
      name: "Rundum",
      preis: 2690,
      raten: "oder 6 × CHF 465",
      fuerWen: "Wenn der ganze Auftritt stimmen soll, nicht nur die Website.",
      enthalten: [
        "Alles aus Komfort",
        "Logo als Schriftzug",
        "200 Visitenkarten",
        "Fotoshooting an einem Studiotag",
        "6 Änderungen pro Jahr inbegriffen",
      ],
    },
  ] as Paket[],

  abo: {
    title: "Danach CHF 29.90 im Monat",
    lead: "Hosting, Domain, Sicherheitsupdates und Störungsbehebung. Monatlich kündbar.",
    punkte: [
      "Domain inbegriffen (.ch, .de, .com)",
      "Hosting, SSL-Zertifikat und Backups",
      "Sicherheitsupdates, ohne dass Sie etwas tun",
      "Störungsbehebung unbegrenzt — wenn etwas nicht geht, ist das unser Problem",
      "Zugang zum Selberbearbeiten",
    ],
    jahr: "Bei Jahreszahlung CHF 299 statt CHF 359 — zwei Monate geschenkt.",
    vergleich:
      "Zum Vergleich: Ein Baukasten wie Wix kostet 25 bis 30 Franken im Monat, die Domain ab dem zweiten Jahr extra — und Sie machen alles selbst.",
  },

  zusatz: {
    title: "Was Sie dazunehmen können",
    lead: "Jederzeit, auch später. Wer einzeln wählt statt ein Paket zu nehmen, zahlt diese Preise.",
    posten: [
      { name: "Texte schreiben wir", preis: "CHF 690" },
      { name: "SEO-Grundausbau", preis: "CHF 390" },
      { name: "Google-Business-Profil", preis: "CHF 290" },
      { name: "Logo als Schriftzug", preis: "CHF 690" },
      { name: "Logo mit Bildmarke", preis: "ab CHF 1'490", hinweis: "auf Anfrage" },
      { name: "200 Visitenkarten", preis: "CHF 390" },
      { name: "Fotoshooting am Studiotag", preis: "CHF 590" },
      { name: "Weitere Unterseite", preis: "CHF 390", hinweis: "zzgl. CHF 5/Monat" },
      { name: "Zweite Sprache", preis: "ab CHF 1'490", hinweis: "zzgl. CHF 20/Monat" },
      { name: "Terminbuchung", preis: "CHF 290", hinweis: "zzgl. CHF 10/Monat" },
      { name: "Blog", preis: "CHF 490", hinweis: "zzgl. CHF 15/Monat" },
      { name: "SEO-Betreuung", preis: "CHF 30/Monat", hinweis: "quartalsweise überarbeitet" },
      { name: "Änderungspaket, 5 Stück", preis: "CHF 290", hinweis: "einzeln CHF 90" },
    ] as Zusatz[],
    videoHinweis:
      "Vorstellungs- und Imagevideos machen wir im eigenen Studio oder bei Ihnen vor Ort. Weil dafür ein Drehtag reserviert wird, offerieren wir das persönlich statt es online zu verkaufen.",
  },

  ablauf: {
    title: "In drei Schritten online",
    schritte: [
      {
        nummer: "1",
        title: "Sie erzählen uns von Ihrer Arbeit",
        text: "Im Konfigurator beantworten Sie Fragen, die Sie ohnehin beantworten können: Wen begleiten Sie? Was bieten Sie an? Wie arbeiten Sie? Dazu wählen Sie Farben und Schrift aus fertigen Kombinationen und sehen sofort, wie das zusammenwirkt.",
        dauer: "etwa 30 Minuten",
      },
      {
        nummer: "2",
        title: "Wir bauen Ihre Seite",
        text: "Aus Ihren Angaben entsteht die Website. Wir setzen Ihre Bilder ein, lesen jeden Text auf Rechtschreibung und Wirkung gegen und legen Impressum und Datenschutzerklärung an. Sie bekommen einen Link zur Vorschau und sagen uns, was noch anders soll.",
        dauer: "5 bis 10 Arbeitstage",
      },
      {
        nummer: "3",
        title: "Ihre Seite geht online",
        text: "Wir schalten die Domain auf, melden die Seite bei Google an und zeigen Ihnen in einem kurzen Gespräch, wie Sie selbst Texte ändern. Ab dann läuft sie.",
        dauer: "an einem Tag",
      },
    ],
    fazit:
      "Was Sie dafür tun müssen: einmal etwa 30 Minuten Zeit, ein paar Fotos, und eine Rückmeldung zur Vorschau.",
  },

  ueberUns: {
    title: "Warum ausgerechnet wir",
    untertitel: "Wir kommen nicht aus der Werbung. Wir kommen aus der Therapieszene.",
    absaetze: [
      "Palacios Communications ist aus der Arbeit von Gabriel Palacios entstanden — Hypnosetherapeut, Ausbildner und Buchautor. Viele der Menschen, für die wir Websites bauen, kennen wir aus der Ausbildung. Wir wissen, wie eine Sitzung abläuft, wie man über Angst schreibt, ohne Angst zu machen, und wo im Gesundheitsbereich die Grenze zwischen Beschreiben und Versprechen verläuft.",
      "Unser Spezialgebiet sind sensible und achtsame Auftritte für Menschen, die im therapeutischen, sozialen oder klinischen Umfeld arbeiten. Und unsere Spezialität ist das Auge für das besondere Etwas — für die Details, die kaum jemand bewusst bemerkt und die trotzdem mitschwingen: der Abstand zwischen zwei Zeilen, die Ruhe einer Farbe, der Satz, der eine Seite freundlich statt fordernd klingen lässt.",
      "Denn eine Website spricht immer auf zwei Ebenen. Was sie sagt — und was sie ausstrahlt. Bei uns ist die zweite Ebene kein Zufall.",
    ],
    zitat: {
      text: "Was Sie ausmacht, soll bei den Menschen ankommen, die Sie suchen — so unverfälscht wie möglich.",
      quelle: "Unser Anspruch, seit dem ersten Tag",
    },
    fakten: [
      { zahl: "2019", text: "als GmbH in Bern" },
      { zahl: "Di.–Sa.", text: "Sekretariat erreichbar" },
      { zahl: "Bern", text: "eigenes Greenscreen-Studio" },
    ],
  },

  faq: {
    title: "Häufige Fragen",
    fragen: [
      {
        frage: "Kann ich das überhaupt selbst?",
        antwort:
          "Sie bauen nichts. Im Konfigurator beantworten Sie Fragen — dieselben, die Sie einer Klientin im Erstgespräch auch beantworten würden. Die Website daraus bauen wir. Wenn Sie später einen Text ändern möchten, melden Sie sich mit einem Passwort in einem einfachen Bereich an und ändern ihn. Der Aufbau der Seite bleibt dabei fest, deshalb können Sie dort nichts kaputtmachen.",
      },
      {
        frage: "Was, wenn ich kündige — gehört mir die Seite?",
        antwort:
          "Ihre Domain gehört Ihnen, von Anfang an und über das Abo hinaus. Wenn Sie kündigen, übertragen wir sie kostenlos zu dem Anbieter, den Sie wählen. Ihre Inhalte, also Texte und Bilder, bekommen Sie zum Mitnehmen. Was bei uns bleibt, ist die technische Umsetzung: Vorlage, Code und Gestaltung. Dafür haben Sie ein Nutzungsrecht, solange das Abo läuft. Möchten Sie die Seite behalten, sprechen Sie uns an — dafür gibt es eine Lösung.",
      },
      {
        frage: "Warum monatlich zahlen statt einmal?",
        antwort:
          "Weil eine Website kein Gegenstand ist, den man einmal kauft und dann besitzt. Sie läuft. Jeden Tag. Der Server muss laufen, die Domain jedes Jahr verlängert werden, Sicherheitsupdates müssen eingespielt werden — und wenn etwas nicht geht, muss jemand erreichbar sein. Bei einer einmaligen Zahlung wären all diese Kosten bereits im Preis, bloss unsichtbar. Wir machen es umgekehrt: ein Betrag am Anfang, ein fester Betrag im Monat, alles Laufende ist drin. Und Sie können jederzeit gehen.",
      },
      {
        frage: "Ich habe keine guten Fotos.",
        antwort:
          "Das ist der häufigste Punkt. Wir haben ein eigenes Studio in Bern und machen dort an festen Studiotagen Portraits. Im Paket Rundum ist ein Shooting enthalten, einzeln kostet es CHF 590. Bis dahin arbeiten wir mit dem, was Sie haben — eine Seite ohne Portrait ist besser als keine Seite.",
      },
      {
        frage: "Was, wenn mir das Ergebnis nicht gefällt?",
        antwort:
          "Sie sehen die Seite vor der Aufschaltung. Eine Korrekturrunde ist in jedem Paket inbegriffen; darüber hinaus verrechnen wir nach Aufwand. Farben und Schrift können Sie ausserdem jederzeit selbst umstellen.",
      },
      {
        frage: "Findet mich Google danach?",
        antwort:
          "Ihre Seite ist technisch sauber aufgebaut, wird bei Google angemeldet und enthält die strukturierten Angaben, die Suchmaschinen erwarten. Eine bestimmte Position können wir nicht versprechen — das kann niemand seriös. Was wir anbieten, ist laufende SEO-Betreuung für CHF 30 im Monat.",
      },
      {
        frage: "Darf ich als Therapeutin überhaupt schreiben, dass ich etwas behandle?",
        antwort:
          "Nicht alles. Aussagen, die Heilung oder einen bestimmten Erfolg versprechen, sind nicht zulässig — auch nicht abgeschwächt. Beschreiben dürfen Sie, was Sie anbieten und wie Sie arbeiten. Wir weisen Sie auf Formulierungen hin, die uns auffallen, und liefern die üblichen Hinweise gleich mit. Die Verantwortung für Ihre Aussagen bleibt bei Ihnen, aber Sie stehen damit nicht allein da.",
      },
      {
        frage: "Bin ich an eine Laufzeit gebunden?",
        antwort:
          "Bei Einmalzahlung der Einrichtung nicht — Sie kündigen monatlich. Bei Ratenzahlung läuft das Abo mindestens so lange, bis die Raten bezahlt sind.",
      },
    ],
  },

  abschluss: {
    title: "Zwei Wege, anzufangen",
    lead: "Wenn Sie wissen, was Sie wollen, stellen Sie sich Ihr Angebot selbst zusammen. Wenn Sie lieber zuerst mit einem Menschen sprechen, rufen Sie an.",
    ctaText: "Angebot zusammenstellen",
    ctaHref: "#preise",
    telefonNote: "Sekretariat Di.–Sa., 09:00–18:00",
  },

  footer: {
    links: [
      { name: "Impressum", href: "/impressum" },
      { name: "Datenschutz", href: "/datenschutz" },
      { name: "AGB", href: "/agb" },
    ],
    social: [
      { name: "Instagram", href: "https://instagram.com/gabriel.palacios" },
      { name: "Facebook", href: "https://facebook.com/autorgabrielpalacios" },
      { name: "YouTube", href: "https://youtube.com/channel/UCgDaxp3dyuuyxqiSSs9AszQ" },
    ],
  },
};

// Praxis-Informationen
export const practiceInfo = {
  name: "Hypnose Enza",
  tagline: "Hypnosetherapie",
  fullName: "Enza Gasser-Piscitelli",
  subtitle: "Professionell und Kompetent",
  phone: "+41 79 123 45 67",
  email: "info@hypnose-enza.ch",
  website: "hypnose-enza.ch",
  address: {
    street: "Musterstrasse 12",
    city: "3000 Bern",
    country: "Schweiz",
  },
};

// Navigation
export const navigation = [
  { name: "Home", href: "#" },
  { name: "Über mich", href: "#ueber-mich" },
  { name: "Therapieangebot", href: "#therapieangebot" },
  { name: "Kontakt", href: "#kontakt" },
];

// Hero-Sektion
export const heroContent = {
  title: "Hypnosetherapie",
  description:
    "Beginne Dein Leben frei, harmonisch und unbeschwert zu Leben. Bei der Reise begleite ich Dich damit und vertrauensvoll auf Dein Wohlbefinden.",
  subtitle: "Professionell und Kompetent",
  ctaText: "Termin Buchen",
  ctaLink: "#kontakt",
};

// Willkommen-Sektion
export const welcomeContent = {
  title: "Herzlich willkommen",
  intro:
    "Gerne stehe ich Dir achtsam, empathisch zur Seite, begleite Dich in einem geschützten Rahmen, und gebe Dir die nötige Unterstützung um Deine starken Ressourcen zu verankern.",
  aboutTitle: "Über mich",
  aboutText: `Mein Name ist Enza Gasser-Piscitelli, ich bin verheiratet und Mutter von 2 erwachsenen Söhnen und praktiziere Homöo. Meine Eltern waren Italiener (Mein Vater(*) und meine Mutter waren gelernte Angestellte). Ich wuchs zweisprachig mit einer stark 12jährigen Schwester in Bern auf. Von meiner Familie habe ich die Wertschätzung und respektvoller Umgang mit Menschen, Tiere und Umwelt mitgegeben.`,
  image: "/images/portrait.jpg",
  quote:
    "Vertraue auf Dein Unterbewusstsein, damit Du mit Deinen Gefühlen wieder frei wirst...",
};

// Philosophie-Sektion
export const philosophyContent = {
  title: "Was ist die Philosophie der Hypnose?",
  text: `Sind Deine Gefühle, Ängste und Glaubenssätze wirklich berechtigt, Dich zu blockieren? Hypnose ist ein sanfter, geistiger Zustand des Unterbewusstseins. Mit der Imagination suchen wir auf Deiner Reise neue Ressourcen die Dich Dein Unterbewusstsein positiv stärken.

Die Lösungsorientierte Methode nach Gabriel Palacios Hypnoseexperte hilft Dir dabei die Blockaden nachhaltig zu befreien.`,
  ctaText: "Termin Buchen",
  ctaLink: "#kontakt",
  quote: {
    text: "Das Leben kann nur verstanden werden muss aber vorwärts gelebt werden...",
    author: "Søren Kierkegaard",
    role: "Dänischer Philosoph",
  },
};

// Therapieangebot-Sektion
export const therapyContent = {
  title: "Therapieangebot",
  intro:
    "Dein Unterbewusstsein vergisst nie, denn Du kannst Deine Gefühle, Emotionen, Ängste und Glaubenssätze ändern. Du verdienst es in Einklang des Lebens zu kommen.",

  // Zielgruppen mit Bildern
  targetGroupsTitle: "Für wen ist Hypnosetherapie?",
  targetGroups: [
    {
      id: "erwachsene",
      title: "Erwachsene",
      image: "/images/zielgruppe-erwachsene.jpg",
      description: "Wiederkehrende, oft belastende Kreisen negativer Gedanken, das durch Stress, Angststörungen ausgelöst wird und sich wie eine Endlosschleife anfühlt.",
    },
    {
      id: "kinder",
      title: "Kinder und Jugendliche",
      image: "/images/zielgruppe-kinder.jpg",
      description: "Lernschwierigkeiten, Überforderung durch Stoff, Leistungsdruck, Schulangst, Mobbing, ADHS oder eine generelle Überlastung.",
    },
    {
      id: "eltern",
      title: "Eltern",
      image: "/images/zielgruppe-eltern.jpg",
      description: "Alle Eltern wollen das Beste für ihr Kind. Oft sind das Dinge die man selber nicht kontrollieren oder verstehen kann.",
    },
    {
      id: "stress",
      title: "Menschen in Stresssituationen",
      image: "/images/zielgruppe-stress.jpg",
      description: "Burnout-Prävention, Überforderung im Beruf oder Alltag, Erschöpfungszustände und chronische Anspannung.",
    },
    {
      id: "senioren",
      title: "Senioren",
      image: "/images/zielgruppe-senioren.jpg",
      description: "Lebensübergänge meistern, Ängste im Alter, Schlafprobleme und Unterstützung bei Veränderungsprozessen.",
    },
  ],

  // Themenspezifisch mit Bildern
  topicsTitle: "Themenspezifisch",
  topics: [
    {
      id: "phobien",
      title: "Phobien",
      image: "/images/thema-phobien.jpg",
      description: "Angst vor Spinnen, Höhenangst, Flugangst oder übersteigerte Angst vor bestimmten Tieren und Situationen überwinden.",
    },
    {
      id: "aengste",
      title: "Ängste",
      image: "/images/thema-aengste.jpg",
      description: "Panikattacken, soziale Ängste, Zukunftsangst oder generalisierte Angststörungen nachhaltig behandeln.",
    },
    {
      id: "selbstbewusstsein",
      title: "Selbstbewusstsein stärken",
      image: "/images/thema-selbstbewusstsein.jpg",
      description: "Dein Selbstbewusstsein positiv beeinflussen, negative Denkmuster durchbrechen und Dein Selbstbild mit starken Ressourcen verankern.",
    },
    {
      id: "sucht",
      title: "Sucht",
      image: "/images/thema-sucht.jpg",
      description: "Raucherentwöhnung, Esssucht oder andere Abhängigkeiten nachhaltig überwinden.",
    },
    {
      id: "blockaden",
      title: "Blockaden lösen",
      image: "/images/thema-blockaden.jpg",
      description: "Mentale Blockaden und Hindernisse erkennen und auflösen für mehr Freiheit im Leben.",
    },
    {
      id: "konzentration",
      title: "Konzentration & Schlaf",
      image: "/images/thema-schlaf.jpg",
      description: "Konzentrationsschwierigkeiten, Schlaflosigkeit und innere Unruhe behandeln.",
    },
    {
      id: "schmerzen",
      title: "Schmerzen",
      image: "/images/thema-schmerzen.jpg",
      description: "Chronische Schmerzen lindern und einen besseren Umgang mit Schmerzempfindungen entwickeln.",
    },
    {
      id: "gewicht",
      title: "Gewichtsreduktion",
      image: "/images/thema-gewicht.jpg",
      description: "Nachhaltig abnehmen durch Veränderung der Essgewohnheiten im Unterbewusstsein.",
    },
    {
      id: "allergien",
      title: "Allergien",
      image: "/images/thema-allergien.jpg",
      description: "Desensibilisierung und Linderung von allergischen Reaktionen durch Hypnosetherapie.",
    },
    {
      id: "sport",
      title: "Sporthypnose",
      image: "/images/thema-sport.jpg",
      description: "Mentale Stärke für Sportler - Leistungsblockaden lösen und Fokus verbessern.",
    },
  ],
};

// Zertifikate-Sektion
export const certificatesContent = {
  title: "Diplome & Zertifikate",
  certificates: [
    {
      id: 1,
      title: "Diplom Hypnosetherapeutin",
      image: "/images/diplom-1.jpg",
    },
    {
      id: 2,
      title: "National Guild of Hypnotists",
      image: "/images/diplom-2.jpg",
    },
    {
      id: 3,
      title: "Verband Schweizer Hypnosetherapeut:innen",
      image: "/images/diplom-3.jpg",
    },
    {
      id: 4,
      title: "Weiterbildung Zertifikat",
      image: "/images/diplom-4.jpg",
    },
    {
      id: 5,
      title: "Zusatzqualifikation",
      image: "/images/diplom-5.jpg",
    },
  ],
};

// Kontakt-Formular Labels
export const contactContent = {
  title: "Kontakt",
  fields: {
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail Adresse",
    phone: "Telefon",
    message: "Deine Nachricht...",
  },
  submitText: "Senden",
  privacyText: "Datenschutz",
};

// Footer
export const footerContent = {
  copyright: "Enza Gasser",
  email: "info@hypnose-enza.ch",
  links: [
    { name: "Impressum", href: "#impressum" },
    { name: "Datenschutz", href: "#datenschutz" },
  ],
  socialLinks: [
    { name: "Facebook", href: "#", icon: "facebook" },
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "LinkedIn", href: "#", icon: "linkedin" },
  ],
};

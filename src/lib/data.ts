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
  categories: [
    {
      id: "erwachsene",
      title: "Erwachsene",
      icon: "user",
      description:
        "Individualbezogen – Ich bearbeite mit Dir bewusst Deine negativen Muster/Gefühle, das auch Deine Angstmechanismen auslösen, welche den Lebensalltag erschweren (Eifersucht, Lernen).",
    },
    {
      id: "kinder",
      title: "Kinder",
      icon: "baby",
      description:
        "Fantasievolle, geistige Wachstumsprozesse (auch Prüfungsangst selbst) wie beispielsweise Gefühle, Schulangst, Magersucht, ADHS alles bei gewünschte Abnehung.",
    },
    {
      id: "eltern",
      title: "Eltern",
      icon: "users",
      description:
        "Lieben wie man sich sonstige Komplexität möglich, auch alle Eltern wollen das Beste für ihr Kind, oft sind das Dinge die man selber nicht kontrollieren oder verstehen kann. Elternpart mit, seit dem Vertrauen ihr mich treu empfehlen.",
    },
    {
      id: "stress",
      title: "Stresssituationen",
      icon: "brain",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquam erat, sed diam voluptua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      id: "senioren",
      title: "Senioren",
      icon: "heart",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquam erat, sed diam voluptua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
  ],
};

// Zertifikate-Sektion
export const certificatesContent = {
  title: "Diplome & Zertifikate",
  certificates: [
    {
      id: 1,
      title: "Diplom Hypnosetherapeutin NGH",
      issuer: "Enza Gasser-Piscitelli",
      image: "/images/diplom-1.jpg",
    },
    {
      id: 2,
      title: "National Guild of Hypnotists",
      issuer: "Certified Hypnotherapist",
      image: "/images/diplom-2.jpg",
    },
    {
      id: 3,
      title: "Verband Schweizer Hypnosetherapeut:innen",
      issuer: "Enza Gasser – Piscitelli",
      image: "/images/diplom-3.jpg",
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

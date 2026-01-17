export const eventDetails = {
  name: "Angstfrei-Tag 2026",
  date: "Samstag, 24. Oktober 2026",
  location: "Kursaal, Bern",
  slogan: "Dein Vorsprung durch mentale Gesundheit",
  countdownTarget: "2026-10-24T09:00:00",
};

export const speakers = [
  {
    id: 1,
    name: "Gabriel Palacios",
    title: "Hypnotherapie-Experte",
    topic: "Hypnose & Unterbewusstsein",
    image: "/speakers/gabriel.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Dr. Marcus Täuber",
    title: "Neurowissenschaftler, Autor & Coach",
    topic: "Die Wissenschaft der mentalen Stärke",
    image: "/speakers/marcus.jpg",
    featured: true,
  },
  {
    id: 3,
    name: "Überraschungsgast",
    title: "Wird noch bekannt gegeben",
    topic: "Eine inspirierende Persönlichkeit – es genügt, freut euch ein Geheimnis",
    image: "/speakers/surprise.jpg",
    featured: true,
    isSurprise: true,
  },
];

export const workshopLeader = {
  id: 1,
  name: "Christian Bischoff",
  title: "Persönlichkeits- & Mentaltrainer",
  topic: "Workshop",
  image: "/speakers/christian.jpg",
};

export const program = {
  date: "Samstag, 24. Oktober 2026",
  location: "Kursaal, Bern",
  slots: [
    { time: "08:30 - 09:00", title: "Einlass & Registration", speaker: null, type: "break" },
    { time: "09:00 - 09:15", title: "Begrüssung", speaker: "Gabriel Palacios", type: "talk" },
    { time: "09:15 - 10:30", title: "Vortrag: Hypnose & Unterbewusstsein", speaker: "Gabriel Palacios", type: "keynote" },
    { time: "10:30 - 11:00", title: "Kaffeepause & Networking", speaker: null, type: "break" },
    { time: "11:00 - 12:15", title: "Vortrag: Die Wissenschaft der mentalen Stärke", speaker: "Dr. Marcus Täuber", type: "talk" },
    { time: "12:15 - 13:30", title: "Mittagspause", speaker: null, type: "break" },
    { time: "13:30 - 14:45", title: "Vortrag: Überraschungsgast", speaker: "Überraschungsgast", type: "talk" },
    { time: "14:45 - 15:15", title: "Kaffeepause", speaker: null, type: "break" },
    { time: "15:15 - 17:15", title: "Workshop (2h)", speaker: "Christian Bischoff", type: "workshop" },
    { time: "17:15 - 17:45", title: "Abschluss & Q&A", speaker: "Gabriel Palacios", type: "keynote" },
    { time: "17:45 - 19:00", title: "Apéro & Networking", speaker: null, type: "break" },
  ],
};

export const tickets = [
  {
    id: "day",
    name: "Tagespass",
    price: "249",
    currency: "CHF",
    description: "Das volle Live-Erlebnis vor Ort",
    features: [
      "Zugang zu allen 3 Vorträgen",
      "Zugang zum Workshop (2h)",
      "Verpflegung inklusive",
      "Networking mit Gleichgesinnten",
    ],
    highlighted: true,
    badge: "Beliebt",
  },
  {
    id: "vip",
    name: "VIP-Tagespass",
    price: "599",
    currency: "CHF",
    description: "Das exklusive Premium-Erlebnis",
    features: [
      "Zugang zu allen 3 Vorträgen",
      "Zugang zum Workshop (2h)",
      "Frühstück beim Check-In",
      "Frühstück bei den Signierstunden",
      "Begrüssungskaffee / -apéritif",
      "VIP-Lunch",
      "Exklusives VIP-Dinner",
      "VIP-Geschenk",
    ],
    highlighted: false,
    badge: "Platin",
  },
];

export const testimonials = [
  {
    id: 1,
    quote: "Der Angstfrei-Tag hat mein Leben verändert. Ich habe gelernt, meine Ängste zu verstehen und zu überwinden.",
    name: "Sandra M.",
    role: "Teilnehmerin 2024",
    image: "/testimonials/sandra.jpg",
  },
  {
    id: 2,
    quote: "Die Speaker sind absolute Weltklasse. Jeder Vortrag war vollgepackt mit praktischen Tipps, die ich sofort umsetzen konnte.",
    name: "Peter K.",
    role: "Teilnehmer 2024",
    image: "/testimonials/peter.jpg",
  },
  {
    id: 3,
    quote: "Die Atmosphäre war unglaublich. Man spürt, dass alle dasselbe Ziel haben: angstfrei zu leben.",
    name: "Maria L.",
    role: "Teilnehmerin 2023",
    image: "/testimonials/maria.jpg",
  },
  {
    id: 4,
    quote: "Ich kam mit Panikattacken und ging mit Hoffnung. Gabriel Palacios ist ein Meister seines Fachs.",
    name: "Thomas R.",
    role: "Teilnehmer 2024",
    image: "/testimonials/thomas.jpg",
  },
];

// Workshop is included in tickets - no separate workshop sales

export const stats = [
  { value: "2500+", label: "Teilnehmer" },
  { value: "3", label: "Top-Speaker" },
  { value: "1", label: "Workshop" },
  { value: "98%", label: "Zufriedenheit" },
];

export const impressions = [
  { id: 1, src: "/impressions/img1.jpg", alt: "Publikum beim Angstfrei-Tag" },
  { id: 2, src: "/impressions/img2.jpg", alt: "Speaker auf der Bühne" },
  { id: 3, src: "/impressions/img3.jpg", alt: "Networking beim Apéro" },
  { id: 4, src: "/impressions/img4.jpg", alt: "Workshop-Session" },
  { id: 5, src: "/impressions/img5.jpg", alt: "Kursaal Bern Saal" },
  { id: 6, src: "/impressions/img6.jpg", alt: "Teilnehmer bei der Anmeldung" },
];

export const navigation = [
  { name: "Programm", href: "#programm" },
  { name: "Speaker", href: "#speaker" },
  { name: "Tickets", href: "#tickets" },
];

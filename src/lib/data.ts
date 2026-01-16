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
    title: "Hypnose-Experte & Bestseller-Autor",
    topic: "Die Macht des Unterbewusstseins",
    image: "/speakers/gabriel.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Dr. Sarah Meier",
    title: "Neurowissenschaftlerin",
    topic: "Die Neurobiologie der Angst",
    image: "/speakers/sarah.jpg",
    featured: false,
  },
  {
    id: 3,
    name: "Thomas Bergmann",
    title: "Mental Coach",
    topic: "Resilienz im Alltag",
    image: "/speakers/thomas.jpg",
    featured: false,
  },
  {
    id: 4,
    name: "Dr. Anna Fischer",
    title: "Psychologin",
    topic: "Ängste verstehen und überwinden",
    image: "/speakers/anna.jpg",
    featured: false,
  },
  {
    id: 5,
    name: "Marco Benedetti",
    title: "Atemtherapeut",
    topic: "Breathwork gegen Angst",
    image: "/speakers/marco.jpg",
    featured: false,
  },
  {
    id: 6,
    name: "Lisa Huber",
    title: "Mindfulness-Trainerin",
    topic: "Achtsamkeit als Schlüssel",
    image: "/speakers/lisa.jpg",
    featured: false,
  },
  {
    id: 7,
    name: "Dr. Michael Stern",
    title: "Stressforscher",
    topic: "Stress verstehen, Angst besiegen",
    image: "/speakers/michael.jpg",
    featured: false,
  },
  {
    id: 8,
    name: "Julia Hoffmann",
    title: "Traumatherapeutin",
    topic: "Heilung nach Trauma",
    image: "/speakers/julia.jpg",
    featured: false,
  },
];

export const program = {
  date: "Samstag, 24. Oktober 2026",
  location: "Kursaal, Bern",
  slots: [
    { time: "08:30 - 09:00", title: "Einlass & Registration", speaker: null, type: "break" },
    { time: "09:00 - 09:15", title: "Begrüssung", speaker: "Gabriel Palacios", type: "talk" },
    { time: "09:15 - 10:15", title: "Keynote: Die Macht des Unterbewusstseins", speaker: "Gabriel Palacios", type: "keynote" },
    { time: "10:15 - 10:45", title: "Kaffeepause & Networking", speaker: null, type: "break" },
    { time: "10:45 - 11:30", title: "Die Neurobiologie der Angst", speaker: "Dr. Sarah Meier", type: "talk" },
    { time: "11:30 - 12:15", title: "Resilienz im Alltag", speaker: "Thomas Bergmann", type: "talk" },
    { time: "12:15 - 13:30", title: "Mittagspause", speaker: null, type: "break" },
    { time: "13:30 - 14:15", title: "Ängste verstehen und überwinden", speaker: "Dr. Anna Fischer", type: "talk" },
    { time: "14:15 - 15:00", title: "Breathwork gegen Angst", speaker: "Marco Benedetti", type: "talk" },
    { time: "15:00 - 15:30", title: "Kaffeepause", speaker: null, type: "break" },
    { time: "15:30 - 16:15", title: "Achtsamkeit als Schlüssel", speaker: "Lisa Huber", type: "talk" },
    { time: "16:15 - 17:00", title: "Stress verstehen, Angst besiegen", speaker: "Dr. Michael Stern", type: "talk" },
    { time: "17:00 - 17:45", title: "Healing Session", speaker: "Julia Hoffmann", type: "talk" },
    { time: "17:45 - 18:30", title: "Abschluss & Q&A", speaker: "Gabriel Palacios", type: "keynote" },
    { time: "18:30 - 20:00", title: "Apéro & Networking", speaker: null, type: "break" },
  ],
};

export const tickets = [
  {
    id: "online",
    name: "Online-Ticket",
    price: "99",
    currency: "CHF",
    description: "Erlebe den Angstfrei-Tag bequem von zuhause",
    features: [
      "Livestream des gesamten Tages",
      "Aufzeichnungen für 30 Tage",
      "Digitales Workbook",
      "Chat-Teilnahme während des Events",
    ],
    highlighted: false,
    badge: null,
  },
  {
    id: "day",
    name: "Tagesticket",
    price: "249",
    currency: "CHF",
    description: "Das volle Live-Erlebnis vor Ort",
    features: [
      "Vor-Ort-Teilnahme im Kursaal Bern",
      "Alle Vorträge live erleben",
      "Networking mit Gleichgesinnten",
      "Verpflegung inklusive",
      "Aufzeichnungen für 30 Tage",
      "Digitales Workbook",
    ],
    highlighted: true,
    badge: "Beliebt",
  },
  {
    id: "vip",
    name: "VIP-Tagesticket",
    price: "599",
    currency: "CHF",
    description: "Das exklusive Premium-Erlebnis",
    features: [
      "Alles aus dem Tagesticket",
      "Premium-Sitzplätze (erste Reihen)",
      "Exklusives Meet & Greet mit Speakern",
      "VIP-Lunch mit Gabriel Palacios",
      "Persönliches Zertifikat",
      "Exklusive VIP-Goodie-Bag",
    ],
    highlighted: false,
    badge: "Exklusiv",
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

export const workshops = [
  {
    id: 1,
    title: "Selbsthypnose Masterclass",
    instructor: "Gabriel Palacios",
    description: "Lerne die Grundlagen der Selbsthypnose und wie du sie im Alltag einsetzen kannst.",
    image: "/workshops/hypnose.jpg",
    duration: "2 Stunden",
    price: "149",
  },
  {
    id: 2,
    title: "Breathwork Intensive",
    instructor: "Marco Benedetti",
    description: "Intensive Atemübungen zur sofortigen Angstreduktion und mehr Energie.",
    image: "/workshops/breathwork.jpg",
    duration: "1.5 Stunden",
    price: "99",
  },
];

export const stats = [
  { value: "2500+", label: "Teilnehmer" },
  { value: "8", label: "Weltklasse-Speaker" },
  { value: "12", label: "Vorträge" },
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
  { name: "Workshops", href: "#workshops" },
];

// JSON-LD Structured Data für SEO
// Schema.org markup für bessere Suchmaschinen-Sichtbarkeit

export function LocalBusinessJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": "https://www.hypnose-enza.ch/#business",
    name: "Hypnose Enza",
    alternateName: "Hypnosetherapie Enza Gasser-Fiorini",
    description:
      "Professionelle Hypnosetherapie in Bern, Ostermundigen und schweizweit. Diplomierte Hypnosetherapeutin für Ängste, Phobien, Stress, Burnout, Raucherentwöhnung und mehr.",
    url: "https://www.hypnose-enza.ch",
    telephone: "+41 79 416 22 23",
    email: "hypnoseenza@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ostermundigen",
      addressRegion: "BE",
      postalCode: "3072",
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.9547,
      longitude: 7.4862,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Bern",
      },
      {
        "@type": "City",
        name: "Ostermundigen",
      },
      {
        "@type": "City",
        name: "Thun",
      },
      {
        "@type": "Country",
        name: "Schweiz",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 46.9547,
        longitude: 7.4862,
      },
      geoRadius: "100000", // 100km Radius für Hausbesuche
    },
    priceRange: "CHF 150/Stunde",
    currenciesAccepted: "CHF",
    paymentAccepted: "Bar, TWINT",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    image: "https://www.hypnose-enza.ch/images/portrait.jpg",
    sameAs: [],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "3",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function PersonJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.hypnose-enza.ch/#person",
    name: "Enza Gasser-Fiorini",
    jobTitle: "Diplomierte Hypnosetherapeutin",
    description:
      "Diplomierte Hypnosetherapeutin VSH in Bern/Ostermundigen. Spezialisiert auf Angsttherapie, Phobien, Stressbewältigung und Raucherentwöhnung.",
    url: "https://www.hypnose-enza.ch",
    telephone: "+41 79 416 22 23",
    email: "hypnoseenza@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ostermundigen",
      addressRegion: "BE",
      postalCode: "3072",
      addressCountry: "CH",
    },
    worksFor: {
      "@id": "https://www.hypnose-enza.ch/#business",
    },
    memberOf: [
      {
        "@type": "Organization",
        name: "Verband Schweizer Hypnosetherapeuten (VSH)",
        url: "https://verband-schweizer-hypnosetherapeuten.ch",
      },
      {
        "@type": "Organization",
        name: "National Guild of Hypnotists",
      },
    ],
    knowsAbout: [
      "Hypnosetherapie",
      "Angsttherapie",
      "Phobien-Behandlung",
      "Stressbewältigung",
      "Raucherentwöhnung",
      "Gewichtsreduktion",
      "Kinderhypnose",
      "Sporthypnose",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ServicesJsonLd() {
  const services = [
    {
      name: "Angsttherapie & Phobien",
      description:
        "Hypnosetherapie bei Ängsten, Panikattacken, Flugangst, Höhenangst, Spinnenangst und anderen Phobien.",
    },
    {
      name: "Raucherentwöhnung",
      description:
        "Mit Hypnose rauchfrei werden. Nachhaltige Raucherentwöhnung durch Hypnosetherapie.",
    },
    {
      name: "Stressbewältigung & Burnout-Prävention",
      description:
        "Hypnosetherapie bei Stress, Burnout, Erschöpfung und chronischer Anspannung.",
    },
    {
      name: "Gewichtsreduktion",
      description:
        "Abnehmen mit Hypnose. Nachhaltige Gewichtsreduktion durch Veränderung der Essgewohnheiten.",
    },
    {
      name: "Kinderhypnose",
      description:
        "Hypnosetherapie für Kinder und Jugendliche bei Schulangst, Lernschwierigkeiten, ADHS und mehr.",
    },
    {
      name: "Schlafstörungen",
      description:
        "Hypnosetherapie bei Schlafproblemen, Einschlafstörungen und innerer Unruhe.",
    },
    {
      name: "Selbstbewusstsein stärken",
      description:
        "Mit Hypnose das Selbstbewusstsein aufbauen und negative Denkmuster durchbrechen.",
    },
    {
      name: "Sporthypnose",
      description:
        "Mentale Stärke für Sportler. Leistungsblockaden lösen und Fokus verbessern.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@id": "https://www.hypnose-enza.ch/#business",
        },
        areaServed: {
          "@type": "Country",
          name: "Schweiz",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FAQJsonLd() {
  const faqs = [
    {
      question: "Was kostet eine Hypnosetherapie-Sitzung?",
      answer:
        "Eine Sitzung kostet CHF 150 pro Stunde. Die Erstsitzung inkl. Anamnese dauert ca. 1.5-2 Stunden, Folgesitzungen ca. 1-1.5 Stunden. Für Kinder, Jugendliche, Studierende, IV-Bezüger und Pensionierte gibt es 20% Ermässigung.",
    },
    {
      question: "Werden Hausbesuche angeboten?",
      answer:
        "Ja, Hausbesuche sind möglich. Die Anfahrtskosten betragen CHF 1.50 pro Kilometer.",
    },
    {
      question: "Wird Hypnosetherapie von der Krankenkasse bezahlt?",
      answer:
        "Hypnosetherapie ist in der Schweiz noch nicht von allen Krankenkassen anerkannt. Die EGK beteiligt sich bereits an den Kosten. Bitte erkundigen Sie sich bei Ihrer Krankenkasse.",
    },
    {
      question: "Für wen ist Hypnosetherapie geeignet?",
      answer:
        "Hypnosetherapie eignet sich für Erwachsene, Kinder, Jugendliche, Eltern und Senioren. Sie hilft bei Ängsten, Phobien, Stress, Burnout, Raucherentwöhnung, Gewichtsproblemen, Schlafstörungen und vielem mehr.",
    },
    {
      question: "Gibt es ein kostenloses Erstgespräch?",
      answer:
        "Ja, ein 15-minütiges telefonisches Kennenlerngespräch ist kostenlos und unverbindlich.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.hypnose-enza.ch/#website",
    url: "https://www.hypnose-enza.ch",
    name: "Hypnose Enza",
    description: "Professionelle Hypnosetherapie in Bern und der Schweiz",
    publisher: {
      "@id": "https://www.hypnose-enza.ch/#business",
    },
    inLanguage: "de-CH",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Alle JSON-LD Komponenten zusammen
export default function JsonLdSchemas() {
  return (
    <>
      <WebsiteJsonLd />
      <LocalBusinessJsonLd />
      <PersonJsonLd />
      <ServicesJsonLd />
      <FAQJsonLd />
    </>
  );
}

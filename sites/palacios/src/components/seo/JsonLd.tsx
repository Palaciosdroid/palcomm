// Strukturierte Daten (schema.org) für die Suchmaschinen.
//
// Alles wird aus dem Content erzeugt — beim Aufsetzen einer neuen Seite ist
// hier nichts anzupassen. Einzige Ausnahme ist der Geschäftstyp in der
// Site-Config, falls "LocalBusiness" zu unspezifisch ist.

import type { SiteContent } from "@/types/content";
import { siteUrl, siteConfig } from "@/lib/site-config";

function jsonLd(data: unknown) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function postalAddress(content: SiteContent) {
  const { address } = content.business;
  // "8001 Zürich" → PLZ und Ort trennen
  const match = address.city.match(/^(\d{4,5})\s+(.*)$/);

  return {
    "@type": "PostalAddress",
    streetAddress: address.street || undefined,
    postalCode: match ? match[1] : undefined,
    addressLocality: match ? match[2] : address.city,
    addressCountry: address.country === "Schweiz" ? "CH" : address.country,
  };
}

export default function JsonLdSchemas({ content }: { content: SiteContent }) {
  const { business, services, testimonials, seo } = content;
  const businessId = `${siteUrl}/#business`;

  const ratings = testimonials.testimonials.filter((t) => t.rating > 0);
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, t) => sum + t.rating, 0) / ratings.length
      : null;

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: business.name,
    description: seo.description,
    publisher: { "@id": businessId },
    inLanguage: siteConfig.locale,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: business.name,
    description: seo.description,
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    address: postalAddress(content),
    image: `${siteUrl}${content.welcome.image}`,
    ...(averageRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: averageRating.toFixed(1),
            reviewCount: String(ratings.length),
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: business.fullName,
    jobTitle: business.tagline,
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    address: postalAddress(content),
    worksFor: { "@id": businessId },
  };

  const serviceList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.topics.map((topic, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: topic.title,
        description: topic.description,
        provider: { "@id": businessId },
      },
    })),
  };

  return (
    <>
      {jsonLd(website)}
      {jsonLd(localBusiness)}
      {jsonLd(person)}
      {jsonLd(serviceList)}
    </>
  );
}

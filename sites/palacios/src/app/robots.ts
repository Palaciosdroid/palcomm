import { MetadataRoute } from "next";
import { siteUrl, istVorschau } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  // Auf einer Vorschau-Adresse (*.up.railway.app) darf nichts indexiert
  // werden. Sonst steht dieselbe Seite zweimal in der Suche und macht der
  // echten Domain Konkurrenz.
  if (istVorschau) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/builder", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

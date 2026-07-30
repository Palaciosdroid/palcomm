import type { NextConfig } from "next";
import { siteConfig } from "./src/lib/site-config";

const nextConfig: NextConfig = {
  async redirects() {
    // Nackte Domain auf www umleiten, damit es die Seite nur unter einer
    // Adresse gibt. Greift nur, wenn die Seite tatsächlich unter www läuft.
    if (!siteConfig.useWww) return [];

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: siteConfig.domain }],
        destination: `https://www.${siteConfig.domain}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

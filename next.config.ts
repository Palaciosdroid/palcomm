import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "hypnose-enza.ch",
          },
        ],
        destination: "https://www.hypnose-enza.ch/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Hypnose Tipps & Wissen",
  description:
    "Blog über Hypnosetherapie: Tipps, Wissenswertes und Einblicke rund um Hypnose, Stressbewältigung, Ängste und Wohlbefinden von Hypnosetherapeutin Enza Gasser-Fiorini.",
  keywords: [
    "Hypnose Blog",
    "Hypnosetherapie Wissen",
    "Hypnose Tipps",
    "Stressbewältigung Tipps",
    "Angst überwinden",
    "Hypnose Erfahrungen",
  ],
  openGraph: {
    title: "Blog | Hypnose Enza",
    description:
      "Tipps, Wissenswertes und Einblicke rund um Hypnose und Wohlbefinden.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

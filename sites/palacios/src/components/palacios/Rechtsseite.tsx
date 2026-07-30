import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Kopf from "./Kopf";
import Fusszeile from "./Fusszeile";

/** Rahmen für Impressum und Datenschutzerklärung — reiner Fliesstext. */
export default function Rechtsseite({
  titel,
  stand,
  children,
}: {
  titel: string;
  stand: string;
  children: ReactNode;
}) {
  return (
    <>
      <Kopf />

      <main className="bg-base-50 px-6 pb-24 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-brand transition-colors hover:text-brand-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Startseite
          </Link>

          <h1 className="text-4xl leading-tight text-text-dark md:text-5xl">{titel}</h1>
          <p className="mt-3 text-sm text-text-light">Stand: {stand}</p>

          <div className="mt-12 space-y-10 leading-relaxed text-text-medium">{children}</div>
        </div>
      </main>

      <Fusszeile />
    </>
  );
}

/** Abschnitt innerhalb einer Rechtsseite. */
export function Rechtsabschnitt({
  titel,
  children,
}: {
  titel: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-medium text-text-dark">{titel}</h2>
      {children}
    </section>
  );
}

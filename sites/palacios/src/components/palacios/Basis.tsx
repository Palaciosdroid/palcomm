import type { ReactNode } from "react";

/** Abschnitt mit einheitlichem Rhythmus. `flaeche` setzt den Hintergrund. */
export function Abschnitt({
  id,
  flaeche = "hell",
  children,
}: {
  id?: string;
  flaeche?: "hell" | "getoent" | "dunkel";
  children: ReactNode;
}) {
  const hintergrund = {
    hell: "bg-base-50",
    getoent: "bg-base-200",
    dunkel: "bg-text-dark text-base-50",
  }[flaeche];

  return (
    <section
      id={id}
      // scroll-mt: Die Kopfzeile steht fest über der Seite. Ohne diesen
      // Abstand landet ein Sprungziel dahinter und die Überschrift fehlt.
      className={`${hintergrund} scroll-mt-24 px-6 py-20 md:px-8 md:py-28`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

export function Ueberschrift({
  kicker,
  children,
  lead,
  hell = false,
}: {
  kicker?: string;
  children: ReactNode;
  lead?: string;
  hell?: boolean;
}) {
  return (
    <header className="mb-12 max-w-2xl">
      {kicker && (
        <p
          className={`mb-3 text-sm font-medium uppercase tracking-[0.16em] ${
            hell ? "text-brand-light" : "text-brand"
          }`}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`text-3xl leading-tight md:text-4xl ${
          hell ? "text-base-50" : "text-text-dark"
        }`}
      >
        {children}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            hell ? "text-base-300" : "text-text-medium"
          }`}
        >
          {lead}
        </p>
      )}
    </header>
  );
}

export function Knopf({
  href,
  children,
  variante = "voll",
}: {
  href: string;
  children: ReactNode;
  variante?: "voll" | "rand" | "hell";
}) {
  const stil = {
    voll: "bg-brand text-white hover:bg-brand-dark",
    rand: "border border-brand text-brand hover:bg-brand hover:text-white",
    hell: "bg-base-50 text-text-dark hover:bg-base-200",
  }[variante];

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-medium transition-colors ${stil}`}
    >
      {children}
    </a>
  );
}

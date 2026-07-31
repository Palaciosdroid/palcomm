import Link from "next/link";
import { palacios } from "@/lib/palacios-content";

export default function Fusszeile() {
  const { firma, footer } = palacios;

  return (
    <footer className="bg-text-dark px-6 py-14 text-base-300 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="font-serif text-lg tracking-[0.18em] text-base-50">PALACIOS</p>
          <p className="text-[0.65rem] tracking-[0.3em]">COMMUNICATIONS</p>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            {firma.rechtsform}
            <br />
            {firma.strasse}
            <br />
            {firma.ort}
            <br />
            {firma.oeffnungszeiten}
          </address>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {footer.links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-base-50">
              {link.name}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-2 text-sm">
          {footer.social.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-base-50"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/*
        Kein Notfallhinweis auf dieser Seite. Er gehört auf die Kundenseiten,
        wo jemand in einer Krise landen kann — dort erzwingt ihn das Template.
        Hier sucht niemand die 143; wir verkaufen Websites.
      */}
      <p className="mx-auto mt-10 max-w-5xl border-t border-white/10 pt-6 text-xs">
        © {new Date().getFullYear()} {firma.rechtsform} · {firma.uid}
      </p>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { palacios } from "@/lib/palacios-content";

export default function Kopf() {
  const [gescrollt, setGescrollt] = useState(false);
  const [menuOffen, setMenuOffen] = useState(false);

  useEffect(() => {
    const beiScroll = () => setGescrollt(window.scrollY > 24);
    window.addEventListener("scroll", beiScroll, { passive: true });
    return () => window.removeEventListener("scroll", beiScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          gescrollt || menuOffen
            ? "bg-base-50/95 shadow-sm backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-8">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-[0.18em] text-text-dark">
              PALACIOS
            </span>
            <span className="mt-0.5 text-[0.65rem] tracking-[0.3em] text-text-light">
              COMMUNICATIONS
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {palacios.navigation.map((eintrag) => (
              <Link
                key={eintrag.href}
                href={eintrag.href}
                className="text-sm text-text-medium transition-colors hover:text-brand"
              >
                {eintrag.name}
              </Link>
            ))}
            {/* Zugang für bestehende Kund/innen. Noch nicht verlinkt — der
                Bereich entsteht erst; ein Link ins Leere wäre schlimmer. */}
            <span className="flex cursor-not-allowed items-center gap-1.5 text-sm text-text-light">
              <User className="h-4 w-4" />
              Login
            </span>
            <Link
              href="/angebot"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              Angebot zusammenstellen
            </Link>
          </nav>

          <button
            onClick={() => setMenuOffen(!menuOffen)}
            className="p-2 text-text-dark md:hidden"
            aria-label={menuOffen ? "Menü schliessen" : "Menü öffnen"}
            aria-expanded={menuOffen}
          >
            {menuOffen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {menuOffen && (
        <div className="fixed inset-0 z-40 bg-base-50 pt-24 md:hidden">
          <nav className="flex flex-col gap-2 px-8">
            {palacios.navigation.map((eintrag) => (
              <Link
                key={eintrag.href}
                href={eintrag.href}
                onClick={() => setMenuOffen(false)}
                className="border-b border-base-300 py-4 text-xl text-text-dark"
              >
                {eintrag.name}
              </Link>
            ))}
            <Link
              href="/angebot"
              onClick={() => setMenuOffen(false)}
              className="mt-6 rounded-full bg-brand px-6 py-4 text-center font-medium text-white"
            >
              Angebot zusammenstellen
            </Link>
            <span className="mt-4 flex items-center justify-center gap-2 text-text-light">
              <User className="h-4 w-4" />
              Login — folgt
            </span>
          </nav>
        </div>
      )}
    </>
  );
}

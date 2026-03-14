"use client";

/**
 * Header sticky — transparent en haut, fond navy au scroll.
 * Logo · Nav · CTA « Demander un devis » · Menu mobile hamburger.
 * CDC v1.4 — hauteur 70px, sticky après 30px.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const DEVIS_URL =
  process.env.NEXT_PUBLIC_DEVIS_URL || "https://devis.yehiortech.com";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/carriere", label: "Carrière" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 h-[70px] transition-all duration-300 ${
        scrolled ? "bg-navy shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-syne text-xl font-bold tracking-tight text-white"
          aria-label="YEHI OR Tech — Accueil"
        >
          YEHI OR Tech
        </Link>

        {/* Navigation desktop */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigation principale"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-syne text-sm font-medium text-white/90 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Button
            asChild
            variant="primary"
            className="shadow-gold-cta"
          >
            <a
              href={DEVIS_URL}
              target={DEVIS_URL.startsWith("http") ? "_blank" : undefined}
              rel={DEVIS_URL.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              Demander un devis
            </a>
          </Button>
        </div>

        {/* Bouton hamburger mobile */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Panneau mobile */}
      <div
        className={`absolute left-0 right-0 top-[70px] bg-navy transition-all duration-300 md:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav
          className="flex flex-col border-t border-white/10 px-4 py-4"
          aria-label="Navigation mobile"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-white/10 py-3 font-syne text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4">
            <Button asChild variant="primary" className="w-full shadow-gold-cta">
              <a
                href={DEVIS_URL}
                target={DEVIS_URL.startsWith("http") ? "_blank" : undefined}
                rel={DEVIS_URL.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                Demander un devis
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

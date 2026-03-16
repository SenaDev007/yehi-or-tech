"use client";

/**
 * Header sticky — logo, nav, CTA.
 * CDC v1.4 — logo YEHI OR, header-background.jpg quand scrolled.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

const DEVIS_URL =
  process.env.NEXT_PUBLIC_DEVIS_URL || "/devis";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/carriere", label: "Carrière" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "À propos" },
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
        scrolled ? "shadow-md" : ""
      }`}
      style={
        scrolled
          ? { backgroundImage: `url(${IMAGES.ui.headerBg})`, backgroundSize: "cover", backgroundPosition: "center" }
          : { backgroundColor: "rgba(13, 46, 140, 0.92)" }
      }
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="relative flex min-w-0 flex-shrink items-center gap-1.5 sm:gap-2"
          aria-label="YEHI OR Tech — Accueil"
        >
          <Image
            src={IMAGES.ui.logo}
            alt=""
            width={140}
            height={40}
            className="h-7 w-auto min-w-0 object-contain object-left sm:h-8 md:h-9"
            priority
          />
          <span className="hidden truncate font-syne text-base font-semibold text-white sm:inline sm:text-lg md:text-xl">YEHI OR Tech</span>
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
              className="font-syne text-sm font-medium text-white transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            variant="outline"
            className="min-h-[36px] border-white text-white hover:bg-white hover:text-navy"
          >
            <a href="/admin/login" title="Backoffice">
              Backoffice
            </a>
          </Button>
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex md:items-center md:gap-3">
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
        className={`absolute left-0 right-0 top-[70px] bg-navy transition-all duration-300 md:hidden max-h-[calc(100vh-70px)] overflow-y-auto ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav
          className="flex flex-col border-t border-white/10 px-4 py-4 pb-[env(safe-area-inset-bottom,0)]"
          aria-label="Navigation mobile"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-white/10 py-3.5 min-h-[44px] flex items-center font-syne text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="outline" className="mt-4 w-full min-h-[44px] border-white text-white hover:bg-white hover:text-navy">
            <a
              href="/admin/login"
              onClick={() => setMobileOpen(false)}
              title="Backoffice"
            >
              Backoffice
            </a>
          </Button>
          <div className="mt-4">
            <Button asChild variant="primary" className="w-full min-h-[44px] shadow-gold-cta">
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

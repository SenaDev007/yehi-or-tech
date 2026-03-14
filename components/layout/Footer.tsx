/**
 * Footer — 4 colonnes, fond dark-bg.
 * Logo · Slogan · Liens · Coordonnées · Réseaux · Mentions.
 * CDC v1.4
 */

import Link from "next/link";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/carriere", label: "Carrière" },
  { href: "/contact", label: "Contact" },
];

const WHATSAPP_NUMBER = "22941360803";
const FACEBOOK_HANDLE = "yehiortech";

export default function Footer() {
  return (
    <footer className="bg-dark-bg">
      {/* Séparateur dégradé or */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Colonne 1 — Logo + Slogan */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-syne text-xl font-bold text-white"
              aria-label="YEHI OR Tech — Accueil"
            >
              YEHI OR Tech
            </Link>
            <p className="mt-2 text-sm italic text-gold">
              Des idées lumineuses, des solutions encore plus brillantes.
            </p>
          </div>

          {/* Colonne 2 — Liens rapides */}
          <div>
            <h3 className="font-syne text-sm font-semibold uppercase tracking-wide text-white">
              Liens rapides
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Coordonnées */}
          <div>
            <h3 className="font-syne text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Bèyarou, Parakou — Bénin</li>
              <li>
                <a
                  href="tel:+2290141360803"
                  className="transition hover:text-white"
                >
                  +229 01 41 36 08 03
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@yehiortech.com"
                  className="transition hover:text-white"
                >
                  contact@yehiortech.com
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 — Réseaux sociaux */}
          <div>
            <h3 className="font-syne text-sm font-semibold uppercase tracking-wide text-white">
              Suivez-nous
            </h3>
            <div className="mt-4 flex gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-gold"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href={`https://www.facebook.com/${FACEBOOK_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-gold"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/yehiortech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/yehiortech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-gold"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page — Mentions + Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-white/40">
            <Link href="/mentions" className="transition hover:text-white/70">
              Mentions légales
            </Link>
            <Link
              href="/mentions#confidentialite"
              className="transition hover:text-white/70"
            >
              Politique de confidentialité
            </Link>
          </div>
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} YEHI OR Tech. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

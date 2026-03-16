/**
 * Footer — 4 colonnes, logo, fond image.
 * CDC v1.4 — footer-background.jpg
 */

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { IMAGES } from "@/lib/images";

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
const FACEBOOK_URL = "https://www.facebook.com/yehiortec/";

export default function Footer() {
  return (
    <footer
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${IMAGES.ui.footerBg})` }}
    >
      {/* Séparateur dégradé or */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Colonne 1 — Logo + Slogan */}
          <div className="sm:col-span-2 lg:col-span-1 min-w-0">
            <Link
              href="/"
              className="inline-flex flex-wrap items-center gap-2"
              aria-label="YEHI OR Tech — Accueil"
            >
              <Image
                src={IMAGES.ui.logo}
                alt=""
                width={160}
                height={48}
                className="h-9 w-auto object-contain object-left sm:h-10"
              />
              <span className="font-syne text-base font-semibold text-black sm:text-lg md:text-xl">YEHI OR Tech</span>
            </Link>
            <p className="mt-2 text-xs sm:text-sm italic text-gold">
              Des idées lumineuses, des solutions encore plus brillantes.
            </p>
          </div>

          {/* Colonne 2 — Liens rapides */}
          <div>
            <h3 className="font-syne text-xs sm:text-sm font-semibold uppercase tracking-wide text-black">
              Liens rapides
            </h3>
            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-black/80 transition hover:text-gold py-1 inline-flex items-center min-h-[44px] sm:min-h-0 sm:py-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Coordonnées */}
          <div>
            <h3 className="font-syne text-sm font-semibold uppercase tracking-wide text-black">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-black/80">
              <li>Bèyarou, Parakou — Bénin</li>
              <li>
                <a
                  href="tel:+22941360803"
                  className="transition hover:text-gold inline-flex items-center py-1 min-h-[44px] sm:min-h-0 sm:py-0"
                >
                  +229 41 36 08 03
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@yehiortech.com"
                  className="transition hover:text-gold break-all inline-flex items-center py-1 min-h-[44px] sm:min-h-0 sm:py-0"
                >
                  contact@yehiortech.com
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 — Réseaux sociaux */}
          <div>
            <h3 className="font-syne text-sm font-semibold uppercase tracking-wide text-black">
              Suivez-nous
            </h3>
            <div className="mt-4 flex gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 transition hover:text-gold p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-black/5"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 transition hover:text-gold p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-black/5"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href="https://www.instagram.com/yehiortech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 transition hover:text-gold p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-black/5"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/yehiortech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 transition hover:text-gold p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-black/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page — Mentions + Copyright */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 sm:pt-8 sm:flex-row">
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1 text-xs sm:text-sm text-black/60">
            <Link href="/mentions" className="transition hover:text-gold py-1 min-h-[44px] flex items-center sm:min-h-0 sm:py-0">
              Mentions légales
            </Link>
            <Link
              href="/mentions#confidentialite"
              className="transition hover:text-gold py-1 min-h-[44px] flex items-center sm:min-h-0 sm:py-0"
            >
              Politique de confidentialité
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-black/60 text-center sm:text-left">
            © {new Date().getFullYear()} YEHI OR Tech. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

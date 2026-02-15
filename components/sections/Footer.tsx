import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import { getContactPhoneCall, getWhatsAppUrl } from "@/lib/contact";

const footerLinks = {
  entreprise: [
    { href: "/entreprise", label: "Qui sommes-nous" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services/it", label: "Informatique & IT" },
    { href: "/services/developpement", label: "Développement" },
    { href: "/services/cloud", label: "Cloud & Hébergement" },
    { href: "/services/design", label: "Design & Impression" },
    { href: "/services/ia", label: "Intelligence Artificielle" },
  ],
  ressources: [
    { href: "/solutions", label: "Solutions" },
    { href: "/innovation", label: "Innovation" },
    { href: "/realisations", label: "Réalisations" },
    { href: "/blog", label: "Blog" },
  ],
};

export function Footer() {
  const phoneCall = getContactPhoneCall();
  const whatsAppUrl = getWhatsAppUrl();
  const showContact = phoneCall || whatsAppUrl;

  return (
    <footer className="border-t border-white/10 bg-primary-dark">
      <div className="section-container py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/logo-yehi-or-tech.png`}
                alt="YEHI OR Tech"
                width={120}
                height={38}
                className="h-7 w-auto object-contain sm:h-8"
              />
            </Link>
            <p className="mt-3 text-sm text-neutral-gray">
              Des idées lumineuses, des solutions encore plus brillantes.
            </p>
            {showContact && (
              <div className="mt-4 flex flex-wrap gap-3">
                {phoneCall && (
                  <a
                    href={`tel:${phoneCall.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-1.5 text-sm text-neutral-gray-light transition-colors hover:text-accent-electric"
                  >
                    <Phone className="h-4 w-4" />
                    Appeler
                  </a>
                )}
                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-neutral-gray-light transition-colors hover:text-accent-electric"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-gray-light">
              Entreprise
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.entreprise.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-gray transition-colors hover:text-neutral-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-gray-light">
              Services
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-gray transition-colors hover:text-neutral-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-gray-light">
              Ressources
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-gray transition-colors hover:text-neutral-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-neutral-gray sm:mt-12 sm:pt-8 sm:text-sm">
          © {new Date().getFullYear()} YEHI OR Tech. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

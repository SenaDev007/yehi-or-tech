import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { HeroImage } from "@/components/ui/HeroImage";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact | YEHI OR Tech",
  description:
    "Contactez YEHI OR Tech à Parakou. Formulaire, téléphone, email et WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <HeroImage src={IMAGES.contact.heroBg} height="h-48 sm:h-56 md:h-64" overlayOpacity={72} priority>
        <div className="mx-auto max-w-6xl w-full px-4 text-center">
          <h1 className="font-syne text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Contact
          </h1>
          <p className="mt-3 sm:mt-4 text-base text-white/85 sm:text-lg">
            Une question, un projet ? Écrivez-nous ou appelez-nous.
          </p>
        </div>
      </HeroImage>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid gap-8 sm:gap-12 grid-cols-1 lg:grid-cols-2">
          <div className="min-w-0">
            <h2 className="font-syne text-lg sm:text-xl font-semibold text-navy">
              Envoyez-nous un message
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray">
              Remplissez le formulaire ci-dessous. Nous répondons sous 24h ouvrées.
            </p>
            <div className="mt-6 sm:mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="font-syne text-lg sm:text-xl font-semibold text-navy">
              Coordonnées
            </h2>
            <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                <span className="text-sm sm:text-base text-gray">
                  Bèyarou, Parakou — Bénin
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                <a href="https://wa.me/22941360803" className="text-blue hover:underline text-sm sm:text-base inline-flex items-center min-h-[44px] sm:min-h-0">
                  +229 41 36 08 03 (WhatsApp Business)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-gold mt-0.5" />
                <a href="mailto:contact@yehiortech.com" className="text-blue hover:underline break-all text-sm sm:text-base inline-flex items-center min-h-[44px] sm:min-h-0">
                  contact@yehiortech.com
                </a>
              </li>
            </ul>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray">
              Lundi – Samedi : 07h00 – 20h00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

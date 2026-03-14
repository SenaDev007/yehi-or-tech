import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | YEHI OR Tech",
  description:
    "Contactez YEHI OR Tech à Parakou. Formulaire, téléphone, email et WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-syne text-3xl font-bold text-white md:text-5xl">
            Contact
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Une question, un projet ? Écrivez-nous ou appelez-nous.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-syne text-xl font-semibold text-navy">
              Envoyez-nous un message
            </h2>
            <p className="mt-2 text-gray">
              Remplissez le formulaire ci-dessous. Nous répondons sous 24h ouvrées.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="font-syne text-xl font-semibold text-navy">
              Coordonnées
            </h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-gold" />
                <span className="text-gray">
                  Bèyarou, Parakou — Bénin
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-gold" />
                <a href="https://wa.me/22941360803" className="text-blue hover:underline">
                  +229 01 41 36 08 03 / WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-gold" />
                <a href="mailto:contact@yehiortech.com" className="text-blue hover:underline">
                  contact@yehiortech.com
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-gray">
              Lundi – Samedi : 07h00 – 20h00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

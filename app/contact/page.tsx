import { SectionTitle } from "@/components/sections/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { getContactPhoneCall, getWhatsAppUrl } from "@/lib/contact";
import { Phone, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact | YEHI OR Tech",
  description:
    "Contactez YEHI OR Tech pour votre projet technologique. Formulaire de demande et informations.",
};

export default function ContactPage() {
  const phoneCall = getContactPhoneCall();
  const whatsAppUrl = getWhatsAppUrl();

  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Parlons de votre projet
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-gray-light text-sm sm:mt-4 sm:text-base">
            Vous souhaitez mettre en place une solution ou obtenir des informations ?
            Remplissez le formulaire et nous vous répondrons rapidement.
          </p>
          {(phoneCall || whatsAppUrl) && (
            <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-4">
              {phoneCall && (
                <a
                  href={`tel:${phoneCall.replace(/\s/g, "")}`}
                  className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-neutral-gray-light transition-colors hover:border-accent-electric/50 hover:text-neutral-white"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span className="break-all">{phoneCall}</span>
                </a>
              )}
              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-neutral-gray-light transition-colors hover:border-accent-electric/50 hover:text-neutral-white"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhatsApp Business
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section-container py-12 sm:py-16 md:py-20">
        <div className="mx-auto w-full max-w-xl px-0">
          <ContactForm />
          <p className="mt-6 text-center text-sm text-neutral-gray">
            Nous étudions chaque demande avec attention afin de proposer une solution réellement adaptée.
          </p>
        </div>
      </section>
    </>
  );
}

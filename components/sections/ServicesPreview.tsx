"use client";

/**
 * Aperçu services — grille 4 cartes phares avec prix de départ + CTA.
 * CDC v1.4 — Branding, Web, E-commerce, Impression.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, Globe, ShoppingCart, Printer } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SERVICES = [
  {
    slug: "creation-logo",
    nom: "Branding & Logo",
    icone: PenTool,
    prixDepart: "25 000",
    desc: "Identité de marque et logos professionnels.",
  },
  {
    slug: "site-vitrine",
    nom: "Site Web",
    icone: Globe,
    prixDepart: "80 000",
    desc: "Sites vitrines et sur-mesure.",
  },
  {
    slug: "e-commerce",
    nom: "E-commerce",
    icone: ShoppingCart,
    prixDepart: "200 000",
    desc: "Boutiques en ligne avec MoMo & Flooz.",
  },
  {
    slug: "impression",
    nom: "Impression",
    icone: Printer,
    prixDepart: "8 000",
    desc: "Cartes de visite, flyers, affiches.",
  },
];

export default function ServicesPreview() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-blue-xl/20 px-4 py-12 sm:py-16 md:py-24"
      aria-labelledby="services-preview-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="services-preview-title"
          className="font-syne text-xl font-semibold text-navy sm:text-2xl md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Nos services
        </motion.h2>
        <motion.p
          className="mt-3 max-w-2xl text-gray"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Du branding à l&apos;impression en passant par le web : des solutions claires et des tarifs transparents.
        </motion.p>

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icone;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              >
                <Card hover className="flex h-full flex-col">
                  <CardContent className="flex-1 pt-4 sm:pt-6">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gold/20 text-gold">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="mt-3 sm:mt-4 font-syne text-base sm:text-lg font-semibold text-navy">
                      {service.nom}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray">{service.desc}</p>
                    <p className="mt-4 font-syne text-sm font-semibold text-gold">
                      À partir de {service.prixDepart} FCFA
                    </p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button asChild variant="secondary" className="w-full min-h-[44px]">
                      <Link href={`/services/${service.slug}`}>
                        En savoir plus
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
            <Link href="/services">Voir tous les services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

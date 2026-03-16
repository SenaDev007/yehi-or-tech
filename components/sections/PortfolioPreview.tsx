"use client";

/**
 * Aperçu portfolio — 3 projets phares : FFA · SERMA HUB · Academia Helm.
 * CDC v1.4
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const PROJECTS = [
  {
    slug: "foncier-facile-afrique",
    titre: "Foncier Facile Afrique",
    client: "FFA",
    secteur: "Immobilier",
    desc: "Site vitrine et génération de leads pour un acteur du secteur immobilier.",
  },
  {
    slug: "serma-hub",
    titre: "SERMA HUB",
    client: "CFPEA / SERMA",
    secteur: "Institutionnel",
    desc: "Site institutionnel multi-pages avec actualités et visibilité renforcée.",
  },
  {
    slug: "academia-helm",
    titre: "Academia Helm",
    client: "Academia Helm",
    secteur: "Éducation",
    desc: "Application web SaaS pour la gestion scolaire et le suivi des élèves.",
  },
];

export default function PortfolioPreview() {
  return (
    <section
      id="portfolio-preview"
      className="scroll-mt-20 bg-blue-xl/20 px-4 py-12 sm:py-16 md:py-24"
      aria-labelledby="portfolio-preview-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="portfolio-preview-title"
          className="font-syne text-xl font-semibold text-navy sm:text-2xl md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Nos réalisations
        </motion.h2>
        <motion.p
          className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-gray"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Des projets concrets livrés pour des entreprises et institutions au Bénin et en Afrique de l&apos;Ouest.
        </motion.p>

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
            >
              <Card hover className="h-full">
                <CardContent className="pt-6">
                  <span className="font-syne text-xs font-medium uppercase tracking-wide text-gold">
                    {project.secteur}
                  </span>
                  <h3 className="mt-2 font-syne text-xl font-semibold text-navy">
                    {project.titre}
                  </h3>
                  <p className="mt-1 text-sm text-gray">{project.client}</p>
                  <p className="mt-3 text-gray">{project.desc}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={`/portfolio/${project.slug}`}>
                      Voir le projet
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
            <Link href="/portfolio">Voir tout le portfolio</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

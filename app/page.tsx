"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, CheckCircle2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/sections/Section";

const domaines = [
  "Infrastructure informatique et assistance technique",
  "Développement d'applications web et mobiles",
  "Hébergement et solutions cloud professionnelles",
  "Identité visuelle, design et impression",
  "Automatisation et intelligence artificielle",
];

const pourquoi = [
  {
    title: "Approche orientée solution",
    desc: "Nous analysons votre activité avant de proposer un outil.",
  },
  {
    title: "Technologies modernes",
    desc: "Nos solutions sont conçues pour évoluer avec votre croissance.",
  },
  {
    title: "Support et accompagnement",
    desc: "Nous restons disponibles après la livraison.",
  },
  {
    title: "Vision long terme",
    desc: "Nous construisons des systèmes durables, pas seulement des projets ponctuels.",
  },
];

const methode = [
  "Analyse de votre besoin",
  "Proposition technique adaptée",
  "Développement et validation",
  "Déploiement et formation",
  "Suivi et maintenance",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-light/40 via-primary/80 to-primary" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="section-container relative py-16 sm:py-20 md:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="mb-4 flex flex-wrap items-center gap-2 rounded-full border border-cta/40 bg-cta/15 px-3 py-2 text-xs font-medium text-cta sm:mb-5 sm:inline-flex sm:px-4 sm:text-sm">
              <Lightbulb className="h-4 w-4 shrink-0" />
              <span>Des idées lumineuses, des solutions encore plus brillantes</span>
            </p>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-neutral-white sm:text-3xl md:text-4xl lg:text-5xl lg:leading-tight">
              Solutions technologiques fiables pour entreprises et institutions
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-gray-light sm:mt-5 sm:text-lg md:text-xl">
              YEHI OR Tech conçoit et déploie votre infrastructure numérique : logiciels, cloud, IA et matériel. Des systèmes adaptés aux réalités du terrain et aux standards internationaux.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/services">
                  Découvrir nos services
                  <ArrowRight className="ml-1 h-4 w-4 shrink-0" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Demander un devis</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Présentation rapide */}
      <Section className="section-container py-20 md:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-accent-electric">
          Qui nous sommes
        </p>
        <SectionTitle
          title="Ingénierie technologique au service de votre croissance"
          subtitle="Nous concevons et maintenons des outils numériques modernes pour les organisations. De l'étude du besoin au déploiement et à la maintenance, nous rendons la technologie utile, accessible et durable."
          className="mt-2 mb-8"
        />
        <p className="max-w-2xl text-neutral-gray-light">
          Notre mission : vous accompagner avec des solutions stables et évolutives, sans complexité inutile.
        </p>
      </Section>

      {/* Domaines d'intervention */}
      <section className="border-y border-white/10 bg-primary-light/20">
        <div className="section-container py-20 md:py-24">
          <SectionTitle
            title="Domaines d'intervention"
            subtitle="Une offre complète pour couvrir vos besoins numériques."
            className="mb-12"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domaines.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-primary/40 p-5 transition-colors hover:border-white/15 hover:bg-primary/60"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-electric" />
                <span className="text-neutral-gray-light">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <Section className="section-container py-20 md:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-accent-electric">
          Notre différence
        </p>
        <SectionTitle
          title="Pourquoi nous choisir"
          subtitle="Un partenaire technologique fiable, orienté résultat et long terme."
          className="mt-2 mb-12"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {pourquoi.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-white/10 bg-primary-light/15 p-6 transition-colors hover:border-white/15 hover:bg-primary-light/25"
            >
              <h3 className="text-lg font-semibold text-neutral-white">{item.title}</h3>
              <p className="mt-2 text-neutral-gray-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Méthode de travail */}
      <section className="border-t border-white/10 bg-primary-dark/40">
        <div className="section-container py-20 md:py-24">
          <SectionTitle
            title="Notre méthode"
            subtitle="Un processus clair, de l'analyse à la maintenance."
            className="mb-12"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap">
            {methode.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex min-w-0 items-center gap-4 rounded-xl border border-white/10 bg-primary/50 px-4 py-4 sm:px-5 xl:min-w-[200px] xl:flex-1"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta/20 text-sm font-bold text-cta">
                  {i + 1}
                </span>
                <span className="text-neutral-gray-light">{step}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="section-container py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center rounded-2xl border border-accent-electric/25 bg-gradient-to-b from-primary-light/50 to-primary py-14 text-center md:py-16"
          >
            <Layers className="mb-5 h-12 w-12 text-accent-electric" />
            <h2 className="text-xl font-bold text-neutral-white sm:text-2xl md:text-3xl">
              Un projet en tête ? Modernisons votre structure ensemble.
            </h2>
            <p className="mt-3 text-neutral-gray-light">
              Échangeons sur vos besoins et les solutions adaptées.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

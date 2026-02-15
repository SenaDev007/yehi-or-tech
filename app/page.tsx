"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lightbulb,
  Server,
  Code2,
  Cloud,
  Palette,
  Bot,
  Target,
  Cpu,
  Headphones,
  Sparkles,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/sections/Section";

const domaines = [
  {
    label: "Infrastructure informatique et assistance technique",
    icon: Server,
  },
  {
    label: "Développement d&apos;applications web et mobiles",
    icon: Code2,
  },
  {
    label: "Hébergement et solutions cloud professionnelles",
    icon: Cloud,
  },
  {
    label: "Identité visuelle, design et impression",
    icon: Palette,
  },
  {
    label: "Automatisation et intelligence artificielle",
    icon: Bot,
  },
];

const pourquoi = [
  {
    title: "Approche orientée solution",
    desc: "Nous analysons votre activité avant de proposer un outil.",
    icon: Target,
  },
  {
    title: "Technologies modernes",
    desc: "Nos solutions sont conçues pour évoluer avec votre croissance.",
    icon: Cpu,
  },
  {
    title: "Support et accompagnement",
    desc: "Nous restons disponibles après la livraison.",
    icon: Headphones,
  },
  {
    title: "Vision long terme",
    desc: "Nous construisons des systèmes durables, pas seulement des projets ponctuels.",
    icon: Sparkles,
  },
];

const methode = [
  "Analyse de votre besoin",
  "Proposition technique adaptée",
  "Développement et validation",
  "Déploiement et formation",
  "Suivi et maintenance",
];

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.03 * i },
  }),
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <>
      {/* Hero — lumineux et animé */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-light/50 via-primary/90 to-primary" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cta/10 blur-[120px] animate-glow-pulse pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
        <div className="section-container relative py-20 sm:py-24 md:py-32 lg:py-40">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={item} className="mb-5 sm:mb-6">
              <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-cta/50 bg-cta/20 px-4 py-2.5 text-sm font-medium text-cta shadow-[0_0_24px_rgba(234,179,8,0.2)]">
                <Lightbulb className="h-4 w-4 shrink-0" />
                <span>Des idées lumineuses, des solutions encore plus brillantes</span>
              </p>
            </motion.div>
            <motion.h1
              variants={item}
              className="text-3xl font-bold leading-tight tracking-tight text-neutral-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-tight"
            >
              Solutions technologiques fiables pour entreprises et institutions
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-relaxed text-neutral-gray-light sm:mt-6 sm:text-xl md:text-xl"
            >
              YEHI OR Tech conçoit et déploie votre infrastructure numérique : logiciels, cloud, IA et matériel. Des systèmes adaptés aux réalités du terrain et aux standards internationaux.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <Button asChild size="lg" className="w-full sm:w-auto group">
                <Link href="/services" className="inline-flex items-center">
                  Découvrir nos services
                  <ArrowRight className="ml-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Demander un devis</Link>
              </Button>
            </motion.div>
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
          subtitle="Nous concevons et maintenons des outils numériques modernes pour les organisations. De l&apos;étude du besoin au déploiement et à la maintenance, nous rendons la technologie utile, accessible et durable."
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
            title="Domaines d&apos;intervention"
            subtitle="Une offre complète pour couvrir vos besoins numériques."
            className="mb-12"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domaines.map((d, i) => (
              <motion.li
                key={d.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-start gap-4 rounded-xl border border-white/10 bg-primary/40 p-5 transition-all hover:border-accent-electric/30 hover:bg-primary/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-electric/15 text-accent-electric transition-colors group-hover:bg-accent-electric/25">
                  <d.icon className="h-5 w-5" />
                </span>
                <span className="text-neutral-gray-light pt-0.5">{d.label}</span>
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
          {pourquoi.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 rounded-xl border border-white/10 bg-primary-light/15 p-6 transition-all hover:border-white/15 hover:bg-primary-light/25"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cta/15 text-cta">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-neutral-white">{p.title}</h3>
                <p className="mt-2 text-neutral-gray-light">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Méthode de travail */}
      <section className="border-t border-white/10 bg-primary-dark/40">
        <div className="section-container py-20 md:py-24">
          <SectionTitle
            title="Notre méthode"
            subtitle="Un processus clair, de l&apos;analyse à la maintenance."
            className="mb-12"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap">
            {methode.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 10 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hero-glow flex flex-col items-center rounded-2xl border border-accent-electric/30 bg-gradient-to-b from-primary-light/60 to-primary py-14 text-center md:py-16"
          >
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-electric/20 text-accent-electric">
              <Rocket className="h-7 w-7" />
            </span>
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

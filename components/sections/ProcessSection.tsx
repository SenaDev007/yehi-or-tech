"use client";

/**
 * Notre processus — 5 étapes : Brief · Proposition · Validation · Création · Suivi.
 * CDC v1.4 — "Comment on travaille ensemble"
 */

import { motion } from "framer-motion";
import { MessageSquare, FileText, CheckCircle, Palette, Headphones } from "lucide-react";

const STEPS = [
  {
    num: 1,
    icon: MessageSquare,
    title: "Brief",
    text: "On vous écoute et on comprend votre projet, vos objectifs et votre cible.",
  },
  {
    num: 2,
    icon: FileText,
    title: "Proposition",
    text: "Devis clair et détaillé sous 24h, sans engagement.",
  },
  {
    num: 3,
    icon: CheckCircle,
    title: "Validation",
    text: "Vous approuvez avant qu'on commence. Aucune surprise.",
  },
  {
    num: 4,
    icon: Palette,
    title: "Création",
    text: "On livre dans les délais annoncés, avec des points d'avancement réguliers.",
  },
  {
    num: 5,
    icon: Headphones,
    title: "Suivi",
    text: "On reste disponibles après livraison pour les ajustements et la formation.",
  },
];

export default function ProcessSection() {
  return (
    <section
      className="bg-white px-4 py-12 sm:py-16 md:py-24"
      aria-labelledby="process-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="process-title"
          className="font-syne text-xl font-semibold text-navy sm:text-2xl md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Comment on travaille ensemble
        </motion.h2>
        <motion.p
          className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-gray"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Un process en 5 étapes pour des livraisons sereines et un résultat à la hauteur de vos attentes.
        </motion.p>

        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              >
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute left-[calc(50%+28px)] top-6 hidden h-0.5 w-[calc(100%-56px)] bg-blue-lt lg:block"
                    aria-hidden
                  />
                )}
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-gold bg-gold/10 text-gold">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="mt-2 sm:mt-3 font-syne text-xs sm:text-sm font-semibold text-gold">
                  Étape {step.num}
                </span>
                <h3 className="mt-1 font-syne text-base sm:text-lg font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

/**
 * Bloc garantie satisfaction — juste avant CTA final.
 * CDC v1.4 — bouclier doré, message engagement.
 */

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function GuaranteeBlock() {
  return (
    <section
      className="bg-white px-4 py-10 sm:py-12 md:py-16"
      aria-labelledby="guarantee-title"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="flex flex-col items-center rounded-xl sm:rounded-2xl border-2 border-gold/30 bg-gold-lt/50 p-4 sm:p-6 md:p-8 text-center md:flex-row md:gap-8 md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
            <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <div className="min-w-0">
            <h2 id="guarantee-title" className="font-syne text-lg font-semibold text-navy sm:text-xl md:text-2xl">
              Satisfaction garantie
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray">
              Si le livrable ne correspond pas au brief validé, on retravaille sans frais supplémentaires jusqu&apos;à votre approbation. Ce n&apos;est pas de la publicité — c&apos;est un engagement contractuel mentionné dans nos CGV.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

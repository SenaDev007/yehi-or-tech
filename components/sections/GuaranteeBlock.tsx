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
      className="bg-white px-4 py-12 md:py-16"
      aria-labelledby="guarantee-title"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="flex flex-col items-center rounded-2xl border-2 border-gold/30 bg-gold-lt/50 p-8 text-center md:flex-row md:gap-8 md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h2 id="guarantee-title" className="font-syne text-xl font-semibold text-navy md:text-2xl">
              Satisfaction garantie
            </h2>
            <p className="mt-2 text-gray">
              Si le livrable ne correspond pas au brief validé, on retravaille sans frais supplémentaires jusqu&apos;à votre approbation. Ce n&apos;est pas de la publicité — c&apos;est un engagement contractuel mentionné dans nos CGV.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

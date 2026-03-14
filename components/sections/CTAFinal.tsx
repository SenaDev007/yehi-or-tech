"use client";

/**
 * CTA final — fond dégradé navy→blue, H2 fort, 2 boutons.
 * CDC v1.4
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const DEVIS_URL =
  process.env.NEXT_PUBLIC_DEVIS_URL || "https://devis.yehiortech.com";

export default function CTAFinal() {
  return (
    <section
      className="relative overflow-hidden bg-navy px-4 py-20 md:py-28"
      aria-labelledby="cta-final-title"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy via-blue/30 to-navy opacity-90"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2
          id="cta-final-title"
          className="font-syne text-3xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Prêt à donner de la lumière à votre projet ?
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-white/85"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Devis personnalisé gratuit sous 24h — sans engagement.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Button asChild variant="primary" className="shadow-gold-cta">
            <Link href="/services">Voir les tarifs</Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href={DEVIS_URL}
              target={DEVIS_URL.startsWith("http") ? "_blank" : undefined}
              rel={DEVIS_URL.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              Lancer mon projet
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

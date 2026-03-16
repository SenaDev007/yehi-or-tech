"use client";

/**
 * CTA final — image de fond + overlay, H2 fort, 2 boutons.
 * CDC v1.4
 */

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

const DEVIS_URL =
  process.env.NEXT_PUBLIC_DEVIS_URL || "/devis";

export default function CTAFinal() {
  return (
    <section
      className="relative overflow-hidden px-4 py-16 sm:py-20 md:py-28"
      aria-labelledby="cta-final-title"
    >
      <Image
        src={IMAGES.accueil.ctaFinalBg}
        alt=""
        fill
        className="object-cover object-center -z-20"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy/90 to-blue/80 -z-10"
        aria-hidden
      />
      <div className="relative z-0 mx-auto max-w-3xl text-center">
        <motion.h2
          id="cta-final-title"
          className="font-syne text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Prêt à donner de la lumière à votre projet ?
        </motion.h2>
        <motion.p
          className="mt-3 sm:mt-4 text-base text-white sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Devis personnalisé gratuit sous 24h — sans engagement.
        </motion.p>
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
            <Link href="/services">Voir les tarifs</Link>
          </Button>
          <Button asChild variant="outline" className="min-h-[44px] w-full sm:w-auto">
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

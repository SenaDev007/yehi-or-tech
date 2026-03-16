"use client";

/**
 * Pourquoi YEHI OR Tech — 3 colonnes : Expertise locale · Qualité internationale · Transparence des prix.
 * CDC v1.4 — icônes depuis /public/images.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";

const items = [
  {
    image: IMAGES.accueil.iconExpertiseLocale,
    alt: "Expertise locale",
    title: "Expertise locale",
    text: "Implantés à Parakou, nous connaissons le marché béninois et les enjeux des entreprises d'Afrique de l'Ouest. Une équipe à l'écoute et disponible.",
  },
  {
    image: IMAGES.accueil.iconQualiteInternationale,
    alt: "Qualité internationale",
    title: "Qualité internationale",
    text: "Des process et des livrables au niveau des meilleures agences. Stack moderne, design premium et suivi rigoureux pour des résultats qui durent.",
  },
  {
    image: IMAGES.accueil.iconTransparencePrix,
    alt: "Transparence des prix",
    title: "Transparence des prix",
    text: "Fourchettes affichées et simulateur de devis. Pas de mauvaises surprises : vous savez à quoi vous attendre avant de nous contacter.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function PourquoiSection() {
  return (
    <section
      id="pourquoi"
      className="scroll-mt-20 bg-white px-4 py-12 sm:py-16 md:py-24"
      aria-labelledby="pourquoi-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="pourquoi-title"
          className="font-syne text-xl font-semibold text-navy sm:text-2xl md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Pourquoi YEHI OR Tech ?
        </motion.h2>
        <motion.p
          className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-gray"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Une agence digitale premium au nord du Bénin, tournée vers la conversion et la satisfaction client.
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {items.map(({ image, alt, title, text }) => (
            <motion.div
              key={title}
              variants={item}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl border border-blue-lt bg-blue-xl/30 p-4 sm:p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-center">
                <Image
                  src={image}
                  alt={alt}
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
              </div>
              <h3 className="mt-3 sm:mt-4 font-syne text-base sm:text-lg font-semibold text-navy">
                {title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

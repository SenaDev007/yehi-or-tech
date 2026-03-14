"use client";

/**
 * Ils nous font confiance — logos clients (niveaux de gris, couleur au hover).
 * FFA · SERMA HUB · Academia Helm. CDC v1.4
 */

import { motion } from "framer-motion";

const CLIENTS = [
  { name: "Foncier Facile Afrique", short: "FFA" },
  { name: "SERMA HUB", short: "SERMA HUB" },
  { name: "Academia Helm", short: "Academia Helm" },
];

export default function ClientLogos() {
  return (
    <section
      className="bg-white px-4 py-12 md:py-16"
      aria-labelledby="client-logos-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="client-logos-title"
          className="text-center font-syne text-xl font-semibold text-navy md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Ils nous font confiance
        </motion.h2>
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-12 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {CLIENTS.map((client) => (
            <div
              key={client.short}
              className="group flex h-14 items-center justify-center rounded-lg border border-blue-lt bg-blue-xl/20 px-8 transition hover:border-gold hover:bg-gold-lt/30"
            >
              <span className="font-syne text-lg font-semibold text-gray transition group-hover:text-navy">
                {client.short}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

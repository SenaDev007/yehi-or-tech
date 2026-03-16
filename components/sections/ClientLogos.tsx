"use client";

/**
 * Ils nous font confiance — logos clients en défilement continu (marquee).
 * FFA · SERMA HUB · Academia Helm. CDC v1.4
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";

const CLIENTS = [
  { name: "Foncier Facile Afrique", short: "FFA", logo: IMAGES.clientLogos.ffa },
  { name: "SERMA HUB", short: "SERMA HUB", logo: IMAGES.clientLogos.sermaHub },
  { name: "Academia Helm", short: "Academia Helm", logo: IMAGES.clientLogos.academiaHelm },
];

export default function ClientLogos() {
  return (
    <section
      className="bg-white px-4 py-10 sm:py-12 md:py-16"
      aria-labelledby="client-logos-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="client-logos-title"
          className="text-center font-syne text-lg font-semibold text-navy sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Ils nous font confiance
        </motion.h2>
        <div className="mt-6 sm:mt-8 max-w-[280px] sm:max-w-xl md:max-w-2xl mx-auto overflow-hidden" aria-hidden>
          <div className="client-logos-marquee flex w-max items-center gap-8 sm:gap-12 md:gap-20">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div
                key={`${client.short}-${i}`}
                className="flex shrink-0 items-center justify-center"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={220}
                  height={72}
                  className="h-10 w-auto object-contain sm:h-14 md:h-20 md:max-w-[220px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

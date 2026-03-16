"use client";

/**
 * Chiffres & preuves sociales — 4 compteurs animés au scroll.
 * CDC v1.4 — background image + overlay.
 */

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, FolderKanban, Calendar, Layers } from "lucide-react";
import { IMAGES } from "@/lib/images";

const STATS = [
  { value: 50, suffix: "+", label: "Clients satisfaits", icon: Users },
  { value: 80, suffix: "+", label: "Projets livrés", icon: FolderKanban },
  { value: 3, suffix: "", label: "Années d'expertise", icon: Calendar },
  { value: 25, suffix: "", label: "Services proposés", icon: Layers },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = value / (duration / 16);
    let current = 0;
    const t = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(t);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative px-4 py-12 sm:py-16 md:py-24 overflow-hidden"
      aria-labelledby="stats-title"
    >
      <Image
        src={IMAGES.accueil.statsBg}
        alt=""
        fill
        className="object-cover object-center -z-20"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/80 -z-10" aria-hidden />
      <div className="relative z-0 mx-auto max-w-6xl">
        <motion.h2
          id="stats-title"
          className="text-center font-syne text-xl font-semibold text-white sm:text-2xl md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Chiffres & preuves
        </motion.h2>

        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 font-syne text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </p>
                <p className="mt-1 text-xs sm:text-sm text-white">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

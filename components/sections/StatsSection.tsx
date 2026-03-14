"use client";

/**
 * Chiffres & preuves sociales — 4 compteurs animés au scroll.
 * CDC v1.4 : 50+ clients · 80+ projets · 3 ans · 25 services.
 */

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, FolderKanban, Calendar, Layers } from "lucide-react";

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
      className="bg-navy px-4 py-16 md:py-24"
      aria-labelledby="stats-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="stats-title"
          className="text-center font-syne text-2xl font-semibold text-white md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Chiffres & preuves
        </motion.h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <p className="mt-4 font-syne text-3xl font-bold text-white md:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </p>
                <p className="mt-1 text-sm text-white/80">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

/**
 * Témoignages clients — carousel avec photo, nom, poste, texte, étoiles.
 * CDC v1.4 — fond bleu nuit, dots dorés, autoplay 5s.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Stars } from "@/components/ui/Stars";

const TESTIMONIALS = [
  {
    id: 1,
    prenom: "Jean",
    nom: "D.",
    poste: "Directeur",
    entreprise: "Foncier Facile Afrique",
    texte: "Une équipe réactive et professionnelle. Notre site reflète enfin notre positionnement et génère des demandes qualifiées.",
    note: 5,
  },
  {
    id: 2,
    prenom: "Marie",
    nom: "K.",
    poste: "Responsable communication",
    entreprise: "SERMA HUB",
    texte: "Livraison dans les délais, écoute et conseils pertinents. Nous recommandons YEHI OR Tech sans hésitation.",
    note: 5,
  },
  {
    id: 3,
    prenom: "Paul",
    nom: "A.",
    poste: "Fondateur",
    entreprise: "Academia Helm",
    texte: "L'application répond exactement à nos besoins. Un partenaire de confiance pour la digitalisation.",
    note: 5,
  },
];

const DURATION = 5000;

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, DURATION);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section
      className="bg-navy px-4 py-16 md:py-24"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-4xl">
        <motion.h2
          id="testimonials-title"
          className="text-center font-syne text-2xl font-semibold text-white md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Témoignages clients
        </motion.h2>

        <motion.div
          className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="min-h-[200px] flex-1 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Stars note={t.note} className="justify-center" />
                  <blockquote className="mt-4 text-lg text-white md:text-xl">
                    &ldquo;{t.texte}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full border-2 border-gold bg-navy" />
                    <cite className="mt-2 not-italic font-syne font-semibold text-white">
                      {t.prenom} {t.nom}
                    </cite>
                    <p className="text-sm text-white/80">
                      {t.poste} — {t.entreprise}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
              className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition ${
                  i === index ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

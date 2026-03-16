"use client";

/**
 * Témoignages clients — carousel avec photo, nom, poste, texte, étoiles.
 * Données depuis le backoffice (admin/temoignages) ou fallback statique.
 */

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Stars } from "@/components/ui/Stars";
import { IMAGES } from "@/lib/images";
import type { TemoignagePublic } from "@/lib/temoignages";

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    photo: IMAGES.accueil.testimonialMoussa,
    prenom: "Moussa",
    nom: "K.",
    poste: "Directeur",
    entreprise: "Cabinet Juridique",
    texte: "Une équipe réactive et professionnelle. Notre site reflète enfin notre positionnement et génère des demandes qualifiées.",
    note: 5,
  },
  {
    id: 2,
    photo: IMAGES.accueil.testimonialAicha,
    prenom: "Aïcha",
    nom: "T.",
    poste: "Gérante",
    entreprise: "Boutique Mode Parakou",
    texte: "Livraison dans les délais, écoute et conseils pertinents. Nous recommandons YEHI OR Tech sans hésitation.",
    note: 5,
  },
  {
    id: 3,
    photo: IMAGES.accueil.testimonialKofi,
    prenom: "Dr. Kofi",
    nom: "A.",
    poste: "Médecin",
    entreprise: "Clinique Abomey-Calavi",
    texte: "L'application répond exactement à nos besoins. Un partenaire de confiance pour la digitalisation.",
    note: 5,
  },
];

const DURATION = 5000;

type TestimonialItem = {
  id: number;
  photo: string;
  prenom: string;
  nom: string;
  poste: string;
  entreprise: string;
  texte: string;
  note: number;
};

export default function TestimonialsSection({
  temoignages = [],
}: {
  temoignages?: TemoignagePublic[];
}) {
  const [index, setIndex] = useState(0);

  const testimonials: TestimonialItem[] = useMemo(() => {
    if (temoignages.length === 0) return FALLBACK_TESTIMONIALS;
    return temoignages.map((x) => ({
      id: x.id,
      photo: x.photo && x.photo.startsWith("/") ? x.photo : IMAGES.accueil.testimonialMoussa,
      prenom: x.prenom,
      nom: x.nom,
      poste: x.poste,
      entreprise: x.entreprise,
      texte: x.texte,
      note: x.note,
    }));
  }, [temoignages]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, DURATION);
    return () => clearInterval(t);
  }, [testimonials.length]);

  const t = testimonials[index];
  if (!t) return null;

  return (
    <section
      className="bg-navy px-4 py-12 sm:py-16 md:py-24"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-4xl">
        <motion.h2
          id="testimonials-title"
          className="text-center font-syne text-xl font-semibold text-white sm:text-2xl md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Témoignages clients
        </motion.h2>

        <motion.div
          className="relative mt-8 sm:mt-12 overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 md:p-12 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="min-h-[180px] sm:min-h-[200px] flex-1 text-center px-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Stars note={t.note} className="justify-center" />
                  <blockquote className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white">
                    &ldquo;{t.texte}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex flex-col items-center">
                    <Image
                      src={t.photo}
                      alt={`Photo de ${t.prenom} ${t.nom}`}
                      width={80}
                      height={80}
                      className="rounded-full object-cover border-2 border-gold mx-auto w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                    <cite className="mt-2 not-italic font-syne text-sm sm:text-base font-semibold text-white">
                      {t.prenom} {t.nom}
                    </cite>
                    <p className="text-xs sm:text-sm text-white/80">
                      {t.poste} — {t.entreprise}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 sm:mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 min-w-[10px] rounded-full transition touch-manipulation ${
                  i === index ? "w-6 sm:w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
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

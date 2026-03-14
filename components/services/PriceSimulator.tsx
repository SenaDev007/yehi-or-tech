"use client";

/**
 * Simulateur de devis — 3 étapes, barre de progression, calcul temps réel.
 * CDC v1.4 — étape 1: services · étape 2: options · étape 3: estimation.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { formatFCFA } from "@/lib/utils";

const DEVIS_URL =
  process.env.NEXT_PUBLIC_DEVIS_URL || "https://devis.yehiortech.com";

export interface SimulatorService {
  slug: string;
  nom: string;
  prixMin: number;
  prixMax: number;
  niveaux?: { label: string; coeff: number }[];
}

const STEPS = 3;

export interface PriceSimulatorProps {
  services: SimulatorService[];
  className?: string;
}

export default function PriceSimulator({
  services,
  className = "",
}: PriceSimulatorProps) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [niveau, setNiveau] = useState<string>("Standard");

  const selectedServices = services.filter((s) => selected.has(s.slug));
  const minTotal =
    selectedServices.length > 0
      ? selectedServices.reduce((acc, s) => acc + s.prixMin, 0)
      : 0;
  const maxTotal =
    selectedServices.length > 0
      ? selectedServices.reduce((acc, s) => acc + s.prixMax, 0)
      : 0;

  const toggleService = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <motion.div
      className={`rounded-2xl border border-blue-lt bg-white p-6 shadow-sm ${className}`.trim()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="font-syne text-xl font-semibold text-navy">
        Simulateur de devis
      </h3>
      <p className="mt-1 text-sm text-gray">
        Obtenez une fourchette indicative en quelques clics.
      </p>

      <ProgressBar step={step} total={STEPS} className="mt-6" />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="mt-6"
          >
            <p className="mb-3 font-syne text-sm font-medium text-navy">
              Sélectionnez un ou plusieurs services
            </p>
            <div className="space-y-2">
              {services.map((s) => (
                <label
                  key={s.slug}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-blue-lt p-3 transition hover:bg-blue-xl/20"
                >
                  <input
                    type="checkbox"
                    checked={selected.has(s.slug)}
                    onChange={() => toggleService(s.slug)}
                    className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold"
                  />
                  <span className="flex-1 font-medium text-navy">{s.nom}</span>
                  <span className="text-sm text-gold">
                    {formatFCFA(s.prixMin)} – {formatFCFA(s.prixMax)}
                  </span>
                </label>
              ))}
            </div>
            <Button
              variant="primary"
              className="mt-6 shadow-gold-cta"
              onClick={() => setStep(2)}
              disabled={selected.size === 0}
            >
              Continuer
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="mt-6"
          >
            <p className="mb-3 font-syne text-sm font-medium text-navy">
              Niveau de prestation
            </p>
            <div className="flex gap-2">
              {["Essentiel", "Standard", "Premium"].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNiveau(n)}
                  className={`rounded-lg px-4 py-2 font-syne text-sm font-medium transition ${
                    niveau === n
                      ? "bg-gold text-black"
                      : "bg-blue-xl/50 text-navy hover:bg-blue-lt"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="mt-6 flex gap-4">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Retour
              </Button>
              <Button
                variant="primary"
                className="shadow-gold-cta"
                onClick={() => setStep(3)}
              >
                Voir l’estimation
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="mt-6"
          >
            <p className="font-syne text-sm text-gray">
              Estimation indicative pour :{" "}
              {selectedServices.map((s) => s.nom).join(", ")}
            </p>
            <p className="mt-4 font-syne text-2xl font-bold text-gold">
              {formatFCFA(minTotal)} – {formatFCFA(maxTotal)}
            </p>
            <p className="mt-2 text-sm text-gray">
              Votre devis personnalisé gratuit sera établi sous 24h après
              envoi du formulaire.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="primary" className="shadow-gold-cta">
                <a
                  href={DEVIS_URL}
                  target={DEVIS_URL.startsWith("http") ? "_blank" : undefined}
                  rel={DEVIS_URL.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  Demander un devis
                </a>
              </Button>
              <Button variant="ghost" onClick={() => { setStep(1); setSelected(new Set()); }}>
                Recommencer
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

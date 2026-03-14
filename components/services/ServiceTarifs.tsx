"use client";

/**
 * Tableau tarifaire 3 niveaux — Essentiel / Standard ⭐ Recommandé / Premium.
 * CDC v1.4
 */

import { motion } from "framer-motion";
import { formatFCFA } from "@/lib/utils";

export interface TarifItem {
  id: number;
  niveau: string;
  formule: string;
  prixMin: number;
  prixMax: number;
  note: string | null;
  ordre: number;
}

export interface ServiceTarifsProps {
  tarifs: TarifItem[];
  className?: string;
}

export default function ServiceTarifs({ tarifs, className = "" }: ServiceTarifsProps) {
  if (tarifs.length === 0) return null;

  const isRecommended = (niveau: string) =>
    niveau.toLowerCase().includes("standard");

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-syne text-xl font-semibold text-navy">
        Tarifs — 3 niveaux
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {tarifs.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl border-2 bg-white p-5 ${
              isRecommended(t.niveau)
                ? "border-gold shadow-gold-cta"
                : "border-blue-lt"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-syne font-semibold text-navy">
                {t.niveau}
              </span>
              {isRecommended(t.niveau) && (
                <span className="rounded bg-gold px-2 py-0.5 font-syne text-xs font-medium text-black">
                  Recommandé
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray">{t.formule}</p>
            <p className="mt-3 font-syne font-semibold text-gold">
              {t.prixMin === t.prixMax
                ? formatFCFA(t.prixMin)
                : `À partir de ${formatFCFA(t.prixMin)}`}
              {t.prixMin !== t.prixMax && (
                <span className="text-navy"> — {formatFCFA(t.prixMax)}</span>
              )}
            </p>
            {t.note && (
              <p className="mt-2 text-xs text-gray">{t.note}</p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

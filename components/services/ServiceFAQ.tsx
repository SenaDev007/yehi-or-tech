"use client";

/**
 * FAQ accordéon — 4 à 6 questions par service.
 * CDC v1.4
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "Combien de temps ça prend ?",
    answer: "Le délai dépend du service et du niveau choisi. Il est indiqué sur chaque fiche et confirmé dans votre devis personnalisé.",
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer: "Notre garantie satisfaction engage à retravailler sans frais supplémentaires jusqu'à votre approbation, conformément à nos CGV.",
  },
  {
    question: "Avez-vous des références dans mon secteur ?",
    answer: "Nous avons accompagné des entreprises dans l'immobilier, l'institutionnel, l'éducation et d'autres secteurs. Consultez notre portfolio.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer: "Un acompte est demandé à la validation du devis, le solde à la livraison. Nous acceptons virement, MTN MoMo et Moov Money.",
  },
  {
    question: "Puis-je modifier après livraison ?",
    answer: "Les modifications mineures sont incluses dans le cadre du suivi. Au-delà, nous établissons un avenant ou un nouveau devis.",
  },
];

export interface ServiceFAQProps {
  faqs?: FAQItem[];
  className?: string;
}

export default function ServiceFAQ({ faqs = DEFAULT_FAQS, className = "" }: ServiceFAQProps) {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <div className={className}>
      <h3 className="font-syne text-xl font-semibold text-navy">
        Questions fréquentes
      </h3>
      <ul className="mt-4 space-y-2">
        {faqs.map((item, i) => {
          const isOpen = openId === i;
          return (
            <li
              key={i}
              className="rounded-lg border border-blue-lt bg-blue-xl/20 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-syne font-medium text-navy transition hover:bg-blue-xl/40"
                aria-expanded={isOpen}
              >
                {item.question}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-blue-lt/50 px-4 py-3 text-sm text-gray">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

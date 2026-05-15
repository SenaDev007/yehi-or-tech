"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Quels types de sites web créez-vous ?",
    answer: "Nous créons tout type de site : vitrines pour la visibilité, e-commerce pour la vente en ligne, blogs, portfolios et applications web sur mesure."
  },
  {
    question: "Pouvez-vous créer une application sur mesure ?",
    answer: "Absolument. Nous développons des applications web et mobiles personnalisées pour répondre à vos processus métiers spécifiques (gestion scolaire, ERP, CRM, etc.)."
  },
  {
    question: "Proposez-vous des agents IA pour WhatsApp ?",
    answer: "Oui, c'est l'une de nos spécialités. Nous concevons des agents IA intelligents capables de répondre à vos clients, qualifier des prospects et prendre des rendez-vous sur WhatsApp."
  },
  {
    question: "Pouvez-vous automatiser mes tâches répétitives ?",
    answer: "C'est notre mission. Nous analysons vos flux de travail et mettons en place des automatisations (Zapier, Make, scripts personnalisés) pour vous libérer du temps."
  },
  {
    question: "Combien coûte un projet digital ?",
    answer: "Le coût dépend de la complexité. Nous avons des packs à prix fixe pour la visibilité (dès 35 000 FCFA) et des solutions sur mesure basées sur un devis détaillé."
  },
  {
    question: "Combien de temps prend la création d'un site ?",
    answer: "Un pack présence peut être prêt en 48h. Un site vitrine prend généralement 1 à 2 semaines, tandis qu'une application complexe peut nécessiter plusieurs mois."
  },
  {
    question: "Proposez-vous la maintenance ?",
    answer: "Oui, nous proposons des forfaits de maintenance pour garantir que votre site reste sécurisé, rapide et à jour technologiquement."
  },
  {
    question: "Puis-je demander un devis personnalisé ?",
    answer: "Bien sûr. Cliquez sur le bouton 'Demander un devis' et remplissez le formulaire. Nous vous répondrons avec une proposition détaillée sous 24h à 48h."
  }
];

const FAQItem = ({ faq, isOpen, toggle }: { faq: typeof faqs[0], isOpen: boolean, toggle: () => void }) => {
  return (
    <div className={cn(
      "border-b border-white/10 transition-all",
      isOpen ? "bg-white/5" : ""
    )}>
      <button
        className="w-full py-6 flex items-center justify-between text-left px-4"
        onClick={toggle}
      >
        <span className={cn(
          "text-lg font-bold transition-colors",
          isOpen ? "text-gold" : "text-white/80"
        )}>
          {faq.question}
        </span>
        {isOpen ? <Minus className="text-gold" /> : <Plus className="text-white/40" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 text-white/50 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-midnight">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Questions <span className="text-gold">Fréquentes</span>
            </h2>
            <p className="text-white/50 text-lg">
              Tout ce que vous devez savoir pour démarrer votre projet avec YEHI OR Tech.
            </p>
          </div>
          
          <div className="bg-white/5 rounded-[40px] p-4 border border-white/10">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                isOpen={openIndex === index} 
                toggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

import React from "react";
import { CheckCircle2 } from "lucide-react";

const steps = [
  { title: "Cadrage du besoin", desc: "Immersion dans votre projet pour comprendre vos objectifs réels." },
  { title: "Analyse UX", desc: "Définition de l'expérience utilisateur et de la stratégie de conversion." },
  { title: "Proposition", desc: "Validation de la stratégie technique et du design préliminaire." },
  { title: "Design UI", desc: "Création d'une interface moderne, premium et fidèle à votre marque." },
  { title: "Développement", desc: "Codage propre, performant et optimisé pour tous les écrans." },
  { title: "Tests", desc: "Vérification rigoureuse du fonctionnement et de la performance." },
  { title: "Livraison", desc: "Mise en ligne et formation à la gestion de votre nouvel outil." },
  { title: "Suivi", desc: "Accompagnement continu pour l'amélioration et l'évolution." },
];

const Process = () => {
  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Notre <span className="text-gold">Processus</span> de Travail
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Une méthodologie structurée pour garantir l'excellence à chaque étape de votre projet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 group">
              <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-500 h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-midnight border border-white/10 flex items-center justify-center mb-6 text-gold font-bold text-xl group-hover:bg-gold group-hover:text-midnight transition-all">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                
                <CheckCircle2 className="mt-6 w-6 h-6 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

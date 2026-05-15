import React from "react";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const packs = [
  {
    name: "Pack Start",
    price: "35 000",
    unit: "FCFA",
    description: "L'essentiel pour démarrer votre présence digitale professionnelle.",
    features: [
      "5 adresses email professionnelles",
      "Fiche Google Maps & Business",
      "Indexation Search Console",
      "Inscription 3 annuaires pro",
      "Config DNS anti-spam",
      "Mini audit de présence"
    ],
    cta: "Choisir le Pack Start",
    popular: false
  },
  {
    name: "Pack Business",
    price: "50 000",
    unit: "FCFA",
    description: "La solution complète pour dominer votre marché local.",
    features: [
      "25 adresses email professionnelles",
      "Fiche Google Maps optimisée",
      "Indexation Search Console",
      "Inscription 5 annuaires pro",
      "Config DNS anti-spam",
      "Rapport de visibilité mensuel",
      "Optimisation SEO local"
    ],
    cta: "Choisir le Pack Business",
    popular: true
  }
];

const PackCard = ({ pack }: { pack: typeof packs[0] }) => {
  return (
    <div 
      className={cn(
        "relative p-8 rounded-[40px] border transition-all duration-500 flex flex-col h-full",
        pack.popular 
          ? "bg-gradient-to-b from-electric-blue/20 to-midnight border-electric-blue/30 shadow-2xl shadow-electric-blue/10 scale-105 z-10" 
          : "bg-white/5 border-white/10 hover:border-white/20"
      )}
    >
      {pack.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-midnight text-xs font-bold rounded-full uppercase tracking-widest">
          Recommandé
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{pack.description}</p>
      </div>
      
      <div className="mb-8 flex items-baseline">
        <span className="text-4xl font-extrabold text-white">{pack.price}</span>
        <span className="ml-2 text-white/40 font-medium">{pack.unit}</span>
      </div>
      
      <div className="space-y-4 mb-10 flex-grow">
        {pack.features.map((feature, idx) => (
          <div key={idx} className="flex items-start space-x-3">
            <div className={cn(
              "mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
              pack.popular ? "bg-electric-blue/20 text-electric-blue" : "bg-white/10 text-gold"
            )}>
              <Check className="w-3 h-3" />
            </div>
            <span className="text-white/70 text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <Link
        href="/devis"
        className={cn(
          "w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center group",
          pack.popular 
            ? "bg-electric-blue text-white shadow-lg shadow-electric-blue/20 hover:bg-electric-blue/90" 
            : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
        )}
      >
        {pack.cta}
        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

const Packs = () => {
  return (
    <section className="py-24 bg-midnight relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Packs de <span className="text-electric-blue">Crédibilité</span> Digitale
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Boostez votre crédibilité en ligne avec des solutions prêtes à l'emploi 
            conçues pour poser les fondations de votre image de marque.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {packs.map((pack, index) => (
            <PackCard key={index} pack={pack} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm">
            Vous avez des besoins spécifiques ? 
            <Link href="/contact" className="text-gold hover:underline ml-1">Contactez-nous</Link> pour un pack sur mesure.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Packs;

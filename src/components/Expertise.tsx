import React from "react";
import { 
  Palette, 
  Layers, 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Bot, 
  Zap, 
  ShieldCheck, 
  Search, 
  Wrench, 
  Lightbulb, 
  BarChart3 
} from "lucide-react";
import ServiceCard from "./ServiceCard";

const expertises = [
  {
    title: "Conception graphique",
    description: "Création de visuels percutants pour vos réseaux sociaux, affiches et supports marketing.",
    icon: Palette,
  },
  {
    title: "Identité visuelle",
    description: "Conception de logos et chartes graphiques qui reflètent l'âme de votre marque.",
    icon: Layers,
  },
  {
    title: "Sites web vitrines",
    description: "Présentez votre entreprise avec élégance et professionnalisme sur le web.",
    icon: Globe,
  },
  {
    title: "Sites e-commerce",
    description: "Vendez vos produits en ligne avec des solutions de paiement sécurisées et fluides.",
    icon: ShoppingCart,
  },
  {
    title: "Apps Web & Mobiles",
    description: "Développement d'applications sur mesure pour répondre à vos besoins métiers spécifiques.",
    icon: Smartphone,
  },
  {
    title: "Agents IA",
    description: "Intégrez des assistants intelligents pour automatiser vos interactions clients.",
    icon: Bot,
  },
  {
    title: "Automatisation métier",
    description: "Simplifiez vos processus répétitifs et gagnez un temps précieux au quotidien.",
    icon: Zap,
  },
  {
    title: "Présence digitale",
    description: "Optimisez votre visibilité sur Google Maps et les annuaires professionnels.",
    icon: ShieldCheck,
  },
  {
    title: "Référencement SEO",
    description: "Améliorez votre positionnement sur les moteurs de recherche pour attirer plus de clients.",
    icon: Search,
  },
  {
    title: "Maintenance & Gestion",
    description: "Suivi technique et mises à jour régulières pour garantir la performance de vos outils.",
    icon: Wrench,
  },
  {
    title: "R&D Solutions",
    description: "Recherche et développement de solutions informatiques innovantes pour demain.",
    icon: Lightbulb,
  },
  {
    title: "Conseil digital",
    description: "Accompagnement stratégique pour réussir votre transformation numérique.",
    icon: BarChart3,
  },
];

const Expertise = () => {
  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Nos <span className="text-gold">Expertises</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Une gamme complète de solutions numériques conçues pour propulser 
            votre entreprise vers de nouveaux sommets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {expertises.map((exp, index) => (
            <ServiceCard 
              key={index}
              title={exp.title}
              description={exp.description}
              icon={exp.icon}
            />
          ))}
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
    </section>
  );
};

export default Expertise;

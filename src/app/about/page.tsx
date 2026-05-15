import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Shield, Target, Lightbulb, Zap, Heart, Users, Sparkles, Award } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", desc: "Nous visons la perfection dans chaque ligne de code et chaque pixel." },
  { icon: Lightbulb, title: "Innovation", desc: "Nous explorons sans cesse les nouvelles technologies pour vous offrir le meilleur." },
  { icon: Shield, title: "Fiabilité", desc: "Des solutions robustes et sécurisées sur lesquelles vous pouvez compter." },
  { icon: Zap, title: "Impact", desc: "Nos outils sont conçus pour générer des résultats concrets pour votre business." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader 
        title="À propos de" 
        highlight="YEHI OR Tech"
        subtitle="Une entreprise numérique pensée pour éclairer, structurer et accélérer la transformation digitale des organisations."
      />
      
      <section className="py-24 bg-premium-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-8">Notre Vision</h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                YEHI OR Tech accompagne les entreprises, entrepreneurs, écoles, commerces, 
                associations et organisations dans la création de solutions numériques modernes. 
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Notre approche repose sur une conviction simple : la technologie doit être 
                claire, utile, accessible et orientée résultats. Le nom "YEHI OR" signifie 
                "Que la lumière soit", reflétant notre désir d'apporter de la clarté dans 
                le monde numérique.
              </p>
              
              <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 italic text-gold text-lg">
                "Devenir une référence dans la transformation digitale, l'intelligence 
                artificielle appliquée et l'automatisation en Afrique francophone."
              </div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all">
                  <v.icon className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-white/40 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

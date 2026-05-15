import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Expertise from "@/components/Expertise";
import CTASection from "@/components/CTASection";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader 
        title="Nos" 
        highlight="Services"
        subtitle="Des solutions numériques complètes, de la conception graphique à l'intelligence artificielle, pour propulser votre activité."
      />
      
      <Expertise />
      
      <section className="py-24 bg-premium-black relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Pourquoi nous confier votre projet ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Expertise Locale", d: "Solutions adaptées aux réalités du marché africain." },
              { t: "Design Premium", d: "Une qualité visuelle digne des plus grandes agences." },
              { t: "Focus Résultats", d: "Chaque projet est conçu pour générer de la valeur." }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-gold mb-4">{item.t}</h3>
                <p className="text-white/40">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}

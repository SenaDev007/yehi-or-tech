import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Packs from "@/components/Packs";
import CTASection from "@/components/CTASection";

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader 
        title="Offres" 
        highlight="Packagées"
        subtitle="Des solutions structurées pour répondre rapidement aux besoins de crédibilité et de visibilité de votre entreprise."
      />
      
      <Packs />
      
      <section className="py-24 bg-premium-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Des packs pour chaque étape de croissance</h2>
            <p className="text-white/40">
              Que vous lanciez votre activité ou que vous souhaitiez professionnaliser votre image existante, 
              nos packs sont conçus pour offrir le meilleur rapport qualité-prix.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Pack Site Vitrine", d: "Un site de 1 à 5 pages, responsive, avec SEO de base et bouton WhatsApp. Idéal pour présenter vos services." },
              { t: "Pack Business Digital", d: "Site vitrine + Emails pro + Fiche Google Business + Visuels réseaux sociaux. La totale pour votre lancement." },
              { t: "Pack IA Starter", d: "Agent IA WhatsApp ou Web avec base de connaissance simple pour automatiser vos premières réponses." }
            ].map((p, i) => (
              <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-4">{p.t}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow">{p.d}</p>
                <div className="text-gold font-bold">Sur devis</div>
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

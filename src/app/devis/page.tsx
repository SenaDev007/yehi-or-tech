import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { ClipboardList, Send, Sparkles } from "lucide-react";

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader 
        title="Demander un" 
        highlight="Devis"
        subtitle="Parlez-nous de vos besoins. Nous vous fournirons une proposition détaillée et adaptée à votre budget sous 24h à 48h."
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-16 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-2xl relative overflow-hidden">
              {/* Decorative Glow */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-[100px]" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-12">
                  <div className="w-16 h-16 rounded-[24px] bg-gold/10 flex items-center justify-center">
                    <ClipboardList className="text-gold w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Formulaire de projet</h2>
                    <p className="text-white/40 text-sm">Remplissez les champs ci-dessous avec précision.</p>
                  </div>
                </div>
                
                <form className="space-y-12">
                  {/* Step 1: Client Info */}
                  <div className="space-y-6">
                    <h3 className="text-white font-bold flex items-center">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 text-sm">1</span>
                      Informations de contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" placeholder="Nom & Prénom" className="w-full px-8 py-5 rounded-3xl bg-midnight border border-white/10 text-white focus:border-gold/50 outline-none" />
                      <input type="email" placeholder="Email professionnel" className="w-full px-8 py-5 rounded-3xl bg-midnight border border-white/10 text-white focus:border-gold/50 outline-none" />
                      <input type="text" placeholder="Nom de l'entreprise / Organisation" className="w-full px-8 py-5 rounded-3xl bg-midnight border border-white/10 text-white focus:border-gold/50 outline-none" />
                      <input type="tel" placeholder="Téléphone (WhatsApp de préférence)" className="w-full px-8 py-5 rounded-3xl bg-midnight border border-white/10 text-white focus:border-gold/50 outline-none" />
                    </div>
                  </div>
                  
                  {/* Step 2: Project Info */}
                  <div className="space-y-6">
                    <h3 className="text-white font-bold flex items-center">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 text-sm">2</span>
                      Détails du projet
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <select className="w-full px-8 py-5 rounded-3xl bg-midnight border border-white/10 text-white focus:border-gold/50 outline-none appearance-none">
                        <option>Type de service souhaité</option>
                        <option>Site Web Vitrine</option>
                        <option>Site E-commerce</option>
                        <option>Application Mobile/Web</option>
                        <option>Agent IA / Automatisation</option>
                        <option>Identité Visuelle</option>
                        <option>Pack Présence Digitale</option>
                      </select>
                      <select className="w-full px-8 py-5 rounded-3xl bg-midnight border border-white/10 text-white focus:border-gold/50 outline-none appearance-none">
                        <option>Budget estimé (FCFA)</option>
                        <option>Moins de 100 000</option>
                        <option>100 000 - 500 000</option>
                        <option>500 000 - 1 500 000</option>
                        <option>Plus de 1 500 000</option>
                      </select>
                      <textarea 
                        className="md:col-span-2 w-full px-8 py-5 rounded-3xl bg-midnight border border-white/10 text-white focus:border-gold/50 outline-none min-h-[200px]"
                        placeholder="Décrivez votre besoin, vos objectifs et vos attentes spécifiques..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <button className="w-full py-6 bg-electric-blue text-white font-bold rounded-3xl hover:bg-electric-blue/90 transition-all shadow-2xl shadow-electric-blue/20 flex items-center justify-center group">
                    <Sparkles className="mr-3 w-5 h-5 text-gold" />
                    Soumettre la demande de devis
                    <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Packs from "@/components/Packs";
import CTASection from "@/components/CTASection";
import { CheckCircle2, AlertCircle, TrendingUp, Search, ShieldCheck, Mail } from "lucide-react";

export default function PresenceDigitalePage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader 
        title="Présence &" 
        highlight="Crédibilité"
        subtitle="Votre crédibilité commence avant même le premier contact. Assurez-vous que vos prospects voient une entreprise sérieuse sur le web."
      />
      
      <section className="py-24 bg-premium-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Le constat est simple</h2>
              <div className="space-y-6">
                {[
                  "Beaucoup d'entreprises existent mais ne sont pas trouvables sur Google Maps.",
                  "Utiliser une adresse Gmail pour son business réduit la confiance des clients.",
                  "L'absence d'indexation empêche vos futurs partenaires de vous découvrir.",
                  "Une identité numérique négligée est un frein direct à votre croissance."
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <AlertCircle className="text-red-500 w-6 h-6 shrink-0 mt-1" />
                    <p className="text-white/60 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-10 md:p-16 rounded-[60px] bg-white/5 border border-white/10 relative">
              <h2 className="text-3xl font-bold text-gold mb-8">La Solution YEHI OR</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, t: "Emails Professionnels", d: "Finis les @gmail.com. Place aux adresses @votre-entreprise.com." },
                  { icon: Search, t: "SEO Local & Maps", d: "Soyez visible là où vos clients vous cherchent : sur Google et Maps." },
                  { icon: ShieldCheck, t: "Sécurité DNS", d: "Protection de votre nom de domaine et limitation des spams." },
                  { icon: TrendingUp, t: "Indexation Active", d: "Déclaration de votre existence aux moteurs de recherche." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <item.icon className="text-electric-blue w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-bold mb-1">{item.t}</h3>
                      <p className="text-white/40 text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Packs />
      
      <CTASection />
      <Footer />
    </main>
  );
}

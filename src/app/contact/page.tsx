import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader 
        title="Parlons de votre" 
        highlight="Projet"
        subtitle="Une question ? Une idée ? Contactez-nous dès aujourd'hui pour transformer vos ambitions numériques en réalité."
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info */}
            <div className="lg:w-1/3 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Coordonnées</h2>
                <p className="text-white/50 mb-12">
                  Nous sommes à votre écoute pour vous accompagner dans votre transformation digitale.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "contact@yehiortech.com", href: "mailto:contact@yehiortech.com" },
                  { icon: Phone, label: "Téléphone", value: "+229 01 41 36 08 03", href: "tel:+2290141360803" },
                  { icon: MessageCircle, label: "WhatsApp", value: "+229 01 41 36 08 03", href: "https://wa.me/2290141360803" },
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.href}
                    className="flex items-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-midnight flex items-center justify-center mr-4 group-hover:bg-gold/10 transition-colors">
                      <item.icon className="text-gold w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/30 uppercase font-bold">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <div className="p-8 md:p-12 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 ml-2">Nom complet</label>
                    <input 
                      type="text" 
                      placeholder="Jean Dupont"
                      className="w-full px-6 py-4 rounded-2xl bg-midnight border border-white/10 text-white focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 ml-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="jean@exemple.com"
                      className="w-full px-6 py-4 rounded-2xl bg-midnight border border-white/10 text-white focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-white/60 ml-2">Sujet</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-midnight border border-white/10 text-white focus:outline-none focus:border-gold/50 transition-colors appearance-none">
                      <option>Demande de devis</option>
                      <option>Question technique</option>
                      <option>Partenariat</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-white/60 ml-2">Message</label>
                    <textarea 
                      rows={5}
                      placeholder="Décrivez votre projet..."
                      className="w-full px-6 py-4 rounded-2xl bg-midnight border border-white/10 text-white focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button className="w-full py-5 bg-gold text-midnight font-bold rounded-2xl hover:bg-gold/90 transition-all flex items-center justify-center shadow-xl shadow-gold/10">
                      Envoyer le message
                      <Send className="ml-2 w-5 h-5" />
                    </button>
                  </div>
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

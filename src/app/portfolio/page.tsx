import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { ExternalLink, Tag } from "lucide-react";
import Image from "next/image";

const projects = [
  { title: "Site Vitrine PME", category: "Sites Web", tags: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" },
  { title: "Gestion Scolaire", category: "Applications", tags: ["React", "Node.js"], img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop" },
  { title: "Identité Marque", category: "Design", tags: ["Logo", "Branding"], img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop" },
  { title: "Agent IA WhatsApp", category: "Intelligence Artificielle", tags: ["OpenAI", "API"], img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop" },
  { title: "Relance Auto", category: "Automatisation", tags: ["Make", "Zapier"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" },
  { title: "Pack Visibilité", category: "Présence Digitale", tags: ["SEO", "Google Maps"], img: "https://images.unsplash.com/photo-1557838923-29852e44cb23?q=80&w=2664&auto=format&fit=crop" },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader 
        title="Nos" 
        highlight="Réalisations"
        subtitle="Découvrez comment nous avons aidé nos clients à transformer leurs idées en succès numériques."
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Filters Placeholder */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {["Tous", "Sites Web", "Applications", "Design", "IA", "Automatisation"].map((cat, i) => (
              <button 
                key={i}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  i === 0 ? "bg-gold text-midnight border-gold" : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="group relative rounded-[40px] overflow-hidden bg-white/5 border border-white/10 hover:border-gold/30 transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={p.img} 
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 p-3 bg-midnight/80 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-5 h-5 text-gold" />
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="text-[10px] text-gold uppercase font-bold tracking-widest mb-2">{p.category}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-white/40 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
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

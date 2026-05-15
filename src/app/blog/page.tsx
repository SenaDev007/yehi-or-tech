import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    title: "Pourquoi une entreprise doit avoir une présence digitale professionnelle",
    excerpt: "Découvrez comment la visibilité en ligne impacte directement la confiance de vos clients potentiels.",
    date: "15 Mai 2026",
    cat: "Stratégie",
    img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Comment un site web peut renforcer la crédibilité d'une PME",
    excerpt: "Le site web est votre premier commercial. Apprenez à le rendre efficace et rassurant.",
    date: "10 Mai 2026",
    cat: "Web",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  {
    title: "L'importance des emails professionnels pour votre image",
    excerpt: "Arrêtez d'utiliser Gmail ou Yahoo pour votre business. Voici pourquoi passer à l'email pro.",
    date: "05 Mai 2026",
    cat: "Présence",
    img: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2670&auto=format&fit=crop"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader 
        title="Notre" 
        highlight="Blog"
        subtitle="Analyses, conseils et actualités pour vous aider à naviguer dans l'écosystème numérique."
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {articles.map((a, i) => (
              <article key={i} className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-[40px] overflow-hidden hover:border-gold/30 transition-all">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image 
                    src={a.img} 
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-gold text-midnight text-[10px] font-bold rounded-full uppercase">
                    {a.cat}
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 text-white/30 text-[10px] uppercase font-bold mb-6">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5" /> {a.date}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> 5 min</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                    {a.excerpt}
                  </p>
                  
                  <Link href="/blog/slug" className="inline-flex items-center text-white font-bold text-sm hover:text-gold transition-colors group/link">
                    Lire l'article
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}

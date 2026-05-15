import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-midnight flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center container mx-auto px-6 py-40">
        <div className="text-center">
          <h1 className="text-[120px] md:text-[200px] font-black text-white/5 leading-none mb-4 selection:bg-transparent">404</h1>
          <div className="relative -mt-20 md:-mt-32">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Oups ! Page introuvable</h2>
            <p className="text-white/40 text-lg max-w-md mx-auto mb-10">
              Il semble que la lumière ne soit pas encore faite sur cette page. 
              Retournons sur le chemin de l'innovation.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-8 py-4 bg-gold text-midnight font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-gold/10"
            >
              <MoveLeft className="mr-2 w-5 h-5" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

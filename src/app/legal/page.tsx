import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader title="Mentions" highlight="Légales" />
      <section className="py-24">
        <div className="container mx-auto px-6 text-white/60 space-y-8 max-w-4xl">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">1. Éditeur du site</h2>
            <p>Le site yehiortech.com est édité par YEHI OR Tech, entreprise numérique basée au Bénin.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">2. Hébergement</h2>
            <p>Le site est hébergé par Vercel Inc., 340 S Lemon Ave #1142, Walnut, CA 91789, USA.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. Contact</h2>
            <p>Email : contact@yehiortech.com | Téléphone : +229 01 41 36 08 03</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

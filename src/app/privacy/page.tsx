import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />
      <PageHeader title="Politique de" highlight="Confidentialité" />
      <section className="py-24">
        <div className="container mx-auto px-6 text-white/60 space-y-8 max-w-4xl">
          <p>Chez YEHI OR Tech, nous accordons une grande importance à la protection de vos données personnelles.</p>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Collecte des données</h2>
            <p>Nous collectons les données que vous nous fournissez via nos formulaires de contact et de devis.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Utilisation des données</h2>
            <p>Vos données sont exclusivement utilisées pour traiter vos demandes et améliorer nos services.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import DevisForm from "@/components/devis/DevisForm";
import { getServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Demander un devis | YEHI OR Tech",
  description:
    "Formulaire de demande de devis en 3 étapes. Devis personnalisé gratuit sous 24h.",
};

type SearchParams = Promise<{ services?: string; niveau?: string }>;

export default async function DevisPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const prefillServices = params.services ? params.services.split(",").filter(Boolean) : [];
  const prefillNiveau = params.niveau ?? undefined;

  const services = await getServices("TOUS");

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-syne text-3xl font-bold text-white md:text-4xl">
            Demander un devis
          </h1>
          <p className="mt-4 text-white/85">
            Remplissez le formulaire en 3 étapes. Devis personnalisé gratuit sous 24h, sans engagement.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-12">
        <DevisForm
          services={services.map((s) => ({ slug: s.slug, nom: s.nom }))}
          prefillServices={prefillServices}
          prefillNiveau={prefillNiveau}
        />
      </div>
    </div>
  );
}

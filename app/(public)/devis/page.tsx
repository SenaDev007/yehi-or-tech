import type { Metadata } from "next";
import DevisForm from "@/components/devis/DevisForm";
import { getServices } from "@/lib/services";
import { IMAGES } from "@/lib/images";

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
    <div
      className="relative min-h-screen pt-[70px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${IMAGES.devis.formBg})` }}
    >
      <div className="absolute inset-0 bg-navy/85 -z-10" />
      <section className="px-4 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-syne text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Demander un devis
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/85">
            Remplissez le formulaire en 3 étapes. Devis personnalisé gratuit sous 24h, sans engagement.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <DevisForm
          services={services.map((s) => ({ slug: s.slug, nom: s.nom }))}
          prefillServices={prefillServices}
          prefillNiveau={prefillNiveau}
        />
      </div>
    </div>
  );
}

/**
 * Page liste des services — filtres sticky, grille, simulateur, exit-intent.
 * CDC v1.4
 */

import { Suspense } from "react";
import type { Metadata } from "next";
import { getServices, SERVICE_CAT_LABELS } from "@/lib/services";
import type { ServiceCat } from "@prisma/client";
import ServiceFilters from "@/components/services/ServiceFilters";
import ServiceCard from "@/components/services/ServiceCard";
import PriceSimulator from "@/components/services/PriceSimulator";
import ExitIntentPopup from "@/components/services/ExitIntentPopup";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Nos services | YEHI OR Tech",
  description:
    "Branding, sites web, e-commerce, impression, packs et crédibilité digitale — tarifs transparents et devis sur mesure. Parakou, Bénin.",
};

type SearchParams = Promise<{ categorie?: string }>;

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const catParam = params.categorie;
  const categorie =
    catParam && Object.keys(SERVICE_CAT_LABELS).includes(catParam)
      ? (catParam as ServiceCat)
      : "TOUS";

  const services = await getServices(categorie);

  const simulatorServices = services.map((s) => ({
    slug: s.slug,
    nom: s.nom,
    prixMin: s.tarifs[0]?.prixMin ?? 0,
    prixMax: s.tarifs[s.tarifs.length - 1]?.prixMax ?? 0,
  }));

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      {/* Hero */}
      <section className="bg-navy px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-syne text-3xl font-bold text-white md:text-5xl">
            Nos services
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Du branding à l&apos;impression en passant par le web : des solutions claires et des tarifs transparents.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="h-14" />}>
        <ServiceFilters />
      </Suspense>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {services.length === 0 ? (
          <p className="text-center text-gray">
            Aucun service dans cette catégorie pour le moment.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        )}

        {services.length > 0 && (
          <div className="mt-16">
            <PriceSimulator services={simulatorServices} />
          </div>
        )}
      </div>

      <ServicesPageClient />
    </div>
  );
}

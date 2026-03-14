import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getProjets } from "@/lib/portfolio";
import type { ProjetCat } from "@prisma/client";
import { PROJET_CAT_LABELS } from "@/lib/portfolio";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Réalisations | YEHI OR Tech",
  description:
    "Découvrez nos projets : sites web, applications, branding et identité visuelle. Parakou, Bénin.",
};

type SearchParams = Promise<{ categorie?: string }>;

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const catParam = params.categorie;
  const categorie =
    catParam && Object.keys(PROJET_CAT_LABELS).includes(catParam)
      ? (catParam as ProjetCat)
      : "TOUS";

  const projets = await getProjets(categorie);

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-syne text-3xl font-bold text-white md:text-5xl">
            Nos réalisations
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Des projets concrets livrés pour des entreprises et institutions.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <Suspense fallback={<div className="h-10" />}>
          <PortfolioFilters />
        </Suspense>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        {projets.length === 0 ? (
          <p className="py-12 text-center text-gray">
            Aucun projet dans cette catégorie pour le moment.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projets.map((p) => (
              <Card key={p.id} hover className="overflow-hidden">
                <div className="aspect-video bg-blue-xl/30 flex items-center justify-center">
                  {p.imagePrincipale ? (
                    <img
                      src={p.imagePrincipale}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-syne text-4xl font-bold text-gold/50">
                      {p.client.slice(0, 2)}
                    </span>
                  )}
                </div>
                <CardContent className="p-6">
                  <span className="font-syne text-xs font-medium uppercase text-gold">
                    {PROJET_CAT_LABELS[p.categorie]}
                  </span>
                  <h2 className="mt-2 font-syne text-xl font-semibold text-navy">
                    {p.titre}
                  </h2>
                  <p className="mt-1 text-sm text-gray">{p.client} · {p.secteur}</p>
                  <p className="mt-3 line-clamp-2 text-gray">{p.problematique}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={`/portfolio/${p.slug}`}>Voir le projet</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProjets } from "@/lib/portfolio";
import type { ProjetCat } from "@prisma/client";
import { PROJET_CAT_LABELS } from "@/lib/portfolio";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { HeroImage } from "@/components/ui/HeroImage";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Nos Réalisations | YEHI OR Tech",
  description:
    "Découvrez nos projets : sites web, applications, branding et identité visuelle. Parakou, Bénin.",
  openGraph: {
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
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
      <HeroImage src={IMAGES.portfolio.heroBg} height="h-56 sm:h-64 md:h-80" overlayOpacity={70} priority>
        <div className="mx-auto max-w-6xl w-full px-4 text-center">
          <h1 className="font-syne text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Nos réalisations
          </h1>
          <p className="mt-3 sm:mt-4 text-base text-white/85 sm:text-lg">
            Des projets concrets livrés pour des entreprises et institutions.
          </p>
        </div>
      </HeroImage>

      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-8">
        <Suspense fallback={<div className="h-10" />}>
          <PortfolioFilters />
        </Suspense>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 sm:pb-16">
        {projets.length === 0 ? (
          <p className="py-8 sm:py-12 text-center text-sm sm:text-base text-gray">
            Aucun projet dans cette catégorie pour le moment.
          </p>
        ) : (
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projets.map((p) => (
              <Card key={p.id} hover className="overflow-hidden">
                <div className="relative aspect-video bg-blue-xl/30 w-full">
                  <Image
                    src={p.imagePrincipale || IMAGES.portfolio.placeholder}
                    alt={`Aperçu du projet ${p.titre}`}
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-4 sm:p-6">
                  <span className="font-syne text-xs font-medium uppercase text-gold">
                    {PROJET_CAT_LABELS[p.categorie]}
                  </span>
                  <h2 className="mt-2 font-syne text-lg sm:text-xl font-semibold text-navy">
                    {p.titre}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray">{p.client} · {p.secteur}</p>
                  <p className="mt-2 sm:mt-3 line-clamp-2 text-sm sm:text-base text-gray">{p.problematique}</p>
                </CardContent>
                <div className="p-4 sm:p-6 pt-0">
                  <Button asChild variant="secondary" className="w-full min-h-[44px]">
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

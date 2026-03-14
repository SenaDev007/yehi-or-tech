import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjetBySlug, getProjetSlugs, PROJET_CAT_LABELS } from "@/lib/portfolio";
import type { ProjetCat } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projet = await getProjetBySlug(slug);
  if (!projet)
    return { title: "Projet | YEHI OR Tech" };
  return {
    title: `${projet.titre} | YEHI OR Tech`,
    description: projet.problematique,
  };
}

export async function generateStaticParams() {
  const slugs = await getProjetSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function PortfolioSlugPage({ params }: Props) {
  const { slug } = await params;
  const projet = await getProjetBySlug(slug);
  if (!projet) notFound();

  const images = projet.images?.length ? projet.images : (projet.imagePrincipale ? [projet.imagePrincipale] : []);

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-6 text-sm text-white/70" aria-label="Fil d'Ariane">
            <Link href="/portfolio" className="hover:text-white">Réalisations</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{projet.titre}</span>
          </nav>
          <h1 className="font-syne text-3xl font-bold text-white md:text-4xl">
            {projet.titre}
          </h1>
          <p className="mt-2 text-white/85">{projet.client} · {projet.secteur}</p>
          <span className="mt-3 inline-block rounded bg-gold/20 px-3 py-1 font-syne text-sm font-medium text-gold">
            {PROJET_CAT_LABELS[projet.categorie]}
          </span>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {images.length > 0 && (
          <section className="mb-12">
            <PortfolioGallery images={images} />
          </section>
        )}

        <section>
          <h2 className="font-syne text-xl font-semibold text-navy">Problématique</h2>
          <p className="mt-2 text-gray">{projet.problematique}</p>
        </section>

        <section className="mt-8">
          <h2 className="font-syne text-xl font-semibold text-navy">Solution</h2>
          <p className="mt-2 text-gray">{projet.solution}</p>
        </section>

        <section className="mt-8">
          <h2 className="font-syne text-xl font-semibold text-navy">Résultats</h2>
          <p className="mt-2 text-gray">{projet.resultats}</p>
        </section>

        {projet.temoignage && (
          <section className="mt-12 rounded-xl border border-blue-lt bg-blue-xl/20 p-6">
            <blockquote className="text-gray">"{projet.temoignage}"</blockquote>
            <p className="mt-3 font-syne font-semibold text-navy">{projet.client}</p>
            {projet.noteClient != null && (
              <Stars note={projet.noteClient} className="mt-2" />
            )}
          </section>
        )}

        {projet.urlExterne && (
          <div className="mt-8">
            <Button asChild variant="primary" className="shadow-gold-cta">
              <a href={projet.urlExterne} target="_blank" rel="noopener noreferrer">
                Voir le projet en ligne
              </a>
            </Button>
          </div>
        )}

        <div className="mt-12 flex gap-4">
          <Button asChild variant="secondary">
            <Link href="/portfolio">Tous les projets</Link>
          </Button>
          <Button asChild variant="primary" className="shadow-gold-cta">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

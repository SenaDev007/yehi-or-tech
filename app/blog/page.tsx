import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { SectionTitle } from "@/components/sections/Section";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog & Ressources | YEHI OR Tech",
  description:
    "Articles et ressources sur l'infrastructure numérique, le cloud, l'IA et les bonnes pratiques technologiques pour les entreprises.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <section className="border-b border-white/10 bg-primary-light/20">
        <div className="section-container py-12 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            Blog & Ressources
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-gray-light">
            Actualités, bonnes pratiques et retours d&apos;expérience pour accompagner votre transformation numérique.
          </p>
        </div>
      </section>

      <section className="section-container py-12 sm:py-16 md:py-20">
        <SectionTitle
          title="Articles"
          subtitle="Des contenus utiles pour les décideurs et les équipes techniques."
          className="mb-12"
        />
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex min-w-0 flex-col rounded-2xl border border-white/10 bg-primary-light/20 transition-colors hover:border-accent-electric/30 hover:bg-primary-light/30"
            >
              <div className="flex flex-1 flex-col p-6">
                <time
                  className="mb-2 flex items-center gap-2 text-sm text-neutral-gray"
                  dateTime={post.date}
                >
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </time>
                <h2 className="text-lg font-semibold text-neutral-white group-hover:text-accent-electric transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-neutral-gray-light line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-electric hover:text-cta transition-colors"
                >
                  Lire la suite
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

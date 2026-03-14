import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getArticles, BLOG_CAT_LABELS } from "@/lib/blog";
import type { BlogCat } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import BlogFilters from "@/components/blog/BlogFilters";
import NewsletterInline from "@/components/blog/NewsletterInline";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Blog | YEHI OR Tech",
  description:
    "Actualités, guides et ressources sur le branding, le web et le digital en Afrique. Parakou, Bénin.",
};

type SearchParams = Promise<{ categorie?: string; q?: string }>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const catParam = params.categorie;
  const categorie =
    catParam && Object.keys(BLOG_CAT_LABELS).includes(catParam)
      ? (catParam as BlogCat)
      : "TOUS";

  let articles = await getArticles({ categorie });
  if (params.q) {
    const q = params.q.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.titre.toLowerCase().includes(q) ||
        a.extrait.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-syne text-3xl font-bold text-white md:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Actualités, guides et ressources pour votre visibilité digitale.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <Suspense fallback={<div className="h-10" />}>
          <BlogFilters />
        </Suspense>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {articles.length === 0 ? (
              <p className="py-12 text-center text-gray">
                Aucun article dans cette catégorie.
              </p>
            ) : (
              <div className="space-y-8">
                {articles.map((a) => (
                  <Card key={a.id} hover>
                    <CardContent className="p-0">
                      {a.couverture && (
                        <div className="aspect-video overflow-hidden rounded-t-xl">
                          <img
                            src={a.couverture}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <Badge variant="navy">{BLOG_CAT_LABELS[a.categorie]}</Badge>
                        <h2 className="mt-2 font-syne text-xl font-semibold text-navy">
                          <Link href={`/blog/${a.slug}`} className="hover:text-gold">
                            {a.titre}
                          </Link>
                        </h2>
                        <p className="mt-2 text-sm text-gray">
                          {a.publishedAt && formatDate(a.publishedAt)} · {a.auteur}
                        </p>
                        <p className="mt-3 text-gray line-clamp-2">{a.extrait}</p>
                        <Link
                          href={`/blog/${a.slug}`}
                          className="mt-4 inline-block font-syne text-sm font-medium text-gold hover:underline"
                        >
                          Lire la suite →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div>
            <NewsletterInline />
          </div>
        </div>
      </div>
    </div>
  );
}

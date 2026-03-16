import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getArticles, BLOG_CAT_LABELS } from "@/lib/blog";
import type { BlogCat } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import BlogFilters from "@/components/blog/BlogFilters";
import NewsletterInline from "@/components/blog/NewsletterInline";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HeroImage } from "@/components/ui/HeroImage";
import { IMAGES } from "@/lib/images";

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
      <HeroImage src={IMAGES.portfolio.heroBg} height="h-56 sm:h-64 md:h-80" overlayOpacity={70} priority>
        <div className="mx-auto max-w-6xl w-full px-4 text-center">
          <h1 className="font-syne text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Blog
          </h1>
          <p className="mt-3 sm:mt-4 text-base text-white/85 sm:text-lg">
            Actualités, guides et ressources pour votre visibilité digitale.
          </p>
        </div>
      </HeroImage>

      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-8">
        <Suspense fallback={<div className="h-10" />}>
          <BlogFilters />
        </Suspense>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 sm:pb-16">
        <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 min-w-0">
            {articles.length === 0 ? (
              <p className="py-12 text-center text-gray">
                Aucun article dans cette catégorie.
              </p>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {articles.map((a) => (
                  <Card key={a.id} hover>
                    <CardContent className="p-0">
                      <div className="relative aspect-video overflow-hidden rounded-t-xl w-full">
                        <Image
                          src={a.couverture || IMAGES.og.default}
                          alt={a.titre}
                          fill
                          quality={80}
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <Badge variant="navy">{BLOG_CAT_LABELS[a.categorie]}</Badge>
                        <h2 className="mt-2 font-syne text-lg sm:text-xl font-semibold text-navy">
                          <Link href={`/blog/${a.slug}`} className="hover:text-gold">
                            {a.titre}
                          </Link>
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-gray">
                          {a.publishedAt && formatDate(a.publishedAt)} · {a.auteur}
                        </p>
                        <p className="mt-3 text-sm sm:text-base text-gray line-clamp-2">{a.extrait}</p>
                        <Link
                          href={`/blog/${a.slug}`}
                          className="mt-4 inline-flex items-center min-h-[44px] font-syne text-sm font-medium text-gold hover:underline"
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

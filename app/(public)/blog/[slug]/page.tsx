import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs, BLOG_CAT_LABELS } from "@/lib/blog";
import type { BlogCat } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import NewsletterInline from "@/components/blog/NewsletterInline";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article)
    return { title: "Article | YEHI OR Tech" };
  return {
    title: article.metaTitle ?? `${article.titre} | YEHI OR Tech`,
    description: article.metaDesc ?? article.extrait,
    openGraph: article.ogImage ? { images: [article.ogImage] } : undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray" aria-label="Fil d'Ariane">
          <Link href="/blog" className="text-blue hover:underline">Blog</Link>
          <span className="mx-2">/</span>
          <span className="line-clamp-1">{article.titre}</span>
        </nav>

        <Badge variant="navy">{BLOG_CAT_LABELS[article.categorie]}</Badge>
        <h1 className="mt-3 font-syne text-2xl font-bold text-navy sm:text-3xl md:text-4xl">
          {article.titre}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray">
          {article.publishedAt && formatDate(article.publishedAt)} · {article.auteur}
        </p>

        {article.couverture && (
          <div className="relative mt-6 aspect-video overflow-hidden rounded-xl">
            <Image
              src={article.couverture}
              alt={article.titre}
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray">{article.extrait}</p>

        <div
          className="mt-8 max-w-none text-gray [&_a]:text-blue [&_a]:underline [&_h2]:mt-6 [&_h2]:font-syne [&_h2]:text-xl [&_p]:mt-2"
          dangerouslySetInnerHTML={{ __html: article.contenu }}
        />

        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-blue-xl/50 px-2 py-1 text-sm text-navy"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 sm:mt-12 border-t border-blue-lt pt-6 sm:pt-8">
          <NewsletterInline />
        </div>

        <div className="mt-6 sm:mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center min-h-[44px] font-syne font-medium text-gold hover:underline"
          >
            ← Retour au blog
          </Link>
        </div>
      </article>
    </div>
  );
}

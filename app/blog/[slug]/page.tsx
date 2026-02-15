import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { Calendar, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article | YEHI OR Tech" };
  return {
    title: `${post.title} | Blog YEHI OR Tech`,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="section-container max-w-3xl py-12 sm:py-16 md:py-20">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-gray hover:text-neutral-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au blog
        </Link>
        <header className="mb-10">
          <time
            className="flex items-center gap-2 text-sm text-neutral-gray"
            dateTime={post.date}
          >
            <Calendar className="h-4 w-4" />
            {formatDate(post.date)} — {post.author}
          </time>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-white sm:text-3xl md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-neutral-gray-light">{post.excerpt}</p>
        </header>
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-neutral-gray-light leading-relaxed space-y-4">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph.split(/(\*\*.*?\*\*)/g).map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} className="text-neutral-white font-semibold">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-gray-light hover:bg-white/10 hover:text-neutral-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Tous les articles
          </Link>
        </div>
      </article>
    </>
  );
}

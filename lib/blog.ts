/**
 * Accès blog / articles — Prisma.
 * CDC v1.4
 */

import { prisma } from "@/lib/db";
import type { BlogCat } from "@prisma/client";

export type ArticleListItem = Awaited<ReturnType<typeof getArticles>>[number];
export type ArticleDetail = Awaited<ReturnType<typeof getArticleBySlug>>;

export async function getArticles(options?: {
  categorie?: BlogCat | "TOUS";
  limit?: number;
}) {
  try {
    const where: { statut: string; categorie?: BlogCat } = {
      statut: "PUBLIE",
    };
    if (options?.categorie && options.categorie !== "TOUS") {
      where.categorie = options.categorie;
    }
    return await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: options?.limit ?? 50,
    });
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    return await prisma.article.findFirst({
      where: { slug, statut: "PUBLIE" },
    });
  } catch {
    return null;
  }
}

export async function getArticleSlugs(): Promise<{ slug: string }[]> {
  try {
    return await prisma.article.findMany({
      where: { statut: "PUBLIE" },
      select: { slug: true },
    });
  } catch {
    return [];
  }
}

export const BLOG_CAT_LABELS: Record<BlogCat, string> = {
  BRANDING: "Branding",
  WEB: "Web",
  DIGITAL_AFRIQUE: "Digital Afrique",
  ACTUALITES: "Actualités",
  GUIDES: "Guides",
};

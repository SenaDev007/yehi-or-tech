/**
 * Accès portfolio / projets — Prisma.
 * CDC v1.4
 */

import { prisma } from "@/lib/db";
import type { ProjetCat } from "@prisma/client";

export type ProjetWithMeta = Awaited<ReturnType<typeof getProjetBySlug>>;
export type ProjetListItem = Awaited<ReturnType<typeof getProjets>>[number];

export async function getProjets(categorie?: ProjetCat | "TOUS") {
  try {
    const where =
      categorie && categorie !== "TOUS"
        ? { publie: true, categorie }
        : { publie: true };
    return await prisma.projet.findMany({
      where,
      orderBy: [{ ordre: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getProjetBySlug(slug: string) {
  try {
    return await prisma.projet.findUnique({
      where: { slug, publie: true },
    });
  } catch {
    return null;
  }
}

export async function getProjetSlugs(): Promise<{ slug: string }[]> {
  try {
    return await prisma.projet.findMany({
      where: { publie: true },
      select: { slug: true },
    });
  } catch {
    return [];
  }
}

export const PROJET_CAT_LABELS: Record<ProjetCat, string> = {
  BRANDING: "Branding & Logo",
  SITE_WEB: "Sites Web",
  APP_WEB: "Applications",
  IMPRESSION: "Impression",
  IDENTITE_VISUELLE: "Identité visuelle",
};

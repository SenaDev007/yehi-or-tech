/**
 * Accès aux services — Prisma, filtres par catégorie.
 * CDC v1.4
 */

import { prisma } from "@/lib/db";
import type { ServiceCat } from "@prisma/client";

export type ServiceWithTarifs = Awaited<ReturnType<typeof getServiceBySlug>>;
export type ServiceListItem = Awaited<ReturnType<typeof getServices>>[number];

export async function getServices(categorie?: ServiceCat | "TOUS") {
  try {
    const where = categorie && categorie !== "TOUS" ? { actif: true, categorie } : { actif: true };
    return await prisma.service.findMany({
    where,
    include: { tarifs: { orderBy: { ordre: "asc" } } },
      orderBy: { ordre: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return await prisma.service.findUnique({
      where: { slug, actif: true },
      include: { tarifs: { orderBy: { ordre: "asc" } } },
    });
  } catch {
    return null;
  }
}

export async function getServiceSlugs(): Promise<{ slug: string }[]> {
  try {
    return await prisma.service.findMany({
      where: { actif: true },
      select: { slug: true },
    });
  } catch {
    return [];
  }
}

export const SERVICE_CAT_LABELS: Record<ServiceCat, string> = {
  BRANDING: "Branding",
  WEB: "Web & Apps",
  IMPRESSION: "Impression",
  PACK: "Packs",
  CREDIBILITE: "Crédibilité Digitale",
  FORMATION: "Formations",
  HEBERGEMENT: "Hébergement & Domaine",
};

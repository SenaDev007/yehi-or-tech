/**
 * Accès offres d'emploi / carrière — Prisma Offre.
 * CDC v1.4
 */

import { prisma } from "@/lib/db";

export type OffreItem = Awaited<ReturnType<typeof getOffres>>[number];

export async function getOffres(activesOnly = true) {
  try {
    const where = activesOnly
      ? {
          statut: "OUVERTE",
          OR: [
            { permanente: true },
            { expiresAt: { gte: new Date() } },
          ],
        }
      : {};
    return await prisma.offre.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

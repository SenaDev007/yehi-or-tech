/**
 * Accès équipe — Prisma MembreEquipe.
 * CDC v1.4
 */

import { prisma } from "@/lib/db";

export type MembreEquipeItem = Awaited<ReturnType<typeof getMembres>>[number];

export async function getMembres() {
  try {
    return await prisma.membreEquipe.findMany({
      where: { actif: true },
      orderBy: { ordre: "asc" },
    });
  } catch {
    return [];
  }
}

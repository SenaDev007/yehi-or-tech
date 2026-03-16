/**
 * Accès témoignages — Prisma, pour affichage sur le site public.
 * Les témoignages gérés dans le backoffice (admin/temoignages) sont affichés ici.
 */

import { prisma } from "@/lib/db";

export type TemoignagePublic = {
  id: number;
  prenom: string;
  nom: string;
  entreprise: string;
  poste: string;
  photo: string | null;
  texte: string;
  note: number;
};

export async function getTemoignages(): Promise<TemoignagePublic[]> {
  try {
    const list = await prisma.temoignage.findMany({
      where: { visible: true },
      orderBy: { ordre: "asc" },
      select: {
        id: true,
        prenom: true,
        nom: true,
        entreprise: true,
        poste: true,
        photo: true,
        texte: true,
        note: true,
      },
    });
    return list;
  } catch {
    return [];
  }
}

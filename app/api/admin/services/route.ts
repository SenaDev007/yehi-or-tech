import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getUserFromCookie, requireMinRole } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const list = await prisma.service.findMany({
    include: { tarifs: { orderBy: { ordre: "asc" } } },
    orderBy: { ordre: "asc" },
  });
  return NextResponse.json(list);
}

const createSchema = z.object({
  slug: z.string().min(1),
  nom: z.string().min(1),
  categorie: z.string(),
  icone: z.string().default("Circle"),
  descCourte: z.string(),
  descLongue: z.string(),
  processus: z.array(z.string()).default([]),
  livrables: z.array(z.string()).default([]),
  nonInclus: z.array(z.string()).default([]),
  delai: z.string().default(""),
  badge: z.string().nullable().optional(),
  actif: z.boolean().default(true),
  ordre: z.number().default(0),
  tarifs: z.array(z.object({
    niveau: z.string(),
    formule: z.string(),
    prixMin: z.number(),
    prixMax: z.number(),
    note: z.string().nullable().optional(),
    ordre: z.number().default(0),
  })).optional().default([]),
});

export async function POST(request: Request) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });

  try {
    const body = await request.json();
    const data = createSchema.parse(body);
    const { tarifs, ...service } = data;
    const created = await prisma.service.create({
      data: {
        ...service,
        tarifs: { create: tarifs },
      },
      include: { tarifs: true },
    });
    return NextResponse.json(created);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

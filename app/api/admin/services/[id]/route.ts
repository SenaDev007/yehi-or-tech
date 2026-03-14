import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getUserFromCookie, requireMinRole } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  const item = await prisma.service.findUnique({
    where: { id },
    include: { tarifs: { orderBy: { ordre: "asc" } } },
  });
  if (!item) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(item);
}

const updateSchema = z.object({
  slug: z.string().min(1).optional(),
  nom: z.string().min(1).optional(),
  categorie: z.string().optional(),
  icone: z.string().optional(),
  descCourte: z.string().optional(),
  descLongue: z.string().optional(),
  processus: z.array(z.string()).optional(),
  livrables: z.array(z.string()).optional(),
  nonInclus: z.array(z.string()).optional(),
  delai: z.string().optional(),
  badge: z.string().nullable().optional(),
  actif: z.boolean().optional(),
  ordre: z.number().optional(),
  tarifs: z.array(z.object({
    id: z.number().optional(),
    niveau: z.string(),
    formule: z.string(),
    prixMin: z.number(),
    prixMax: z.number(),
    note: z.string().nullable().optional(),
    ordre: z.number().default(0),
  })).optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });

  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const body = await request.json();
    const data = updateSchema.parse(body);
    const { tarifs, ...service } = data;

    if (tarifs !== undefined) {
      await prisma.tarif.deleteMany({ where: { serviceId: id } });
      await prisma.service.update({
        where: { id },
        data: {
          ...service,
          tarifs: { create: tarifs.map((t) => ({ niveau: t.niveau, formule: t.formule, prixMin: t.prixMin, prixMax: t.prixMax, note: t.note ?? null, ordre: t.ordre })) },
        },
      });
    } else {
      await prisma.service.update({ where: { id }, data: service });
    }

    const updated = await prisma.service.findUnique({
      where: { id },
      include: { tarifs: true },
    });
    return NextResponse.json(updated);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });

  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

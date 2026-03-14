import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie, requireMinRole } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const list = await prisma.article.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });
  const body = await request.json();
  const created = await prisma.article.create({
    data: {
      slug: body.slug ?? "",
      titre: body.titre ?? "",
      extrait: body.extrait ?? "",
      contenu: body.contenu ?? "",
      couverture: body.couverture ?? null,
      auteur: body.auteur ?? "",
      categorie: body.categorie ?? "ACTUALITES",
      tags: Array.isArray(body.tags) ? body.tags : [],
      metaTitle: body.metaTitle ?? null,
      metaDesc: body.metaDesc ?? null,
      ogImage: body.ogImage ?? null,
      statut: body.statut ?? "BROUILLON",
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
    },
  });
  return NextResponse.json(created);
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie, requireMinRole } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const list = await prisma.projet.findMany({ orderBy: [{ ordre: "asc" }, { createdAt: "desc" }] });
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });
  const body = await request.json();
  const created = await prisma.projet.create({
    data: {
      slug: body.slug ?? "",
      titre: body.titre ?? "",
      client: body.client ?? "",
      secteur: body.secteur ?? "",
      categorie: body.categorie ?? "BRANDING",
      problematique: body.problematique ?? "",
      solution: body.solution ?? "",
      resultats: body.resultats ?? "",
      images: Array.isArray(body.images) ? body.images : [],
      imagePrincipale: body.imagePrincipale ?? null,
      urlExterne: body.urlExterne ?? null,
      miseEnAvant: body.miseEnAvant ?? false,
      publie: body.publie ?? false,
      temoignage: body.temoignage ?? null,
      noteClient: body.noteClient ?? null,
      ordre: body.ordre ?? 0,
    },
  });
  return NextResponse.json(created);
}

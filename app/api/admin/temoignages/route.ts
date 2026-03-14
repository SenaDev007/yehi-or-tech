import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie, requireMinRole } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const list = await prisma.temoignage.findMany({ orderBy: { ordre: "asc" } });
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });
  const body = await request.json();
  const created = await prisma.temoignage.create({
    data: {
      prenom: body.prenom ?? "",
      nom: body.nom ?? "",
      entreprise: body.entreprise ?? "",
      poste: body.poste ?? "",
      photo: body.photo ?? null,
      texte: body.texte ?? "",
      note: body.note ?? 5,
      service: body.service ?? null,
      verifie: body.verifie ?? false,
      visible: body.visible ?? true,
      ordre: body.ordre ?? 0,
    },
  });
  return NextResponse.json(created);
}

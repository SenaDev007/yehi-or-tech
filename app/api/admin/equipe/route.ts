import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie, requireMinRole } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const list = await prisma.membreEquipe.findMany({ orderBy: { ordre: "asc" } });
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });
  const body = await request.json();
  const created = await prisma.membreEquipe.create({
    data: {
      prenom: body.prenom ?? "",
      nom: body.nom ?? "",
      role: body.role ?? "",
      bio: body.bio ?? null,
      photo: body.photo ?? null,
      linkedin: body.linkedin ?? null,
      actif: body.actif ?? true,
      ordre: body.ordre ?? 0,
    },
  });
  return NextResponse.json(created);
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie, requireMinRole } from "@/lib/auth";

export async function GET(
  _r: Request,
  { params }: { params: Promise<{ cle: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const cle = decodeURIComponent((await params).cle);
  const item = await prisma.parametre.findUnique({ where: { cle } });
  if (!item) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ cle: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });
  const cle = decodeURIComponent((await params).cle);
  const body = await request.json();
  const updated = await prisma.parametre.upsert({
    where: { cle },
    update: { valeur: body.valeur ?? "" },
    create: { cle, valeur: body.valeur ?? "" },
  });
  return NextResponse.json(updated);
}

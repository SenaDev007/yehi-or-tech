import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie, requireMinRole } from "@/lib/auth";

export async function GET(
  _r: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  const item = await prisma.projet.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  const body = await request.json();
  const updated = await prisma.projet.update({ where: { id }, data: body });
  return NextResponse.json(updated);
}

export async function DELETE(
  _r: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireMinRole(user, "EDITEUR")) return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  await prisma.projet.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

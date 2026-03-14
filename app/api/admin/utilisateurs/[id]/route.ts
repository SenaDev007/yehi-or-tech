import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie, hashPassword, requireRole } from "@/lib/auth";

export async function GET(
  _r: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  const item = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, lastLogin: true, createdAt: true },
  });
  if (!item) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireRole(user, ["SUPER_ADMIN", "ADMIN"])) {
    return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });
  }
  const id = parseInt((await params).id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  const body = await request.json();
  const data: { name?: string; role?: string; email?: string; password?: string } = {};
  if (body.name !== undefined) data.name = body.name.trim();
  if (body.role !== undefined) data.role = body.role;
  if (body.email !== undefined) data.email = body.email.trim();
  if (body.password && String(body.password).length >= 8) {
    data.password = await hashPassword(body.password);
  }
  const updated = await prisma.user.update({
    where: { id },
    data,
    select: { id: true, email: true, name: true, role: true, lastLogin: true, createdAt: true },
  });
  return NextResponse.json(updated);
}

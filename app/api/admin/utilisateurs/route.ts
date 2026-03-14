import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie, hashPassword, requireRole } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const list = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, lastLogin: true, createdAt: true },
    orderBy: { email: "asc" },
  });
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!requireRole(user, ["SUPER_ADMIN", "ADMIN"])) {
    return NextResponse.json({ error: "Droits insuffisants" }, { status: 403 });
  }
  const body = await request.json();
  const email = (body.email ?? "").trim();
  const password = body.password ?? "";
  const name = (body.name ?? "").trim();
  const role = body.role ?? "EDITEUR";
  if (!email || !password || !name) {
    return NextResponse.json({ error: "Email, mot de passe et nom requis" }, { status: 400 });
  }
  const hashed = await hashPassword(password);
  const created = await prisma.user.create({
    data: { email, password: hashed, name, role },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  return NextResponse.json(created);
}

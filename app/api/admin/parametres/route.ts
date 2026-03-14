import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const list = await prisma.parametre.findMany({ orderBy: { cle: "asc" } });
  return NextResponse.json(list);
}

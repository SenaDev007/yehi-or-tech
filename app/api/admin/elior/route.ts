/**
 * API Admin Elior — liste des conversations, détail d'une conversation.
 * Protégé par cookie JWT (middleware /admin).
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  try {
    if (sessionId) {
      const conv = await prisma.conversation.findUnique({
        where: { sessionId },
        include: {
          messages: { orderBy: { createdAt: "asc" } },
          leads: true,
        },
      });
      if (!conv) {
        return NextResponse.json({ error: "Conversation introuvable" }, { status: 404 });
      }
      return NextResponse.json(conv);
    }

    const conversations = await prisma.conversation.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        _count: { select: { messages: true, leads: true } },
      },
    });

    return NextResponse.json(
      conversations.map((c) => ({
        id: c.id,
        sessionId: c.sessionId,
        canal: c.canal,
        statut: c.statut,
        leadQual: c.leadQual,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        messagesCount: c._count.messages,
        leadsCount: c._count.leads,
      }))
    );
  } catch (e) {
    console.error("Admin Elior API error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * API Chat Elior — streaming SSE avec Anthropic, sauvegarde Conversation/Message.
 * CDC v1.4
 */

import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/db";
import { getSystemPrompt, formatCatalogueFromServices } from "@/lib/elior/system-prompt";
import { getServices } from "@/lib/services";
import { stripActions, parseActions } from "@/lib/elior/action-parser";
import { z } from "zod";

const bodySchema = z.object({
  message: z.string().min(1).max(4000),
  sessionId: z.string().min(1).max(200).optional(),
});

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "sk-ant-...") {
    return NextResponse.json(
      { error: "Service non configuré (ANTHROPIC_API_KEY manquant ou invalide)" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { message, sessionId } = bodySchema.parse(body);

    const session = sessionId ?? `web-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    let conversationId: number;
    const existing = await prisma.conversation.findUnique({
      where: { sessionId: session },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (existing) {
      conversationId = existing.id;
    } else {
      const created = await prisma.conversation.create({
        data: { sessionId: session, canal: "WEB" },
      });
      conversationId = created.id;
    }

    await prisma.message.create({
      data: {
        conversationId,
        role: "user",
        content: message,
      },
    });

    const services = await getServices("TOUS");
    const catalogue = formatCatalogueFromServices(
      services.map((s) => ({
        nom: s.nom,
        slug: s.slug,
        descCourte: s.descCourte,
        tarifs: s.tarifs.map((t) => ({
          niveau: t.niveau,
          formule: t.formule,
          prixMin: t.prixMin,
          prixMax: t.prixMax,
        })),
      }))
    );
    const systemPrompt = getSystemPrompt(catalogue);

    const existingMessages = existing?.messages ?? [];
    const messages: Anthropic.MessageParam[] = existingMessages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));
    messages.push({ role: "user", content: message });

    const anthropic = new Anthropic({ apiKey });
    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    let fullText = "";

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const send = (data: object) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };
        const close = () => {
          try {
            controller.close();
          } catch (_) {}
        };

        stream.on("text", (delta: string) => {
          fullText += delta;
          send({ type: "delta", text: delta });
        });

        stream.on("message", async (msg: { content?: Array<{ type: string; text?: string }> }) => {
          const content = msg.content?.find((b) => b.type === "text");
          const text = content && "text" in content ? (content.text as string) : fullText;
          const cleaned = stripActions(text);
          await prisma.message.create({
            data: {
              conversationId,
              role: "assistant",
              content: cleaned,
            },
          });
          const actions = parseActions(text);
          for (const action of actions) {
            if (action.type === "SAVE_LEAD" && (action.data.email || action.data.telephone || action.data.nom)) {
              await prisma.lead.create({
                data: {
                  conversationId,
                  nom: action.data.nom ?? null,
                  email: action.data.email ?? null,
                  telephone: action.data.telephone ?? null,
                  entreprise: action.data.entreprise ?? null,
                  besoin: action.data.besoin ?? null,
                  budget: action.data.budget ?? null,
                },
              });
              await prisma.conversation.update({
                where: { id: conversationId },
                data: { leadQual: true },
              });
            }
          }
          send({ type: "done", sessionId: session });
          close();
        });

        stream.on("error", (err: Error) => {
          send({ type: "error", error: String(err?.message ?? err) });
          close();
        });
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }
    console.error("Chat API error:", e);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}

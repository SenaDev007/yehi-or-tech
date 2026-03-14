/**
 * Webhooks Meta — vérification (GET) et réception (POST) WhatsApp / Facebook / Instagram.
 * CDC v1.4
 */

import { NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;
const APP_SECRET = process.env.META_APP_SECRET;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(request: Request) {
  if (!APP_SECRET) {
    return NextResponse.json({ error: "Non configuré" }, { status: 503 });
  }

  try {
    const body = await request.text();
    const signature = request.headers.get("x-hub-signature-256");
    if (signature) {
      const crypto = await import("crypto");
      const expected = "sha256=" + crypto.createHmac("sha256", APP_SECRET).update(body).digest("hex");
      if (signature !== expected) {
        return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
      }
    }

    const data = JSON.parse(body) as {
      object?: string;
      entry?: Array<{
        id?: string;
        time?: number;
        messaging?: Array<{
          sender?: { id: string };
          recipient?: { id: string };
          timestamp?: number;
          message?: { mid?: string; text?: string };
          postback?: { payload?: string };
          delivery?: object;
          read?: object;
        }>;
      }>;
    };

    if (data.object !== "page") {
      return NextResponse.json({ ok: true });
    }

    for (const entry of data.entry ?? []) {
      for (const event of entry.messaging ?? []) {
        if (event.message?.text) {
          const senderId = event.sender?.id;
          const text = event.message.text;
          // TODO: créer ou récupérer Conversation (canal WHATSAPP/FACEBOOK/INSTAGRAM),
          // appeler l'API Anthropic pour la réponse, renvoyer via Meta Send API.
          console.log("[Meta webhook] message:", { senderId, text });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Webhook Meta error:", e);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

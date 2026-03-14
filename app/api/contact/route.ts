import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendContactConfirmation, sendContactNotification } from "@/lib/email";

const bodySchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenom: z.string().min(1, "Prénom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  sujet: z.string().min(1, "Sujet requis"),
  message: z.string().min(10, "Message trop court"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bodySchema.parse(body);
    await prisma.messageContact.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone ?? null,
        sujet: data.sujet,
        message: data.message,
      },
    });
    await sendContactConfirmation(data.email, data.prenom);
    await sendContactNotification({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      sujet: data.sujet,
      message: data.message,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * API publique — dépôt de candidature (carrière).
 * CDC v1.4
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const bodySchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenom: z.string().min(1, "Prénom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(1, "Téléphone requis"),
  poste: z.string().min(1, "Poste requis"),
  type: z.string().min(1, "Type requis"), // CDI, CDD, Stage, Freelance, Candidature spontanée
  cv: z.string().optional().refine((v) => !v || v === "" || z.string().url().safeParse(v).success, "URL invalide"),
  lm: z.string().optional().refine((v) => !v || v === "" || z.string().url().safeParse(v).success, "URL invalide"),
  diplomes: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bodySchema.parse(body);
    await prisma.candidature.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        poste: data.poste,
        type: data.type,
        cv: data.cv && data.cv.length > 0 ? data.cv : null,
        lm: data.lm && data.lm.length > 0 ? data.lm : null,
        diplomes: data.diplomes ?? null,
        message: data.message ?? null,
      },
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

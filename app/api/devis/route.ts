import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendDevisConfirmation, sendDevisNotification } from "@/lib/email";

const bodySchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().min(1),
  entreprise: z.string().optional(),
  ville: z.string().optional(),
  pays: z.string().optional(),
  services: z.array(z.string()),
  niveau: z.string().optional(),
  description: z.string().min(1),
  budget: z.string().optional(),
  delai: z.string().optional(),
  simulation: z.string().optional(),
  source: z.string().optional(),
  consentement: z.literal(true, { errorMap: () => ({ message: "Consentement requis" }) }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bodySchema.parse(body);
    await prisma.demandeDevis.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        entreprise: data.entreprise ?? null,
        ville: data.ville ?? null,
        pays: data.pays ?? null,
        services: data.services,
        niveau: data.niveau ?? null,
        description: data.description,
        budget: data.budget ?? null,
        delai: data.delai ?? null,
        simulation: data.simulation ?? null,
        source: data.source ?? "site",
      },
    });
    await sendDevisConfirmation(data.email, data.prenom);
    await sendDevisNotification({
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      services: data.services,
      description: data.description,
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

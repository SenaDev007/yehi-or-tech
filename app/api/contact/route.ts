import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@yehiortech.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, service, message } = body as {
      name?: string;
      company?: string;
      email?: string;
      phone?: string;
      service?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    if (!resend) {
      // Mode développement : log et retourne succès pour tester le formulaire
      console.log("[Contact] Nouvelle demande:", {
        name,
        company,
        email,
        phone,
        service,
        message,
      });
      return NextResponse.json({
        success: true,
        message: "Message enregistré (mode dev : configurez RESEND_API_KEY pour l'envoi réel).",
      });
    }

    const serviceLabels: Record<string, string> = {
      it: "Informatique & IT",
      developpement: "Développement",
      cloud: "Cloud & Hébergement",
      design: "Design & Impression",
      ia: "Intelligence Artificielle",
      autre: "Autre",
    };
    const serviceLabel = service ? serviceLabels[service] || service : "Non précisé";

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM || "YEHI OR Tech <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `[Site] Contact de ${name}${company ? ` (${company})` : ""}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Entreprise :</strong> ${escapeHtml(company || "—")}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Service souhaité :</strong> ${escapeHtml(serviceLabel)}</p>
        <h3>Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("[Contact] Resend error:", error);
      return NextResponse.json(
        { error: "Échec de l'envoi. Réessayez ou contactez-nous par email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (e) {
    console.error("[Contact] Error:", e);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez plus tard." },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

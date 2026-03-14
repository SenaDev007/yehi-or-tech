/**
 * Envoi d’emails via Resend — contact, newsletter, devis.
 * CDC v1.4 — si RESEND_API_KEY absent, les envois sont ignorés (pas d’erreur).
 */

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const FROM_EMAIL = process.env.FROM_EMAIL ?? "contact@yehiortech.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? process.env.FROM_EMAIL ?? "contact@yehiortech.com";

export async function sendContactConfirmation(to: string, name: string): Promise<boolean> {
  if (!resend) return false;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: "Nous avons bien reçu votre message | YEHI OR Tech",
      html: `<p>Bonjour ${name},</p><p>Nous avons bien reçu votre message et nous vous recontacterons dans les plus brefs délais.</p><p>L'équipe YEHI OR Tech</p>`,
    });
    return true;
  } catch {
    return false;
  }
}

export async function sendContactNotification(data: {
  nom: string;
  prenom: string;
  email: string;
  sujet: string;
  message: string;
}): Promise<boolean> {
  if (!resend) return false;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `[Site] Message contact : ${data.sujet}`,
      html: `<p>De : ${data.prenom} ${data.nom} &lt;${data.email}&gt;</p><p>Sujet : ${data.sujet}</p><p>Message :</p><pre>${data.message}</pre>`,
    });
    return true;
  } catch {
    return false;
  }
}

export async function sendNewsletterConfirmation(to: string): Promise<boolean> {
  if (!resend) return false;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: "Inscription newsletter | YEHI OR Tech",
      html: `<p>Bonjour,</p><p>Vous êtes bien inscrit(e) à notre newsletter. Vous recevrez nos actualités et conseils digitaux.</p><p>L'équipe YEHI OR Tech</p>`,
    });
    return true;
  } catch {
    return false;
  }
}

export async function sendDevisConfirmation(to: string, prenom: string): Promise<boolean> {
  if (!resend) return false;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: "Demande de devis reçue | YEHI OR Tech",
      html: `<p>Bonjour ${prenom},</p><p>Nous avons bien reçu votre demande de devis. Notre équipe vous enverra une proposition personnalisée sous 24h.</p><p>L'équipe YEHI OR Tech</p>`,
    });
    return true;
  } catch {
    return false;
  }
}

export async function sendDevisNotification(data: {
  prenom: string;
  nom: string;
  email: string;
  services: string[];
  description: string;
}): Promise<boolean> {
  if (!resend) return false;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `[Site] Nouvelle demande de devis - ${data.prenom} ${data.nom}`,
      html: `<p>${data.prenom} ${data.nom} &lt;${data.email}&gt;</p><p>Services : ${data.services.join(", ")}</p><p>Description :</p><pre>${data.description}</pre>`,
    });
    return true;
  } catch {
    return false;
  }
}

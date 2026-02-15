/**
 * Coordonnées de contact depuis les variables d'environnement.
 * Ne pas coder en dur : tout vient de .env
 */

export function getContactPhoneCall(): string | undefined {
  return process.env.CONTACT_PHONE_CALL?.trim() || undefined;
}

export function getContactPhoneWhatsApp(): string | undefined {
  return process.env.CONTACT_PHONE_WHATSAPP?.trim() || undefined;
}

/** URL WhatsApp (wa.me) à partir du numéro sans + */
export function getWhatsAppUrl(): string | undefined {
  const raw = getContactPhoneWhatsApp();
  if (!raw) return undefined;
  const digits = raw.replace(/\D/g, "");
  if (!digits.length) return undefined;
  return `https://wa.me/${digits}`;
}

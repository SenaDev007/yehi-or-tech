"use client";

/**
 * Bouton WhatsApp flottant — pulsation dorée.
 * Position : bas droite, 56px. CDC v1.4 — pulsation toutes les 4s (design premium).
 */

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "22941360803";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-pulse fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-[0_4px_20px_rgba(245,168,0,0.4)] transition hover:scale-110 hover:shadow-[0_6px_24px_rgba(245,168,0,0.5)]"
      aria-label="Contacter YEHI OR Tech sur WhatsApp"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500" aria-hidden />
    </a>
  );
}

"use client";

/**
 * Exit-intent popup — après 30s ou mouvement de quitter : "Recevez notre brochure PDF gratuite".
 * CDC v1.4 — 1 affichage par session, champ email + bouton.
 */

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "yehi_exit_popup_shown";
const DELAY_MS = 30 * 1000;

export interface ExitIntentPopupProps {
  /** Appelé quand l'utilisateur soumet son email */
  onSubmitEmail?: (email: string) => Promise<void>;
}

export default function ExitIntentPopup({ onSubmitEmail }: ExitIntentPopupProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const openPopup = useCallback(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setOpen(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) openPopup();
    };
    timer = setTimeout(openPopup, DELAY_MS);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [openPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await onSubmitEmail?.(email.trim());
      setSent(true);
      setTimeout(() => setOpen(false), 2000);
    } catch {
      setLoading(false);
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="exit-popup-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded p-1 text-gray hover:bg-blue-xl hover:text-navy"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 id="exit-popup-title" className="font-syne text-xl font-semibold text-navy">
          Avant de partir…
        </h2>
        {sent ? (
          <p className="mt-4 text-gray">
            Merci ! Vous recevrez notre brochure par email sous peu.
          </p>
        ) : (
          <>
            <p className="mt-2 text-gray">
              Recevez notre brochure PDF gratuite et vos fourchettes de prix en quelques secondes.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                label="Votre email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full shadow-gold-cta"
                disabled={loading}
              >
                {loading ? "Envoi…" : "Recevoir maintenant"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

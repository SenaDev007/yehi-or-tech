"use client";

/**
 * Notification toast conversion sociale — bas gauche, toutes les 2 à 3 min.
 * CDC v1.4 — un seul toast à la fois.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { ToastContainer, type ToastData } from "@/components/ui/Toast";

const MESSAGES: string[] = [
  "Moussa de Cotonou vient de demander un devis pour un site vitrine.",
  "Projet SERMA HUB livré — voir le cas client.",
  "Foncier Facile Afrique a choisi YEHI OR Tech pour son nouveau site.",
  "Academia Helm — application livrée et déployée.",
];

const MIN_MS = 2 * 60 * 1000;
const MAX_MS = 3 * 60 * 1000;
const FIRST_DELAY_MS = 30 * 1000;

function randomDelay() {
  return MIN_MS + Math.random() * (MAX_MS - MIN_MS);
}

export default function ConversionToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNext = useCallback(() => {
    const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setToasts([
      {
        id: `conv-${Date.now()}`,
        message,
        variant: "info",
        duration: 6000,
      },
    ]);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(showNext, randomDelay());
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(showNext, FIRST_DELAY_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [showNext]);

  return (
    <ToastContainer
      toasts={toasts}
      onDismiss={dismiss}
      position="bottom-left"
    />
  );
}

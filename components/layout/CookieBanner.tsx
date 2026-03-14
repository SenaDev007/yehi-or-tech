"use client";

/**
 * Bannière cookies — consentement explicite, stockage localStorage.
 * Conformité APDP — CDC v1.4.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "yehi_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = localStorage.getItem(STORAGE_KEY);
    if (consent !== "accepted") {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-24 left-4 right-4 z-40 max-w-md rounded-xl border border-white/20 bg-dark-bg/95 p-4 shadow-xl backdrop-blur sm:left-6 sm:bottom-24"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <h2 id="cookie-title" className="font-syne text-sm font-semibold text-white">
        Cookies et confidentialité
      </h2>
      <p id="cookie-desc" className="mt-1 text-sm text-white/80">
        Nous utilisons des cookies pour le bon fonctionnement du site et l&apos;analyse de trafic (Umami, sans cookies tiers). En continuant, vous acceptez notre{" "}
        <Link
          href="/mentions#confidentialite"
          className="text-gold underline underline-offset-2 hover:no-underline"
        >
          politique de confidentialité
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="primary"
          className="shadow-gold-cta"
          onClick={accept}
        >
          Accepter
        </Button>
        <Button
          variant="secondary"
          className="border-white/50 text-white hover:bg-white/10 hover:text-white"
          onClick={accept}
        >
          Continuer sans accepter
        </Button>
      </div>
    </div>
  );
}

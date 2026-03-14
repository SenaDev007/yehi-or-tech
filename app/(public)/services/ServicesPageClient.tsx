"use client";

/**
 * Client wrapper — exit-intent popup (nécessite état et événements).
 */

import ExitIntentPopup from "@/components/services/ExitIntentPopup";

export default function ServicesPageClient() {
  const handleSubmitEmail = async (email: string) => {
    // TODO Phase 5+ : appeler API newsletter/brochure et envoyer le PDF par email
    await new Promise((r) => setTimeout(r, 800));
    console.log("Brochure demandée pour:", email);
  };

  return <ExitIntentPopup onSubmitEmail={handleSubmitEmail} />;
}

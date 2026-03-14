"use client";

/**
 * Newsletter inline — sidebar blog, formulaire email.
 * CDC v1.4
 */

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-xl border border-blue-lt bg-blue-xl/20 p-6">
      <h3 className="font-syne text-lg font-semibold text-navy">
        Newsletter
      </h3>
      <p className="mt-2 text-sm text-gray">
        Recevez nos derniers articles et actualités par email.
      </p>
      {status === "success" ? (
        <p className="mt-4 text-sm text-success">Merci pour votre inscription.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full shadow-gold-cta"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Inscription…" : "S'abonner"}
          </Button>
          {status === "error" && (
            <p className="text-sm text-error">Une erreur est survenue. Réessayez.</p>
          )}
        </form>
      )}
    </div>
  );
}

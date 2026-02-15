"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const services: { value: string; label: string }[] = [
  { value: "", label: "Sélectionnez un service" },
  { value: "it", label: "Informatique & IT" },
  { value: "developpement", label: "Développement" },
  { value: "cloud", label: "Cloud & Hébergement" },
  { value: "design", label: "Design & Impression" },
  { value: "ia", label: "Intelligence Artificielle" },
  { value: "autre", label: "Autre" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    const form = e.currentTarget;
    const body = {
      name: (form.querySelector('[name="name"]') as HTMLInputElement)?.value,
      company: (form.querySelector('[name="company"]') as HTMLInputElement)?.value,
      email: (form.querySelector('[name="email"]') as HTMLInputElement)?.value,
      phone: (form.querySelector('[name="phone"]') as HTMLInputElement)?.value,
      service: (form.querySelector('[name="service"]') as HTMLSelectElement)?.value,
      message: (form.querySelector('[name="message"]') as HTMLTextAreaElement)?.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Une erreur est survenue.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Problème de connexion. Réessayez ou contactez-nous par email.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nom *</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Votre nom"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="company">Entreprise</Label>
          <Input
            id="company"
            name="company"
            placeholder="Nom de l'entreprise"
            className="mt-1.5"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="votre@email.com"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+225 00 00 00 00 00"
            className="mt-1.5"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="service">Service souhaité</Label>
        <select
          id="service"
          name="service"
          className="mt-1.5 flex h-11 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-neutral-white focus:outline-none focus:ring-2 focus:ring-accent-electric/50 focus:border-accent-electric transition-colors appearance-none cursor-pointer"
        >
          {services.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Décrivez votre projet ou votre demande..."
          rows={5}
          className="mt-1.5"
        />
      </div>
      {status === "sent" && (
        <div className="flex items-center gap-3 rounded-xl border border-accent-electric/30 bg-accent-electric/10 p-4 text-accent-electric">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">
            Message envoyé. Nous vous recontacterons rapidement.
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          "Envoi en cours..."
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Envoyer
          </>
        )}
      </Button>
    </form>
  );
}

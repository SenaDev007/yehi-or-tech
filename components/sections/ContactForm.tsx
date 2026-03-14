"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const sujetParam = searchParams.get("sujet") ?? "";

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [sujet, setSujet] = useState(sujetParam || "Demande d'information");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          telephone: telephone || undefined,
          sujet,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setNom("");
        setPrenom("");
        setEmail("");
        setTelephone("");
        setSujet(sujetParam || "Demande d'information");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Erreur de connexion.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success/30 bg-success-lt p-6 text-center">
        <p className="font-syne font-semibold text-success">Message envoyé</p>
        <p className="mt-2 text-gray">
          Nous vous recontacterons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <Input label="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
      </div>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Téléphone" type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
      <Input label="Sujet" value={sujet} onChange={(e) => setSujet(e.target.value)} required />
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium uppercase tracking-wide text-black">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
          rows={5}
          className="w-full rounded-lg border border-blue-lt bg-white px-4 py-3 font-inter text-black placeholder:text-lgray focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
          placeholder="Votre message..."
        />
      </div>
      {errorMsg && <p className="text-sm text-error">{errorMsg}</p>}
      <Button type="submit" variant="primary" className="shadow-gold-cta" disabled={status === "loading"}>
        {status === "loading" ? "Envoi…" : "Envoyer"}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const TYPES = [
  "Candidature spontanée",
  "CDI",
  "CDD",
  "Stage",
  "Freelance",
  "Alternance",
];

export default function CandidatureForm() {
  const searchParams = useSearchParams();
  const posteParam = searchParams.get("poste") ?? "";
  const typeParam = searchParams.get("type") ?? "";

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [poste, setPoste] = useState(decodeURIComponent(posteParam) || "");
  const [type, setType] = useState(decodeURIComponent(typeParam) || TYPES[0]);
  const [cv, setCv] = useState("");
  const [lm, setLm] = useState("");
  const [diplomes, setDiplomes] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/candidatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          telephone,
          poste: poste || "Candidature spontanée",
          type,
          cv: cv.trim() || undefined,
          lm: lm.trim() || undefined,
          diplomes: diplomes.trim() || undefined,
          message: message.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
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
      <div className="rounded-xl border border-success/30 bg-success-lt p-4 sm:p-8 text-center">
        <p className="font-syne text-lg font-semibold text-success">Candidature envoyée</p>
        <p className="mt-2 text-gray">
          Nous avons bien reçu votre candidature et nous vous recontacterons rapidement.
        </p>
        <Button asChild variant="secondary" className="mt-6">
          <Link href="/carriere">Retour aux offres</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <Input label="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
      </div>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Téléphone" type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
      <Input label="Poste visé" value={poste} onChange={(e) => setPoste(e.target.value)} placeholder="Ex. Développeur web, Candidature spontanée" />
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium uppercase tracking-wide text-navy">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-navy"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <Input label="Lien vers votre CV (URL)" value={cv} onChange={(e) => setCv(e.target.value)} placeholder="https://..." />
      <Input label="Lien vers lettre de motivation (URL)" value={lm} onChange={(e) => setLm(e.target.value)} placeholder="https://..." />
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium uppercase tracking-wide text-navy">Diplômes / formation</label>
        <textarea value={diplomes} onChange={(e) => setDiplomes(e.target.value)} rows={2} className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-navy" />
      </div>
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium uppercase tracking-wide text-navy">Message (optionnel)</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-navy" />
      </div>
      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
      <div className="flex flex-wrap gap-4">
        <Button type="submit" variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto" disabled={status === "loading"}>
          {status === "loading" ? "Envoi…" : "Envoyer ma candidature"}
        </Button>
        <Button asChild variant="ghost">
          <Link href="/carriere">Annuler</Link>
        </Button>
      </div>
    </form>
  );
}

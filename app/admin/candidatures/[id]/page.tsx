"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Loader2, ArrowLeft, ExternalLink } from "lucide-react";

type Candidature = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  poste: string;
  type: string;
  cv: string | null;
  lm: string | null;
  diplomes: string | null;
  message: string | null;
  statut: string;
  createdAt: string;
};

const STATUTS = ["RECUE", "EN_EXAMEN", "CONVOQUEE", "RETENUE", "REFUSEE"];

export default function AdminCandidatureDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [item, setItem] = useState<Candidature | null>(null);
  const [loading, setLoading] = useState(true);
  const [statut, setStatut] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/candidatures/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setStatut(data.statut ?? "");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const updateStatut = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/candidatures/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ statut }),
      });
      setItem((prev) => (prev ? { ...prev, statut } : null));
    } finally {
      setSaving(false);
    }
  };

  if (loading || !item) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <Link
        href="/admin/candidatures"
        className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <h1 className="mt-4 font-syne text-xl font-semibold text-white sm:text-2xl">
        Candidature #{item.id} — {item.poste}
      </h1>

      <div className="mt-8 max-w-2xl space-y-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <p><span className="text-white/60">Nom :</span> {item.prenom} {item.nom}</p>
          <p><span className="text-white/60">Email :</span> {item.email}</p>
          <p><span className="text-white/60">Téléphone :</span> {item.telephone}</p>
          <p><span className="text-white/60">Poste :</span> {item.poste}</p>
          <p><span className="text-white/60">Type :</span> {item.type}</p>
          <p><span className="text-white/60">Date :</span> {new Date(item.createdAt).toLocaleString("fr-FR")}</p>
        </div>
        {item.diplomes && (
          <div>
            <p className="text-white/60">Diplômes :</p>
            <p className="text-white">{item.diplomes}</p>
          </div>
        )}
        {item.message && (
          <div>
            <p className="text-white/60">Message :</p>
            <p className="whitespace-pre-wrap text-white">{item.message}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-4">
          {item.cv && (
            <a
              href={item.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gold hover:underline"
            >
              CV <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {item.lm && (
            <a
              href={item.lm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gold hover:underline"
            >
              Lettre de motivation <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
          <label className="flex items-center gap-2">
            <span className="text-white/80">Statut :</span>
            <select
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
              className="rounded border border-white/20 bg-white/5 px-3 py-2 text-white"
            >
              {STATUTS.map((s) => (
                <option key={s} value={s} className="bg-navy">{s}</option>
              ))}
            </select>
          </label>
          <Button variant="primary" onClick={updateStatut} disabled={saving}>
            {saving ? "Enregistrement…" : "Mettre à jour"}
          </Button>
        </div>
      </div>
    </div>
  );
}

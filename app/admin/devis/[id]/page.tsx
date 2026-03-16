"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Loader2, ArrowLeft } from "lucide-react";

type Devis = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string | null;
  ville: string | null;
  pays: string | null;
  services: string[];
  niveau: string | null;
  description: string;
  budget: string | null;
  delai: string | null;
  simulation: string | null;
  statut: string;
  assigneA: string | null;
  noteInterne: string | null;
  source: string | null;
  createdAt: string;
};

const STATUTS = ["NOUVEAU", "EN_COURS", "DEVIS_ENVOYE", "GAGNE", "PERDU"];

export default function AdminDevisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [item, setItem] = useState<Devis | null>(null);
  const [loading, setLoading] = useState(true);
  const [statut, setStatut] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/devis/${id}`, { credentials: "include" })
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
      await fetch(`/api/admin/devis/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ statut }),
      });
      setItem((prev) => (prev ? { ...prev, statut } : null));
      router.refresh();
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
        href="/admin/devis"
        className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <h1 className="mt-4 font-syne text-xl font-semibold text-white sm:text-2xl">
        Demande devis #{item.id}
      </h1>

      <div className="mt-8 max-w-2xl space-y-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <p><span className="text-white/60">Nom :</span> {item.prenom} {item.nom}</p>
          <p><span className="text-white/60">Email :</span> {item.email}</p>
          <p><span className="text-white/60">Téléphone :</span> {item.telephone}</p>
          <p><span className="text-white/60">Entreprise :</span> {item.entreprise ?? "—"}</p>
          <p><span className="text-white/60">Ville / Pays :</span> {[item.ville, item.pays].filter(Boolean).join(", ") || "—"}</p>
          <p><span className="text-white/60">Source :</span> {item.source ?? "site"}</p>
        </div>
        <div>
          <p className="text-white/60">Services :</p>
          <p className="text-white">{Array.isArray(item.services) ? item.services.join(", ") : "—"}</p>
        </div>
        <div>
          <p className="text-white/60">Niveau / Budget / Délai :</p>
          <p className="text-white">{item.niveau ?? "—"} | {item.budget ?? "—"} | {item.delai ?? "—"}</p>
        </div>
        <div>
          <p className="text-white/60">Description :</p>
          <p className="whitespace-pre-wrap text-white">{item.description}</p>
        </div>
        {item.simulation && (
          <div>
            <p className="text-white/60">Simulation :</p>
            <p className="text-white">{item.simulation}</p>
          </div>
        )}
        <div>
          <p className="text-white/60">Note interne :</p>
          <p className="text-white">{item.noteInterne ?? "—"}</p>
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

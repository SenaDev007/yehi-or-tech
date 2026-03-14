"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, ArrowLeft } from "lucide-react";

type Parametre = {
  id: number;
  cle: string;
  valeur: string;
};

export default function AdminParametreEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [item, setItem] = useState<Parametre | null>(null);
  const [valeur, setValeur] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/parametres/id/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setValeur(data.valeur ?? "");
      })
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/parametres/id/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ valeur }),
      });
      router.push("/admin/parametres");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="p-6">
        <Link href="/admin/parametres" className="text-gold hover:underline">← Retour</Link>
        <p className="mt-4 text-white/80">Paramètre introuvable.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link
        href="/admin/parametres"
        className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <h1 className="mt-4 font-syne text-2xl font-semibold text-white">
        Paramètre : {item.cle}
      </h1>

      <div className="mt-8 max-w-xl rounded-xl border border-white/10 bg-white/5 p-6">
        <Input
          label="Valeur"
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
          className="border-white/20 bg-white/5 text-white"
        />
        <div className="mt-6 flex gap-4">
          <Button variant="primary" onClick={save} disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
          <Button asChild variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
            <Link href="/admin/parametres">Annuler</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

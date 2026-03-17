"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import AdminFormLayout from "@/components/admin/AdminFormLayout";
import { Loader2 } from "lucide-react";

type Temoignage = {
  id: number;
  prenom: string;
  nom: string;
  entreprise: string;
  poste: string;
  photo: string | null;
  texte: string;
  note: number;
  service: string | null;
  verifie: boolean;
  visible: boolean;
  ordre: number;
};

export default function AdminTemoignageEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Temoignage>>({
    prenom: "",
    nom: "",
    entreprise: "",
    poste: "",
    photo: null,
    texte: "",
    note: 5,
    service: null,
    verifie: false,
    visible: true,
    ordre: 0,
  });

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/temoignages/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(setForm)
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const save = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const res = await fetch("/api/admin/temoignages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        });
        const created = await res.json();
        router.push(`/admin/temoignages/${created.id}`);
      } else {
        await fetch(`/api/admin/temoignages/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        });
      }
      router.refresh();
    } catch {
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

  return (
    <AdminFormLayout
      backHref="/admin/temoignages"
      title={isNew ? "Nouveau témoignage" : "Modifier le témoignage"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Prénom" value={form.prenom ?? ""} onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))} className="border-white/30" />
        <Input label="Nom" value={form.nom ?? ""} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} className="border-white/30" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Entreprise" value={form.entreprise ?? ""} onChange={(e) => setForm((f) => ({ ...f, entreprise: e.target.value }))} className="border-white/30" />
        <Input label="Poste" value={form.poste ?? ""} onChange={(e) => setForm((f) => ({ ...f, poste: e.target.value }))} className="border-white/30" />
      </div>
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium text-white">Témoignage</label>
        <textarea value={form.texte ?? ""} onChange={(e) => setForm((f) => ({ ...f, texte: e.target.value }))} rows={4} className="w-full rounded-lg border border-white/30 px-4 py-3" />
      </div>
      <Input label="Note (1-5)" type="number" min={1} max={5} value={String(form.note ?? 5)} onChange={(e) => setForm((f) => ({ ...f, note: parseInt(e.target.value, 10) || 5 }))} className="border-white/30" />
      <Input label="Service" value={form.service ?? ""} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value || null }))} className="border-white/30" />
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-white"><input type="checkbox" checked={form.verifie ?? false} onChange={(e) => setForm((f) => ({ ...f, verifie: e.target.checked }))} className="h-4 w-4 rounded text-gold" /> Vérifié</label>
        <label className="flex items-center gap-2 text-white"><input type="checkbox" checked={form.visible ?? true} onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))} className="h-4 w-4 rounded text-gold" /> Visible</label>
      </div>
      <Input label="Ordre" type="number" value={String(form.ordre ?? 0)} onChange={(e) => setForm((f) => ({ ...f, ordre: parseInt(e.target.value, 10) || 0 }))} className="border-white/30" />
      <div className="flex gap-4">
        <Button variant="primary" className="shadow-gold-cta" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
        <Button asChild variant="ghost" className="text-white hover:bg-white/10"><Link href="/admin/temoignages">Annuler</Link></Button>
      </div>
    </AdminFormLayout>
  );
}

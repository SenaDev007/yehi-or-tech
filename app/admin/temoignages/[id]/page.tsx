"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, ArrowLeft } from "lucide-react";

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
    <div className="p-6">
      <Link href="/admin/temoignages" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <h1 className="mt-4 font-syne text-2xl font-semibold text-white">
        {isNew ? "Nouveau témoignage" : "Modifier le témoignage"}
      </h1>
      <div className="mt-8 max-w-2xl space-y-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Prénom" value={form.prenom ?? ""} onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
          <Input label="Nom" value={form.nom ?? ""} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Entreprise" value={form.entreprise ?? ""} onChange={(e) => setForm((f) => ({ ...f, entreprise: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
          <Input label="Poste" value={form.poste ?? ""} onChange={(e) => setForm((f) => ({ ...f, poste: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
        </div>
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Témoignage</label>
          <textarea value={form.texte ?? ""} onChange={(e) => setForm((f) => ({ ...f, texte: e.target.value }))} rows={4} className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white" />
        </div>
        <Input label="Note (1-5)" type="number" min={1} max={5} value={String(form.note ?? 5)} onChange={(e) => setForm((f) => ({ ...f, note: parseInt(e.target.value, 10) || 5 }))} className="border-white/20 bg-white/5 text-white" />
        <Input label="Service" value={form.service ?? ""} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value || null }))} className="border-white/20 bg-white/5 text-white" />
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-white/90"><input type="checkbox" checked={form.verifie ?? false} onChange={(e) => setForm((f) => ({ ...f, verifie: e.target.checked }))} className="h-4 w-4 rounded text-gold" /> Vérifié</label>
          <label className="flex items-center gap-2 text-white/90"><input type="checkbox" checked={form.visible ?? true} onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))} className="h-4 w-4 rounded text-gold" /> Visible</label>
        </div>
        <Input label="Ordre" type="number" value={String(form.ordre ?? 0)} onChange={(e) => setForm((f) => ({ ...f, ordre: parseInt(e.target.value, 10) || 0 }))} className="border-white/20 bg-white/5 text-white" />
        <div className="flex gap-4">
          <Button variant="primary" className="shadow-gold-cta" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
          <Button asChild variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white"><Link href="/admin/temoignages">Annuler</Link></Button>
        </div>
      </div>
    </div>
  );
}

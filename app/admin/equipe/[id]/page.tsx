"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import AdminFormLayout from "@/components/admin/AdminFormLayout";
import { Loader2 } from "lucide-react";

type MembreEquipe = {
  id: number;
  prenom: string;
  nom: string;
  role: string;
  bio: string | null;
  photo: string | null;
  linkedin: string | null;
  actif: boolean;
  ordre: number;
};

export default function AdminEquipeEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<MembreEquipe>>({
    prenom: "",
    nom: "",
    role: "",
    bio: null,
    photo: null,
    linkedin: null,
    actif: true,
    ordre: 0,
  });

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/equipe/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(setForm)
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const save = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const res = await fetch("/api/admin/equipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        });
        const created = await res.json();
        router.push(`/admin/equipe/${created.id}`);
      } else {
        await fetch(`/api/admin/equipe/${id}`, {
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
      backHref="/admin/equipe"
      title={isNew ? "Nouveau membre" : "Modifier le membre"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Prénom" value={form.prenom ?? ""} onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))} className="border-white/30" />
        <Input label="Nom" value={form.nom ?? ""} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} className="border-white/30" />
      </div>
      <Input label="Rôle" value={form.role ?? ""} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className="border-white/30" />
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium text-white">Bio</label>
        <textarea value={form.bio ?? ""} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value || null }))} rows={3} className="w-full rounded-lg border border-white/30 px-4 py-3" />
      </div>
      <Input label="Photo (URL)" value={form.photo ?? ""} onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value || null }))} className="border-white/30" />
      <Input label="LinkedIn" value={form.linkedin ?? ""} onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value || null }))} className="border-white/30" />
      <label className="flex items-center gap-2 text-white"><input type="checkbox" checked={form.actif ?? true} onChange={(e) => setForm((f) => ({ ...f, actif: e.target.checked }))} className="h-4 w-4 rounded text-gold" /> Actif</label>
      <Input label="Ordre" type="number" value={String(form.ordre ?? 0)} onChange={(e) => setForm((f) => ({ ...f, ordre: parseInt(e.target.value, 10) || 0 }))} className="border-white/30" />
      <div className="flex gap-4">
        <Button variant="primary" className="shadow-gold-cta" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
        <Button asChild variant="ghost" className="text-white hover:bg-white/10"><Link href="/admin/equipe">Annuler</Link></Button>
      </div>
    </AdminFormLayout>
  );
}

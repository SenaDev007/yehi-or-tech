"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, ArrowLeft } from "lucide-react";
import { PROJET_CAT_LABELS } from "@/lib/portfolio";
import type { ProjetCat } from "@prisma/client";

const CATEGORIES = Object.keys(PROJET_CAT_LABELS) as ProjetCat[];

type Projet = {
  id: number;
  slug: string;
  titre: string;
  client: string;
  secteur: string;
  categorie: ProjetCat;
  problematique: string;
  solution: string;
  resultats: string;
  images: string[];
  imagePrincipale: string | null;
  urlExterne: string | null;
  miseEnAvant: boolean;
  publie: boolean;
  temoignage: string | null;
  noteClient: number | null;
  ordre: number;
};

export default function AdminPortfolioEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Projet>>({
    slug: "",
    titre: "",
    client: "",
    secteur: "",
    categorie: "BRANDING",
    problematique: "",
    solution: "",
    resultats: "",
    images: [],
    imagePrincipale: null,
    urlExterne: null,
    miseEnAvant: false,
    publie: false,
    temoignage: null,
    noteClient: null,
    ordre: 0,
  });

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/portfolio/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(setForm)
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const save = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const res = await fetch("/api/admin/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        });
        const created = await res.json();
        router.push(`/admin/portfolio/${created.id}`);
      } else {
        await fetch(`/api/admin/portfolio/${id}`, {
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
      <Link href="/admin/portfolio" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <h1 className="mt-4 font-syne text-2xl font-semibold text-white">
        {isNew ? "Nouveau projet" : "Modifier le projet"}
      </h1>
      <div className="mt-8 max-w-2xl space-y-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Slug" value={form.slug ?? ""} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
          <Input label="Titre" value={form.titre ?? ""} onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Client" value={form.client ?? ""} onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
          <Input label="Secteur" value={form.secteur ?? ""} onChange={(e) => setForm((f) => ({ ...f, secteur: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
        </div>
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Catégorie</label>
          <select value={form.categorie ?? "BRANDING"} onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value as ProjetCat }))} className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white">
            {CATEGORIES.map((c) => <option key={c} value={c} className="bg-navy">{PROJET_CAT_LABELS[c]}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Problématique</label>
          <textarea value={form.problematique ?? ""} onChange={(e) => setForm((f) => ({ ...f, problematique: e.target.value }))} rows={2} className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white" />
        </div>
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Solution</label>
          <textarea value={form.solution ?? ""} onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))} rows={2} className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white" />
        </div>
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Résultats</label>
          <textarea value={form.resultats ?? ""} onChange={(e) => setForm((f) => ({ ...f, resultats: e.target.value }))} rows={2} className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white" />
        </div>
        <Input label="URL externe" value={form.urlExterne ?? ""} onChange={(e) => setForm((f) => ({ ...f, urlExterne: e.target.value || null }))} className="border-white/20 bg-white/5 text-white" />
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-white/90"><input type="checkbox" checked={form.publie ?? false} onChange={(e) => setForm((f) => ({ ...f, publie: e.target.checked }))} className="h-4 w-4 rounded text-gold" /> Publié</label>
          <label className="flex items-center gap-2 text-white/90"><input type="checkbox" checked={form.miseEnAvant ?? false} onChange={(e) => setForm((f) => ({ ...f, miseEnAvant: e.target.checked }))} className="h-4 w-4 rounded text-gold" /> À la une</label>
        </div>
        <Input label="Ordre" type="number" value={String(form.ordre ?? 0)} onChange={(e) => setForm((f) => ({ ...f, ordre: parseInt(e.target.value, 10) || 0 }))} className="border-white/20 bg-white/5 text-white" />
        <div className="flex gap-4">
          <Button variant="primary" className="shadow-gold-cta" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
          <Button asChild variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white"><Link href="/admin/portfolio">Annuler</Link></Button>
        </div>
      </div>
    </div>
  );
}

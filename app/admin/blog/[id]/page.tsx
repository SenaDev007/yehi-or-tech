"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, ArrowLeft } from "lucide-react";
import { BLOG_CAT_LABELS } from "@/lib/blog";
import type { BlogCat } from "@prisma/client";

const CATEGORIES = Object.keys(BLOG_CAT_LABELS) as BlogCat[];
const STATUTS = ["BROUILLON", "PLANIFIE", "PUBLIE"];

type Article = {
  id: number;
  slug: string;
  titre: string;
  extrait: string;
  contenu: string;
  couverture: string | null;
  auteur: string;
  categorie: BlogCat;
  tags: string[];
  metaTitle: string | null;
  metaDesc: string | null;
  statut: string;
  publishedAt: string | null;
};

export default function AdminBlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Article>>({
    slug: "",
    titre: "",
    extrait: "",
    contenu: "",
    couverture: null,
    auteur: "",
    categorie: "ACTUALITES",
    tags: [],
    metaTitle: null,
    metaDesc: null,
    statut: "BROUILLON",
    publishedAt: null,
  });

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/blog/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(setForm)
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const save = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        });
        const created = await res.json();
        router.push(`/admin/blog/${created.id}`);
      } else {
        await fetch(`/api/admin/blog/${id}`, {
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
      <Link href="/admin/blog" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <h1 className="mt-4 font-syne text-2xl font-semibold text-white">
        {isNew ? "Nouvel article" : "Modifier l’article"}
      </h1>
      <div className="mt-8 max-w-2xl space-y-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Slug" value={form.slug ?? ""} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
          <Input label="Titre" value={form.titre ?? ""} onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
        </div>
        <Input label="Auteur" value={form.auteur ?? ""} onChange={(e) => setForm((f) => ({ ...f, auteur: e.target.value }))} className="border-white/20 bg-white/5 text-white" />
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Catégorie</label>
          <select value={form.categorie ?? "ACTUALITES"} onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value as BlogCat }))} className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white">
            {CATEGORIES.map((c) => <option key={c} value={c} className="bg-navy">{BLOG_CAT_LABELS[c]}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Extrait</label>
          <textarea value={form.extrait ?? ""} onChange={(e) => setForm((f) => ({ ...f, extrait: e.target.value }))} rows={2} className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white" />
        </div>
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Contenu</label>
          <textarea value={form.contenu ?? ""} onChange={(e) => setForm((f) => ({ ...f, contenu: e.target.value }))} rows={8} className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white" />
        </div>
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Statut</label>
          <select value={form.statut ?? "BROUILLON"} onChange={(e) => setForm((f) => ({ ...f, statut: e.target.value }))} className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white">
            {STATUTS.map((s) => <option key={s} value={s} className="bg-navy">{s}</option>)}
          </select>
        </div>
        <div className="flex gap-4">
          <Button variant="primary" className="shadow-gold-cta" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
          <Button asChild variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white"><Link href="/admin/blog">Annuler</Link></Button>
        </div>
      </div>
    </div>
  );
}

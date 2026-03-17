"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import AdminFormLayout from "@/components/admin/AdminFormLayout";
import { Loader2 } from "lucide-react";
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
    <AdminFormLayout
      backHref="/admin/blog"
      title={isNew ? "Nouvel article" : "Modifier l\u2019article"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Slug" value={form.slug ?? ""} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="border-white/30" />
        <Input label="Titre" value={form.titre ?? ""} onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} className="border-white/30" />
      </div>
      <Input label="Auteur" value={form.auteur ?? ""} onChange={(e) => setForm((f) => ({ ...f, auteur: e.target.value }))} className="border-white/30" />
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium text-white">Catégorie</label>
        <select value={form.categorie ?? "ACTUALITES"} onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value as BlogCat }))} className="w-full rounded-lg border border-white/30 px-4 py-3">
          {CATEGORIES.map((c) => <option key={c} value={c}>{BLOG_CAT_LABELS[c]}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium text-white">Extrait</label>
        <textarea value={form.extrait ?? ""} onChange={(e) => setForm((f) => ({ ...f, extrait: e.target.value }))} rows={2} className="w-full rounded-lg border border-white/30 px-4 py-3" />
      </div>
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium text-white">Contenu</label>
        <textarea value={form.contenu ?? ""} onChange={(e) => setForm((f) => ({ ...f, contenu: e.target.value }))} rows={8} className="w-full rounded-lg border border-white/30 px-4 py-3" />
      </div>
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium text-white">Statut</label>
        <select value={form.statut ?? "BROUILLON"} onChange={(e) => setForm((f) => ({ ...f, statut: e.target.value }))} className="w-full rounded-lg border border-white/30 px-4 py-3">
          {STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" className="shadow-gold-cta" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
        <Button asChild variant="ghost" className="text-white hover:bg-white/10"><Link href="/admin/blog">Annuler</Link></Button>
      </div>
    </AdminFormLayout>
  );
}

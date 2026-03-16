"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import AdminFormLayout from "@/components/admin/AdminFormLayout";
import { Loader2 } from "lucide-react";
import { SERVICE_CAT_LABELS } from "@/lib/services";
import type { ServiceCat } from "@prisma/client";

type Service = {
  id: number;
  slug: string;
  nom: string;
  categorie: ServiceCat;
  icone: string;
  descCourte: string;
  descLongue: string;
  processus: string[];
  livrables: string[];
  nonInclus: string[];
  delai: string;
  badge: string | null;
  actif: boolean;
  ordre: number;
  tarifs: Array<{ id?: number; niveau: string; formule: string; prixMin: number; prixMax: number; note: string | null; ordre: number }>;
};

const CATEGORIES = Object.keys(SERVICE_CAT_LABELS) as ServiceCat[];

export default function AdminServiceEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Service>>({
    slug: "",
    nom: "",
    categorie: "BRANDING",
    icone: "Circle",
    descCourte: "",
    descLongue: "",
    processus: [],
    livrables: [],
    nonInclus: [],
    delai: "",
    badge: null,
    actif: true,
    ordre: 0,
    tarifs: [
      { niveau: "Essentiel", formule: "", prixMin: 0, prixMax: 0, note: null, ordre: 1 },
      { niveau: "Standard", formule: "", prixMin: 0, prixMax: 0, note: null, ordre: 2 },
      { niveau: "Premium", formule: "", prixMin: 0, prixMax: 0, note: null, ordre: 3 },
    ],
  });

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/services/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setForm(data))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const save = async () => {
    setSaving(true);
    try {
      const url = isNew ? "/api/admin/services" : `/api/admin/services/${id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur");
      router.push("/admin/services");
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
      backHref="/admin/services"
      title={isNew ? "Nouveau service" : "Modifier le service"}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nom"
          value={form.nom ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
          className="border-white/30"
        />
        <Input
          label="Slug"
          value={form.slug ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          className="border-white/30"
        />
      </div>
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium text-white">Catégorie</label>
        <select
          value={form.categorie ?? "BRANDING"}
          onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value as ServiceCat }))}
          className="w-full rounded-lg border border-white/30 px-4 py-3"
        >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-navy">
                {SERVICE_CAT_LABELS[c]}
              </option>
            ))}
          </select>
        </div>
      <Input
        label="Description courte"
        value={form.descCourte ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, descCourte: e.target.value }))}
        className="border-white/30"
      />
      <div>
        <label className="mb-1.5 block font-syne text-sm font-medium text-white">Description longue</label>
        <textarea
          value={form.descLongue ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, descLongue: e.target.value }))}
          rows={4}
          className="w-full rounded-lg border border-white/30 px-4 py-3"
        />
      </div>
      <Input
        label="Délai"
        value={form.delai ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, delai: e.target.value }))}
        className="border-white/30"
      />
      <Input
        label="Badge (optionnel)"
        value={form.badge ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value || null }))}
        className="border-white/30"
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="actif"
          checked={form.actif ?? true}
          onChange={(e) => setForm((f) => ({ ...f, actif: e.target.checked }))}
          className="h-4 w-4 rounded text-gold"
        />
        <label htmlFor="actif" className="text-white">Actif</label>
      </div>
      <Input
        label="Ordre"
        type="number"
        value={String(form.ordre ?? 0)}
        onChange={(e) => setForm((f) => ({ ...f, ordre: parseInt(e.target.value, 10) || 0 }))}
        className="border-white/30"
      />

      <div>
        <h3 className="font-syne font-medium text-white">Tarifs</h3>
        <div className="mt-2 space-y-3">
          {(form.tarifs ?? []).map((t, i) => (
            <div key={i} className="rounded-lg border border-white/20 bg-white/5 p-3">
              <p className="text-sm font-medium text-gold">{t.niveau}</p>
              <input
                placeholder="Formule"
                value={t.formule}
                onChange={(e) => {
                  const next = [...(form.tarifs ?? [])];
                  next[i] = { ...next[i], formule: e.target.value };
                  setForm((f) => ({ ...f, tarifs: next }));
                }}
                className="mt-1 w-full rounded border border-white/30 px-2 py-1 text-sm"
              />
              <div className="mt-2 flex gap-2">
                <input
                  type="number"
                  placeholder="Prix min"
                  value={t.prixMin || ""}
                  onChange={(e) => {
                    const next = [...(form.tarifs ?? [])];
                    next[i] = { ...next[i], prixMin: parseInt(e.target.value, 10) || 0 };
                    setForm((f) => ({ ...f, tarifs: next }));
                  }}
                  className="w-24 rounded border border-white/30 px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  placeholder="Prix max"
                  value={t.prixMax || ""}
                  onChange={(e) => {
                    const next = [...(form.tarifs ?? [])];
                    next[i] = { ...next[i], prixMax: parseInt(e.target.value, 10) || 0 };
                    setForm((f) => ({ ...f, tarifs: next }));
                  }}
                  className="w-24 rounded border border-white/30 px-2 py-1 text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="primary"
          className="shadow-gold-cta"
          onClick={save}
          disabled={saving}
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
        <Button asChild variant="ghost" className="text-white hover:bg-white/10">
          <Link href="/admin/services">Annuler</Link>
        </Button>
      </div>
    </AdminFormLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { FileText, Loader2 } from "lucide-react";
import { BLOG_CAT_LABELS } from "@/lib/blog";
import type { BlogCat } from "@prisma/client";

type Article = {
  id: number;
  slug: string;
  titre: string;
  auteur: string;
  categorie: BlogCat;
  statut: string;
  vues: number;
  publishedAt: string | null;
  updatedAt: string;
};

export default function AdminBlogPage() {
  const [list, setList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/blog", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-syne text-2xl font-semibold text-white flex items-center gap-2">
          <FileText className="h-7 w-7 text-gold" />
          Blog
        </h1>
        <Button asChild variant="primary" className="shadow-gold-cta">
          <Link href="/admin/blog/new">Nouvel article</Link>
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-8">
          <AdminTable<Article>
            columns={[
              { key: "titre", label: "Titre" },
              { key: "slug", label: "Slug" },
              { key: "auteur", label: "Auteur" },
              {
                key: "categorie",
                label: "Catégorie",
                render: (a) => BLOG_CAT_LABELS[a.categorie] ?? a.categorie,
              },
              { key: "statut", label: "Statut" },
              { key: "vues", label: "Vues" },
              {
                key: "publishedAt",
                label: "Publié le",
                render: (a) =>
                  a.publishedAt ? new Date(a.publishedAt).toLocaleDateString("fr-FR") : "—",
              },
            ]}
            data={list}
            baseEditPath="/admin/blog"
            emptyMessage="Aucun article"
          />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { FolderKanban, Loader2 } from "lucide-react";
import { PROJET_CAT_LABELS } from "@/lib/portfolio";
import type { ProjetCat } from "@prisma/client";

type Projet = {
  id: number;
  slug: string;
  titre: string;
  client: string;
  secteur: string;
  categorie: ProjetCat;
  publie: boolean;
  miseEnAvant: boolean;
  ordre: number;
};

export default function AdminPortfolioPage() {
  const [list, setList] = useState<Projet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/portfolio", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-syne text-xl font-semibold text-white flex items-center gap-2 sm:text-2xl">
          <FolderKanban className="h-6 w-6 sm:h-7 sm:w-7 text-gold" />
          Portfolio
        </h1>
        <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
          <Link href="/admin/portfolio/new">Nouveau projet</Link>
        </Button>
      </div>

      {loading ? (
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-6 sm:mt-8">
          <AdminTable<Projet>
            columns={[
              { key: "ordre", label: "Ordre" },
              { key: "titre", label: "Titre" },
              { key: "client", label: "Client" },
              { key: "secteur", label: "Secteur" },
              {
                key: "categorie",
                label: "Catégorie",
                render: (p) => PROJET_CAT_LABELS[p.categorie] ?? p.categorie,
              },
              { key: "publie", label: "Publié", render: (p) => (p.publie ? "Oui" : "Non") },
              { key: "miseEnAvant", label: "À la une", render: (p) => (p.miseEnAvant ? "Oui" : "Non") },
            ]}
            data={list}
            baseEditPath="/admin/portfolio"
            emptyMessage="Aucun projet"
          />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { PenTool, Loader2 } from "lucide-react";
import { SERVICE_CAT_LABELS } from "@/lib/services";
import type { ServiceCat } from "@prisma/client";

type Service = {
  id: number;
  slug: string;
  nom: string;
  categorie: ServiceCat;
  actif: boolean;
  ordre: number;
  badge: string | null;
};

export default function AdminServicesPage() {
  const [list, setList] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/services", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-syne text-xl font-semibold text-white flex items-center gap-2 sm:text-2xl">
          <PenTool className="h-7 w-7 text-gold" />
          Services
        </h1>
        <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
          <Link href="/admin/services/new">Nouveau service</Link>
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-6 sm:mt-8">
          <AdminTable<Service>
            columns={[
              { key: "ordre", label: "Ordre" },
              { key: "nom", label: "Nom" },
              { key: "slug", label: "Slug" },
              {
                key: "categorie",
                label: "Catégorie",
                render: (s) => SERVICE_CAT_LABELS[s.categorie] ?? s.categorie,
              },
              {
                key: "actif",
                label: "Actif",
                render: (s) => (s.actif ? "Oui" : "Non"),
              },
              { key: "badge", label: "Badge" },
            ]}
            data={list}
            baseEditPath="/admin/services"
            emptyMessage="Aucun service"
          />
        </div>
      )}
    </div>
  );
}

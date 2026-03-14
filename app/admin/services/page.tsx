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
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-syne text-2xl font-semibold text-white flex items-center gap-2">
          <PenTool className="h-7 w-7 text-gold" />
          Services
        </h1>
        <Button asChild variant="primary" className="shadow-gold-cta">
          <Link href="/admin/services/new">Nouveau service</Link>
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-8">
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

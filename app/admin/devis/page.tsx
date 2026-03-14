"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { FileCheck, Loader2 } from "lucide-react";

type Devis = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string | null;
  services: string[];
  description: string;
  statut: string;
  source: string | null;
  createdAt: string;
};

export default function AdminDevisPage() {
  const [list, setList] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/devis", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="font-syne text-2xl font-semibold text-white flex items-center gap-2">
        <FileCheck className="h-7 w-7 text-gold" />
        Demandes devis
      </h1>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-8">
          <AdminTable<Devis>
            columns={[
              { key: "prenom", label: "Prénom" },
              { key: "nom", label: "Nom" },
              { key: "email", label: "Email" },
              { key: "telephone", label: "Téléphone" },
              {
                key: "services",
                label: "Services",
                render: (d) => (Array.isArray(d.services) ? d.services.join(", ") : ""),
              },
              { key: "statut", label: "Statut" },
              {
                key: "source",
                label: "Source",
                render: (d) => d.source ?? "site",
              },
              {
                key: "createdAt",
                label: "Date",
                render: (d) => new Date(d.createdAt).toLocaleString("fr-FR"),
              },
            ]}
            data={list}
            baseEditPath="/admin/devis"
            emptyMessage="Aucune demande"
          />
        </div>
      )}
    </div>
  );
}

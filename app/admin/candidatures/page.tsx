"use client";

import { useState, useEffect } from "react";
import AdminTable from "@/components/admin/AdminTable";
import { UserPlus, Loader2 } from "lucide-react";

type Candidature = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  poste: string;
  type: string;
  statut: string;
  createdAt: string;
};

export default function AdminCandidaturesPage() {
  const [list, setList] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/candidatures", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="font-syne text-2xl font-semibold text-white flex items-center gap-2">
        <UserPlus className="h-7 w-7 text-gold" />
        Candidatures
      </h1>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-8">
          <AdminTable<Candidature>
            columns={[
              { key: "prenom", label: "Prénom" },
              { key: "nom", label: "Nom" },
              { key: "email", label: "Email" },
              { key: "poste", label: "Poste" },
              { key: "type", label: "Type" },
              { key: "statut", label: "Statut" },
              {
                key: "createdAt",
                label: "Date",
                render: (c) => new Date(c.createdAt).toLocaleString("fr-FR"),
              },
            ]}
            data={list}
            baseEditPath="/admin/candidatures"
            emptyMessage="Aucune candidature"
          />
        </div>
      )}
    </div>
  );
}

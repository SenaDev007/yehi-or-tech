"use client";

import { useState, useEffect } from "react";
import AdminTable from "@/components/admin/AdminTable";
import { Newspaper, Loader2 } from "lucide-react";

type Abonne = {
  id: number;
  email: string;
  actif: boolean;
  createdAt: string;
};

export default function AdminNewsletterPage() {
  const [list, setList] = useState<Abonne[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/newsletter", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="font-syne text-xl font-semibold text-white flex items-center gap-2 sm:text-2xl">
        <Newspaper className="h-7 w-7 text-gold" />
        Newsletter — Abonnés
      </h1>

      {loading ? (
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-6 sm:mt-8">
          <AdminTable<Abonne>
            columns={[
              { key: "email", label: "Email" },
              { key: "actif", label: "Actif", render: (a) => (a.actif ? "Oui" : "Non") },
              {
                key: "createdAt",
                label: "Inscrit le",
                render: (a) => new Date(a.createdAt).toLocaleString("fr-FR"),
              },
            ]}
            data={list}
            emptyMessage="Aucun abonné"
          />
        </div>
      )}
    </div>
  );
}

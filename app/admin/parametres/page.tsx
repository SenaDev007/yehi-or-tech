"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { Settings, Loader2 } from "lucide-react";

type Parametre = {
  id: number;
  cle: string;
  valeur: string;
};

export default function AdminParametresPage() {
  const [list, setList] = useState<Parametre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/parametres", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="font-syne text-xl font-semibold text-white flex items-center gap-2 sm:text-2xl">
        <Settings className="h-7 w-7 text-gold" />
        Paramètres
      </h1>

      {loading ? (
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-6 sm:mt-8">
          <AdminTable<Parametre>
            columns={[
              { key: "cle", label: "Clé" },
              {
                key: "valeur",
                label: "Valeur",
                render: (p) => (p.valeur.length > 60 ? `${p.valeur.slice(0, 60)}…` : p.valeur),
              },
            ]}
            data={list}
            baseEditPath="/admin/parametres"
            emptyMessage="Aucun paramètre"
          />
        </div>
      )}
    </div>
  );
}

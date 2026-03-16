"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { Users, Loader2 } from "lucide-react";

type MembreEquipe = {
  id: number;
  prenom: string;
  nom: string;
  role: string;
  actif: boolean;
  ordre: number;
};

export default function AdminEquipePage() {
  const [list, setList] = useState<MembreEquipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/equipe", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-syne text-xl font-semibold text-white flex items-center gap-2 sm:text-2xl">
          <Users className="h-7 w-7 text-gold" />
          Équipe
        </h1>
        <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
          <Link href="/admin/equipe/new">Nouveau membre</Link>
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-6 sm:mt-8">
          <AdminTable<MembreEquipe>
            columns={[
              { key: "ordre", label: "Ordre" },
              { key: "prenom", label: "Prénom" },
              { key: "nom", label: "Nom" },
              { key: "role", label: "Rôle" },
              { key: "actif", label: "Actif", render: (m) => (m.actif ? "Oui" : "Non") },
            ]}
            data={list}
            baseEditPath="/admin/equipe"
            emptyMessage="Aucun membre"
          />
        </div>
      )}
    </div>
  );
}

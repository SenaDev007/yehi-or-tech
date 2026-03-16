"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Loader2 } from "lucide-react";

type Temoignage = {
  id: number;
  prenom: string;
  nom: string;
  entreprise: string;
  poste: string;
  texte: string;
  note: number;
  verifie: boolean;
  visible: boolean;
  ordre: number;
};

export default function AdminTemoignagesPage() {
  const [list, setList] = useState<Temoignage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/temoignages", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-syne text-xl font-semibold text-white flex items-center gap-2 sm:text-2xl">
          <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-gold" />
          Témoignages
        </h1>
        <Button asChild variant="primary" className="shadow-gold-cta min-h-[44px] w-full sm:w-auto">
          <Link href="/admin/temoignages/new">Nouveau témoignage</Link>
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-6 sm:mt-8">
          <AdminTable<Temoignage>
            columns={[
              { key: "ordre", label: "Ordre" },
              { key: "prenom", label: "Prénom" },
              { key: "nom", label: "Nom" },
              { key: "entreprise", label: "Entreprise" },
              { key: "poste", label: "Poste" },
              { key: "note", label: "Note" },
              { key: "verifie", label: "Vérifié", render: (t) => (t.verifie ? "Oui" : "Non") },
              { key: "visible", label: "Visible", render: (t) => (t.visible ? "Oui" : "Non") },
            ]}
            data={list}
            baseEditPath="/admin/temoignages"
            emptyMessage="Aucun témoignage"
          />
        </div>
      )}
    </div>
  );
}

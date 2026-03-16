"use client";

import { useState, useEffect } from "react";
import AdminTable from "@/components/admin/AdminTable";
import { Mail, Loader2 } from "lucide-react";

type Message = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  sujet: string;
  message: string;
  statut: string;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [list, setList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="font-syne text-xl font-semibold text-white flex items-center gap-2 sm:text-2xl">
        <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-gold" />
        Messages contact
      </h1>

      {loading ? (
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-6 sm:mt-8">
          <AdminTable<Message>
            columns={[
              { key: "prenom", label: "Prénom" },
              { key: "nom", label: "Nom" },
              { key: "email", label: "Email" },
              { key: "sujet", label: "Sujet" },
              { key: "statut", label: "Statut" },
              {
                key: "createdAt",
                label: "Date",
                render: (m) => new Date(m.createdAt).toLocaleString("fr-FR"),
              },
            ]}
            data={list}
            baseEditPath="/admin/messages"
            emptyMessage="Aucun message"
          />
        </div>
      )}
    </div>
  );
}

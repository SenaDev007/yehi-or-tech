"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { UserCog, Loader2 } from "lucide-react";

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  lastLogin: string | null;
  createdAt: string;
};

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITEUR: "Éditeur",
  LECTEUR: "Lecteur",
};

export default function AdminUtilisateursPage() {
  const [list, setList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/utilisateurs", { credentials: "include" })
      .then((res) => res.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-syne text-2xl font-semibold text-white flex items-center gap-2">
          <UserCog className="h-7 w-7 text-gold" />
          Utilisateurs
        </h1>
        <Button asChild variant="primary" className="shadow-gold-cta">
          <Link href="/admin/utilisateurs/new">Nouvel utilisateur</Link>
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : (
        <div className="mt-8">
          <AdminTable<User>
            columns={[
              { key: "email", label: "Email" },
              { key: "name", label: "Nom" },
              {
                key: "role",
                label: "Rôle",
                render: (u) => ROLE_LABELS[u.role] ?? u.role,
              },
              {
                key: "lastLogin",
                label: "Dernière connexion",
                render: (u) =>
                  u.lastLogin ? new Date(u.lastLogin).toLocaleString("fr-FR") : "—",
              },
              {
                key: "createdAt",
                label: "Créé le",
                render: (u) => new Date(u.createdAt).toLocaleDateString("fr-FR"),
              },
            ]}
            data={list}
            baseEditPath="/admin/utilisateurs"
            emptyMessage="Aucun utilisateur"
          />
        </div>
      )}
    </div>
  );
}

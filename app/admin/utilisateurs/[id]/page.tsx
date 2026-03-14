"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, ArrowLeft } from "lucide-react";

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  lastLogin: string | null;
  createdAt: string;
};

const ROLES = ["SUPER_ADMIN", "ADMIN", "EDITEUR", "LECTEUR"];

export default function AdminUtilisateurEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const [item, setItem] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("EDITEUR");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/utilisateurs/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setName(data.name ?? "");
        setEmail(data.email ?? "");
        setRole(data.role ?? "EDITEUR");
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const save = async () => {
    setSaving(true);
    try {
      if (isNew) {
        if (!password || password.length < 8) {
          setSaving(false);
          return;
        }
        const res = await fetch("/api/admin/utilisateurs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, role, password }),
        });
        if (!res.ok) throw new Error("Erreur");
        router.push("/admin/utilisateurs");
      } else {
        const body: { name: string; email: string; role: string; password?: string } = {
          name,
          email,
          role,
        };
        if (password.length >= 8) body.password = password;
        const res = await fetch(`/api/admin/utilisateurs/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Erreur");
        router.push("/admin/utilisateurs");
      }
      router.refresh();
    } catch {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }
  if (!isNew && !item) {
    return (
      <div className="p-6">
        <Link href="/admin/utilisateurs" className="text-gold hover:underline">← Retour</Link>
        <p className="mt-4 text-white/80">Utilisateur introuvable.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link
        href="/admin/utilisateurs"
        className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <h1 className="mt-4 font-syne text-2xl font-semibold text-white">
        {isNew ? "Nouvel utilisateur" : "Modifier l’utilisateur"}
      </h1>

      <div className="mt-8 max-w-xl space-y-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <Input
          label="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-white/20 bg-white/5 text-white"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-white/20 bg-white/5 text-white"
        />
        <div>
          <label className="mb-1.5 block font-syne text-sm font-medium text-white/90">Rôle</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white"
          >
            {ROLES.map((r) => (
              <option key={r} value={r} className="bg-navy">{r}</option>
            ))}
          </select>
        </div>
        <Input
          label={isNew ? "Mot de passe" : "Nouveau mot de passe (laisser vide pour ne pas changer)"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-white/20 bg-white/5 text-white"
          placeholder="Min. 8 caractères"
          required={isNew}
        />
        <div className="flex gap-4">
          <Button variant="primary" onClick={save} disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
          <Button asChild variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
            <Link href="/admin/utilisateurs">Annuler</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

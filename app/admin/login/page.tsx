/**
 * Page de connexion admin — formulaire email / mot de passe.
 * Design aligné charte YEHI OR Tech : navy, or, logo.
 * CDC v1.4 — JWT cookie après succès.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Identifiants incorrects");
        setLoading(false);
        return;
      }
      router.push(from);
      router.refresh();
    } catch {
      setError("Erreur de connexion");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-dark-bg overflow-hidden">
      {/* Fond dégradé + motif discret */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13, 46, 140, 0.4), transparent 50%), linear-gradient(180deg, var(--dark-bg) 0%, #0A0F1E 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 opacity-30" aria-hidden>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(245, 168, 0, 0.08) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="w-full max-w-md px-4 sm:px-6">
        {/* Carte principale */}
        <div className="rounded-2xl border border-gold/20 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-sm sm:rounded-3xl">
          {/* Bandeau or */}
          <div className="h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-gold to-transparent sm:rounded-t-3xl" />

          <div className="p-6 sm:p-8">
            {/* Logo + titre */}
            <div className="flex flex-col items-center text-center">
              <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-dark-bg rounded-lg">
                <Image
                  src={IMAGES.ui.logo}
                  alt="YEHI OR Tech"
                  width={140}
                  height={42}
                  className="h-10 w-auto object-contain sm:h-12"
                />
              </Link>
              <h1 className="mt-6 font-syne text-xl font-bold text-white sm:text-2xl">
                Espace admin
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Connectez-vous pour accéder au backoffice
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5 [&_label]:text-white/90 [&_label]:font-medium"
            >
              <div className="relative [&_input]:pl-10">
                <span className="pointer-events-none absolute left-3 top-12 text-gray-400">
                  <Mail className="h-5 w-5" />
                </span>
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@yehiortech.com"
                  className="!bg-white !text-gray-900 placeholder:!text-gray-500 border-gray-200 py-3 focus:border-gold focus:ring-gold/40"
                />
              </div>

              <div className="relative [&_input]:pl-10">
                <span className="pointer-events-none absolute left-3 top-12 text-gray-400">
                  <Lock className="h-5 w-5" />
                </span>
                <Input
                  label="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="!bg-white !text-gray-900 placeholder:!text-gray-500 border-gray-200 py-3 focus:border-gold focus:ring-gold/40"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-error/50 bg-error-lt/10 px-4 py-3">
                  <p className="text-sm text-error" role="alert">
                    {error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full min-h-[48px] gap-2 font-syne font-semibold shadow-gold-cta hover:bg-[#FFB800]"
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Lien retour */}
        <p className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-gold"
          >
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}

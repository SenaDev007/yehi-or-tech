"use client";

/**
 * Layout centré pour les pages d'ajout/édition admin.
 * Formulaire centré, labels et champs lisibles sur fond sombre.
 */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AdminFormLayoutProps {
  backHref: string;
  backLabel?: string;
  title: string;
  children: React.ReactNode;
}

export default function AdminFormLayout({
  backHref,
  backLabel = "Retour",
  title,
  children,
}: AdminFormLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-white/80 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> {backLabel}
      </Link>
      <h1 className="mt-4 font-syne text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h1>
      <div
        data-admin-form
        className="mt-8 space-y-6 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg sm:p-8 [&_label]:!text-white [&_input]:!bg-white [&_input]:!text-gray-900 [&_input]:!border-gray-200 [&_textarea]:!bg-white [&_textarea]:!text-gray-900 [&_textarea]:!border-gray-200 [&_select]:!bg-white [&_select]:!text-gray-900 [&_select]:!border-gray-200 [&_option]:!bg-white [&_option]:!text-gray-900"
      >
        {children}
      </div>
    </div>
  );
}

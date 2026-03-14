"use client";

/**
 * Filtres sticky — Tous · Branding · Web · Impression · Packs · Crédibilité · Formations · Hébergement.
 * CDC v1.4
 */

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SERVICE_CAT_LABELS } from "@/lib/services";
import type { ServiceCat } from "@prisma/client";
import { Badge } from "@/components/ui/Badge";

const CATEGORIES: { value: "TOUS" | ServiceCat; label: string }[] = [
  { value: "TOUS", label: "Tous" },
  ...(Object.entries(SERVICE_CAT_LABELS) as [ServiceCat, string][]).map(
    ([value, label]) => ({ value, label })
  ),
];

export default function ServiceFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("categorie") || "TOUS";

  return (
    <div className="sticky top-[70px] z-30 border-b border-blue-lt bg-white/95 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4">
        {CATEGORIES.map(({ value, label }) => {
          const href = value === "TOUS" ? "/services" : `/services?categorie=${value}`;
          const isActive = current === value;
          return (
            <Link
              key={value}
              href={href}
              className={`rounded-lg px-4 py-2 font-syne text-sm font-medium transition ${
                isActive
                  ? "bg-gold text-black shadow-gold-cta"
                  : "bg-blue-xl/50 text-navy hover:bg-blue-lt"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

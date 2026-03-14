"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BLOG_CAT_LABELS } from "@/lib/blog";
import type { BlogCat } from "@prisma/client";

const CATEGORIES: { value: "TOUS" | BlogCat; label: string }[] = [
  { value: "TOUS", label: "Tous" },
  ...(Object.entries(BLOG_CAT_LABELS) as [BlogCat, string][]).map(
    ([value, label]) => ({ value, label })
  ),
];

export default function BlogFilters() {
  const searchParams = useSearchParams();
  const current = searchParams.get("categorie") || "TOUS";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {CATEGORIES.map(({ value, label }) => {
        const href = value === "TOUS" ? "/blog" : `/blog?categorie=${value}`;
        const isActive = current === value;
        return (
          <Link
            key={value}
            href={href}
            className={`rounded-lg px-4 py-2 font-syne text-sm font-medium transition ${
              isActive ? "bg-gold text-black" : "bg-blue-xl/50 text-navy hover:bg-blue-lt"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

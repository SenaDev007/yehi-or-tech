"use client";

/**
 * Tableau admin — en-têtes + lignes cliquables ou actions.
 * CDC v1.4
 */

import Link from "next/link";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

export interface AdminTableProps<T extends { id: number }> {
  columns: Column<T>[];
  data: T[];
  baseEditPath?: string;
  idKey?: keyof T;
  emptyMessage?: string;
}

export default function AdminTable<T extends { id: number }>({
  columns,
  data,
  baseEditPath,
  idKey = "id",
  emptyMessage = "Aucun élément",
}: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <p className="rounded-lg sm:rounded-xl border border-white/15 bg-white/[0.06] p-4 sm:p-8 text-center text-sm text-white sm:text-base">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg sm:rounded-xl border border-white/10 bg-white/5 -mx-2 sm:mx-0">
      <table className="w-full min-w-[600px] text-left text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-2 py-2 sm:px-4 sm:py-3 font-syne font-medium text-white whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
            {baseEditPath && (
              <th className="px-2 py-2 sm:px-4 sm:py-3 font-syne font-medium text-white whitespace-nowrap">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white/[0.015]">
          {data.map((item) => (
            <tr
              key={String(item[idKey])}
              className="border-b border-white/5 transition hover:bg-white/10 even:bg-white/[0.03]"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-2 py-2 sm:px-4 sm:py-3 text-white">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
              {baseEditPath && (
                <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                  <Link
                    href={`${baseEditPath}/${item[idKey]}`}
                    className="text-gold hover:underline inline-flex items-center min-h-[44px] sm:min-h-0"
                  >
                    Modifier
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

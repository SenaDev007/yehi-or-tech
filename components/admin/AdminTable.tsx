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
      <p className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-syne font-medium text-white/90"
              >
                {col.label}
              </th>
            ))}
            {baseEditPath && (
              <th className="px-4 py-3 font-syne font-medium text-white/90">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={String(item[idKey])}
              className="border-b border-white/5 transition hover:bg-white/5"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-white/80">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
              {baseEditPath && (
                <td className="px-4 py-3">
                  <Link
                    href={`${baseEditPath}/${item[idKey]}`}
                    className="text-gold hover:underline"
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

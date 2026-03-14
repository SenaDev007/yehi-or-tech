/**
 * Layout admin — Sidebar + contenu (AdminLayout masque sidebar sur login).
 * CDC v1.4
 */

import AdminLayoutClient from "@/components/admin/AdminLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

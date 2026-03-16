"use client";

/**
 * Sidebar admin — design moderne, logo, navigation claire.
 * Responsive : drawer sur mobile, fixe sur desktop.
 */

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenTool,
  FolderKanban,
  FileText,
  MessageSquare,
  Users,
  MessageCircle,
  FileCheck,
  Mail,
  UserPlus,
  Newspaper,
  Settings,
  UserCog,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";
import { IMAGES } from "@/lib/images";

const ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: PenTool },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/temoignages", label: "Témoignages", icon: MessageSquare },
  { href: "/admin/equipe", label: "Équipe", icon: Users },
  { href: "/admin/elior", label: "Elior IA", icon: MessageCircle },
  { href: "/admin/devis", label: "Demandes devis", icon: FileCheck },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/candidatures", label: "Candidatures", icon: UserPlus },
  { href: "/admin/newsletter", label: "Newsletter", icon: Newspaper },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: UserCog },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-[#0a0f2a] text-white shadow-xl transition-transform duration-200 lg:relative lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Bandeau or en haut */}
      <div className="h-1 shrink-0 bg-gradient-to-r from-transparent via-gold to-transparent opacity-90" />

      <div className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2 min-w-0">
          <Image
            src={IMAGES.ui.logo}
            alt="YEHI OR Tech"
            width={100}
            height={30}
            className="h-7 w-auto shrink-0 object-contain"
          />
          <span className="font-syne text-sm font-bold text-white truncate">YEHI OR Tech</span>
          <span className="shrink-0 rounded bg-gold/20 px-1.5 py-0.5 font-syne text-[10px] font-semibold uppercase tracking-wider text-gold">
            Admin
          </span>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white transition hover:bg-gold/30 hover:text-black lg:hidden"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <ul className="space-y-0.5">
          {ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={`flex min-h-[42px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gold/15 text-gold shadow-sm ring-1 ring-gold/30"
                      : "text-white border-l-4 border-transparent hover:bg-gold/25 hover:border-gold hover:shadow-md"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 opacity-90" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="shrink-0 space-y-1 border-t border-white/10 p-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[42px] w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white transition border-l-4 border-transparent hover:bg-gold/25 hover:border-gold hover:shadow-md"
        >
          <ExternalLink className="h-5 w-5 shrink-0" />
          Voir le site
        </Link>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex min-h-[42px] w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white transition border-l-4 border-transparent hover:bg-gold/25 hover:border-gold hover:shadow-md"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}

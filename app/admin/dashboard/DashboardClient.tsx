"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FileCheck,
  Mail,
  UserPlus,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

type Props = {
  stats: {
    devisTotal: number;
    devisNouveaux: number;
    messagesTotal: number;
    messagesNonLus: number;
    candidaturesTotal: number;
    conversationsTotal: number;
  };
  devisParMois: { mois: string; total: number }[];
};

export default function DashboardClient({ stats, devisParMois }: Props) {
  const cards = [
    {
      label: "Demandes devis",
      value: stats.devisTotal,
      sub: `${stats.devisNouveaux} non traitées`,
      icon: FileCheck,
      href: "/admin/devis",
      accent: stats.devisNouveaux > 0,
    },
    {
      label: "Messages contact",
      value: stats.messagesTotal,
      sub: `${stats.messagesNonLus} non lus`,
      icon: Mail,
      href: "/admin/messages",
      accent: stats.messagesNonLus > 0,
    },
    {
      label: "Candidatures",
      value: stats.candidaturesTotal,
      sub: "",
      icon: UserPlus,
      href: "/admin/candidatures",
    },
    {
      label: "Conversations Elior",
      value: stats.conversationsTotal,
      sub: "",
      icon: MessageCircle,
      href: "/admin/elior",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="font-syne text-2xl font-semibold text-white">
        Dashboard
      </h1>
      <p className="mt-1 text-white/70">
        Vue d&apos;ensemble du backoffice
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, sub, icon: Icon, href, accent }) => (
          <Link
            key={href}
            href={href}
            className={`rounded-xl border p-6 transition hover:border-gold/50 ${
              accent ? "border-gold/50 bg-gold/5" : "border-white/10 bg-white/5"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/70">{label}</p>
                <p className="mt-2 font-syne text-2xl font-bold text-white">
                  {value}
                </p>
                {sub && (
                  <p className="mt-1 text-xs text-gold">{sub}</p>
                )}
              </div>
              <Icon className="h-8 w-8 text-gold/70" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-syne font-semibold text-white">
          Demandes de devis (6 derniers mois)
        </h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={devisParMois}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="mois" stroke="rgba(255,255,255,0.6)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0D2E8C",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="total" fill="#F5A800" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

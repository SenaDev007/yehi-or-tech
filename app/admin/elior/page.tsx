"use client";

/**
 * Module admin Elior — liste des conversations, vue détail.
 * CDC v1.4
 */

import { useState, useEffect } from "react";
import { MessageCircle, ChevronRight, Loader2 } from "lucide-react";

type ConversationListItem = {
  id: number;
  sessionId: string;
  canal: string;
  statut: string;
  leadQual: boolean;
  createdAt: string;
  updatedAt: string;
  messagesCount: number;
  leadsCount: number;
};

type ConversationDetail = {
  id: number;
  sessionId: string;
  canal: string;
  statut: string;
  leadQual: boolean;
  messages: Array<{ id: number; role: string; content: string; createdAt: string }>;
  leads: Array<Record<string, unknown>>;
};

const CANAL_LABELS: Record<string, string> = {
  WEB: "Site web",
  WHATSAPP: "WhatsApp",
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
};

export default function AdminEliorPage() {
  const [list, setList] = useState<ConversationListItem[]>([]);
  const [detail, setDetail] = useState<ConversationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/elior", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Non autorisé");
        return res.json();
      })
      .then(setList)
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  }, []);

  const openConversation = (sessionId: string) => {
    setDetail(null);
    fetch(`/api/admin/elior?sessionId=${encodeURIComponent(sessionId)}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setDetail)
      .catch(() => setError("Erreur chargement conversation"));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E]">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E] text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-syne text-2xl font-semibold text-white flex items-center gap-2">
          <MessageCircle className="h-7 w-7 text-gold" />
          Conversations Elior
        </h1>
        <p className="mt-1 text-white/70">
          {list.length} conversation(s)
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h2 className="font-syne font-medium text-white">Liste</h2>
            <ul className="mt-4 space-y-2">
              {list.length === 0 ? (
                <li className="text-white/60">Aucune conversation.</li>
              ) : (
                list.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => openConversation(c.sessionId)}
                      className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10"
                    >
                      <div>
                        <p className="font-mono text-sm text-white">
                          {c.sessionId.slice(0, 20)}…
                        </p>
                        <p className="text-xs text-white/60">
                          {CANAL_LABELS[c.canal] ?? c.canal} · {c.messagesCount} msg.
                          {c.leadQual && " · Lead qualifié"}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/60" />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h2 className="font-syne font-medium text-white">Détail</h2>
            {!detail ? (
              <p className="mt-4 text-white/60">
                Cliquez sur une conversation pour voir les messages.
              </p>
            ) : (
              <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto">
                {detail.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`rounded-lg p-3 ${
                      m.role === "user"
                        ? "ml-8 bg-blue/20 text-white"
                        : "mr-8 bg-gold/20 text-navy"
                    }`}
                  >
                    <p className="text-xs font-medium opacity-80">
                      {m.role === "user" ? "Visiteur" : "Elior"}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm">{m.content}</p>
                    <p className="mt-1 text-xs opacity-60">
                      {new Date(m.createdAt).toLocaleString("fr-FR")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

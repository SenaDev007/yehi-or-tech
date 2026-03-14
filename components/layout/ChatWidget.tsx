"use client";

/**
 * Widget chat Elior — bulle dorée, panneau slide-in, streaming, proactivité sur /services.
 * CDC v1.4
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, X } from "lucide-react";

const SESSION_KEY = "elior_session_id";
const PROACTIVE_DELAY_MS = 45 * 1000;
const PULSE_CLASS = "elior-pulse-animation";

type ChatMessage = { role: "user" | "assistant"; content: string };

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `web-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingContent, setStreamingContent] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [proactiveShown, setProactiveShown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>("");

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  // Proactivité : après 45s sur /services, ouvrir avec accroche
  useEffect(() => {
    if (pathname !== "/services" || proactiveShown || open) return;
    const t = setTimeout(() => {
      setProactiveShown(true);
      setOpen(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Vous cherchez quelque chose de précis ? Je peux vous aider à trouver la meilleure solution en 2 minutes. Dites-moi simplement votre besoin ou votre secteur d'activité.",
        },
      ]);
    }, PROACTIVE_DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname, proactiveShown, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    setStreamingContent("");

    let accumulated = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionIdRef.current || getSessionId(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Erreur");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("Pas de flux");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "delta" && data.text) {
                accumulated += data.text;
                setStreamingContent(accumulated);
              }
              if (data.type === "error") {
                setMessages((prev) => [
                  ...prev,
                  { role: "assistant", content: "Désolée, une erreur est survenue. Réessayez ou contactez-nous par WhatsApp." },
                ]);
                setStreamingContent("");
              }
            } catch (_) {}
          }
        }
      }

      if (accumulated) {
        setMessages((prev) => [...prev, { role: "assistant", content: accumulated }]);
      }
      setStreamingContent("");
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Je ne peux pas répondre pour le moment. Contactez-nous au +229 01 41 36 08 03 ou via le formulaire.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-20 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-[0_4px_20px_rgba(245,168,0,0.4)] transition hover:scale-110 hover:shadow-[0_6px_24px_rgba(245,168,0,0.5)] ${open ? "" : PULSE_CLASS}`}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat Elior"}
      >
        <MessageCircle className="h-7 w-7" strokeWidth={2} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-40 flex h-[calc(100vh-7rem)] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl border border-gold/30 bg-white shadow-xl">
          <div className="flex items-center gap-3 border-b border-blue-lt bg-navy p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-syne font-semibold text-white">Elior</p>
              <p className="text-xs text-white/70">Assistante · En ligne</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-sm text-gray">
                Bonjour ! Je suis Elior, l&apos;assistante de YEHI OR Tech. Comment puis-je vous aider ?
              </p>
            )}
            {[...messages, ...(streamingContent ? [{ role: "assistant" as const, content: streamingContent }] : [])].map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    m.role === "user"
                      ? "bg-gold text-black"
                      : "bg-blue-xl/50 text-navy"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{m.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-blue-xl/50 px-4 py-2">
                  <span className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-navy [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-navy [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-navy [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="border-t border-blue-lt p-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Votre message..."
                className="flex-1 rounded-lg border border-blue-lt px-4 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-navy transition hover:bg-[#FFB800] disabled:opacity-50"
                aria-label="Envoyer"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

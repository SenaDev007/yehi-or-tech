"use client";

/**
 * Toast — notification éphémère (succès, erreur, info).
 * À utiliser avec un contexte ou un state global en Phase 3+.
 * CDC v1.4
 */

import * as React from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export type ToastVariant = "success" | "error" | "info";

export interface ToastData {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

const variantStyles: Record<ToastVariant, { bg: string; icon: React.ReactNode }> = {
  success: {
    bg: "bg-success-lt text-success border-success/30",
    icon: <CheckCircle className="h-5 w-5 shrink-0" />,
  },
  error: {
    bg: "bg-error-lt text-error border-error/30",
    icon: <XCircle className="h-5 w-5 shrink-0" />,
  },
  info: {
    bg: "bg-blue-xl text-blue border-blue/30",
    icon: <Info className="h-5 w-5 shrink-0" />,
  },
};

export interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const variant = toast.variant ?? "info";
  const { bg, icon } = variantStyles[variant];

  React.useEffect(() => {
    const duration = toast.duration ?? 5000;
    const t = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(t);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      role="alert"
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${bg}`}
    >
      {icon}
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded p-1 opacity-70 transition hover:opacity-100"
        aria-label="Fermer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
  position?: "top-right" | "bottom-left" | "bottom-right";
}

export function ToastContainer({
  toasts,
  onDismiss,
  position = "bottom-right",
}: ToastContainerProps) {
  const positionClass = {
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-24 left-4",
    "bottom-right": "bottom-24 right-4",
  }[position];

  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed z-50 flex flex-col gap-2 ${positionClass}`}
      aria-live="polite"
    >
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

/**
 * Étoiles notation 1–5 — affichage visuel.
 * CDC v1.4
 */

import { Star } from "lucide-react";

export interface StarsProps {
  note: number;
  max?: number;
  className?: string;
}

export function Stars({ note, max = 5, className = "" }: StarsProps) {
  const value = Math.min(max, Math.max(0, Math.round(note)));
  return (
    <div
      className={`flex gap-0.5 text-gold ${className}`.trim()}
      role="img"
      aria-label={`Note : ${value} sur ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < value ? "fill-current" : "fill-transparent"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

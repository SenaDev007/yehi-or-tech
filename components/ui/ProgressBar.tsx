/**
 * Barre de progression — stepper formulaire devis (étape 1/3, 2/3, 3/3).
 * CDC v1.4
 */

import * as React from "react";

export interface ProgressBarProps {
  /** Étape actuelle (1-based) */
  step: number;
  /** Nombre total d'étapes */
  total: number;
  className?: string;
}

export function ProgressBar({ step, total, className = "" }: ProgressBarProps) {
  const percent = total > 0 ? (step / total) * 100 : 0;
  return (
    <div className={`w-full ${className}`.trim()}>
      <p className="mb-2 font-syne text-sm font-medium text-navy">
        Étape {step} sur {total}
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-blue-lt">
        <div
          className="h-full rounded-full bg-gold transition-all duration-300"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Étape ${step} sur ${total}`}
        />
      </div>
    </div>
  );
}

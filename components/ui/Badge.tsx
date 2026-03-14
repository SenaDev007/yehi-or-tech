/**
 * Badge — catégories, statuts, labels.
 * Couleurs par usage : Branding (or), Web (bleu), etc. CDC v1.4
 */

import * as React from "react";

const variants = {
  default: "bg-blue-xl text-blue",
  gold: "bg-gold-lt text-navy",
  navy: "bg-navy/10 text-navy",
  success: "bg-success-lt text-success",
  error: "bg-error-lt text-error",
  outline: "border border-blue-lt bg-transparent text-blue",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className = "", children, ...props }, ref) => (
    <span
      ref={ref}
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 font-syne text-xs font-medium uppercase tracking-wide ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";

export { Badge };

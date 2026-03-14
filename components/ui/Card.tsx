/**
 * Carte — Design System YEHI OR Tech.
 * Carte service : rounded-xl, border blue-lt, hover shadow + scale.
 * CDC v1.4
 */

import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** Style « carte service » avec hover */
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", hover = false, ...props }, ref) => {
    const base =
      "rounded-xl border border-blue-lt bg-white shadow-sm transition-all duration-250";
    const hoverClass = hover
      ? "hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(13,46,140,0.15)]"
      : "";
    return (
      <div
        ref={ref}
        className={`${base} ${hoverClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`p-6 pb-2 ${className}`.trim()} {...props} />
));

CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-2 ${className}`.trim()} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`border-t border-blue-lt/50 p-6 ${className}`.trim()} {...props} />
));

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };

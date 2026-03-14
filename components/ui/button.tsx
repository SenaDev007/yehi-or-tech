/**
 * Boutons CTA — Design System YEHI OR Tech.
 * Principal (gold) · Secondaire (bordure blue) · Ghost · Link.
 * CDC v1.4
 */

import * as React from "react";

const variants = {
  primary:
    "bg-gold text-black rounded-lg px-6 py-3 font-semibold shadow-[0_2px_8px_rgba(245,168,0,0.3)] hover:bg-[#FFB800] hover:-translate-y-0.5 transition-all",
  secondary:
    "border-2 border-blue text-blue rounded-lg px-6 py-3 font-semibold hover:bg-blue hover:text-white transition-all",
  ghost:
    "text-navy hover:bg-blue-xl rounded-lg px-6 py-3 font-medium transition-all",
  link: "text-blue font-medium underline-offset-4 hover:underline",
  outline:
    "border-2 border-white text-white rounded-lg px-6 py-3 font-semibold hover:bg-white hover:text-navy transition-all",
} as const;

type ButtonVariant = keyof typeof variants;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      asChild = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const classes = `inline-flex items-center justify-center ${variants[variant]} ${className}`.trim();

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: [classes, (children.props as { className?: string }).className]
          .filter(Boolean)
          .join(" "),
      });
    }

    return (
      <button ref={ref} className={classes} type="button" {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

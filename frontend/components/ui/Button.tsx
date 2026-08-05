"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-ice disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-[0.97]",
          variant === "primary" &&
            "bg-gradient-to-r from-signal to-ice text-base font-semibold shadow-glow hover:brightness-110",
          variant === "secondary" &&
            "glass text-ink hover:bg-white/10",
          variant === "ghost" && "text-ink-muted hover:text-ink hover:bg-white/5",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

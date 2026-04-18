"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "primary" | "secondary" | "success" | "warning" | "error" | "outline";
    children: React.ReactNode;
}

export const Badge = ({
    variant = "primary",
    className,
    children,
    ...props
}: BadgeProps) => {
    const variantStyles = {
        primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
        secondary: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
        success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        error: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        outline: "border border-[var(--color-border)] text-[var(--color-text-secondary)]",
    };

    return (
        <span
            className={cn(
                "badge transition-colors",
                variantStyles[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

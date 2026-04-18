"use client";

import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            isLoading,
            asChild = false,
            className,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        // asChild일 때는 Slot이 단일 자식을 요구하므로 로딩 스피너를 내부로 옮기거나 제거해야 합니다.
        // 여기서는 단순화하여 asChild일 때는 children만 렌더링하도록 합니다.
        const content = asChild ? (
            children
        ) : (
            <>
                {isLoading && <span className="animate-spin text-[1.2em]">⌛</span>}
                {children}
            </>
        );

        return (
            <Comp
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
                    // Variant styles using CSS variables
                    variant === "primary" && "btn-primary",
                    variant === "outline" &&
                    "border border-[var(--color-border)] bg-transparent hover:border-[var(--color-primary)] hover:bg-[rgba(108,92,231,0.05)]",
                    variant === "ghost" && "bg-transparent hover:bg-[rgba(255,255,255,0.05)]",
                    variant === "link" &&
                    "bg-transparent underline-offset-4 hover:underline text-[var(--color-primary)] p-0",
                    // Size styles
                    size === "sm" &&
                    "px-3 py-1.5 text-[var(--text-xs)] rounded-[var(--radius-sm)]",
                    size === "md" &&
                    "px-4 py-2 text-[var(--text-sm)] rounded-[var(--radius-md)]",
                    size === "lg" &&
                    "px-6 py-3 text-[var(--text-base)] rounded-[var(--radius-lg)]",
                    className
                )}
                {...props}
            >
                {content}
            </Comp>
        );
    }
);

Button.displayName = "Button";

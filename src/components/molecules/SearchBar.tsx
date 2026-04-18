"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
    onSearch?: (value: string) => void;
}

export const SearchBar = ({
    containerClassName,
    onSearch,
    className,
    ...props
}: SearchBarProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSearch) {
            onSearch(e.currentTarget.value);
        }
    };

    return (
        <div className={cn("relative w-full max-w-xl mx-auto", containerClassName)}>
            <span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-lg)] pointer-events-none"
                role="img"
                aria-label="search"
            >
                🔍
            </span>
            <input
                type="text"
                className={cn("search-input", className)}
                onKeyDown={handleKeyDown}
                aria-label="강의 검색"
                {...props}
            />
        </div>
    );
};

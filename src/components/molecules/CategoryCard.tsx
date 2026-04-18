"use client";

import React from "react";
import Link from "next/link";
import { type Category } from "@/types";

interface CategoryCardProps {
    category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
    return (
        <Link
            href={`/courses?category=${category.slug}`}
            className="glass-card p-6 text-center no-underline text-[var(--color-text)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/5 group transition-all"
        >
            <div className="text-[var(--text-sm)] font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {category.name}
            </div>
            <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)] font-medium">
                {category._count?.courses || 0}개 강의
            </div>
        </Link>
    );
};

"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import {
    PLATFORM_LABELS,
    PLATFORM_COLORS,
    DIFFICULTY_LABELS,
    DIFFICULTY_COLORS,
    type Course,
} from "@/types";

interface CourseCardProps {
    course: Course;
    index?: number;
}

export const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
    const platformColor = PLATFORM_COLORS[course.platform] || "var(--color-primary)";

    return (
        <Link
            href={`/courses/${course.id}`}
            className="glass-card animate-in block overflow-hidden no-underline text-[var(--color-text)] group"
            style={{
                animationDelay: `${index * 0.05}s`,
                opacity: 0,
            }}
        >
            <div
                className="h-2 transition-transform duration-300 group-hover:scale-x-105"
                style={{
                    background: `linear-gradient(90deg, ${platformColor}, ${platformColor}cc)`,
                }}
            />
            <div className="p-6">
                <div className="flex gap-2 mb-4 flex-wrap">
                    <Badge
                        className="font-bold border-none"
                        style={{
                            background: `${platformColor}15`,
                            color: platformColor,
                        }}
                    >
                        {PLATFORM_LABELS[course.platform] || course.platform}
                    </Badge>
                    <Badge
                        variant={course.difficulty === 'beginner' ? 'success' : course.difficulty === 'intermediate' ? 'warning' : 'error'}
                    >
                        {DIFFICULTY_LABELS[course.difficulty] || course.difficulty}
                    </Badge>
                </div>
                <h3 className="text-[var(--text-base)] font-bold leading-snug mb-2 line-clamp-2 min-h-[2.8rem] group-hover:text-[var(--color-primary)] transition-colors">
                    {course.title}
                </h3>
                <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)] mb-4 font-medium">
                    {course.instructor}
                </p>
                <div className="flex items-center gap-4 text-[var(--text-xs)] text-[var(--color-text-secondary)] border-t border-[var(--color-border)] pt-4">
                    {course.rating && (
                        <span className="flex items-center gap-1">
                            <span className="star text-[1.1em]">★</span>
                            <span className="font-bold text-[var(--color-text)]">{course.rating.toFixed(1)}</span>
                        </span>
                    )}
                    {course.durationMin && (
                        <span className="flex items-center gap-1">
                            ⏱ <span className="font-medium">{(course.durationMin / 60).toFixed(1)}시간</span>
                        </span>
                    )}
                    {course.language === "en" && <span className="ml-auto opacity-70">🌐 EN</span>}
                </div>
            </div>
        </Link>
    );
};

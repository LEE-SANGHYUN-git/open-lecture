export interface Category {
    id: number;
    name: string;
    slug: string;
    _count?: {
        courses: number;
    };
}

export interface CourseCategory {
    courseId: number;
    categoryId: number;
    category: Category;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    platform: string;
    url: string;
    thumbnailUrl: string | null;
    instructor: string;
    difficulty: string;
    rating: number | null;
    durationMin: number | null;
    language: string;
    isFree: boolean;
    createdAt: string;
    updatedAt: string;
    categories: CourseCategory[];
}

export interface CoursesResponse {
    courses: Course[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export const PLATFORM_LABELS: Record<string, string> = {
    inflearn: "인프런",
    youtube: "YouTube",
    kmooc: "K-MOOC",
    kocw: "KOCW",
    udemy: "Udemy",
};

export const DIFFICULTY_LABELS: Record<string, string> = {
    beginner: "입문",
    intermediate: "중급",
    advanced: "고급",
};

export const PLATFORM_COLORS: Record<string, string> = {
    inflearn: "#00c471",
    youtube: "#ff0000",
    kmooc: "#1a5276",
    kocw: "#2e86c1",
    udemy: "#a435f0",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
    beginner: "#10b981",
    intermediate: "#f59e0b",
    advanced: "#ef4444",
};

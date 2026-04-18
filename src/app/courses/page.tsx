"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchBar } from "@/components/molecules/SearchBar";
import { CourseCard } from "@/components/molecules/CourseCard";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { DIFFICULTY_LABELS, PLATFORM_LABELS } from "@/types";
import type { Course, CoursesResponse, Category } from "@/types";

function CoursesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const platform = searchParams.get("platform") || "";
    const sort = searchParams.get("sort") || "latest";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const updateParam = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            if (key !== "page") params.delete("page");
            router.push(`/courses?${params.toString()}`);
        },
        [searchParams, router]
    );

    useEffect(() => {
        fetch("/api/categories")
            .then((r) => r.json())
            .then(setCategories);
    }, []);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category) params.set("category", category);
        if (difficulty) params.set("difficulty", difficulty);
        if (platform) params.set("platform", platform);
        if (sort) params.set("sort", sort);
        params.set("page", page.toString());
        params.set("limit", "12");

        fetch(`/api/courses?${params.toString()}`)
            .then((r) => r.json())
            .then((data: CoursesResponse) => {
                setCourses(data.courses);
                setTotalPages(data.pagination.totalPages);
                setTotal(data.pagination.total);
                setLoading(false);
            });
    }, [search, category, difficulty, platform, sort, page]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4 animate-in">
                    <span className="w-8 h-1 bg-[var(--color-primary)] rounded-full" />
                    <span className="text-[var(--text-sm)] font-bold text-[var(--color-primary)] tracking-widest uppercase">Explore Courses</span>
                </div>
                <h1 className="text-[var(--text-4xl)] md:text-[var(--text-5xl)] font-black mb-4 tracking-tight animate-in" style={{ animationDelay: '0.1s' }}>
                    미래를 위한 <span className="gradient-text">최고의 선택</span>
                </h1>
                <p className="text-[var(--color-text-secondary)] text-[var(--text-lg)] font-medium max-w-2xl animate-in" style={{ animationDelay: '0.2s' }}>
                    {total}개의 엄선된 무료 강의를 통해 당신의 커리어를 한 단계 더 도약시키세요.<br />
                    정밀한 검색과 필터로 지식의 바다를 효율적으로 탐색합니다.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
                {/* Sidebar Filters */}
                <aside className="sticky top-28 flex flex-col gap-10 bg-[var(--color-surface)]/40 p-8 rounded-3xl border border-[var(--color-border)]/50 backdrop-blur-sm shadow-xl shadow-black/5 animate-in" style={{ animationDelay: '0.3s' }}>
                    {/* Category */}
                    <div>
                        <h3 className="text-[var(--text-base)] font-bold mb-5 flex items-center justify-between">
                            카테고리
                            <Badge variant="outline" className="text-[10px] py-0">{categories.length}</Badge>
                        </h3>
                        <div className="flex flex-col gap-1.5">
                            <button
                                className={`filter-btn w-full text-left font-semibold ${!category ? "active" : ""}`}
                                onClick={() => updateParam("category", "")}
                            >
                                전체보기
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`filter-btn w-full text-left font-semibold ${category === cat.slug ? "active" : ""}`}
                                    onClick={() => updateParam("category", cat.slug)}
                                >
                                    {cat.name}
                                    <span className="ml-auto opacity-40 font-bold text-[10px]">{cat._count?.courses}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-[var(--color-border)]/50" />

                    {/* Difficulty */}
                    <div>
                        <h3 className="text-[var(--text-base)] font-bold mb-5">난이도</h3>
                        <div className="flex flex-col gap-1.5">
                            <button
                                className={`filter-btn w-full text-left font-semibold ${!difficulty ? "active" : ""}`}
                                onClick={() => updateParam("difficulty", "")}
                            >
                                전체
                            </button>
                            {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
                                <button
                                    key={key}
                                    className={`filter-btn w-full text-left font-semibold ${difficulty === key ? "active" : ""}`}
                                    onClick={() => updateParam("difficulty", key)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-[var(--color-border)]/50" />

                    {/* Platform */}
                    <div>
                        <h3 className="text-[var(--text-base)] font-bold mb-5">플랫폼</h3>
                        <div className="flex flex-col gap-1.5">
                            <button
                                className={`filter-btn w-full text-left font-semibold ${!platform ? "active" : ""}`}
                                onClick={() => updateParam("platform", "")}
                            >
                                전체
                            </button>
                            {Object.entries(PLATFORM_LABELS).map(([key, label]) => (
                                <button
                                    key={key}
                                    className={`filter-btn w-full text-left font-semibold ${platform === key ? "active" : ""}`}
                                    onClick={() => updateParam("platform", key)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex flex-col gap-8">
                    {/* Top Bar inside Content */}
                    <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between bg-[var(--color-surface)]/30 px-6 py-4 rounded-2xl border border-[var(--color-border)]/30 animate-in" style={{ animationDelay: '0.4s' }}>
                        <SearchBar
                            defaultValue={search}
                            placeholder="찾으시는 강의 내용을 입력하세요..."
                            onSearch={(val) => updateParam("search", val)}
                            containerClassName="max-w-none md:max-w-md mx-0"
                            className="h-12 border-none bg-transparent focus:shadow-none p-0 pl-10"
                        />

                        <div className="flex gap-2 bg-[var(--color-bg)]/50 p-1 rounded-xl">
                            {[
                                { key: "latest", label: "최신순" },
                                { key: "rating", label: "평점순" },
                                { key: "title", label: "이름순" },
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${sort === key ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"}`}
                                    onClick={() => updateParam("sort", key)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton h-[320px] rounded-3xl" />
                            ))}
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center py-40 glass-card border-dashed">
                            <div className="text-6xl mb-8">🔭</div>
                            <h3 className="text-[var(--text-2xl)] font-bold mb-3 tracking-tight">검색 결과가 없습니다</h3>
                            <p className="text-[var(--color-text-secondary)] mb-10 font-medium">다른 검색어나 필터 조합을 시도해 보시는 건 어떨까요?</p>
                            <Button
                                variant="outline"
                                className="px-8 rounded-full border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                                onClick={() => router.push("/courses")}
                            >
                                필터 전부 지우기
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {courses.map((course, i) => (
                                    <CourseCard key={course.id} course={course} index={i} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-3 mt-16 animate-in">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <Button
                                            key={i}
                                            variant={page === i + 1 ? "primary" : "outline"}
                                            size="sm"
                                            onClick={() => updateParam("page", (i + 1).toString())}
                                            className={`min-w-[44px] h-[44px] rounded-xl font-bold shadow-sm ${page === i + 1 ? "shadow-[var(--color-primary)]/20" : "bg-[var(--color-surface)] border-[var(--color-border)]"}`}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CoursesPage() {
    return (
        <Suspense fallback={<div className="p-40 text-center font-bold text-[var(--color-text-secondary)]">최적의 강의를 찾는 중...</div>}>
            <CoursesContent />
        </Suspense>
    );
}

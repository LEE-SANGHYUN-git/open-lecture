import Link from "next/link";
import { SearchBar } from "@/components/molecules/SearchBar";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import { CourseCard } from "@/components/molecules/CourseCard";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { prisma } from "@/lib/prisma";
import type { Course, Category } from "@/types";

async function getFeaturedCourses(): Promise<any[]> {
    try {
        const courses = await prisma.course.findMany({
            where: { isFree: true },
            orderBy: { rating: "desc" },
            take: 6,
            include: {
                categories: {
                    include: { category: true },
                },
            },
        });
        return JSON.parse(JSON.stringify(courses));
    } catch (error) {
        console.error("Failed to fetch featured courses:", error);
        return [];
    }
}

async function getCategories(): Promise<any[]> {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
            include: {
                _count: {
                    select: { courses: true },
                },
            },
        });
        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export default async function HomePage() {
    const [courses, categories] = await Promise.all([
        getFeaturedCourses(),
        getCategories(),
    ]);

    return (
        <div className="flex flex-col gap-16 md:gap-24 pb-20">
            {/* Hero Section */}
            <section className="hero-gradient dots-pattern py-24 md:py-32 px-6 text-center border-b border-[var(--color-border)]/30">
                <div className="max-w-4xl mx-auto">
                    <Badge variant="primary" className="mb-6 px-4 py-1.5 text-[var(--text-sm)] animate-in">
                        ✨ 새로운 배움의 시작, Open Lecture
                    </Badge>
                    <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-extrabold leading-[1.05] mb-8 tracking-tight animate-in" style={{ animationDelay: '0.1s' }}>
                        성장을 위한 무료 강의,<br />
                        <span className="gradient-text">품격 있게</span> 시작하세요
                    </h1>
                    <p className="text-[var(--color-text-secondary)] text-[var(--text-lg)] md:text-[var(--text-xl)] mb-12 max-w-3xl mx-auto leading-relaxed font-medium animate-in" style={{ animationDelay: '0.2s' }}>
                        방대한 무료 강의 속에서 당신을 위한 최적의 학습 경로를 찾으세요.<br className="hidden md:block" />
                        인프런, YouTube 등 검증된 큐레이션으로 지식의 가치를 높입니다.
                    </p>

                    <form action="/courses" method="get" className="animate-in" style={{ animationDelay: '0.3s' }}>
                        <SearchBar
                            name="search"
                            placeholder="관심 있는 기술이나 키워드를 입력해보세요..."
                            containerClassName="max-w-xl shadow-2xl"
                            className="h-16 text-[var(--text-lg)] pl-14"
                        />
                    </form>
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
                    <h2 className="text-[var(--text-3xl)] font-black tracking-tight">📂 카테고리별 탐색</h2>
                    <p className="text-[var(--color-text-secondary)] font-medium">원하는 주제를 선택하여 전문적인 지식을 쌓아보세요.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categories.map((cat: any) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </div>
            </section>

            {/* Featured Courses */}
            <section className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[var(--text-3xl)] font-black tracking-tight">⭐ 인기 무료 강의</h2>
                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-none">Top Rated</Badge>
                    </div>
                    <Button variant="link" size="sm" asChild className="text-[var(--text-base)] font-bold">
                        <Link href="/courses">모든 강의 보기 →</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course: any, i: number) => (
                        <CourseCard key={course.id} course={course} index={i} />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Button size="lg" asChild className="px-12 py-4 h-auto text-[var(--text-lg)] shadow-lg shadow-[var(--color-primary)]/20">
                        <Link href="/courses">지식의 세계로 더 깊이 들어가기</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

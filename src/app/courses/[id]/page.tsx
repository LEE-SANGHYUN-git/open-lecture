import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { prisma } from "@/lib/prisma";
import {
    PLATFORM_LABELS,
    PLATFORM_COLORS,
    DIFFICULTY_LABELS,
    DIFFICULTY_COLORS,
} from "@/types";

async function getCourse(id: string): Promise<any | null> {
    try {
        const course = await prisma.course.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                categories: {
                    include: { category: true },
                },
            },
        });
        if (!course) return null;
        return JSON.parse(JSON.stringify(course));
    } catch (error) {
        console.error(`Failed to fetch course ${id}:`, error);
        return null;
    }
}

export default async function CourseDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const course = await getCourse(id);

    if (!course) {
        return (
            <div className="max-w-2xl mx-auto py-40 px-6 text-center">
                <div className="text-7xl mb-10">🧭</div>
                <h1 className="text-[var(--text-3xl)] font-black mb-4 tracking-tight">강의를 찾을 수 없습니다</h1>
                <p className="text-[var(--color-text-secondary)] mb-10 text-[var(--text-base)] font-medium">요청하신 페이지가 만료되었거나 주소가 정확하지 않습니다.</p>
                <Button asChild className="rounded-full px-8">
                    <Link href="/courses">전체 강의 목록으로 돌아가기</Link>
                </Button>
            </div>
        );
    }

    const platformColor = PLATFORM_COLORS[course.platform] || "var(--color-primary)";

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-4 text-[var(--text-xs)] text-[var(--color-text-secondary)] mb-12 font-bold uppercase tracking-widest animate-in">
                <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
                <span className="opacity-30">/</span>
                <Link href="/courses" className="hover:text-[var(--color-primary)] transition-colors">Courses</Link>
                <span className="opacity-30">/</span>
                <span className="text-[var(--color-text)] truncate max-w-[150px] md:max-w-none">{course.title}</span>
            </nav>

            <div className="glass-card overflow-hidden shadow-2xl shadow-black/10 animate-in" style={{ animationDelay: '0.1s' }}>
                {/* Visual Top Bar */}
                <div
                    className="h-2.5"
                    style={{
                        background: `linear-gradient(90deg, ${platformColor}, ${platformColor}99)`,
                    }}
                />

                <div className="p-8 md:p-16">
                    {/* Tags */}
                    <div className="flex gap-2.5 mb-10 flex-wrap">
                        <Badge
                            className="px-4 py-1 border-none font-bold"
                            style={{
                                background: `${platformColor}15`,
                                color: platformColor,
                            }}
                        >
                            {PLATFORM_LABELS[course.platform] || course.platform}
                        </Badge>
                        <Badge
                            variant={course.difficulty === 'beginner' ? 'success' : course.difficulty === 'intermediate' ? 'warning' : 'error'}
                            className="px-4 py-1 border-none shadow-sm"
                        >
                            {DIFFICULTY_LABELS[course.difficulty] || course.difficulty}
                        </Badge>
                        {course.language === "en" && <Badge variant="secondary" className="px-4 py-1 border-none">🌐 English</Badge>}
                        <Badge variant="primary" className="bg-emerald-500/10 text-emerald-500 font-bold px-4 py-1 border-none">FREE</Badge>
                    </div>

                    <h1 className="text-[var(--text-3xl)] md:text-[var(--text-5xl)] font-black leading-[1.15] mb-8 tracking-tight">
                        {course.title}
                    </h1>

                    <p className="text-[var(--text-xl)] text-[var(--color-text-secondary)] mb-12 flex items-center gap-3 font-semibold">
                        <span className="w-10 h-10 rounded-full bg-[var(--color-surface-hover)] flex items-center justify-center border border-[var(--color-border)] shadow-inner">
                            <span role="img" aria-label="instructor" className="text-xl">👨‍🏫</span>
                        </span>
                        {course.instructor}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 p-10 bg-[var(--color-surface)]/20 rounded-3xl border border-[var(--color-border)]/50 mb-12 shadow-sm">
                        <div>
                            <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)] font-black uppercase tracking-[0.2em] mb-4">Rating</div>
                            <div className="text-[var(--text-3xl)] font-black text-amber-500 flex items-center gap-2">
                                <span className="star">★</span> {course.rating?.toFixed(1) || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)] font-black uppercase tracking-[0.2em] mb-4">Duration</div>
                            <div className="text-[var(--text-3xl)] font-black text-[var(--color-text)]">
                                ⏱ {course.durationMin ? (course.durationMin / 60).toFixed(1) : "?"} <span className="text-[var(--text-lg)] font-bold text-[var(--color-text-secondary)]">Hrs</span>
                            </div>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <div className="text-[var(--text-xs)] text-[var(--color-text-secondary)] font-black uppercase tracking-[0.2em] mb-4">Categories</div>
                            <div className="flex gap-2.5 flex-wrap">
                                {course.categories.map((cc: any) => (
                                    <Link
                                        key={cc.category.id}
                                        href={`/courses?category=${cc.category.slug}`}
                                        className="text-[var(--text-sm)] font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/5 px-3 py-1 rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm"
                                    >
                                        #{cc.category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-[var(--text-2xl)] font-black mb-6 flex items-center gap-3 tracking-tight">
                            <span className="w-1.5 h-8 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)] rounded-full shadow-lg shadow-[var(--color-primary)]/20" />
                            강의 상세 정보
                        </h2>
                        <div className="text-[var(--color-text-secondary)] leading-relaxed text-[var(--text-lg)] whitespace-pre-wrap font-medium bg-[var(--color-surface)]/10 p-8 rounded-2xl border border-[var(--color-border)]/20 shadow-inner">
                            {course.description}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <Button size="lg" className="w-full sm:w-auto px-12 h-16 text-[var(--text-lg)] shadow-xl shadow-[var(--color-primary)]/20 rounded-2xl font-black" asChild>
                            <a href={course.url} target="_blank" rel="noopener noreferrer">
                                🚀 무료 수강 시작하기
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 rounded-2xl border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-all font-bold px-10" asChild>
                            <Link href="/courses">목록으로 돌아가기</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

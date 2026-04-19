import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseId = parseInt(resolvedParams.id, 10);
  
  if (isNaN(courseId)) {
    notFound();
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    notFound();
  }
  
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link href="/courses" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline inline-flex items-center gap-1">
          <span>←</span> 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl overflow-hidden mb-12">
        <div className="h-64 md:h-80 bg-[var(--color-border)] flex items-center justify-center relative">
          {course.thumbnailUrl ? (
            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover z-10" />
          ) : (
            <span className="text-6xl z-10">💻</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] to-transparent z-20" />
        </div>
        
        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-4 relative z-30">
             <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--color-bg)] border border-[var(--color-border)] uppercase">
              {course.platform}
            </span>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--color-bg)] border border-[var(--color-border)] capitalize">
              {course.difficulty}
            </span>
            {course.isFree && (
              <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-primary)]">
                무료
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
            {course.title}
          </h1>
          
          <div className="flex items-center gap-4 text-[var(--color-text-secondary)] mb-8 pb-8 border-b border-[var(--color-border)]">
            <span className="font-medium">강사: {course.instructor}</span>
            <span>•</span>
            <span>업데이트: {course.updatedAt.toLocaleDateString()}</span>
            {course.durationMin && (
              <>
                <span>•</span>
                <span>재생시간: {course.durationMin}분</span>
              </>
            )}
          </div>

          <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed mb-10 whitespace-pre-wrap">
            <h3 className="text-xl font-bold text-[var(--color-text)]">강의 소개</h3>
            <p>{course.description}</p>
          </div>

          <div className="flex justify-end">
            <a href={course.url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" className="px-8">
                강의실로 이동하기
              </Button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

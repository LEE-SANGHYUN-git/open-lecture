import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">강의 탐색</h1>
          <p className="text-[var(--color-text-secondary)]">원하는 기술 스택의 무료 강의를 찾아보세요.</p>
        </div>
        
        {/* 임시 검색 영역 */}
        <div className="w-full md:w-auto relative">
          <input 
            type="text" 
            placeholder="강의 검색..." 
            className="w-full md:w-64 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id} className="block group no-underline">
            <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-bg-secondary)] hover:border-[var(--color-primary)] transition-colors h-full flex flex-col">
              <div className="h-40 bg-[var(--color-border)] flex items-center justify-center">
                {course.thumbnailUrl ? (
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">💻</span>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--color-bg)] border border-[var(--color-border)] uppercase">
                    {course.platform}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--color-bg)] border border-[var(--color-border)] capitalize text-[var(--color-text-secondary)]">
                    {course.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2 flex-1">
                  {course.description}
                </p>
                <div className="text-sm font-medium pt-4 border-t border-[var(--color-border)] text-[var(--color-text-secondary)]">
                  {course.instructor}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

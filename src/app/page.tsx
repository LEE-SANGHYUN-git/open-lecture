import Link from "next/link";
import { Button } from "@/components/atoms/Button";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
        모든 무료 강의를 <br className="md:hidden" />
        <span className="gradient-text">한곳에서</span>
      </h1>
      <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto mb-10">
        인프런, YouTube, K-MOOC 등 다양한 플랫폼의 무료 강의 정보를
        <br className="hidden md:block" />
        한곳에서 검색하고 탐색하세요.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link href="/courses">
          <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
            강의 탐색하기
          </Button>
        </Link>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full text-left">
        <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">통합 검색</h3>
          <p className="text-[var(--color-text-secondary)]">
            여러 플랫폼에 흩어져 있는 무료 강의를 한 번의 검색으로 찾아보세요.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <div className="text-3xl mb-4">⭐</div>
          <h3 className="text-xl font-bold mb-2">큐레이션</h3>
          <p className="text-[var(--color-text-secondary)]">
            주제별, 수준별로 엄선된 양질의 무료 강의 컬렉션을 제공합니다.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <div className="text-3xl mb-4">💡</div>
          <h3 className="text-xl font-bold mb-2">학습 경험</h3>
          <p className="text-[var(--color-text-secondary)]">
            최고의 학습 효율을 위한 플랫폼별 맞춤 추천 시스템.
          </p>
        </div>
      </div>
    </main>
  );
}

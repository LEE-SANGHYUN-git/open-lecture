import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";

export const metadata: Metadata = {
  title: "Open Lecture — 모든 무료 강의를 한곳에서",
  description:
    "인프런, YouTube, K-MOOC 등 다양한 플랫폼의 무료 강의 정보를 한곳에서 검색하고 탐색하세요. 더 나은 학습 경험을 위한 최고의 무료 강의 큐레이션 서비스입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <span className="text-2xl" role="img" aria-label="logo">📚</span>
              <span className="gradient-text text-[var(--text-xl)] font-black tracking-tight">
                Open Lecture
              </span>
            </Link>
            <nav className="flex items-center gap-4 md:gap-8">
              <Link
                href="/"
                className="text-[var(--text-sm)] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline"
              >
                홈
              </Link>
              <Link
                href="/courses"
                className="text-[var(--text-sm)] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline"
              >
                강의 탐색
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button size="sm" className="hidden md:flex">
                  로그인
                </Button>
              </div>
            </nav>
          </div>
        </header>

        <main className="min-h-[calc(100vh-64px-100px)]">
          {children}
        </main>

        <footer className="border-t border-[var(--color-border)] py-12 text-center text-[var(--color-text-secondary)] text-[var(--text-sm)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 underline-offset-4">
                <span className="font-bold text-[var(--color-text)]">Open Lecture</span>
                <span>•</span>
                <span>무료 교육의 대중화</span>
              </div>
              <p>© 2026 Open Lecture. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="#" className="hover:text-[var(--color-text)] no-underline">개인정보처리방침</Link>
                <Link href="#" className="hover:text-[var(--color-text)] no-underline">이용약관</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

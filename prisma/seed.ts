import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    // 카테고리 생성
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: "web-dev" },
            update: {},
            create: { name: "웹 개발", slug: "web-dev" },
        }),
        prisma.category.upsert({
            where: { slug: "mobile" },
            update: {},
            create: { name: "모바일", slug: "mobile" },
        }),
        prisma.category.upsert({
            where: { slug: "ai-ml" },
            update: {},
            create: { name: "AI / 머신러닝", slug: "ai-ml" },
        }),
        prisma.category.upsert({
            where: { slug: "data-science" },
            update: {},
            create: { name: "데이터사이언스", slug: "data-science" },
        }),
        prisma.category.upsert({
            where: { slug: "devops" },
            update: {},
            create: { name: "DevOps", slug: "devops" },
        }),
        prisma.category.upsert({
            where: { slug: "programming-basics" },
            update: {},
            create: { name: "프로그래밍 기초", slug: "programming-basics" },
        }),
        prisma.category.upsert({
            where: { slug: "design" },
            update: {},
            create: { name: "디자인", slug: "design" },
        }),
    ]);

    const [webDev, mobile, aiMl, dataScience, devops, basics, design] = categories;

    // 강의 데이터 생성
    const coursesData = [
        {
            title: "생활코딩 - WEB1 HTML & Internet",
            description: "프로그래밍을 처음 시작하는 분들을 위한 HTML 기초 강의입니다. 웹의 동작 원리부터 HTML 태그 활용까지 단계별로 학습합니다.",
            platform: "youtube",
            url: "https://www.youtube.com/playlist?list=PLuHgQVnccGMDZP7FJ_ZsUrdCGH68ppvPb",
            thumbnailUrl: "https://i.ytimg.com/vi/tZooW6PritE/hqdefault.jpg",
            instructor: "이고잉",
            difficulty: "beginner",
            rating: 4.9,
            durationMin: 360,
            language: "ko",
            categoryIds: [basics.id, webDev.id],
        },
        {
            title: "노마드코더 - JavaScript로 크롬 앱 만들기",
            description: "바닐라 JavaScript로 멋진 크롬 앱을 만들면서 자바스크립트의 기초를 배웁니다.",
            platform: "youtube",
            url: "https://www.youtube.com/playlist?list=PL7jH19IHhOLM8YE3brnSJPa5VLQf4zfmb",
            thumbnailUrl: "https://i.ytimg.com/vi/bS9em7a68CA/hqdefault.jpg",
            instructor: "니콜라스",
            difficulty: "beginner",
            rating: 4.8,
            durationMin: 420,
            language: "ko",
            categoryIds: [webDev.id, basics.id],
        },
        {
            title: "인프런 - 스프링 입문 (무료)",
            description: "스프링 부트로 웹 애플리케이션을 개발하는 방법을 배웁니다. 프로젝트 세팅부터 MVC 패턴까지 실습합니다.",
            platform: "inflearn",
            url: "https://www.inflearn.com/course/스프링-입문-스프링부트",
            thumbnailUrl: null,
            instructor: "김영한",
            difficulty: "beginner",
            rating: 4.9,
            durationMin: 300,
            language: "ko",
            categoryIds: [webDev.id],
        },
        {
            title: "K-MOOC - 인공지능의 기초",
            description: "인공지능의 개념, 역사, 핵심 알고리즘을 국내 최고 교수진이 체계적으로 설명합니다.",
            platform: "kmooc",
            url: "https://www.kmooc.kr",
            thumbnailUrl: null,
            instructor: "서울대학교",
            difficulty: "intermediate",
            rating: 4.5,
            durationMin: 900,
            language: "ko",
            categoryIds: [aiMl.id],
        },
        {
            title: "Udemy - Python for Beginners (Free)",
            description: "파이썬 프로그래밍의 기초를 영어로 배울 수 있는 무료 입문 과정입니다.",
            platform: "udemy",
            url: "https://www.udemy.com/course/pythonforbeginnersintro/",
            thumbnailUrl: null,
            instructor: "Alex Lee",
            difficulty: "beginner",
            rating: 4.4,
            durationMin: 240,
            language: "en",
            categoryIds: [basics.id],
        },
        {
            title: "KOCW - 데이터베이스 설계 및 구현",
            description: "관계형 데이터베이스의 설계 원리와 SQL 활용법을 대학 강의 수준으로 배웁니다.",
            platform: "kocw",
            url: "https://www.kocw.net",
            thumbnailUrl: null,
            instructor: "한양대학교",
            difficulty: "intermediate",
            rating: 4.3,
            durationMin: 720,
            language: "ko",
            categoryIds: [dataScience.id, basics.id],
        },
        {
            title: "생활코딩 - React",
            description: "React의 핵심 개념인 컴포넌트, State, Props를 실습과 함께 쉽게 배웁니다.",
            platform: "youtube",
            url: "https://www.youtube.com/playlist?list=PLuHgQVnccGMCOGstdDZvH41x0Vtvwyxu7",
            thumbnailUrl: "https://i.ytimg.com/vi/AoMv0SIjZL8/hqdefault.jpg",
            instructor: "이고잉",
            difficulty: "intermediate",
            rating: 4.7,
            durationMin: 480,
            language: "ko",
            categoryIds: [webDev.id],
        },
        {
            title: "인프런 - 모든 개발자를 위한 HTTP 웹 기본 지식",
            description: "HTTP의 전반적인 흐름과 핵심 개념을 학습합니다. 웹 개발자라면 반드시 알아야 할 기초 지식.",
            platform: "inflearn",
            url: "https://www.inflearn.com/course/http-웹-네트워크",
            thumbnailUrl: null,
            instructor: "김영한",
            difficulty: "beginner",
            rating: 4.9,
            durationMin: 330,
            language: "ko",
            categoryIds: [webDev.id, basics.id],
        },
        {
            title: "K-MOOC - 파이썬 데이터 분석",
            description: "파이썬과 Pandas, Matplotlib 등의 데이터 분석 라이브러리를 활용한 실전 데이터 분석 기법을 배웁니다.",
            platform: "kmooc",
            url: "https://www.kmooc.kr",
            thumbnailUrl: null,
            instructor: "카이스트",
            difficulty: "intermediate",
            rating: 4.6,
            durationMin: 600,
            language: "ko",
            categoryIds: [dataScience.id, basics.id],
        },
        {
            title: "Udemy - Docker for Absolute Beginners",
            description: "Docker의 기본 개념부터 컨테이너 실행, 이미지 빌드까지 핸즈온으로 배웁니다.",
            platform: "udemy",
            url: "https://www.udemy.com/course/learn-docker/",
            thumbnailUrl: null,
            instructor: "Mumshad Mannambeth",
            difficulty: "beginner",
            rating: 4.6,
            durationMin: 180,
            language: "en",
            categoryIds: [devops.id],
        },
        {
            title: "노마드코더 - React Native로 날씨앱 만들기",
            description: "React Native의 핵심 개념을 빠르게 익히고 실제 날씨 앱을 만들어봅니다.",
            platform: "youtube",
            url: "https://www.youtube.com/playlist?list=PL7jH19IHhOLMmmjrwCi7-dMFVdoU0hhgF",
            thumbnailUrl: "https://i.ytimg.com/vi/sEIs4WZRmxI/hqdefault.jpg",
            instructor: "니콜라스",
            difficulty: "intermediate",
            rating: 4.7,
            durationMin: 300,
            language: "ko",
            categoryIds: [mobile.id],
        },
        {
            title: "생활코딩 - CSS",
            description: "웹 페이지의 디자인을 담당하는 CSS의 기초부터 레이아웃까지 체계적으로 학습합니다.",
            platform: "youtube",
            url: "https://www.youtube.com/playlist?list=PLuHgQVnccGMAnWgUYiAW2cTzSBywFO75B",
            thumbnailUrl: "https://i.ytimg.com/vi/Ok0bBJPtgJI/hqdefault.jpg",
            instructor: "이고잉",
            difficulty: "beginner",
            rating: 4.8,
            durationMin: 300,
            language: "ko",
            categoryIds: [webDev.id, design.id],
        },
        {
            title: "Udemy - Machine Learning A-Z (Free Preview)",
            description: "머신러닝의 핵심 알고리즘(회귀, 분류, 클러스터링)을 Python과 R로 실습합니다.",
            platform: "udemy",
            url: "https://www.udemy.com/course/machinelearning/",
            thumbnailUrl: null,
            instructor: "Kirill Eremenko",
            difficulty: "advanced",
            rating: 4.5,
            durationMin: 2640,
            language: "en",
            categoryIds: [aiMl.id, dataScience.id],
        },
        {
            title: "인프런 - Next.js 시작하기 (무료)",
            description: "React 기반 풀스택 프레임워크 Next.js의 핵심 개념을 배우고 간단한 웹앱을 만들어봅니다.",
            platform: "inflearn",
            url: "https://www.inflearn.com/course/nextjs-시작하기",
            thumbnailUrl: null,
            instructor: "이정환",
            difficulty: "intermediate",
            rating: 4.7,
            durationMin: 360,
            language: "ko",
            categoryIds: [webDev.id],
        },
        {
            title: "KOCW - 컴퓨터 네트워크",
            description: "네트워크의 기본 구조, TCP/IP, HTTP 프로토콜 등 컴퓨터 과학의 핵심 기초를 대학 강의로 배웁니다.",
            platform: "kocw",
            url: "https://www.kocw.net",
            thumbnailUrl: null,
            instructor: "한국기술교육대학교",
            difficulty: "intermediate",
            rating: 4.4,
            durationMin: 900,
            language: "ko",
            categoryIds: [basics.id],
        },
    ];

    for (const courseData of coursesData) {
        const { categoryIds, ...data } = courseData;
        const course = await prisma.course.create({ data });
        await Promise.all(
            categoryIds.map((categoryId) =>
                prisma.courseCategory.create({
                    data: { courseId: course.id, categoryId },
                })
            )
        );
    }

    console.log("✅ Seed data created successfully!");
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${coursesData.length} courses`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

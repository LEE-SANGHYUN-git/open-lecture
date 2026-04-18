# Phase 2: 데이터베이스 및 API

## 목표
Prisma 스키마를 정의하고 API Routes를 구현하여 강의 데이터를 CRUD할 수 있는 백엔드를 완성한다.

## 작업 항목

### 2.1 Prisma 스키마 정의
```prisma
model Course {
  id            Int              @id @default(autoincrement())
  title         String
  description   String
  platform      String           // "inflearn", "youtube", "kmooc", "kocw", "udemy" 등
  url           String
  thumbnailUrl  String?
  instructor    String
  difficulty    String           @default("beginner") // beginner, intermediate, advanced
  rating        Float?
  durationMin   Int?
  language      String           @default("ko")
  isFree        Boolean          @default(true)
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
  categories    CourseCategory[]
}

model Category {
  id       Int              @id @default(autoincrement())
  name     String           @unique
  slug     String           @unique
  courses  CourseCategory[]
}

model CourseCategory {
  courseId    Int
  categoryId Int
  course     Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  @@id([courseId, categoryId])
}
```

### 2.2 Seed 데이터
카테고리: 웹 개발, 모바일, AI/ML, 데이터사이언스, DevOps, 프로그래밍 기초, 디자인
샘플 강의 10~15개 (실제 무료강의 기반)

### 2.3 API Routes
| Method | Path | 설명 |
|--------|------|------|
| GET | /api/courses | 목록 (search, category, sort, page 파라미터) |
| GET | /api/courses/[id] | 상세 |
| POST | /api/courses | 생성 (admin) |
| PUT | /api/courses/[id] | 수정 (admin) |
| DELETE | /api/courses/[id] | 삭제 (admin) |
| GET | /api/categories | 카테고리 목록 |

## 완료 기준
- `npx prisma db push` 성공
- `npx prisma db seed` 성공
- API Routes에서 강의 목록/상세 JSON 응답 확인

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const platform = searchParams.get("platform") || "";
    const sort = searchParams.get("sort") || "latest";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { isFree: true };

    if (search) {
        where.OR = [
            { title: { contains: search } },
            { description: { contains: search } },
            { instructor: { contains: search } },
        ];
    }

    if (difficulty) {
        where.difficulty = difficulty;
    }

    if (platform) {
        where.platform = platform;
    }

    if (category) {
        where.categories = {
            some: {
                category: { slug: category },
            },
        };
    }

    // 정렬 설정
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: "desc" };
    if (sort === "rating") {
        orderBy = { rating: "desc" };
    } else if (sort === "title") {
        orderBy = { title: "asc" };
    } else if (sort === "duration") {
        orderBy = { durationMin: "asc" };
    }

    const [courses, total] = await Promise.all([
        prisma.course.findMany({
            where,
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                categories: {
                    include: { category: true },
                },
            },
        }),
        prisma.course.count({ where }),
    ]);

    return NextResponse.json({
        courses,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
}

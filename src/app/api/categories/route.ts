import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { courses: true },
            },
        },
    });

    return NextResponse.json(categories);
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const courseId = parseInt(id, 10);

    if (isNaN(courseId)) {
        return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            categories: {
                include: { category: true },
            },
        },
    });

    if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
}

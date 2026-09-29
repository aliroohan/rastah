import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { connectToDatabase } from "@/lib/mongodb";
import { Progress } from "@/lib/models/Progress";
import { User } from "@/lib/models/User";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseSlug = searchParams.get("courseSlug") || "ecommerce-business-masterclass";

    await connectToDatabase();

    const progress = await Progress.findOne({
      userId: session.userId,
      courseSlug,
    });

    return NextResponse.json({
      completedLessonIds: progress?.completedLessonIds || [],
      lastWatchedLessonId: progress?.lastWatchedLessonId || "m1-l1",
    });
  } catch (error) {
    console.error("Fetch progress error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug, lessonId, markCompleted } = await req.json();

    if (!courseSlug || !lessonId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    // Verify user is enrolled
    const user = await User.findById(session.userId);
    if (!user || user.enrolmentStatus !== "ACTIVE") {
      return NextResponse.json(
        { error: "You must be enrolled to update progress" },
        { status: 403 }
      );
    }

    let progress = await Progress.findOne({
      userId: session.userId,
      courseSlug,
    });

    if (!progress) {
      progress = new Progress({
        userId: session.userId,
        courseSlug,
        completedLessonIds: [],
        lastWatchedLessonId: lessonId,
      });
    }

    progress.lastWatchedLessonId = lessonId;

    if (markCompleted && !progress.completedLessonIds.includes(lessonId)) {
      progress.completedLessonIds.push(lessonId);
    }

    await progress.save();

    return NextResponse.json({
      success: true,
      completedLessonIds: progress.completedLessonIds,
      lastWatchedLessonId: progress.lastWatchedLessonId,
    });
  } catch (error) {
    console.error("Update progress error:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}

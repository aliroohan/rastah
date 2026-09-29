import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    const adminKey = req.headers.get("x-admin-key");
    const validAdminSecret = process.env.ADMIN_SECRET || "rastah_admin_secret_2026";

    const isAuthorized =
      (session && session.role === "admin") || adminKey === validAdminSecret;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    await connectToDatabase();

    const students = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json({ students });
  } catch (error) {
    console.error("Admin fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch student enrolments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const adminKey = req.headers.get("x-admin-key");
    const validAdminSecret = process.env.ADMIN_SECRET || "rastah_admin_secret_2026";

    const isAuthorized =
      (session && session.role === "admin") || adminKey === validAdminSecret;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { userId, action } = await req.json();

    if (!userId || !action) {
      return NextResponse.json(
        { error: "userId and action ('APPROVE' or 'REJECT') are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const student = await User.findById(userId);

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    if (action === "APPROVE") {
      student.enrolmentStatus = "ACTIVE";
    } else if (action === "REJECT") {
      student.enrolmentStatus = "NONE";
    }

    await student.save();

    return NextResponse.json({
      success: true,
      message: `Enrolment ${action === "APPROVE" ? "Approved" : "Rejected"} successfully`,
      student: {
        id: student._id.toString(),
        name: student.name,
        email: student.email,
        whatsapp: student.whatsapp,
        enrolmentStatus: student.enrolmentStatus,
      },
    });
  } catch (error) {
    console.error("Admin action error:", error);
    return NextResponse.json(
      { error: "Failed to process enrolment action" },
      { status: 500 }
    );
  }
}

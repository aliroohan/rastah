import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { method, trxId, screenshotUrl } = await req.json();

    if (!method || !trxId) {
      return NextResponse.json(
        { error: "Payment method and Transaction ID are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.enrolmentStatus = "PENDING_VERIFICATION";
    user.paymentDetails = {
      method,
      trxId: trxId.trim(),
      screenshotUrl: screenshotUrl || "",
      submittedAt: new Date(),
    };

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Payment proof submitted successfully. Access will be granted shortly after verification.",
      enrolmentStatus: user.enrolmentStatus,
    });
  } catch (error) {
    console.error("Payment submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit payment details" },
      { status: 500 }
    );
  }
}

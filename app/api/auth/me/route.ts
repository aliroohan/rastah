import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    await connectToDatabase();
    const user = await User.findById(session.userId).select("-password");
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Check device concurrency on `me` call
    if (user.activeSessionId && user.activeSessionId !== session.sessionId) {
      return NextResponse.json(
        { user: null, error: "CONCURRENT_DEVICE_LOGIN" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        whatsapp: user.whatsapp,
        role: user.role,
        enrolmentStatus: user.enrolmentStatus,
        paymentDetails: user.paymentDetails,
      },
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

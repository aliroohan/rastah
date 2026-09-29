import { NextResponse } from "next/server";
import { getSession, clearSessionCookie } from "@/lib/session";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { valid: false, code: "UNAUTHENTICATED" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const user = await User.findById(session.userId).select("activeSessionId");

    if (!user) {
      await clearSessionCookie();
      return NextResponse.json(
        { valid: false, code: "USER_NOT_FOUND" },
        { status: 401 }
      );
    }

    // Crucial check: Does the session token ID match the currently active session in DB?
    if (user.activeSessionId && user.activeSessionId !== session.sessionId) {
      await clearSessionCookie();
      return NextResponse.json(
        {
          valid: false,
          code: "CONCURRENT_DEVICE_LOGIN",
          message: "Someone else logged into your account from another device. You have been logged out.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ valid: true, timestamp: Date.now() });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json(
      { valid: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

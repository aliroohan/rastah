import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { setSessionCookie } from "@/lib/session";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Single-device login enforcement:
    // Generate a new unique activeSessionId.
    // This immediately invalidates any other active session on previous devices!
    const newSessionId = crypto.randomUUID();
    const userAgent = req.headers.get("user-agent") || "Unknown Device";

    user.activeSessionId = newSessionId;
    user.lastLoginAt = new Date();
    user.lastLoginDevice = userAgent;
    await user.save();

    await setSessionCookie({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      sessionId: newSessionId,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        whatsapp: user.whatsapp,
        role: user.role,
        enrolmentStatus: user.enrolmentStatus,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to log in. Please try again." },
      { status: 500 }
    );
  }
}

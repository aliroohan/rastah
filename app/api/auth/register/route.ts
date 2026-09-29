import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { setSessionCookie } from "@/lib/session";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email, whatsapp, password } = await req.json();

    if (!name || !email || !whatsapp || !password) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSessionId = crypto.randomUUID();
    const userAgent = req.headers.get("user-agent") || "Unknown Device";

    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      whatsapp: whatsapp.trim(),
      password: hashedPassword,
      role: "student",
      activeSessionId: newSessionId,
      lastLoginAt: new Date(),
      lastLoginDevice: userAgent,
      enrolmentStatus: "NONE",
    });

    await setSessionCookie({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
      sessionId: newSessionId,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        whatsapp: newUser.whatsapp,
        role: newUser.role,
        enrolmentStatus: newUser.enrolmentStatus,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}

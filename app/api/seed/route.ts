import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { Progress } from "@/lib/models/Progress";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function GET() {
  try {
    await connectToDatabase();

    const hashedPassword = await bcrypt.hash("student123456", 10);
    const adminHashedPassword = await bcrypt.hash("admin123456", 10);

    const seedUsers = [
      {
        name: "Muhammad Ali (Admin)",
        email: "admin@rastah.com",
        whatsapp: "03001234567",
        password: adminHashedPassword,
        role: "admin" as const,
        activeSessionId: crypto.randomUUID(),
        enrolmentStatus: "ACTIVE" as const,
        lastLoginAt: new Date(),
        lastLoginDevice: "Chrome on Mac",
      },
      {
        name: "Hamza Ahmed (Active Student)",
        email: "student@rastah.com",
        whatsapp: "03119876543",
        password: hashedPassword,
        role: "student" as const,
        activeSessionId: crypto.randomUUID(),
        enrolmentStatus: "ACTIVE" as const,
        paymentDetails: {
          method: "EasyPaisa",
          trxId: "EP-9988776655",
          submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        lastLoginAt: new Date(),
        lastLoginDevice: "Chrome on Windows",
      },
      {
        name: "Bilal Tariq (Pending Approval)",
        email: "pending@rastah.com",
        whatsapp: "03215554321",
        password: hashedPassword,
        role: "student" as const,
        activeSessionId: crypto.randomUUID(),
        enrolmentStatus: "PENDING_VERIFICATION" as const,
        paymentDetails: {
          method: "JazzCash",
          trxId: "JC-5544332211",
          submittedAt: new Date(),
        },
        lastLoginAt: new Date(),
        lastLoginDevice: "Safari on iPhone",
      },
      {
        name: "Usman Rafiq (Unpaid Student)",
        email: "newstudent@rastah.com",
        whatsapp: "03451122334",
        password: hashedPassword,
        role: "student" as const,
        activeSessionId: crypto.randomUUID(),
        enrolmentStatus: "NONE" as const,
        lastLoginAt: new Date(),
        lastLoginDevice: "Android Chrome",
      },
    ];

    const results = [];

    for (const u of seedUsers) {
      const existing = await User.findOne({ email: u.email });
      if (existing) {
        existing.name = u.name;
        existing.whatsapp = u.whatsapp;
        existing.password = u.password;
        existing.role = u.role;
        existing.enrolmentStatus = u.enrolmentStatus;
        existing.paymentDetails = u.paymentDetails;
        await existing.save();
        results.push({ email: u.email, status: "updated", role: u.role, enrolmentStatus: u.enrolmentStatus });
      } else {
        const created = await User.create(u);
        results.push({ email: u.email, status: "created", role: u.role, enrolmentStatus: u.enrolmentStatus });

        // Seed some sample progress for the active student
        if (u.email === "student@rastah.com") {
          await Progress.create({
            userId: created._id,
            courseSlug: "ecommerce-business-masterclass",
            completedLessonIds: ["m1-l1", "m1-l2"],
            lastWatchedLessonId: "m1-l3",
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Rastah LMS Database seeded successfully!",
      accounts: [
        {
          role: "Admin",
          email: "admin@rastah.com",
          password: "admin123456",
          note: "Can access /admin/enrolments and approve student payments",
        },
        {
          role: "Active Student",
          email: "student@rastah.com",
          password: "student123456",
          note: "Paid Rs. 2,000, can access /learn classroom directly with lessons 1 & 2 marked completed",
        },
        {
          role: "Pending Student",
          email: "pending@rastah.com",
          password: "student123456",
          note: "Submitted JazzCash Trx ID, ready to be approved in /admin/enrolments",
        },
        {
          role: "Unpaid Student",
          email: "newstudent@rastah.com",
          password: "student123456",
          note: "Shows payment submission form in /dashboard",
        },
      ],
      results,
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to seed database",
        tip: "Ensure MongoDB is running or MONGODB_URI in .env.local points to a live MongoDB instance.",
      },
      { status: 500 }
    );
  }
}

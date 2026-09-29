import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";

// Load .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
let mongoUri = "mongodb://127.0.0.1:27017/rastah";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const match = envContent.match(/MONGODB_URI=(.*)/);
  if (match && match[1]) {
    mongoUri = match[1].trim();
  }
}

console.log("Connecting to MongoDB:", mongoUri);

async function runSeed() {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB successfully.");

    const db = mongoose.connection.db;
    const usersCollection = db.collection("users");
    const progressCollection = db.collection("progresses");

    const hashedPassword = await bcrypt.hash("student123456", 10);
    const adminHashedPassword = await bcrypt.hash("admin123456", 10);

    const testUsers = [
      {
        name: "Muhammad Ali (Admin)",
        email: "admin@rastah.com",
        whatsapp: "03001234567",
        password: adminHashedPassword,
        role: "admin",
        activeSessionId: crypto.randomUUID(),
        enrolmentStatus: "ACTIVE",
        lastLoginAt: new Date(),
        lastLoginDevice: "Chrome on Mac",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hamza Ahmed (Active Student)",
        email: "student@rastah.com",
        whatsapp: "03119876543",
        password: hashedPassword,
        role: "student",
        activeSessionId: crypto.randomUUID(),
        enrolmentStatus: "ACTIVE",
        paymentDetails: {
          method: "EasyPaisa",
          trxId: "EP-9988776655",
          submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        lastLoginAt: new Date(),
        lastLoginDevice: "Chrome on Windows",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bilal Tariq (Pending Approval)",
        email: "pending@rastah.com",
        whatsapp: "03215554321",
        password: hashedPassword,
        role: "student",
        activeSessionId: crypto.randomUUID(),
        enrolmentStatus: "PENDING_VERIFICATION",
        paymentDetails: {
          method: "JazzCash",
          trxId: "JC-5544332211",
          submittedAt: new Date(),
        },
        lastLoginAt: new Date(),
        lastLoginDevice: "Safari on iPhone",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Usman Rafiq (Unpaid Student)",
        email: "newstudent@rastah.com",
        whatsapp: "03451122334",
        password: hashedPassword,
        role: "student",
        activeSessionId: crypto.randomUUID(),
        enrolmentStatus: "NONE",
        lastLoginAt: new Date(),
        lastLoginDevice: "Android Chrome",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const u of testUsers) {
      await usersCollection.updateOne(
        { email: u.email },
        { $set: u },
        { upsert: true }
      );
      console.log(`Seeded user: ${u.email} (${u.role}, status: ${u.enrolmentStatus})`);
    }

    // Seed progress for active student
    const activeStudent = await usersCollection.findOne({ email: "student@rastah.com" });
    if (activeStudent) {
      await progressCollection.updateOne(
        { userId: activeStudent._id, courseSlug: "ecommerce-business-masterclass" },
        {
          $set: {
            userId: activeStudent._id,
            courseSlug: "ecommerce-business-masterclass",
            completedLessonIds: ["m1-l1", "m1-l2"],
            lastWatchedLessonId: "m1-l3",
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
      console.log("Seeded course progress for student@rastah.com");
    }

    console.log("\n==========================================");
    console.log("🎉 SEED COMPLETED SUCCESSFULLY!");
    console.log("==========================================");
    console.log("1. Admin Account:");
    console.log("   Email:    admin@rastah.com");
    console.log("   Password: admin123456");
    console.log("   Access:   /admin/enrolments");
    console.log("------------------------------------------");
    console.log("2. Active Student Account (Paid Rs. 2,000):");
    console.log("   Email:    student@rastah.com");
    console.log("   Password: student123456");
    console.log("   Access:   /dashboard & /learn/ecommerce-business-masterclass");
    console.log("------------------------------------------");
    console.log("3. Pending Student Account:");
    console.log("   Email:    pending@rastah.com");
    console.log("   Password: student123456");
    console.log("   Access:   /dashboard (Verification in progress)");
    console.log("------------------------------------------");
    console.log("4. Unpaid Student Account:");
    console.log("   Email:    newstudent@rastah.com");
    console.log("   Password: student123456");
    console.log("   Access:   /dashboard (Shows payment submission form)");
    console.log("==========================================\n");

    process.exit(0);
  } catch (err) {
    console.error("Seed execution error:", err.message);
    console.log("\nTip: Make sure MongoDB is running locally (brew services start mongodb-community) or provide a valid MONGODB_URI in .env.local.");
    process.exit(1);
  }
}

runSeed();

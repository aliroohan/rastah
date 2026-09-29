import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  role: "student" | "admin";
  activeSessionId?: string;
  lastLoginAt?: Date;
  lastLoginDevice?: string;
  enrolmentStatus: "NONE" | "PENDING_VERIFICATION" | "ACTIVE";
  paymentDetails?: {
    method: string;
    trxId?: string;
    screenshotUrl?: string;
    submittedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    activeSessionId: { type: String, default: "" },
    lastLoginAt: { type: Date },
    lastLoginDevice: { type: String, default: "Unknown Device" },
    enrolmentStatus: {
      type: String,
      enum: ["NONE", "PENDING_VERIFICATION", "ACTIVE"],
      default: "NONE",
    },
    paymentDetails: {
      method: { type: String },
      trxId: { type: String },
      screenshotUrl: { type: String },
      submittedAt: { type: Date },
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseSlug: string;
  completedLessonIds: string[];
  lastWatchedLessonId?: string;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseSlug: { type: String, required: true },
    completedLessonIds: { type: [String], default: [] },
    lastWatchedLessonId: { type: String, default: "m1-l1" },
  },
  { timestamps: true }
);

// Compound index so a user has 1 progress record per course
ProgressSchema.index({ userId: 1, courseSlug: 1 }, { unique: true });

export const Progress: Model<IProgress> =
  mongoose.models.Progress || mongoose.model<IProgress>("Progress", ProgressSchema);

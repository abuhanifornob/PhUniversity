import mongoose, { Schema } from "mongoose";

import { AcademicSemester } from "../academicSemester/academicSemester.model";

import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: AcademicSemester,
  },
  status: {
    type: String,
    enum: semesterRegistrationStatus,
    default: "UPCOMING",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    default: 3,
  },
  maxCredit: {
    type: Number,
    default: 16,
  },
});

export const SemesterRegistration = mongoose.model<TSemesterRegistration>(
  "semesterRegistration",
  semesterRegistrationSchema
);

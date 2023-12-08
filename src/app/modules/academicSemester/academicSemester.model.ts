import { Schema, model, mongo } from "mongoose";

import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constants";
import { TAcademicSemester } from "./academicSemester.interface";

export const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: [true, "Achademic name is Required"],
      enum: AcademicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre("save", async function (next) {
  const isExistsSemesterNmae = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isExistsSemesterNmae) {
    throw new Error("Semseter is Already Exists");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "academicSemester",
  academicSemesterSchema
);

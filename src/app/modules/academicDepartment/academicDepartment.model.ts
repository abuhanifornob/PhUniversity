import { Schema, model } from "mongoose";
import { TAcademciDepartment } from "./academicDepartment.interface";

export const academicDepartmentSchema = new Schema<TAcademciDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
  },
});

academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExits = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExits) {
    throw new Error("This Department alreay Exits!!");
  }
  next();
});

academicDepartmentSchema.pre("findByIdAndUpdate", async function (next) {
  const quary = this.getQuery();
  const isDepartmentIdExits = await AcademicDepartment.findOne(quary);
  if (!isDepartmentIdExits) {
    throw new Error("This id Don't Exitt !!");
  }
  next();
});

export const AcademicDepartment = model<TAcademciDepartment>(
  "academicDepartment",
  academicDepartmentSchema
);

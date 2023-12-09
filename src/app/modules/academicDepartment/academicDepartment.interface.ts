import { Types } from "mongoose";

export type TAcademciDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
};

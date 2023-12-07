import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  const result = await Student.create(studentData);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
};

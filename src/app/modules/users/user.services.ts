import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";

import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // partial User Data type Chek
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  //set  generated id
  userData.id = await generateStudentId(admissionSemester);
  // Create user Data
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    // Create Studnt Data
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};
export const UserServices = {
  createStudentIntoDB,
};

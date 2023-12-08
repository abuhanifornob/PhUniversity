import config from "../../config";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";

import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studnetData: TStudent) => {
  // partial User Data type Chek
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.id = "203003";
  userData.role = "student";
  // Create user Data
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studnetData.id = newUser.id;
    studnetData.user = newUser._id;
    // Create Studnt Data
    const newStudent = await Student.create(studnetData);
    return newStudent;
  }
};
export const UserServices = {
  createStudentIntoDB,
};

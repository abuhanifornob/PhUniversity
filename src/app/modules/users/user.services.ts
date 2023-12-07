import config from "../../config";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";

import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studnetData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.id = "203001";
  userData.role = "student";
  console.log(userData);
  const newUser = await User.create(userData);
  console.log(newUser);
  if (Object.keys(newUser).length) {
    studnetData.id = newUser.id;
    studnetData.user = newUser._id;
    const newStudent = await Student.create(studnetData);
    return newStudent;
  }
};
export const UserServices = {
  createStudentIntoDB,
};

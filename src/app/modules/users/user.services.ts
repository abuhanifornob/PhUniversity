import mongoose from "mongoose";

import httpStatus from "http-status";

import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import AppError from "../../errors/appError";

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

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);
    // Create user Data(transacton-1)
    const newUser = await User.create([userData], { session }); // transection ar time a array thake
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to Create User");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference Id

    // Create Studnt Data (transection-2)
    const newStudent = await Student.create([payload], { session }); // we get array data
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to Create User");
    }
    // Finaly Comple both Session then
    await session.commitTransaction();
    await session.endSession;
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    session.endSession;
  }
};
export const UserServices = {
  createStudentIntoDB,
};

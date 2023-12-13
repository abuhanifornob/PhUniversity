import mongoose from "mongoose";

import httpStatus from "http-status";

import config from "../../config";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import AppError from "../../errors/appError";

import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // partial User Data type Chek
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "student";

  // find academic semester info
  const admissionSemester: any = await AcademicSemester.findById(
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
    session.endSession;
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    session.endSession;
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "faculty";
  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    const newUser = await User.create([userData], { session }); // we will get arry data
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "User Create is Fail!!!");
    }

    console.log(newUser);
    console.log("payload is:", payload);

    //now Create Student
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // Reference Id

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty Create is Fail!!!");
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const createAdminIntoDb = async (password: string, payload: TAdmin) => {
  let userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "admin";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    console.log(userData);
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "User Create Faild");
    }

    // Admin Create
    console.log("new User is", newUser);
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    console.log("admin Payload Data is", payload);
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Admin Create Faild");
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession;
    throw new Error(error);
  }
};
export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDb,
};

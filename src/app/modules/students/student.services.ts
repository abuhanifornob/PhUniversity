import mongoose from "mongoose";

import httpStatus from "http-status";

import { User } from "../users/user.model";
import AppError from "../../errors/appError";

import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const getAllStudentFromBD = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  console.log("student id is", id);
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardiant, localGuardiant, ...remainingStudentData } = payload;
  const modifiedUpdatetData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'

  */
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatetData[`name.${key}`] = value;
    }
  }
  if (guardiant && Object.keys(guardiant)) {
    for (const [key, value] of Object.entries(guardiant)) {
      modifiedUpdatetData[`guardiant.${key}`] = value;
    }
  }

  if (localGuardiant && Object.keys(localGuardiant).length) {
    for (const [key, value] of Object.entries(localGuardiant)) {
      modifiedUpdatetData[`ocalGuardiant.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatetData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: String) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Delete a Studnet Transaction-1
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to delete Status");
    }
    console.log("Deleted Studnet", deletedStudent);
    // Delete User Start Transaction-2
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to delete User");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};
export const StudentServices = {
  getAllStudentFromBD,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};

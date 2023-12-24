import mongoose from "mongoose";

import httpStatus from "http-status";

import { User } from "../users/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";

import { FacultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";

const getAllFacultyFromDB = async (quary: Record<string, unknown>) => {
  const facultyQuary = new QueryBuilder(
    Faculty.find().populate("academicDepartment"),
    quary
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuary.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id }).populate("academicDepartment");
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainigFacultyData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainigFacultyData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  console.log(modifiedUpdateData);
  const result = await Faculty.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty Delete is Faily !");
    }
    console.log("Delete Faculty is", deleteFaculty);
    const userId = deleteFaculty.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty Delete is Faily !");
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const FacultySercices = {
  getAllFacultyFromDB,
  updateFacultyIntoDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB,
};

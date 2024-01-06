import mongoose from "mongoose";

import httpStatus from "http-status";

import { User } from "../users/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";

import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const getAllStudentFromBD = async (query: Record<string, unknown>) => {
  // console.log("Base quary", quary);
  // const objectQuary = { ...quary };
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeFields.forEach((el) => delete objectQuary[el]); // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  // let searchTerm = ""; // SET DEFAULT VALUE
  // if (quary?.searchTerm) {
  //   searchTerm = quary?.searchTerm as string;
  // }
  const studentSearchableFields = ["email", "name.firstName", "prasendAddress"];
  // // Search Quary

  // const searchQuary = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });
  // //
  // const filterQuary = searchQuary
  //   .find(objectQuary)
  //   .populate("admissionSemester")
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   });
  // // Sorting Funtionality
  // let sort = "-createdAt"; // Default Sort parametter
  // if (quary?.sort) {
  //   sort = quary?.sort as string;
  // }
  // const quarySort = filterQuary.sort(sort);

  // // Default
  // let limit = 1;
  // let page = 1;
  // let skip = 0;
  // // Limit Functionlity

  // if (quary?.limit) {
  //   limit = Number(quary?.limit);
  // }
  // if (quary?.page) {
  //   page = Number(quary.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = quarySort.skip(skip);
  // const limitQuary = paginateQuery.limit(limit);
  // // FIELDS LIMITING FUNCTIONALITY:

  // // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH

  // fields: "name,email"; // WE ARE ACCEPTING FROM REQUEST
  // fields: "name email"; // HOW IT SHOULD BE
  // let fields = "-__v";
  // if (quary?.fields) {
  //   fields = (quary.fields as string).split(",").join(" ");
  // }
  // const fieldQuery = await limitQuary.select(fields);
  // return fieldQuery;
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("user")
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
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

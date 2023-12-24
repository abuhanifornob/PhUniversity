import { Request } from "express";

import mongoose from "mongoose";

import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import QueryBuilder from "../../builder/QueryBuilder";

import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCoursefaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (quary: Record<string, unknown>) => {
  const courseQuary = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    quary
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuary.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!updatedBasicCourseInfo) {
      throw new Error("Basinc Course Information Fail!!");
    }
    // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter the preRequsion Fields
      const deletePreRequsiton = preRequisiteCourses
        .filter((pCourse) => pCourse.course && pCourse.isDeleted)
        .map((el) => el.course);

      const deletePreRequsitonCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletePreRequsiton } },
          },
        },
        { new: true, runValidators: true, session }
      );

      if (!deletePreRequsitonCourses) {
        throw new Error("Delete Course Pre Requsiton Fail !!!");
      }
      const updatePrerequsite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted
      );
      const updatePreRequsiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: updatePrerequsite } },
        },
        { new: true, runValidators: true, session }
      );
      if (!updatePreRequsiteCourse) {
        throw new Error("Update Pre Requsiton Faild ");
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    );
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession;
    throw new Error("Course Update Fail!");
  }
};
const assainFaculyWithCourseIntoDB = async (
  id: string,
  payload: Partial<TFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

const removeFacultyFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    }
  );
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  deleteCourseFromDB,
  getSingleCourseFromDB,
  getAllCourseFromDB,
  updateCourseIntoDB,
  assainFaculyWithCourseIntoDB,
  removeFacultyFromCourseFromDB,
};

import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { UserServices } from "./user.services";

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Create Succefully",
    data: result,
  });
});
const createFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Create Succefully",
    data: result,
  });
});

const createAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDb(password, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Create Succefully",
    data: result,
  });
});
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};

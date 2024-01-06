import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus from "http-status";

import AppError from "../../errors/appError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { UserServices } from "./user.services";

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Create Succefully",
    data: result,
  });
});
const createFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Create Succefully",
    data: result,
  });
});

const createAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDb(
    req.file,
    password,
    adminData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Create Succefully",
    data: result,
  });
});
const getMe: RequestHandler = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, "Token Not Found !");
  }
  const { userId, userRole } = req.user;

  const result = await UserServices.getMe(userId, userRole);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrive Succefully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status is updated succesfully",
    data: result,
  });
});
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};

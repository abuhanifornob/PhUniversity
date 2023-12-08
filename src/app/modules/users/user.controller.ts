import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";

import { UserServices } from "./user.services";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

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
export const UserController = {
  createStudent,
};

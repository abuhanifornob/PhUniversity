import { Request, Response } from "express";

import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { StudentServices } from "./student.services";

const getallStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromBD(req.query);
  console.log("Cookis is ", req.cookies);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  console.log("Studnet is is Inside Controller", studentId);
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Studnet is retrieved succesfully",
    data: result,
  });
});

const updateStudnet = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  console.log("Studnet id and Student is", student, studentId);
  const result = await StudentServices.updateStudentIntoDB(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is Update succesfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is Delete succesfully",
    data: result,
  });
});
export const StudentController = {
  getallStudent,
  getSingleStudent,
  updateStudnet,
  deleteStudent,
};

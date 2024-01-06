import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { FacultySercices } from "./faculty.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllFaculty: RequestHandler = catchAsync(async (req, res) => {
  console.log("test", req.user);
  const result = await FacultySercices.getAllFacultyFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty are retrieved successfully",
    data: result,
  });
});

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacultySercices.getSingleFacultyFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty are retrieved successfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultySercices.updateFacultyIntoDB(id, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty are update successfully!!",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultySercices.deleteFacultyFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "faculy are update successfully!!",
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};

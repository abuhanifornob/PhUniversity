import { RequestHandler } from "express";

import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { AdminServices } from "./admin.services";

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins are retrieved successfully",
    data: result,
  });
});

const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.getSingleAdminFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin are retrieved successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin are update successfully!!",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin are update successfully!!",
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};

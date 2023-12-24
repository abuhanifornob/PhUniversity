import mongoose from "mongoose";

import httpStatus from "http-status";

import { User } from "../users/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";

import { AdminSearchableFields } from "./admin.constant";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const getAllAdminFromDB = async (quary: Record<string, unknown>) => {
  const adminQuary = new QueryBuilder(Admin.find(), quary)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = adminQuary.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  // Check Admin id is exits or not
  const isAdminIdExits = await Admin.isAdminExists(id);
  if (!isAdminIdExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user id is not Exits");
  }

  const result = await Admin.findOne({ id });
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  // Check Admin id is exits or not
  const isAdminIdExits = await Admin.isAdminExists(id);
  if (!isAdminIdExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user id is not Exits");
  }
  console.log("Update Admin Data", id, payload);
  const { name, ...remainingAdminData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingAdminData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  // Check Admin id is exits or not
  const isAdminIdExits = await Admin.isAdminExists(id);
  if (!isAdminIdExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user id is not Exits");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Delete Admin from Database
    const deleteAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deleteAdmin) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to Delete Admin From Database"
      );
    }

    // get User _id From DeleteAdmin
    const userId = deleteAdmin.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );
    if (!deleteUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to Delete User From Database"
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};

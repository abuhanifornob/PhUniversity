import QueryBuilder from "../../builder/QueryBuilder";

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
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const result = await Admin.findByIdAndUpdate(
    { id },
    { payload },
    { new: true, runValidators: true }
  );
};

export const AdminServices = {
  getAllAdminFromDB,
};

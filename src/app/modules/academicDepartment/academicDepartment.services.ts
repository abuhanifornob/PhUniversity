import { TAcademciDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (paylot: TAcademciDepartment) => {
  const result = await AcademicDepartment.create(paylot);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const getSingleAcademicDepartmentFrobDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  paylod: Partial<TAcademciDepartment>
) => {
  // Check Update id is Exits ro not Exists
  const isDepartmentIdExit = await AcademicDepartment.findOne({
    _id: id,
  });
  if (!isDepartmentIdExit) {
    throw new Error("This ID Is not Eixit !!!");
  }
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    paylod,
    {
      new: true,
    }
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFrobDB,
  updateAcademicDepartmentIntoDB,
};

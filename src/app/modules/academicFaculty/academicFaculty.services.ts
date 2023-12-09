import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoBD = async (paylod: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(paylod);
  return result;
};

const getAllAcademicFacultesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  paylod: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, paylod, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoBD,
  getAllAcademicFacultesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};

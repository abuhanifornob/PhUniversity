import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //203001   0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString(); //0000 by default id
  const lastStudentID = await findLastStudentId(); //20030010001
  const lastStudentSemesterCode = lastStudentID?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentID?.substring(0, 4);
  const currentSemesterCode = payload?.code;
  const currentSemesterYear = payload?.year;

  if (
    lastStudentID &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentID.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

export const findLastFacultyId = async () => {
  const lastFacultyId = await User.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean();
  // Finding Lst Faculty Id
  return lastFacultyId?.id ? lastFacultyId.id : undefined;
};
export const generateFacultyId = async () => {
  // set Lst Default or Last Faculty id
  const lastFacultyId = await findLastFacultyId();
  let currentId = lastFacultyId ? lastFacultyId.substring(2) : (0).toString();
  let incrementFacultyId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementFacultyId = `F-${incrementFacultyId}`;

  return incrementFacultyId;
};

export const findLastAdminId = async () => {
  const lastAdminId = await User.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean();
  // Finding Lst Faculty Id
  return lastAdminId?.id ? lastAdminId.id : undefined;
};
export const generateAdminId = async () => {
  // set Lst Default or Last Faculty id
  const lastAdminId = await findLastAdminId();
  let currentId = lastAdminId ? lastAdminId.substring(2) : (0).toString();
  let incrementAdmin = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementAdmin = `A-${incrementAdmin}`;

  return incrementAdmin;
};

generateAdminId();

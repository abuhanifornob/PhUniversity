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

import { Types } from "mongoose";

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGuardiant = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGuardiant = {
  name: string;
  localGuardintcontactNumber: string;
  email: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TStudentName;
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  prasendAddress: string;
  parmanentAddress: string;
  guardiant: TGuardiant;
  localGuardiant: TLocalGuardiant;
  profileImg?: string;
};

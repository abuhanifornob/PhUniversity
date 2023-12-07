import { Schema, model } from "mongoose";
import {
  TGuardiant,
  TLocalGuardiant,
  TStudent,
  TStudentName,
} from "./student.interface";

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, "Please tel us your First Name"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Please tel us your Last name"],
  },
});

const guardiantSchema = new Schema<TGuardiant>({
  fatherName: { type: String, required: [true, "Father Name is required"] },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact Number is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact Number is required"],
  },
  motherName: { type: String, required: [true, "Mother Name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is required"],
  },
});

const localGuardiantSchema = new Schema<TLocalGuardiant>({
  name: { type: String, required: [true, "Local Guardian Name is required"] },
  localGuardintcontactNumber: {
    type: String,
    required: [true, "Local Guardian Contact Number is required"],
  },
  email: { type: String, required: [true, "Email is required"] },
  address: { type: String, required: [true, "Address is required"] },
});

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, "Please tel us your Id"],
    unique: true,
  },
  name: {
    type: studentNameSchema,
    required: [true, "Please tel us your Last name"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not valid",
    },
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of Brith is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Invalid email address",
    },
  },
  contactNo: {
    type: String,
    required: [true, "Contact is Required"],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "emergency ContactNo in Required"],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
      message: "{VALUE} is not valid",
    },
  },
  parmanentAddress: {
    type: String,
    required: [true, "Permanent Address is required"],
  },
  prasendAddress: {
    type: String,
    required: [true, "Present Address is required"],
  },
  guardiant: {
    type: guardiantSchema,
    required: [true, "Guardian details are required"],
  },
  localGuardiant: {
    type: localGuardiantSchema,
    required: [true, "Local Guardian details are required"],
  },
  profileImg: {
    type: String,
    required: [true, "Profile Image URL is required"],
  },
});

const Student = model<TStudent>("Student", studentSchema);

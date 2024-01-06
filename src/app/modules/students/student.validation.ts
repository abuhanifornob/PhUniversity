import { z } from "zod";

const studentNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255),
  middleName: z.string().max(255).optional(),
  lastName: z.string().min(1).max(255),
});

const guardiantValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(255),
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
});

const localGuardiantValidationSchema = z.object({
  name: z.string().min(1).max(255),
  localGuardintcontactNumber: z.string().min(1).max(255),
  email: z.string().email(),
  address: z.string().min(1).max(255),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: studentNameValidationSchema,
      gender: z.enum(["male", "female"]),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]),
      parmanentAddress: z.string().min(1).max(255),
      prasendAddress: z.string().min(1).max(255),
      guardiant: guardiantValidationSchema,
      localGuardiant: localGuardiantValidationSchema,

      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

// Studnet Update Validation

const updateStudentNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255).optional(),
  middleName: z.string().max(255).optional(),
  lastName: z.string().min(1).max(255).optional(),
});

const updateGuardiantValidationSchema = z.object({
  fatherName: z.string().min(1).max(255).optional(),
  fatherContactNo: z.string().min(1).max(255).optional(),
  fatherOccupation: z.string().min(1).max(255).optional(),
  motherContactNo: z.string().min(1).max(255).optional(),
  motherName: z.string().min(1).max(255).optional(),
  motherOccupation: z.string().min(1).max(255).optional(),
});

const updateLocalGuardiantValidationSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  localGuardintcontactNumber: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  address: z.string().min(1).max(255).optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: updateStudentNameValidationSchema.optional(),
      gender: z.enum(["male", "female"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"])
        .optional(),
      parmanentAddress: z.string().min(1).max(255).optional(),
      prasendAddress: z.string().min(1).max(255).optional(),
      guardiant: updateGuardiantValidationSchema.optional(),
      localGuardiant: updateLocalGuardiantValidationSchema.optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidationSchema = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};

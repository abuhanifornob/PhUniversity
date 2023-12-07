import z from "zod";

const studentNameZodSchema = z.object({
  firstName: z.string().min(1).max(255),
  middleName: z.string().max(255).optional(),
  lastName: z.string().min(1).max(255),
});

const guardiantZodSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(255),
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
});

const localGuardiantZodSchema = z.object({
  name: z.string().min(1).max(255),
  localGuardintcontactNumber: z.string().min(1).max(255),
  email: z.string().email(),
  address: z.string().min(1).max(255),
});

const studentZodSchema = z.object({
  id: z.string(),
  name: studentNameZodSchema,
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]),
  parmanentAddress: z.string().min(1).max(255),
  prasendAddress: z.string().min(1).max(255),
  guardiant: guardiantZodSchema,
  localGuardiant: localGuardiantZodSchema,
  profileImg: z.string().url(),
});

export default studentZodSchema;

import { semesterRegistrationStatus } from "./semesterRegistration.constant";
import { z } from "zod";

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(semesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
});
const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(semesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  }),
});

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};

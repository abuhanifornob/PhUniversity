import { z } from "zod";

const createAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic faculty must be string",
      required_error: "Name is required",
    }),
  }),
});

const updateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic faculty must be string",
      required_error: "Name is required",
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
};

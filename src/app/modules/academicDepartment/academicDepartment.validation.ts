import { z } from "zod";

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic faculty must be string",
      required_error: "Name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic faculty must be string",
    }),
  }),
});
const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic faculty must be string",
        required_error: "Name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic faculty must be string",
      })
      .optional(),
  }),
});

export const AcademicDepartmetValidation = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
};

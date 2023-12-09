import express from "express";

import validateRequest from "../../middleware/validateRequest";

import { AcademicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = express.Router();
router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);
router.get("/", AcademicSemesterController.getAllAcademicSemester);
router.get(
  "/:semesterId",
  AcademicSemesterController.getSingleAcademicSemester
);
router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.updateAcademicSemester
);

export const AcademicSemesterRoutes = router;

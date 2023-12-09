import express from "express";

import validateRequest from "../../middleware/validateRequest";

import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();
router.post(
  "/create-academic-faculty",
  validateRequest(AcademicFacultyValidation.createAcademicFacultyValidation),
  AcademicFacultyController.createAcademicFaculty
);
router.get("/", AcademicFacultyController.getAllAcademicFacultes);
router.get("/:facultyId", AcademicFacultyController.getSingleAcademicFaculty);
router.patch("/:facultyId", AcademicFacultyController.updateAcademicFaculty);

export const AcademicFacultyRoutes = router;

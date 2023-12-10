import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmetValidation } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academciDepartment.controller";
import { get } from "mongoose";

const router = express.Router();

router.post(
  "/create-academic-department",
  // validateRequest(
  //   AcademicDepartmetValidation.createAcademicDepartmentValidation
  // ),
  AcademicDepartmentController.createAcademicDepartment
);
router.get("/", AcademicDepartmentController.getAllAcademicDepartment);
router.get(
  "/:departmentId",
  AcademicDepartmentController.getsingleAcademicDepartment
);
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmetValidation.updateAcademicDepartmentValidation
  ),
  AcademicDepartmentController.updateAcademicDepartment
);

export const AcademicDepartmentRouters = router;

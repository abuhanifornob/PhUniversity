import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

import { AnyZodObject } from "zod";

import { AdminValidations } from "../admin/admin.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { studentValidationSchema } from "../students/student.validation";
import validateRequest from "../../middleware/validateRequest";

import { UserController } from "./user.controller";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidationSchema.createStudentValidationSchema),
  UserController.createStudent
);
router.post(
  "/create-faculty",
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty
);
router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin
);

export const UserRoutes = router;

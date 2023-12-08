import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

import { AnyZodObject } from "zod";

import { studentValidationSchema } from "../students/student.validation";
import validateRequest from "../../middleware/validateRequest";

import { UserController } from "./user.controller";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidationSchema.createStudentValidationSchema),
  UserController.createStudent
);

export const UserRoutes = router;

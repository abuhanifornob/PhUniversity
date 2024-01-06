import express from "express";

import { USER_ROLE } from "../users/user.constant";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import { StudentController } from "./student.controller";
import { studentValidationSchema } from "./student.validation";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.student, USER_ROLE.admin),
  StudentController.getallStudent
);
router.get("/:studentId", StudentController.getSingleStudent);
router.delete("/:studentId", StudentController.deleteStudent);
router.patch(
  "/:studentId",
  validateRequest(studentValidationSchema.updateStudentValidationSchema),
  StudentController.updateStudnet
);

export const StudentRoutes = router;

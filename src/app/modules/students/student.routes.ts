import express from "express";

import validateRequest from "../../middleware/validateRequest";

import { StudentController } from "./student.controller";
import { studentValidationSchema } from "./student.validation";

const router = express.Router();

router.get("/", StudentController.getallStudent);
router.get("/:studentId", StudentController.getSingleStudent);
router.delete("/:studentId", StudentController.deleteStudent);
router.patch(
  "/:studentId",
  validateRequest(studentValidationSchema.updateStudentValidationSchema),
  StudentController.updateStudnet
);

export const StudentRoutes = router;

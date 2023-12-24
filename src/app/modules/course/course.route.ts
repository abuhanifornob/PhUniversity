import express from "express";

import validateRequest from "../../middleware/validateRequest";

import { CourseController } from "./course.controller";
import { CourseValidations } from "./course.validation";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse
);

router.get("/:id", CourseController.getSingleCourse);
router.delete("/:id", CourseController.deleteCourse);

router.patch(
  "/:id",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assainFacultyWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFacultyWithCourse
);

router.get("/", CourseController.getAllCourses);

export const CourseRoutes = router;

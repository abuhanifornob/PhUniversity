import express from "express";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";
import validateRequest from "../../middleware/validateRequest";
import { SemesterRegistrationController } from "./semesterRegistration.controller";

const router = express.Router();
router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.createSemesterRegistration
);

router.get(
  "/:id",
  SemesterRegistrationController.getSingleSemesterRegistration
);

router.patch(
  "/:id",
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.updateSemesterRegistration
);

router.delete(
  "/:id",
  SemesterRegistrationController.deleteSemesterRegistration
);
router.get("/", SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;

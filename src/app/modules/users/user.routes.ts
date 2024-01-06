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
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import { USER_ROLE } from "./user.constant";
import { UserController } from "./user.controller";
import { UserZodValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidationSchema.createStudentValidationSchema),
  UserController.createStudent
);
router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty
);
router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin
);
router.get(
  "/me",
  auth(USER_ROLE.admin, "student", "faculty"),
  UserController.getMe
);

router.post(
  "/change-status/:id",
  auth("admin"),
  validateRequest(UserZodValidation.changeStatusValidationSchema),
  UserController.changeStatus
);

export const UserRoutes = router;

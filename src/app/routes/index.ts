import express from "express";

import app from "../../app";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import {
  StudentRoutes,
  StudetRoutes,
} from "../modules/students/student.routes";
import { UserRoutes } from "../modules/users/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

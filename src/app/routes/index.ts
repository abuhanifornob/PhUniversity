import express from "express";

import app from "../../app";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.router";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { StudentRoutes } from "../modules/students/student.routes";
import { UserRoutes } from "../modules/users/user.routes";
import { AcademicDepartmentRouters } from "../modules/academicDepartment/academicDepartment.routes";

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
  {
    path: "/academic-facultes",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

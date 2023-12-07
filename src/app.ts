import express, { NextFunction, Request, Response } from "express";

import cors from "cors";

import { StudetRouters } from "./app/modules/students/student.routes";
import { UserRoutes } from "./app/modules/users/user.routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRoute from "./app/middleware/notFountRoute";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/student", StudetRouters);
app.use("/api/v1/users", UserRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;

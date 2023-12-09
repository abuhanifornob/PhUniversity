import express, { NextFunction, Request, Response } from "express";

import cors from "cors";

import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRoute from "./app/middleware/notFountRoute";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;

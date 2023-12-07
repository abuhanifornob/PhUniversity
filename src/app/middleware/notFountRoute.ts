import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route is NOt Found",
    error: "",
  });
};

export default notFoundRoute;

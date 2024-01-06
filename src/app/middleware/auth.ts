import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";

import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../config";
import AppError from "../errors/appError";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // checking if the token is missing
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Yor are not Authoraization Person"
      );
    }
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string
    ) as JwtPayload;
    const { userRole, userId, iat } = decoded;

    // Check User Role Valid Or Not
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Yor are not Authoraization Person"
      );
    }

    // Checking the user is exits
    const user = await User.isUserExitsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, `${userId} is not Exits `);
    }

    //   const isDeleted = isUserExits?.isDeleted;
    if (await User.isUserDeleted(user?.isDeleted)) {
      throw new AppError(httpStatus.FORBIDDEN, `${user.id} is already Deleted`);
    }
    //   const isBlocked = isUserExits?.status;
    if (await User.isUserBlocked(user?.status)) {
      throw new AppError(httpStatus.FORBIDDEN, `${user.id} is Blocked`);
    }

    // if (
    //   user.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     user.passwordChangedAt,
    //     iat as number
    //   )
    // ) {
    //   throw new AppError(
    //     httpStatus.UNAUTHORIZED,
    //     "You are not authorized ! Time Out"
    //   );
    // }

    req.user = decoded as JwtPayload;

    next();
  });
};

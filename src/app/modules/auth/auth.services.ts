import bcrypt from "bcrypt";

import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";

import httpStatus from "http-status";

import config from "../../config";
import { User } from "../users/user.model";
import AppError from "../../errors/appError";
import { sendEmail } from "../../utils/sendEmail";

import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
const loginUser = async (payload: TLoginUser) => {
  // Checking the user is exits
  const user = await User.isUserExitsByCustomId(payload?.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `${payload.id} is not Exits `);
  }
  // Checking this user is already deleted or active
  //   const isDeleted = isUserExits?.isDeleted;
  if (await User.isUserDeleted(user?.isDeleted)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `${payload?.id} is already Deleted`
    );
  }
  // checking if the user is blocked
  //   const isBlocked = isUserExits?.status;
  if (await User.isUserBlocked(user?.status)) {
    throw new AppError(httpStatus.FORBIDDEN, `${payload.id} is Blocked`);
  }
  // Checked password is correct or wrong

  //   const isPasswordMatch = await bcrypt.compare(
  //     payload?.password,
  //     isUserExits?.password
  //   );
  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Password is Wrong Please Provide Correct Password"
    );
  }

  const jwtPaylaod = {
    userId: user?.id,
    userRole: user?.role,
  };
  const accessToken = await createToken(
    jwtPaylaod,
    config.jwt_access_token as string,
    "1d"
  );

  const refreshToken = await createToken(
    jwtPaylaod,
    config.jwt_access_token as string,
    "10d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // Checking the user is exits
  const user = await User.isUserExitsByCustomId(userData?.userId);
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${userData?.userId} is not Exits `
    );
  }

  //   const isDeleted = isUserExits?.isDeleted;
  if (await User.isUserDeleted(user?.isDeleted)) {
    throw new AppError(httpStatus.FORBIDDEN, `${user.id} is already Deleted`);
  }
  //   const isBlocked = isUserExits?.status;
  if (await User.isUserBlocked(user?.status)) {
    throw new AppError(httpStatus.FORBIDDEN, `${user.id} is Blocked`);
  }
  if (!(await User.isPasswordMatch(payload?.oldPassword, user?.password))) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Password is Wrong Please Provide Correct Password"
    );
  }
  const newPasswordHased = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_Rounds)
  );
  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.userRole },
    {
      password: newPasswordHased,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_token as string
  ) as JwtPayload;

  const { userRole, userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExitsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  // if (
  //   user.passwordChangedAt &&
  //   User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  // ) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  // }

  const jwtPaylaod = {
    userId: user?.id,
    userRole: user?.role,
  };

  const accessToken = await createToken(
    jwtPaylaod,
    config.jwt_access_token as string,
    "365d"
  );

  return {
    accessToken,
  };
};
const forgetPassword = async (userId: string) => {
  // checking if the user is exist
  const user = await User.isUserExitsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const jwtPaylaod = {
    userId: user?.id,
    userRole: user?.role,
  };

  const accessToken = await createToken(
    jwtPaylaod,
    config.jwt_access_token as string,
    "10m"
  );

  const resetLink = `http://localhost:3000?id=${userId}&token=${accessToken}`;

  sendEmail(user.email, resetLink);
  // return resetLink;
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const { id, newPassword } = payload;
  const user = await User.isUserExitsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }
  // Decode Token
  const decoded = jwt.verify(
    token,
    config.jwt_access_token as string
  ) as JwtPayload;
  // Check User Id and Token Decoded
  if (id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, "User is Forbidden !");
  }
  // Haseses New Password
  const newPasswordHased = await bcrypt.hash(
    newPassword,
    Number(config.salt_Rounds)
  );

  // Update Password
  await User.findOneAndUpdate(
    { id, role: decoded.userRole },
    {
      password: newPasswordHased,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
};
export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};

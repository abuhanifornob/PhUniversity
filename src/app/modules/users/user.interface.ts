import { Model } from "mongoose";

import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  email: string;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  passwordChangedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isUserExitsByCustomId(id: string): Promise<TUser>;
  isUserDeleted(isDeleted: boolean): Promise<boolean>;
  isUserBlocked(isBlocked: string): Promise<boolean>;
  isPasswordMatch(
    planTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

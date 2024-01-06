import { Schema, model } from "mongoose";

import bcrypt from "bcrypt";

import config from "../../config";

import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: [true, "Id is Required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 12);
  user.password = hash;
  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExitsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};
userSchema.statics.isUserDeleted = async function (isDeleted: boolean) {
  return isDeleted;
};
userSchema.statics.isUserBlocked = async function (isBlocked: string) {
  return isBlocked === "blocked";
};
userSchema.statics.isPasswordMatch = async function (
  planTextPassword: string,
  hashedPassword: string
) {
  const isPasswordMatch = await bcrypt.compare(
    planTextPassword,
    hashedPassword
  );
  return isPasswordMatch;
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedTimestamp,
  jwtIssuedTimestamp
) {
  const getPassworChangeTime = new Date(passwordChangedTimestamp).getTime();
  const convertMilisecondPasswordChangedTime = getPassworChangeTime / 1000;

  return convertMilisecondPasswordChangedTime > jwtIssuedTimestamp;
};
export const User = model<TUser, UserModel>("user", userSchema);

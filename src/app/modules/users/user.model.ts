import { Schema, model } from "mongoose";

import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, "Id is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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

export const User = model<TUser>("user", userSchema);

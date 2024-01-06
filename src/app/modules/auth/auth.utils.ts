import jwt from "jsonwebtoken";

import config from "../../config";
export const createToken = async (
  jwtPaylaod: {
    userId: string;
    userRole: string;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPaylaod, secret, { expiresIn });
};

export const verifyToken = async (token: string, secret: string) => {
  const decoded = jwt.verify(token, config.jwt_access_token as string);
  return decoded;
};

import dotenv from "dotenv";

import path from "path";
dotenv.config({ path: path.join(process.cwd() + "/.env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  salt_Rounds: process.env.SALT_ROUNDS,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESS_TOKEN,
  jwt_refresh_experi_in: process.env.REFRESH_EXPIRES_IN,
  jwt_access_experi_in: process.env.TOKEN_EXPIRES_IN,
};

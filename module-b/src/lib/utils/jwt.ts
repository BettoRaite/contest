import jwt from "jsonwebtoken";
import type { User } from "../../models/user.js";

const SECRET_KEY = "no_secret_key";
export const generateToken = (user: User) => {
  const { login, password } = user;
  const token = jwt.sign({ login, password }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

export const bearerBlackList = new Set<string>();
export const authenticateJWT = () => {};

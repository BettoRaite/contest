import jwt from "jsonwebtoken";
import type { User } from "../../models/user.js";

const SECRET_KEY = "no_secret_key";
export const generateToken = (id: string) => {
  const token = jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

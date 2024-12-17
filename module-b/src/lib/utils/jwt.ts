import jwt from "jsonwebtoken";

const SECRET_KEY = "no_secret_key";
export const generateToken = (id: number) => {
  const token = jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

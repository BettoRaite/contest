import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY, BEARER_TOKEN_COOKIE } from "@/lib/constants.js";
import { users } from "@/models/user.js";

export const AUTH_KEY = Symbol("Key auth prop on request object");
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.cookies[BEARER_TOKEN_COOKIE];
  if (!token) {
    next();
    return;
  }
  const { id } = jwt.verify(token, SECRET_KEY) as { id: number };
  req.body[AUTH_KEY] = users.find((u) => {
    return u.id === id;
  });
  next();
};

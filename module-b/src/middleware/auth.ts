import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { SECRET_KEY, ROLE_ID_TO_ROLE } from "../lib/constants.js";
import { users, type User } from "../models/user.js";

export const bearerBlackList = new Set<string>();
export const USER_FIELD = Symbol();
export const authenticateToken = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token || bearerBlackList.has(token)) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "unauthenticated" });
      return;
    }
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "invalid credentials" });
        return;
      }
      const { id } = payload as User;
      console.log(payload);
      const user = users.get(String(id));
      if (!user || role !== ROLE_ID_TO_ROLE[user?.roleId]) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "invalid credentials" });
        return;
      }
      req.body[USER_FIELD] = user;
      next();
    });
  };
};

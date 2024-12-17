import type { Request, Response, NextFunction } from "express";
import { BEARER_TOKEN_COOKIE } from "../lib/constants.js";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies[BEARER_TOKEN_COOKIE];
  const { id } = jwt.verify(token, SECRET_KEY) as { id: number };
  if (!Number.isFinite(id)) {
    res.status(401).json({ message: "User not authorized" });
  }
  req.body.user = users.find((u) => {
    return u.id === id;
  });
  next();
};

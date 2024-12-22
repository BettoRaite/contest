import type { Request, Response, NextFunction } from "express";

export const bearerBlackList = new Set<string>();
export const authenticateToken = () => {
  return (req: Request, res: Response, next: NextFunction) => {};
};

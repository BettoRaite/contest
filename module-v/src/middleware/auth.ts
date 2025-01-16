import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '@/config/config';
// import { getUserById } from '@/db/user.db';
// import { users } from 'drizzle/schema';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { verify } = jwt;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(' ')[1];

  // access token does not exist.
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json();
  }
  verify(
    token,
    config.jwt.access_token.secret,
    (err: unknown, payload: JwtPayload) => {
      if (err) {
        return res.sendStatus(StatusCodes.FORBIDDEN);
      } // invalid token
      req.payload = payload;
      next();
    }
  );
};

// export const authorize = (role: 'admin' | 'manager' | 'master') => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     getUserById(req.payload?.userId as unknown as number);
//   };
// };

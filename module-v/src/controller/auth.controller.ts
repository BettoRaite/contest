import type { Request, Response } from 'express';
import type { UserLoginCredentials } from '@/types/types';
import { StatusCodes } from 'http-status-codes';
import { users } from 'drizzle/schema';
import db from '@/db';
import { and, eq } from 'drizzle-orm';
import { createAccessToken } from '@/utils/token';
import { getUserById } from '@/db/user.db';

const handleLogin = async (req: Request, res: Response) => {
  const { login, password } = req.body as UserLoginCredentials;
  const result = await db
    .select()
    .from(users)
    .where(and(eq(users.login, login), eq(users.password, password)));
  const user = result[0];
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: {
        code: 401,
        message: 'Authentication failed'
      }
    });
    return;
  }
  let token = user.apiToken;
  if (!token) {
    token = createAccessToken(user.id);
    await db
      .update(users)
      .set({
        apiToken: token
      })
      .where(eq(users.id, user.id));
  }

  res.status(StatusCodes.OK).json({
    data: {
      user_token: token
    }
  });
};

const handleLogout = async (req: Request, res: Response) => {
  const user = await getUserById(req.payload?.userId as unknown as number);
  if (!user || !user.apiToken) {
    return res.status(StatusCodes.UNAUTHORIZED);
  }

  await db
    .update(users)
    .set({
      apiToken: null
    })
    .where(eq(users.id, user.id));

  res.status(StatusCodes.OK).json({
    data: {
      message: 'logout'
    }
  });
};

const authController = {
  handleLogin,
  handleLogout
};

export default authController;

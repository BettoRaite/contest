import { getUsers } from '@/db/user.db';
import type { UserRegistrationSchema } from '@/validations/user.validation';
import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '@/db';
import { users } from 'drizzle/schema';

export const handleGetUsers = async (_: Request, res: Response) => {
  const users = await getUsers();
  const formatted = users.map((u) => {
    return {
      id: u.id,
      name: u.name,
      login: u.login,
      status: u.status,
      group: u.role
    };
  });

  res.status(StatusCodes.OK).json({
    data: formatted
  });
};

export const handleCreateUser = async (req: Request, res: Response) => {
  const newUser = req.body as unknown as UserRegistrationSchema;
  const result = await db.insert(users).values(newUser).$returningId();
  const { id } = result.at(0) as {
    id: number;
  };

  res.status(StatusCodes.CREATED).json({
    data: {
      id,
      status: 'created'
    }
  });
};

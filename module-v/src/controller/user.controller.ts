import { getUsers } from '@/db/user.db';
import type { UserRegistrationSchema } from '@/validations/user.validation';
import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '@/db';
import { users } from 'drizzle/schema';

const handleGetUsers = async (_: Request, res: Response) => {
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

export const handleAddUser = async (req: Request, res: Response) => {
  const user = req.body as unknown as UserRegistrationSchema;
  await db.insert(users).values(user);
};

const userController = {
  handleGetUsers
};

export default userController;

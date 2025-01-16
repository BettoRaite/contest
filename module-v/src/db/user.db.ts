import db from '.';
import { roles, users } from 'drizzle/schema';
import { eq } from 'drizzle-orm';

export const getUserById = async (id: number) => {
  return (await db.select().from(users).where(eq(users.id, id)))[0];
};

export const getUsers = async () => {
  return await db
    .select({
      id: users.id,
      name: users.name,
      surname: users.surname,
      patronymic: users.patronymic,
      login: users.login,
      password: users.password,
      photo_file: users.photoFile,
      api_token: users.apiToken,
      status: users.status,
      created_at: users.createdAt,
      updated_at: users.updatedAt,
      role: roles.name
    })
    .from(users)
    .innerJoin(roles, eq(users.roleId, roles.id));
};

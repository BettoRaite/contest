import db from '.';
import { users } from 'drizzle/schema';
import { eq } from 'drizzle-orm';

export const getUserById = async (id: number) => {
  return (await db.select().from(users).where(eq(users.id, id)))[0];
};

import z from 'zod';
import type { ZodType } from 'zod';
import type { UserLoginCredentials } from '../types/types';

export const loginSchema: ZodType<UserLoginCredentials> = z.object({
  login: z
    .string({
      message: 'login is required'
    })
    .min(3, { message: 'Login must be at least 3 characters long.' })
    .max(30, { message: 'Login must be at most 30 characters long.' })
    .regex(/^[a-zA-Z0-9._-]+$/, {
      message:
        'Login can only contain letters, numbers, dots, underscores, and hyphens.'
    }), // Adjust regex as needed
  password: z
    .string({
      message: 'password is required'
    })
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(100, { message: 'Password must be at most 100 characters long.' })
  // .regex(/[A-Z]/, {
  //   message: 'Password must contain at least one uppercase letter.'
  // })
  // .regex(/[a-z]/, {
  //   message: 'Password must contain at least one lowercase letter.'
  // })
  // .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  // .regex(/[\W_]/, {
  //   message: 'Password must contain at least one special character.'
  // }) //
});

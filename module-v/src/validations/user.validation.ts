import z from 'zod';

export const userRegistrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().optional(),
  patronymic: z.string().optional(),
  login: z
    .string()
    .min(1, 'Login is required')
    .max(255, 'Login must be less than 255 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  photo_file: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        const validTypes = ['image/jpeg', 'image/png'];
        return file ? validTypes.includes(file.type) : true;
      },
      {
        message: 'Photo file must be a JPEG or PNG'
      }
    ),
  role_id: z.number().int().positive('Role ID must be a positive integer')
});

export type UserRegistrationSchema = z.infer<typeof userRegistrationSchema>;

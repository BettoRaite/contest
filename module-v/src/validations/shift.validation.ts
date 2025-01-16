import z from 'zod';

export const shiftCreateSchema = z
  .object({
    start: z.date().refine((s) => s.getTime() < Date.now()),
    end: z.date()
  })
  .refine(({ start, end }) => {
    return start.getTime() < end.getTime();
  });

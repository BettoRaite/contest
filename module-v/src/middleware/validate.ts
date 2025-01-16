import type { NextFunction, Request, Response } from 'express';
import type { Schema } from 'zod';
import { StatusCodes } from 'http-status-codes';

interface ValidationMiddlewareArgs {
  schema: Schema;
  part: 'query' | 'body';
  errorCode: number;
  errorMessage?: string;
}
export const validate = ({
  schema,
  part,
  errorCode,
  errorMessage = 'Validation error'
}: ValidationMiddlewareArgs) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line security/detect-object-injection
    const { success, error } = schema.safeParse(req[part]);
    if (success) {
      next();
      return;
    }
    const errors = {};
    const formatted = error.format();
    for (const name of Object.keys(formatted)) {
      // eslint-disable-next-line security/detect-object-injection
      errors[name] = formatted[name]._errors;
    }
    res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        code: errorCode,
        message: errorMessage,
        errors
      }
    });
  };
};

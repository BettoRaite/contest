import authController from '@/controller/auth.controller';
import { Router } from 'express';
import { validate } from '@/middleware/validate';
import { loginSchema } from '@/validations/auth.validation';

const authRouter: Router = Router();

authRouter.post(
  '/login',
  validate({
    schema: loginSchema,
    errorCode: 422,
    part: 'body',
    errorMessage: 'Validation error'
  }),
  authController.handleLogin
);

authRouter.get('/logout', authController.handleLogout);

export default authRouter;

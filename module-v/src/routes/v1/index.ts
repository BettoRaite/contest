import { Router } from 'express';
import authRouter from './auth.route';

const router: Router = Router();
router.use(authRouter);

export default router;

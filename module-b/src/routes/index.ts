import express, { type Router } from "express";
import loginRoute from "./login.js";
import adminDashboard from "./adminDashboard.js";
import { StatusCodes } from "http-status-codes";
const router: Router = express.Router();

router.use(adminDashboard);
router.use(loginRoute);

export default router;

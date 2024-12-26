import express, { type Router } from "express";
import adminRoute from "./admin.js";
import authRoute from "./auth.js";
import superuserRoute from "./superuser.js";

const router: Router = express.Router();

router.use(authRoute);
router.use(superuserRoute);
router.use(adminRoute);

export default router;

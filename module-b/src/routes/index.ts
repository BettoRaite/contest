import express, { type Router } from "express";
import authRoute from "./auth.js";
import superuserRoute from "./superuser.js";
import { StatusCodes } from "http-status-codes";
import { joinWithAbsolutePath } from "../lib/utils/path.js";
import multer from "multer";
import { users, type User } from "../models/user.js";

const upload = multer({ dest: "./public/data/uploads/" });
const router: Router = express.Router();

router.use(authRoute);
router.use(superuserRoute);

export default router;

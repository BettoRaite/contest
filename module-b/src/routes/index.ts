import express, { type Router } from "express";
import loginRoute from "./login.js";
import { StatusCodes } from "http-status-codes";
import { joinWithAbsolutePath } from "../lib/utils/path.js";
import multer from "multer";
import { users, type User } from "../models/user.js";
const upload = multer({ dest: "./public/data/uploads/" });
const router: Router = express.Router();

router.get("", (req, res) => {
  res
    .status(StatusCodes.OK)
    .sendFile(joinWithAbsolutePath("src/views/index.html"));
});
router.post("", upload.single("photo"), (req, res) => {
  const { login, password, role, name } = req.body as User;
  console.log({
    ...req.body,
    photo: req.file,
  });
  res.status(StatusCodes.OK).json({ message: "Added user" });
});
router.use(loginRoute);

export default router;

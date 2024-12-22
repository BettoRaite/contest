import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { joinWithAbsolutePath } from "../lib/utils/path.js";
import multer from "multer";
import { users, type User } from "../models/user.js";
import { SALT } from "../lib/constants.js";
const upload = multer({ dest: "./public/data/uploads/" });
const router: Router = express.Router();

router.get("", (req, res) => {
  res
    .status(StatusCodes.OK)
    .sendFile(joinWithAbsolutePath("src/views/index.html"));
});

router.post("", upload.single("photo"), (req, res) => {
  const { login, password, role, name, id, photo } = req.body as User;
  users.push({
    id,
    login,
    name,
    password,
    role,
    photo,
  });

  res
    .status(StatusCodes.OK)
    .sendFile(joinWithAbsolutePath("src/views/index.html"));
});

export default router;

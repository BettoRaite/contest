import express, { type Router, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { joinWithAbsolutePath } from "../lib/utils/path.js";
import multer from "multer";
import { users, type User } from "../models/user.js";
import { SALT } from "../lib/constants.js";
import { idGenerator } from "../lib/utils/unique.js";

const upload = multer({ dest: "./public/data/uploads/" });
const router: Router = express.Router();

router.get("", (req, res) => {
  res
    .status(StatusCodes.OK)
    .sendFile(joinWithAbsolutePath("src/views/index.html"));
});

router.post("", upload.single("photo"), (req: Request, res: Response) => {
  const { login, password, role_id, name, photo } = req.body;
  const id = idGenerator.getId("user");
  users.set(String(id), {
    id,
    login,
    name,
    password,
    roleId: role_id,
    photo: req.file,
  });

  res
    .status(StatusCodes.OK)
    .sendFile(joinWithAbsolutePath("src/views/index.html"));
});

export default router;

import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { joinWithAbsolutePath } from "@/lib/utils/path.js";
import { users, type User } from "@/models/user.js";
import multer from "multer";
import bcrypt from "bcryptjs";
import { SALT } from "@/lib/constants.js";

const upload = multer({ dest: "./public/data/uploads/" });
const router: Router = express.Router();

router.get("", (req, res) => {
  res
    .status(StatusCodes.OK)
    .sendFile(joinWithAbsolutePath("src/views/index.html"));
});

router.post("", upload.single("photo"), async (req, res) => {
  const user = req.body as User;
  const hashedPassword = await bcrypt.hash(user.password, SALT);
  users.push({
    ...user,
    id: users.length + 1,
    password: hashedPassword,
  });
  console.log(user);
  // Guess it would have been  better to have front on a separate server.
  res
    .status(StatusCodes.OK)
    .sendFile(joinWithAbsolutePath("src/views/index.html"));
});

export default router;

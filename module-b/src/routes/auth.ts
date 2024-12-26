import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../lib/constants.js";
import { generateToken } from "../lib/utils/jwt.js";
import { joinWithAbsolutePath } from "../lib/utils/path.js";
import { bearerBlackList } from "../middleware/auth.js";
import { users, type User } from "../models/user.js";
const router: Router = express.Router();

router.get("/login", (req, res) => {
  res
    .status(StatusCodes.OK)
    .sendFile(joinWithAbsolutePath("src/views/index.html"));
});

router.post("/login", (req, res) => {
  const { login, password } = req.body as User;
  const user = Array.from(users.entries()).find(
    ([id, u]) => u.login === login && u.password === password,
  );
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid credentials",
    });
    return;
  }
  const token = generateToken(String(user[1].id));
  res.status(StatusCodes.OK).json({
    message: "successfully authenticated",
    data: {
      user_token: token,
    },
  });
});

router.get("/logout", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token || bearerBlackList.has(token)) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "invalid credentials" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "invalid credentials" });
      return;
    }
    bearerBlackList.add(token);
    res
      .status(StatusCodes.OK)
      .json({ message: "Successfully logged out.", data: {} });
  });
});

export default router;

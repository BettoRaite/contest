import { users, type User } from "@/models/user.js";
import express, { type Router } from "express";
import { BEARER_TOKEN_COOKIE, SECRET_KEY } from "../lib/constants.js";
import { StatusCodes } from "http-status-codes";
import { joinWithAbsolutePath } from "../lib/utils/path.js";
import { authenticateToken, AUTH_KEY } from "@/middleware/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const loginRoute: Router = express.Router();

loginRoute.get("/login", authenticateToken, async (req, res) => {
  const { user } = req.body[AUTH_KEY] ?? {};
  res
    .status(StatusCodes.OK)
    .sendFile(
      joinWithAbsolutePath(
        `src/views/index.html${user ? `?role=${user.role}` : ""}`,
      ),
    );
});

loginRoute.post("/login", async (req, res) => {
  const { login, password } = req.body;
  const user = users.find((u) => {
    return u.login === login;
  });
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid credentials",
    });
    return;
  }
  const areMatching = await bcrypt.compare(password, user.password);
  if (!areMatching) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid credentials",
    });
    return;
  }
  const token = jwt.sign({ ...user }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.status(StatusCodes.OK).json({
    message: "Successfully logged in.",
    data: {
      user_token: token,
    },
  });
});

export default loginRoute;

import express, { type Router } from "express";
import { BEARER_TOKEN_COOKIE } from "../lib/constants.js";
import { StatusCodes } from "http-status-codes";
import { joinWithAbsolutePath } from "../lib/utils/path.js";
const loginRoute: Router = express.Router();

loginRoute.get("/login", (req, res) => {
  if (req.cookies[BEARER_TOKEN_COOKIE]) {
  }
  res
    .status(StatusCodes.OK)
    .sendFile(joinWithAbsolutePath("src/views/index.html"));
});

loginRoute.post("/login", (req, res) => {
  if (req.cookies[BEARER_TOKEN_COOKIE]) {
  }
});

export default loginRoute;
